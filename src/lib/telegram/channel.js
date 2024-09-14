import { renderRss2 } from '../../utils/util';
import { substr } from 'runes2';

let deal = async (ctx) => {
	const { username } = ctx.req.param();
	let res = await fetch(`https://t.me/s/${username}`);
	let title = '';
	let link = `https://t.me/s/${username}`;
	let description = '';
	let language = 'zh-cn';
	let tgme_widget_message_texts = [];
	let tgme_widget_message_dates = [];
	let src_links = [];
	let last_tag = '';
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
		.on('.tgme_widget_message_bubble', {
			element(element) {
				tgme_widget_message_texts.push('');
			},
		})
		.on('.tgme_widget_message_bubble > .tgme_widget_message_text', {
			text(text) {
				tgme_widget_message_texts[tgme_widget_message_texts.length - 1] += text.text;
			},
		})
		.on('.tgme_widget_message_bubble .tgme_widget_message_photo_wrap', {
			element(element) {
				let style = element.getAttribute('style');
				let url = style.match(/background-image:url\('(.+)'\)/)[1];
				tgme_widget_message_texts[tgme_widget_message_texts.length - 1] += '<img src="' + url + '" />';
				tgme_widget_message_texts[tgme_widget_message_texts.length - 1] += '<br>';
			},
		})
		.on('.tgme_widget_message_bubble > .tgme_widget_message_text > b', {
			element(element) {
				// add <b> tag
				tgme_widget_message_texts[tgme_widget_message_texts.length - 1] += '<b>';
			},
			text(text) {
				if (text.lastInTextNode) {
					tgme_widget_message_texts[tgme_widget_message_texts.length - 1] += '</b>';
				}
			},
		})
		.on('.tgme_widget_message_bubble > .tgme_widget_message_text > br', {
			element(element) {
				// add <br> tag
				tgme_widget_message_texts[tgme_widget_message_texts.length - 1] += '<br>';
			},
		})
		.on('.tgme_widget_message_date > time', {
			element(element) {
				tgme_widget_message_dates.push(element.getAttribute('datetime'));
			},
		})
		.on('.tgme_widget_message_wrap > .tgme_widget_message', {
			element(element) {
				let data_post = element.getAttribute('data-post');
				src_links.push(`https://t.me/${username}/${data_post}`);
			},
		})
		.transform(res);
	await new_res.text();
	let items = [];
	src_links = src_links.reverse();
	tgme_widget_message_dates = tgme_widget_message_dates.reverse();
	for (let i = 0; i < tgme_widget_message_texts.length; i++) {
		if (tgme_widget_message_texts[i] === '') {
			continue;
		}
		let title = tgme_widget_message_texts[i].replace(/<br>/g, ' ');
		title = title.replace(/<b>|<\/b>|<img.*>/g, '');
		if (title.length > 100) {
			title = substr(title, 0, 100) + '...';
		} else if (title.trim().length === 0) {
			title = '无标题';
		}
		let item = {
			title: title,
			link: src_links.pop(),
			description: tgme_widget_message_texts[i],
			pubDate: tgme_widget_message_dates.pop(),
		};
		items.push(item);
	}
	items = items.reverse();
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

let setup = (route) => {
	route.get('/telegram/channel/:username', deal);
};

export default { setup };
