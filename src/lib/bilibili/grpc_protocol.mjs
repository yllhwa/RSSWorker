const HTTP2_FRAME_HEADER_LENGTH = 9;
const HTTP2_FLAG_END_HEADERS = 0x04;
const HTTP2_FLAG_PADDED = 0x08;
const HTTP2_FLAG_PRIORITY = 0x20;

let toUint8Array = (value) => {
	if (value instanceof Uint8Array) {
		return value;
	}
	return new Uint8Array(value);
};

let concatUint8Arrays = (chunks) => {
	let totalLength = 0;
	for (let chunk of chunks) {
		totalLength += chunk.length;
	}
	let result = new Uint8Array(totalLength);
	let offset = 0;
	for (let chunk of chunks) {
		result.set(chunk, offset);
		offset += chunk.length;
	}
	return result;
};

let binaryStringToUint8Array = (value) => {
	let result = new Uint8Array(value.length);
	for (let i = 0; i < value.length; i++) {
		result[i] = value.charCodeAt(i) & 0xff;
	}
	return result;
};

let uint8ArrayToBinaryString = (value) => {
	let result = '';
	let chunkSize = 0x8000;
	for (let i = 0; i < value.length; i += chunkSize) {
		result += String.fromCharCode.apply(null, value.subarray(i, i + chunkSize));
	}
	return result;
};

let toHpackDecodeInput = (value) => Buffer.from(toUint8Array(value));

let encodeHttp2Frame = ({ type, flags = 0, streamId = 0, payload = new Uint8Array(0) }) => {
	payload = toUint8Array(payload);
	let frame = new Uint8Array(HTTP2_FRAME_HEADER_LENGTH + payload.length);
	frame[0] = (payload.length >> 16) & 0xff;
	frame[1] = (payload.length >> 8) & 0xff;
	frame[2] = payload.length & 0xff;
	frame[3] = type & 0xff;
	frame[4] = flags & 0xff;
	frame[5] = (streamId >> 24) & 0x7f;
	frame[6] = (streamId >> 16) & 0xff;
	frame[7] = (streamId >> 8) & 0xff;
	frame[8] = streamId & 0xff;
	frame.set(payload, HTTP2_FRAME_HEADER_LENGTH);
	return frame;
};

let createHttp2FrameParser = () => {
	let pending = new Uint8Array(0);
	return {
		push(chunk) {
			chunk = toUint8Array(chunk);
			if (chunk.length !== 0) {
				pending = concatUint8Arrays([pending, chunk]);
			}
			let frames = [];
			let offset = 0;
			while (pending.length - offset >= HTTP2_FRAME_HEADER_LENGTH) {
				let length = (pending[offset] << 16) | (pending[offset + 1] << 8) | pending[offset + 2];
				let frameEnd = offset + HTTP2_FRAME_HEADER_LENGTH + length;
				if (pending.length < frameEnd) {
					break;
				}
				let streamId =
					((pending[offset + 5] & 0x7f) << 24) |
					(pending[offset + 6] << 16) |
					(pending[offset + 7] << 8) |
					pending[offset + 8];
				frames.push({
					length,
					type: pending[offset + 3],
					flags: pending[offset + 4],
					streamId,
					payload: pending.slice(offset + HTTP2_FRAME_HEADER_LENGTH, frameEnd),
				});
				offset = frameEnd;
			}
			pending = pending.slice(offset);
			return frames;
		},
		getPendingLength() {
			return pending.length;
		},
	};
};

let encodeGrpcMessage = (data) => {
	let message = toUint8Array(data);
	let frame = new Uint8Array(message.length + 5);
	frame[0] = 0;
	frame[1] = (message.length >> 24) & 0xff;
	frame[2] = (message.length >> 16) & 0xff;
	frame[3] = (message.length >> 8) & 0xff;
	frame[4] = message.length & 0xff;
	frame.set(message, 5);
	return frame;
};

let decodeGrpcUnaryMessage = (body) => {
	body = toUint8Array(body);
	if (body.length < 5) {
		throw new Error(`invalid gRPC response: expected at least 5 bytes, got ${body.length}`);
	}
	if (body[0] !== 0) {
		throw new Error('compressed gRPC responses are not supported');
	}
	let length = (body[1] << 24) | (body[2] << 16) | (body[3] << 8) | body[4];
	let expectedLength = length + 5;
	if (body.length !== expectedLength) {
		throw new Error(`gRPC message length mismatch: expected ${expectedLength} bytes, got ${body.length}`);
	}
	return body.slice(5);
};

let decodeGrpcMessage = (value = '') => {
	try {
		return decodeURIComponent(value);
	} catch (e) {
		return value;
	}
};

let normalizeHeaders = (headers) => {
	let result = {};
	for (let [key, value] of headers) {
		result[String(key).toLowerCase()] = String(value);
	}
	return result;
};

let assertGrpcStatusOk = (headers = {}, trailers = {}) => {
	let status = trailers['grpc-status'] ?? headers['grpc-status'];
	if (status === '0') {
		return;
	}
	if (status === undefined) {
		throw new Error('missing gRPC status');
	}
	let message = decodeGrpcMessage(trailers['grpc-message'] ?? headers['grpc-message'] ?? '');
	let error = new Error(`gRPC status ${status}${message ? `: ${message}` : ''}`);
	error.grpcStatus = status;
	throw error;
};

let validateHttpStatus = (headers = {}) => {
	let status = headers[':status'];
	if (status !== undefined && status !== '200') {
		throw new Error(`HTTP/2 status ${status}`);
	}
};

let extractHeaderBlock = (frame) => {
	let payload = frame.payload;
	let offset = 0;
	let end = payload.length;
	if (frame.flags & HTTP2_FLAG_PADDED) {
		if (payload.length === 0) {
			throw new Error('invalid padded HEADERS frame');
		}
		let padLength = payload[0];
		offset = 1;
		end -= padLength;
		if (end < offset) {
			throw new Error('invalid HEADERS frame padding');
		}
	}
	if (frame.type === 1 && frame.flags & HTTP2_FLAG_PRIORITY) {
		offset += 5;
		if (end < offset) {
			throw new Error('invalid priority HEADERS frame');
		}
	}
	return payload.slice(offset, end);
};

let createHeaderBlockCollector = () => {
	let activeHeaderBlock = null;
	let makeHeaderBlock = (frame, payload) => ({
		flags: frame.flags,
		streamId: frame.streamId,
		payload,
	});
	return {
		push(frame) {
			if (frame.type === 1) {
				let block = extractHeaderBlock(frame);
				if (frame.flags & HTTP2_FLAG_END_HEADERS) {
					return makeHeaderBlock(frame, block);
				}
				activeHeaderBlock = {
					streamId: frame.streamId,
					flags: frame.flags,
					chunks: [block],
				};
				return null;
			}
			if (frame.type !== 9) {
				return null;
			}
			if (activeHeaderBlock === null || activeHeaderBlock.streamId !== frame.streamId) {
				throw new Error('unexpected HTTP/2 CONTINUATION frame');
			}
			activeHeaderBlock.chunks.push(frame.payload);
			if (!(frame.flags & HTTP2_FLAG_END_HEADERS)) {
				return null;
			}
			let block = concatUint8Arrays(activeHeaderBlock.chunks);
			let headerBlock = {
				flags: activeHeaderBlock.flags,
				streamId: activeHeaderBlock.streamId,
				payload: block,
			};
			activeHeaderBlock = null;
			return headerBlock;
		},
	};
};

let extractDataPayload = (frame) => {
	let payload = frame.payload;
	if (!(frame.flags & HTTP2_FLAG_PADDED)) {
		return payload;
	}
	if (payload.length === 0) {
		throw new Error('invalid padded DATA frame');
	}
	let padLength = payload[0];
	let end = payload.length - padLength;
	if (end < 1) {
		throw new Error('invalid DATA frame padding');
	}
	return payload.slice(1, end);
};

export {
	assertGrpcStatusOk,
	binaryStringToUint8Array,
	concatUint8Arrays,
	createHeaderBlockCollector,
	createHttp2FrameParser,
	decodeGrpcUnaryMessage,
	encodeGrpcMessage,
	encodeHttp2Frame,
	extractDataPayload,
	extractHeaderBlock,
	normalizeHeaders,
	toHpackDecodeInput,
	uint8ArrayToBinaryString,
	validateHttpStatus,
};
