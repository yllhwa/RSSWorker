import { Device } from './gen/bilibili/metadata/device/device_pb.js';
import { Locale } from './gen/bilibili/metadata/locale/locale_pb.js';
import { Network, NetworkType } from './gen/bilibili/metadata/network/network_pb.js';
import { Metadata } from './gen/bilibili/metadata/metadata_pb.js';
import { DynSpaceReq, DynSpaceRsp } from './gen/bilibili/app/dynamic/v2/dynamic_pb.js';

const BASE_URL = 'https://grpc.biliapi.net';

let U8ToBase64 = function (u8) {
	return btoa(String.fromCharCode.apply(null, u8));
};

let getBilibiliMetadata = (accessKey) => {
	const METADATA = {
		// accessKey: accessKey,
		mobiApp: 'android',
		device: 'phone',
		build: 7490200,
		channel: 'bili',
		buvid: 'XXDB651D19CBABBDEB8765B4C9461159EADBD', // random generate
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
	let { device, locale, network, bili_metadata, authorization } = getBilibiliMetadata(accessKey);
	return {
		'Content-Type': 'application/grpc',
		'x-bili-metadata-bin': bili_metadata,
		'x-bili-device-bin': device,
		'x-bili-locale-bin': locale,
		'x-bili-network-bin': network,
		authorization: authorization,
		'User-Agent':
			'Dalvik/2.1.0 (Linux; U; Android 12; M2007J3SC Build/SKQ1.211006.001) 7.49.0 os/android model/M2007J3SC mobi_app/android build/7490200 channel/bili innerVer/7490210 osVer/12 network/2 grpc-java-cronet/1.36.1',
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
			let rsp = await fetch(url, {
				method: 'POST',
				headers: headers,
				body: dataToGrpc(req_bin),
			});
			let rsp_bin = await rsp.arrayBuffer();
			dynSpaceRsp.fromBinary(grpcToData(rsp_bin));
			break;
		} catch (e) {
			// 由于 http2 不关闭连接，而我们实现的 grpc 有问题，所以重试一下
		}
	}
	return dynSpaceRsp.toJsonString();
};

export { GetDynSpace };
