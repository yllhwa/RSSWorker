import { getItemFromDynamic } from './dynamic.js';
import { renderRss2 } from '../../../utils/util';
import { GetDynSpace } from '../grpc_helper';

let deal = async (ctx) => {
	const { uid } = ctx.req.param();
	let dynSpaceResJson = await GetDynSpace(uid);
	let dynSpaceRes = JSON.parse(dynSpaceResJson);
	let items = [];
	let globalUsername = '';
	if (dynSpaceRes.list.length !== 0) {
		globalUsername = dynSpaceRes.list[0].extend.origName;
	} else {
		globalUsername = uid;
	}
	for (let card of dynSpaceRes.list) {
		if (card.cardType !== 'av') {
			continue;
		}
		let item = getItemFromDynamic(card);
		items.push(item);
	}

	let data = {
		title: `${globalUsername} 的 bilibili 视频`,
		link: `https://space.bilibili.com/${uid}/video`,
		description: `${globalUsername} 的 bilibili 视频`,
		language: 'zh-cn',
		// category: 'bilibili',
		items: items,
	};
	let rss = renderRss2(data);
	ctx.header('Content-Type', 'application/xml');
	return ctx.body(`${rss}`);
};

let setup = (route) => {
	route.get('/bilibili/user/video/:uid', deal);
};

export default { setup };
