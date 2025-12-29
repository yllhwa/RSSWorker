import { Device } from './gen/bilibili/metadata/device/device_pb.js';
import { Locale } from './gen/bilibili/metadata/locale/locale_pb.js';
import { Network, NetworkType } from './gen/bilibili/metadata/network/network_pb.js';
import { Metadata } from './gen/bilibili/metadata/metadata_pb.js';
import { DynSpaceReq, DynSpaceRsp } from './gen/bilibili/app/dynamic/v2/dynamic_pb.js';
import forge from 'node-forge/lib/index.js';
import { connect } from 'cloudflare:sockets';
var HPACK = require('hpack');

const BASE_URL = 'https://grpc.biliapi.net';

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

let dataToGrpc = (data) => {
	// grpc header
	// type(1), length(4), data
	let message = new Uint8Array(data);
	let length = message.length;
	let length_bytes = new Uint8Array(4);
	length_bytes[0] = (length >> 24) & 0xff;
	length_bytes[1] = (length >> 16) & 0xff;
	length_bytes[2] = (length >> 8) & 0xff;
	length_bytes[3] = length & 0xff;
	let data_bin = new Uint8Array(length + 5);
	data_bin[0] = 0; // just set type to 0, it works
	data_bin.set(length_bytes, 1);
	data_bin.set(message, 5);
	return data_bin;
};

let grpcToData = (rsp_bin) => {
	let rsp_data = new Uint8Array(rsp_bin);
	let rsp_message = rsp_data.slice(5);
	return rsp_message;
};

let my_fetch = async (url, options) => {
	var socket = connect({
		hostname: 'grpc.biliapi.net',
		port: 443,
	});
	await socket.opened;
	const writer = socket.writable.getWriter();
	const reader = socket.readable.getReader();
	return new Promise(async (resolve, reject) => {
		let all_result = '';

		// build HEADERS
		// HEADERS length (3 bytes)
		let headers_raw = '';
		// length
		headers_raw += '\x01'; // type: HEADERS
		headers_raw += '\x24'; // flags
		headers_raw += '\x00\x00\x00\x01';
		headers_raw += '\x80\x00\x00\x00';
		headers_raw += '\xff'; // weight
		var hpack_codec = new HPACK();
		var headers = [
			[':method', 'POST'],
			[':scheme', 'https'],
			[':path', '/bilibili.app.dynamic.v2.Dynamic/DynSpace'],
			[':authority', 'grpc.biliapi.net'],
		];
		for (let [key, value] of Object.entries(options.headers)) {
			headers.push([key, value]);
		}
		var headers_bin = hpack_codec.encode(headers);
		headers_raw += String.fromCharCode.apply(null, headers_bin);
		let headers_raw_length_bytes = new Uint8Array(3);
		headers_raw_length_bytes[0] = ((headers_bin.length + 5) >> 16) & 0xff;
		headers_raw_length_bytes[1] = ((headers_bin.length + 5) >> 8) & 0xff;
		headers_raw_length_bytes[2] = (headers_bin.length + 5) & 0xff;
		let headers_raw_length_bytes_str = String.fromCharCode.apply(null, headers_raw_length_bytes);
		headers_raw = headers_raw_length_bytes_str + headers_raw;

		// build data
		// DATA length (3 bytes)
		var data_raw = '';
		// length
		data_raw += '\x00'; // type: DATA
		data_raw += '\x01'; // flags
		data_raw += '\x00\x00\x00\x01';
		data_raw += String.fromCharCode.apply(null, options.body);
		let data_raw_length_bytes = new Uint8Array(3);
		data_raw_length_bytes[0] = (options.body.length >> 16) & 0xff;
		data_raw_length_bytes[1] = (options.body.length >> 8) & 0xff;
		data_raw_length_bytes[2] = options.body.length & 0xff;
		let data_raw_length_bytes_str = String.fromCharCode.apply(null, data_raw_length_bytes);
		data_raw = data_raw_length_bytes_str + data_raw;

		var client = forge.tls.createConnection({
			server: false,
			verify: function (connection, verified, depth, certs) {
				// skip verification
				return true;
			},
			connected: function (connection) {
				console.log('[tls] connected');
				client.prepare('PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n');
				client.prepare(
					'\x00\x00\x18\x04\x00\x00\x00\x00\x00\x00\x01\x00\x01\x00\x00\x00\x02\x00\x00\x00\x00\x00\x04\x00`\x00\x00\x00\x06\x00\x04\x00\x00'
				);
				client.prepare('\x00\x00\x04\x08\x00\x00\x00\x00\x00\x00\xef\x00\x01');
				client.prepare(headers_raw);
				client.prepare(data_raw);
				client.prepare(`\x00\x00\x00\x04\x01\x00\x00\x00\x00`);
				client.prepare('\x00\x00\x04\x08\x00\x00\x00\x00\x00\x00\xef\x00\x01');
			},
			tlsDataReady: async function (connection) {
				var data = connection.tlsData.getBytes();
				var data_buffer = new Uint8Array(data.length);
				for (let i = 0; i < data.length; i++) {
					data_buffer[i] = data.charCodeAt(i);
				}
				await writer.write(data_buffer);
			},
			dataReady: function (connection) {
				try {
					var data = connection.data.getBytes();
					console.log('[tls] data received from the server: ' + data.length);
					while (data.length > 0) {
						// 前 3 个字节是长度
						let length = (data[0].charCodeAt() << 16) | (data[1].charCodeAt() << 8) | data[2].charCodeAt();
						data = data.slice(3); // length
						let type = data[0].charCodeAt();
						console.log('[tls] data type', type);
						data = data.slice(1); // type
						let flags = data[0].charCodeAt();
						data = data.slice(1); // flags
						data = data.slice(4); // ident
						let real_data = data.slice(0, length);
						data = data.slice(length);
						if (type == 0) {
							// DATA
							all_result += real_data;
							console.log('[tls] data', all_result.length);
						}
						if ((type == 0 || type == 1) && flags & 0x01) {
							console.log('[tls] end of stream');
							client.close();
							resolve(all_result);
						}
					}
				} catch (e) {
					console.log(e);
					reject(e);
				}
			},
			closed: function () {
				console.log('[tls] disconnected');
			},
			error: function (connection, error) {
				console.log('[tls] error', error);
			},
		});
		client.handshake();
		while (true) {
			let data = await reader.read();
			if (data.done) {
				break;
			}
			let data_str = String.fromCharCode.apply(null, data.value);
			client.process(data_str);
		}
		resolve(all_result);
	});
};

let GetDynSpace = async (uid, accessKey = '') => {
	let req_bin = new DynSpaceReq({
		hostUid: uid,
	}).toBinary();
	let url = BASE_URL + '/bilibili.app.dynamic.v2.Dynamic/DynSpace';
	let headers = getHeaders(accessKey);
	let retry_max = 3;
	let dynSpaceRsp = new DynSpaceRsp();
	for (let i = 0; i < retry_max; i++) {
		try {
			let rsp = await my_fetch(url, {
				method: 'POST',
				headers: headers,
				body: dataToGrpc(req_bin),
			});
			// string 转为 Uint8Array
			rsp = rsp.slice(5);
			let rsp_bin = new Uint8Array(rsp.length);
			for (let i = 0; i < rsp.length; i++) {
				rsp_bin[i] = rsp.charCodeAt(i);
			}
			dynSpaceRsp.fromBinary(rsp_bin);
			break;
		} catch (e) {
			throw e;
			// 由于 http2 不关闭连接，而我们实现的 grpc 有问题，所以重试一下
		}
	}
	return dynSpaceRsp.toJsonString();
};

export { GetDynSpace };
