import { renderRss2 } from '../../utils/util';

let deal = async (ctx) => {
	const { username } = ctx.req.param();
	let res = await fetch(`https://t.me/s/${username}`);
	const rewriter = new HTMLRewriter();
	let title = '';
	let link = `https://t.me/s/${username}`;
	let description = '';
	let language = 'zh-cn';
	let tgme_widget_message_texts = [];
	let tgme_widget_message_dates = [];
	let new_res = new HTMLRewriter()
		.on('head > title', {
			text(text) {
				title += text.text;
			},
		})
		.on('head > meta[property="og:description"]', {
			element(element) {
				description += element.getAttribute('content');
			},
		})
		.on('.tgme_widget_message_text', {
			element(element) {
				tgme_widget_message_texts.push('');
			},
			text(text) {
				tgme_widget_message_texts[tgme_widget_message_texts.length - 1] += text.text;
			},
		})
		.on('.tgme_widget_message_date > time', {
			element(element) {
				tgme_widget_message_dates.push(element.getAttribute('datetime'));
			},
		})
		.transform(res);
	await new_res.text();
	let items = [];
	for (let i = 0; i < tgme_widget_message_texts.length; i++) {
		if (tgme_widget_message_texts[i] === '') {
			continue;
		}
		let item = {
			title: tgme_widget_message_texts[i],
			link: link,
			description: tgme_widget_message_texts[i],
			pubDate: tgme_widget_message_dates[i],
		};
		items.push(item);
	}
	let data = {
		title: title,
		link: link,
		description: description,
		language: language,
		items: items,
	};
	ctx.header('Content-Type', 'application/xml');
	return ctx.body(renderRss2(data));
};

export { deal };
