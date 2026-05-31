import { Device } from './gen/bilibili/metadata/device/device_pb.js';
import { Locale } from './gen/bilibili/metadata/locale/locale_pb.js';
import { Network, NetworkType } from './gen/bilibili/metadata/network/network_pb.js';
import { Metadata } from './gen/bilibili/metadata/metadata_pb.js';
import { DynSpaceReq, DynSpaceRsp } from './gen/bilibili/app/dynamic/v2/dynamic_pb.js';
import forge from 'node-forge/lib/index.js';
import { connect } from 'cloudflare:sockets';
import {
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
} from './grpc_protocol.mjs';
var HPACK = require('hpack');

const GRPC_HOST = 'grpc.biliapi.net';
const DYN_SPACE_PATH = '/bilibili.app.dynamic.v2.Dynamic/DynSpace';
const GRPC_TIMEOUT_MS = 10000;

let U8ToBase64 = function (u8) {
	return btoa(String.fromCharCode.apply(null, u8));
};

let getRandomBuvid = () => {
	let buvid = 'XX';
	let charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for (let i = 0; i < 35; i++) {
		buvid += charSet.charAt(Math.floor(Math.random() * charSet.length));
	}
	return buvid;
};

let getBilibiliMetadata = (accessKey, buvid) => {
	const METADATA = {
		// accessKey: accessKey,
		mobiApp: 'android',
		device: 'phone',
		build: 7490200,
		channel: 'bili',
		buvid: buvid,
		platform: 'android',
	};
	let device = new Device(METADATA);
	let locale = new Locale({
		timezone: 'Asia/Shanghai',
	});
	let network = new Network({
		type: NetworkType.WIFI,
	});
	let bili_metadata = new Metadata(METADATA);
	let authorization = 'identify_v1 ' + accessKey;

	let device_bin = device.toBinary();
	let locale_bin = locale.toBinary();
	let network_bin = network.toBinary();
	let bili_metadata_bin = bili_metadata.toBinary();

	let device_base64 = U8ToBase64(device_bin);
	let locale_base64 = U8ToBase64(locale_bin);
	let network_base64 = U8ToBase64(network_bin);
	let bili_metadata_base64 = U8ToBase64(bili_metadata_bin);
	return {
		device: device_base64,
		locale: locale_base64,
		network: network_base64,
		bili_metadata: bili_metadata_base64,
		authorization: authorization,
	};
};

let getHeaders = (accessKey = '') => {
	let buvid = getRandomBuvid();
	let { device, locale, network, bili_metadata, authorization } = getBilibiliMetadata(accessKey, buvid);
	return {
		'content-type': 'application/grpc',
		'x-bili-metadata-bin': bili_metadata,
		'x-bili-device-bin': device,
		'x-bili-locale-bin': locale,
		'x-bili-network-bin': network,
		buvid: buvid,
		authorization: authorization,
		'user-agent':
			'Dalvik/2.1.0 (Linux; U; Android 12; M2007J3SC Build/SKQ1.211006.001) 8.3.0 os/android model/M2007J3SC mobi_app/android build/8030200 channel/master innerVer/8030210 osVer/12 network/2 grpc-java-cronet/1.36.1',
		te: 'deflate',
	};
};

let buildHeadersFrame = (path, headers, hpackCodec) => {
	let headerList = [
		[':method', 'POST'],
		[':scheme', 'https'],
		[':path', path],
		[':authority', GRPC_HOST],
	];
	for (let [key, value] of Object.entries(headers)) {
		headerList.push([key, value]);
	}
	let headerBlock = hpackCodec.encode(headerList);
	let priority = new Uint8Array([0x80, 0x00, 0x00, 0x00, 0xff]);
	let payload = concatUint8Arrays([priority, headerBlock]);
	return encodeHttp2Frame({ type: 1, flags: 0x24, streamId: 1, payload });
};

let buildGrpcRequestBytes = (path, headers, body, hpackCodec) => {
	let preface = binaryStringToUint8Array('PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n');
	let settings = encodeHttp2Frame({
		type: 4,
		streamId: 0,
		payload: new Uint8Array([
			0x00,
			0x01,
			0x00,
			0x01,
			0x00,
			0x00,
			0x00,
			0x02,
			0x00,
			0x00,
			0x00,
			0x00,
			0x00,
			0x04,
			0x00,
			0x60,
			0x00,
			0x00,
			0x00,
			0x06,
			0x00,
			0x04,
			0x00,
			0x00,
		]),
	});
	let windowUpdate = encodeHttp2Frame({
		type: 8,
		streamId: 0,
		payload: new Uint8Array([0x00, 0x00, 0xef, 0x00]),
	});
	let headersFrame = buildHeadersFrame(path, headers, hpackCodec);
	let dataFrame = encodeHttp2Frame({ type: 0, flags: 0x01, streamId: 1, payload: body });
	let settingsAck = encodeHttp2Frame({ type: 4, flags: 0x01, streamId: 0 });
	return concatUint8Arrays([preface, settings, windowUpdate, headersFrame, dataFrame, settingsAck, windowUpdate]);
};

let decodeHeaders = (hpackCodec, frame) => normalizeHeaders(hpackCodec.decode(toHpackDecodeInput(extractHeaderBlock(frame))));

let requestGrpcUnary = async (path, headers, body) => {
	var socket = connect({
		hostname: GRPC_HOST,
		port: 443,
	});
	await socket.opened;
	const writer = socket.writable.getWriter();
	const reader = socket.readable.getReader();
	let hpackCodec = new HPACK();
	let parser = createHttp2FrameParser();
	let headerBlockCollector = createHeaderBlockCollector();
	let responseHeaders = {};
	let responseTrailers = {};
	let dataChunks = [];
	let settled = false;
	let client;

	let cleanup = async () => {
		try {
			client?.close();
		} catch (e) {}
		try {
			writer.releaseLock();
		} catch (e) {}
		try {
			reader.releaseLock();
		} catch (e) {}
		try {
			await socket.close();
		} catch (e) {}
	};

	return await new Promise(async (resolve, reject) => {
		let finish = async (callback, value) => {
			if (settled) {
				return;
			}
			settled = true;
			await cleanup();
			callback(value);
		};
		let timeout = setTimeout(() => {
			finish(reject, new Error(`gRPC request timed out after ${GRPC_TIMEOUT_MS}ms`));
		}, GRPC_TIMEOUT_MS);
		let fail = (error) => {
			clearTimeout(timeout);
			finish(reject, error);
		};
		let succeed = (message) => {
			clearTimeout(timeout);
			finish(resolve, message);
		};
		let requestBytes = buildGrpcRequestBytes(path, headers, body, hpackCodec);

		client = forge.tls.createConnection({
			server: false,
			verify: function (connection, verified, depth, certs) {
				// skip verification
				return true;
			},
			connected: function (connection) {
				console.log('[tls] connected');
				client.prepare(uint8ArrayToBinaryString(requestBytes));
			},
			tlsDataReady: async function (connection) {
				try {
					await writer.write(binaryStringToUint8Array(connection.tlsData.getBytes()));
				} catch (e) {
					fail(e);
				}
			},
			dataReady: function (connection) {
				try {
					let frames = parser.push(binaryStringToUint8Array(connection.data.getBytes()));
					for (let frame of frames) {
						console.log('[tls] data type', frame.type);
						if (frame.type === 0) {
							dataChunks.push(extractDataPayload(frame));
							console.log('[tls] data', dataChunks.reduce((total, chunk) => total + chunk.length, 0));
						} else if (frame.type === 1 || frame.type === 9) {
							let headerBlock = headerBlockCollector.push(frame);
							if (headerBlock !== null) {
								let decodedHeaders = decodeHeaders(hpackCodec, { ...headerBlock, flags: headerBlock.flags & ~0x28 });
								if (headerBlock.flags & 0x01) {
									responseTrailers = decodedHeaders;
								} else {
									responseHeaders = decodedHeaders;
									validateHttpStatus(responseHeaders);
								}
							}
						} else if (frame.type === 3) {
							fail(new Error('HTTP/2 stream reset by upstream'));
							return;
						}
						if (frame.type === 0 && frame.flags & 0x01) {
							console.log('[tls] end of stream');
							assertGrpcStatusOk(responseHeaders, responseTrailers);
							succeed(decodeGrpcUnaryMessage(concatUint8Arrays(dataChunks)));
							return;
						}
						if ((frame.type === 1 || frame.type === 9) && responseTrailers['grpc-status'] !== undefined) {
							console.log('[tls] end of stream');
							assertGrpcStatusOk(responseHeaders, responseTrailers);
							succeed(decodeGrpcUnaryMessage(concatUint8Arrays(dataChunks)));
							return;
						}
					}
				} catch (e) {
					fail(e);
				}
			},
			closed: function () {
				console.log('[tls] disconnected');
				if (!settled) {
					fail(new Error('TLS connection closed before gRPC response completed'));
				}
			},
			error: function (connection, error) {
				console.log('[tls] error', error);
				fail(error instanceof Error ? error : new Error(String(error)));
			},
		});
		client.handshake();
		try {
			while (!settled) {
				let data = await reader.read();
				if (data.done) {
					break;
				}
				client.process(uint8ArrayToBinaryString(data.value));
			}
			if (!settled) {
				fail(new Error('socket closed before gRPC response completed'));
			}
		} catch (e) {
			fail(e);
		}
	});
};

let GetDynSpace = async (uid, accessKey = '') => {
	let req_bin = new DynSpaceReq({
		hostUid: uid,
	}).toBinary();
	let headers = getHeaders(accessKey);
	let retry_max = 3;
	for (let i = 0; i < retry_max; i++) {
		try {
			let rsp_bin = await requestGrpcUnary(DYN_SPACE_PATH, headers, encodeGrpcMessage(req_bin));
			let dynSpaceRsp = new DynSpaceRsp();
			dynSpaceRsp.fromBinary(rsp_bin);
			return dynSpaceRsp.toJsonString();
		} catch (e) {
			if (e.grpcStatus !== undefined || i === retry_max - 1) {
				throw e;
			}
			console.log(`[grpc] retry ${i + 1}/${retry_max - 1}: ${e.message}`);
		}
	}
};

export { GetDynSpace };
