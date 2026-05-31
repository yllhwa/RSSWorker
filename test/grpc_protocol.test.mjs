import test from 'node:test';
import assert from 'node:assert/strict';

import {
	assertGrpcStatusOk,
	createHeaderBlockCollector,
	createHttp2FrameParser,
	decodeGrpcUnaryMessage,
	extractDataPayload,
	encodeGrpcMessage,
	encodeHttp2Frame,
	normalizeHeaders,
	toHpackDecodeInput,
	validateHttpStatus,
} from '../src/lib/bilibili/grpc_protocol.mjs';

test('HTTP/2 parser buffers incomplete frame headers and payloads', () => {
	const parser = createHttp2FrameParser();
	const payload = new Uint8Array([1, 2, 3, 4]);
	const encoded = encodeHttp2Frame({ type: 0, flags: 1, streamId: 1, payload });

	assert.deepEqual(parser.push(encoded.slice(0, 2)), []);
	assert.deepEqual(parser.push(encoded.slice(2, 10)), []);

	const frames = parser.push(encoded.slice(10));
	assert.equal(frames.length, 1);
	assert.equal(frames[0].type, 0);
	assert.equal(frames[0].flags, 1);
	assert.equal(frames[0].streamId, 1);
	assert.deepEqual(frames[0].payload, payload);
});

test('gRPC unary message decoder validates envelope length and compression', () => {
	const message = new Uint8Array([10, 20, 30]);
	assert.deepEqual(decodeGrpcUnaryMessage(encodeGrpcMessage(message)), message);

	assert.throws(
		() => decodeGrpcUnaryMessage(new Uint8Array([0, 0, 0, 0, 3, 10, 20])),
		/gRPC message length mismatch/
	);
	assert.throws(
		() => decodeGrpcUnaryMessage(new Uint8Array([1, 0, 0, 0, 0])),
		/compressed gRPC responses are not supported/
	);
});

test('gRPC status validation surfaces trailer errors', () => {
	assert.doesNotThrow(() => assertGrpcStatusOk({}, { 'grpc-status': '0' }));
	assert.throws(() => assertGrpcStatusOk({}, { 'grpc-status': '7', 'grpc-message': 'permission denied' }), {
		message: /gRPC status 7: permission denied/,
		grpcStatus: '7',
	});
});

test('HPACK decode input preserves Buffer string slicing semantics', () => {
	const input = toHpackDecodeInput(new Uint8Array([48, 49, 50]));
	assert.equal(input.toString('ascii', 1, 2), '1');
});

test('header normalization lowercases names and stringifies binary-compatible values', () => {
	assert.deepEqual(normalizeHeaders([['Grpc-Status', Buffer.from('0')]]), { 'grpc-status': '0' });
});

test('header block collector waits for CONTINUATION frames before decoding', () => {
	const collector = createHeaderBlockCollector();
	const first = encodeHttp2Frame({ type: 1, flags: 0, streamId: 1, payload: new Uint8Array([1, 2]) });
	const second = encodeHttp2Frame({ type: 9, flags: 4, streamId: 1, payload: new Uint8Array([3, 4]) });
	const parser = createHttp2FrameParser();
	const [headersFrame] = parser.push(first);
	const [continuationFrame] = parser.push(second);

	assert.equal(collector.push(headersFrame), null);
	assert.deepEqual(collector.push(continuationFrame).payload, new Uint8Array([1, 2, 3, 4]));
});

test('header block collector preserves HEADERS metadata through CONTINUATION', () => {
	const collector = createHeaderBlockCollector();
	const parser = createHttp2FrameParser();
	const first = encodeHttp2Frame({ type: 1, flags: 1, streamId: 1, payload: new Uint8Array([1, 2]) });
	const second = encodeHttp2Frame({ type: 9, flags: 4, streamId: 1, payload: new Uint8Array([3, 4]) });
	const [headersFrame] = parser.push(first);
	const [continuationFrame] = parser.push(second);

	assert.equal(collector.push(headersFrame), null);
	assert.deepEqual(collector.push(continuationFrame), {
		flags: 1,
		streamId: 1,
		payload: new Uint8Array([1, 2, 3, 4]),
	});
});

test('header block collectors keep concurrent streams isolated', () => {
	const firstCollector = createHeaderBlockCollector();
	const secondCollector = createHeaderBlockCollector();

	assert.equal(firstCollector.push({ type: 1, flags: 0, streamId: 1, payload: new Uint8Array([1]) }), null);
	assert.equal(secondCollector.push({ type: 1, flags: 0, streamId: 1, payload: new Uint8Array([9]) }), null);
	assert.deepEqual(firstCollector.push({ type: 9, flags: 4, streamId: 1, payload: new Uint8Array([2]) }).payload, new Uint8Array([1, 2]));
	assert.deepEqual(secondCollector.push({ type: 9, flags: 4, streamId: 1, payload: new Uint8Array([8]) }).payload, new Uint8Array([9, 8]));
});

test('HTTP and gRPC status validation rejects malformed upstream responses', () => {
	assert.doesNotThrow(() => validateHttpStatus({ ':status': '200' }));
	assert.throws(() => validateHttpStatus({ ':status': '429' }), /HTTP\/2 status 429/);
	assert.throws(() => assertGrpcStatusOk({ ':status': '200' }, {}), /missing gRPC status/);
});

test('DATA payload extraction removes HTTP/2 padding', () => {
	assert.deepEqual(
		extractDataPayload({ flags: 0x08, payload: new Uint8Array([2, 10, 20, 30, 40]) }),
		new Uint8Array([10, 20])
	);
	assert.throws(() => extractDataPayload({ flags: 0x08, payload: new Uint8Array([5, 10]) }), /invalid DATA frame padding/);
});
