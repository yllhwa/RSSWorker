import puppeteer from '@cloudflare/puppeteer';
import { renderRss2 } from '../../utils/util';

const USER_AGENT =
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';
const SHARE_PARAMS = ['xsec_token', 'xsec_source', 'xhsshare', 'shareRedId', 'apptime', 'share_id', 'share_channel'];

const unwrap = (value) => value?._rawValue ?? value?._value ?? value?.value ?? value;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getHeaders = () => ({
	Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
	'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
	'Cache-Control': 'no-cache',
	Pragma: 'no-cache',
	'User-Agent': USER_AGENT,
});

const normalizeNotes = (notes) => {
	const result = [];
	const walk = (value) => {
		value = unwrap(value);
		if (!value) return;
		if (Array.isArray(value)) {
			for (const item of value) walk(item);
			return;
		}
		if (typeof value !== 'object') return;

		const noteCard = unwrap(value.noteCard ?? value.note_card);
		const noteId = value.id ?? value.noteId ?? value.note_id ?? noteCard?.noteId ?? noteCard?.note_id ?? noteCard?.id;
		if (noteCard || noteId) {
			result.push(value);
			return;
		}
		for (const key of ['data', 'list', 'items', 'notes']) {
			if (value[key]) walk(value[key]);
		}
	};
	walk(notes);
	return result;
};

const parseInitialState = (scripts) => {
	const marker = 'window.__INITIAL_STATE__=';
	const source = scripts.find((script) => script.includes(marker));
	if (!source) throw new Error('小红书页面未返回 __INITIAL_STATE__');

	let script = source.slice(source.indexOf(marker) + marker.length).trim().replace(/;\s*$/, '');
	script = script
		.replaceAll(/new Map\(\s*\[\s*\]\s*\)/g, '{}')
		.replaceAll(/new Set\(\s*\[\s*\]\s*\)/g, '[]')
		.replaceAll(/new Map\(\s*\)/g, '{}')
		.replaceAll(/new Set\(\s*\)/g, '[]')
		.replaceAll(/\bundefined\b/g, 'null')
		.replaceAll(/\bNaN\b/g, 'null');
	return JSON.parse(script);
};

const extractNoteIdFromUrl = (href) => {
	if (!href) return '';
	try {
		const url = new URL(href, 'https://www.xiaohongshu.com');
		const parts = url.pathname.split('/').filter(Boolean);
		const noteId =
			parts[0] === 'explore'
				? parts[1]
				: parts[0] === 'discovery' && parts[1] === 'item'
					? parts[2]
					: parts[0] === 'user' && parts[1] === 'profile'
						? parts[3]
						: '';
		return /^[0-9a-f]{24}$/i.test(noteId || '') ? noteId : '';
	} catch {
		return '';
	}
};

const extractCardLinks = (html) => {
	const links = new Map();
	const sectionPattern = /<section\b([^>]*)class=(["'])[^"']*\bnote-item\b[^"']*\2([^>]*)>([\s\S]*?)<\/section>/gi;
	let sectionMatch;
	while ((sectionMatch = sectionPattern.exec(html))) {
		const attrs = `${sectionMatch[1]} ${sectionMatch[3]}`;
		const indexMatch = attrs.match(/data-index=(["'])(\d+)\1/i);
		if (!indexMatch) continue;

		const hrefPattern = /href=(["'])(.*?)\1/gi;
		let hrefMatch;
		while ((hrefMatch = hrefPattern.exec(sectionMatch[4]))) {
			const href = hrefMatch[2].replaceAll('&amp;', '&');
			if (extractNoteIdFromUrl(href)) {
				links.set(Number(indexMatch[2]), href);
				break;
			}
		}
	}
	return links;
};

const extractPage = async (html) => {
	const scripts = [];
	const rewriter = new HTMLRewriter()
		.on('script', {
			element() {
				scripts.push('');
			},
			text(text) {
				scripts[scripts.length - 1] += text.text;
			},
		})
		.transform(new Response(html, { headers: { 'Content-Type': 'text/html; charset=UTF-8' } }));
	await rewriter.text();

	const state = parseInitialState(scripts);
	const user = unwrap(state?.user);
	if (!user || typeof user !== 'object') throw new Error('小红书页面未返回 user 状态');

	const userPageData = unwrap(user.userPageData ?? user.userInfo ?? {}) ?? {};
	const rawNotes = unwrap(user.notes ?? userPageData?.notes ?? []);
	const activeTab = unwrap(user.activeTab) ?? {};
	const activeIndex = Number.isInteger(activeTab.index) ? activeTab.index : 0;
	let selectedNotes = rawNotes;
	if (Array.isArray(rawNotes) && rawNotes.length && rawNotes.every((row) => Array.isArray(row))) {
		selectedNotes = rawNotes[activeIndex] ?? rawNotes.find((row) => row.length) ?? [];
	}

	const notes = normalizeNotes(selectedNotes);
	const cardLinks = extractCardLinks(html);
	for (let index = 0; index < notes.length; index++) {
		const item = notes[index];
		const noteCard = unwrap(item.noteCard ?? item.note_card ?? item) ?? {};
		const cardIndex = Number.isInteger(item.index) ? item.index : index;
		const href = cardLinks.get(cardIndex);
		if (!href) continue;

		const noteId = extractNoteIdFromUrl(href);
		if (noteId && !(item.id ?? item.noteId ?? item.note_id ?? noteCard.noteId ?? noteCard.note_id ?? noteCard.id)) {
			item.id = noteId;
		}
		try {
			const token = new URL(href, 'https://www.xiaohongshu.com').searchParams.get('xsec_token');
			if (token) item.xsecToken = item.xsecToken || item.xsec_token || token;
		} catch {}
	}

	return { userPageData, notes };
};

const getBasicInfo = (userPageData) => {
	const page = unwrap(userPageData) ?? {};
	return unwrap(page.basicInfo ?? page.basic_info ?? page.userInfo ?? page.user_info) ?? {};
};

const hasProfile = (data) => {
	const basic = getBasicInfo(data?.userPageData);
	return Boolean(basic.nickname ?? basic.nickName ?? basic.name);
};

const fetchProfile = async (url) => {
	const response = await fetch(url, { headers: getHeaders(), redirect: 'follow' });
	if (!response.ok) throw new Error(`小红书主页请求失败: HTTP ${response.status}`);
	if (new URL(response.url).pathname.startsWith('/login')) throw new Error('小红书匿名主页被重定向到 /login');
	return extractPage(await response.text());
};

const getWithBrowser = async (ctx, url) => {
	if (!ctx.env?.BROWSER) throw new Error('Cloudflare Browser Run binding 不可用');
	let browser;
	try {
		browser = await puppeteer.launch(ctx.env.BROWSER);
		const page = await browser.newPage();
		await page.setUserAgent(USER_AGENT);
		await page.setRequestInterception(true);
		page.on('request', (request) => {
			const type = request.resourceType();
			if (['document', 'script', 'xhr', 'fetch', 'other'].includes(type)) request.continue();
			else request.abort();
		});

		try {
			await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
		} catch (error) {
			if (!String(error?.message || error).includes('Navigation timeout')) throw error;
			try {
				if (new URL(page.url()).hostname !== 'www.xiaohongshu.com') throw error;
			} catch {
				throw error;
			}
		}

		try {
			await page.waitForSelector('div.reds-tab-item:nth-child(2), .fe-verify-box', { timeout: 3500 });
		} catch {}
		if (await page.$('.fe-verify-box')) throw new Error('小红书风控校验已触发');

		await sleep(500);
		const data = await extractPage(await page.content());
		if (!hasProfile(data)) throw new Error('小红书主页未返回用户资料');
		return data;
	} finally {
		if (browser) await browser.close().catch(() => {});
	}
};

const getUser = async (ctx, url) => {
	const hasXsecToken = Boolean(new URL(url).searchParams.get('xsec_token'));
	try {
		const data = await fetchProfile(url);
		if (data.notes.length) return data;
	} catch (error) {
		if (!hasXsecToken) throw error;
	}

	if (!hasXsecToken) {
		throw new Error('匿名模式未返回笔记，请使用带 xsec_token 的公开分享链接');
	}
	const data = await getWithBrowser(ctx, url);
	if (!data.notes.length) throw new Error('小红书用户资料已获取，但没有抓到发布笔记');
	return data;
};

const normalizeMediaUrl = (value) => {
	if (!value) return '';
	try {
		const url = new URL(value);
		if (url.protocol === 'http:' && (url.hostname === 'xhscdn.com' || url.hostname.endsWith('.xhscdn.com'))) {
			url.protocol = 'https:';
		}
		return url.toString();
	} catch {
		return String(value);
	}
};

const getCoverUrl = (cover) => {
	cover = unwrap(cover) ?? {};
	const infoList = unwrap(cover.infoList ?? cover.info_list);
	const item = Array.isArray(infoList) && infoList.length ? infoList[infoList.length - 1] : cover;
	return normalizeMediaUrl(item?.url ?? item?.urlDefault ?? item?.url_default ?? item?.urlPre ?? item?.url_pre ?? '');
};

const getAnonymousGuid = (coverUrl, author, title, time) => {
	try {
		const mediaId = new URL(coverUrl).pathname.split('/').filter(Boolean).pop()?.split('!')[0];
		if (mediaId) return `xhs-cover:${mediaId}`;
	} catch {}
	return `xhs-anon:${author || ''}:${time || ''}:${title || ''}`;
};

const toRssItem = (item, fallbackAuthor) => {
	item = unwrap(item) ?? {};
	const noteCard = unwrap(item.noteCard ?? item.note_card ?? item) ?? {};
	const noteId = noteCard.noteId ?? noteCard.note_id ?? noteCard.id ?? item.id ?? item.noteId ?? item.note_id;
	const noteUser = unwrap(noteCard.user ?? item.user) ?? {};
	const interactInfo = unwrap(noteCard.interactInfo ?? noteCard.interact_info ?? item.interactInfo ?? item.interact_info) ?? {};
	const title =
		noteCard.displayTitle ?? noteCard.display_title ?? noteCard.title ?? noteCard.desc ?? item.displayTitle ?? item.title ?? '小红书笔记';
	const author = noteUser.nickname ?? noteUser.nickName ?? noteUser.nick_name ?? noteUser.name ?? fallbackAuthor;
	const coverUrl = getCoverUrl(noteCard.cover ?? item.cover);
	const xsecToken = item.xsecToken ?? item.xsec_token ?? noteCard.xsecToken ?? noteCard.xsec_token;

	let link = coverUrl;
	if (noteId) {
		const noteUrl = new URL(`https://www.xiaohongshu.com/explore/${noteId}`);
		if (xsecToken) {
			noteUrl.searchParams.set('xsec_token', xsecToken);
			noteUrl.searchParams.set('xsec_source', 'pc_user');
		}
		link = noteUrl.toString();
	}
	if (!link) return null;

	return {
		title: String(title).trim() || '小红书笔记',
		link,
		guid: noteId || getAnonymousGuid(coverUrl, author, title, noteCard.time ?? item.time),
		description: `${coverUrl ? `<img src="${coverUrl}"><br>` : ''}${title}`,
		author,
		upvotes: interactInfo.likedCount ?? interactInfo.liked_count,
	};
};

const getCache = () => {
	try {
		return caches.default;
	} catch {
		return null;
	}
};

const deal = async (ctx) => {
	const { uid } = ctx.req.param();
	const cache = getCache();
	const cacheKey = new Request(`https://rssworker-cache.invalid/xiaohongshu/user/${uid}`);
	if (cache && ctx.req.query('refresh') !== '1') {
		const cached = await cache.match(cacheKey);
		if (cached) return cached;
	}

	const pageUrl = new URL(`https://www.xiaohongshu.com/user/profile/${uid}`);
	for (const key of SHARE_PARAMS) {
		const value = ctx.req.query(key);
		if (value !== undefined && value !== null) pageUrl.searchParams.set(key, value);
	}
	if (pageUrl.searchParams.has('xsec_token') && !pageUrl.searchParams.has('xsec_source')) {
		pageUrl.searchParams.set('xsec_source', 'app_share');
	}

	const { userPageData, notes } = await getUser(ctx, pageUrl.toString());
	const page = unwrap(userPageData) ?? {};
	const basicInfo = getBasicInfo(userPageData);
	const firstNote = notes[0] ? unwrap(notes[0]) : null;
	const firstCard = firstNote ? unwrap(firstNote.noteCard ?? firstNote.note_card ?? firstNote) : null;
	const firstUser = firstCard ? unwrap(firstCard.user ?? firstNote.user) : null;
	const feedTitle = basicInfo.nickname ?? basicInfo.nickName ?? firstUser?.nickname ?? `小红书用户 ${uid}`;
	const items = notes.map((item) => toRssItem(item, feedTitle)).filter(Boolean);
	if (!items.length) throw new Error('小红书用户资料已获取，但没有可用于 RSS 的笔记条目');

	const interactions = unwrap(page.interactions) ?? [];
	const tags = unwrap(page.tags) ?? [];
	const description = [
		basicInfo.desc ?? basicInfo.description ?? '',
		Array.isArray(tags) ? tags.map((tag) => tag?.name).filter(Boolean).join(' ') : '',
		Array.isArray(interactions)
			? interactions.map((item) => (item?.name ? `${item?.count ?? ''} ${item.name}`.trim() : '')).filter(Boolean).join(' ')
			: '',
	]
		.filter(Boolean)
		.join(' ');

	const xml = renderRss2({
		title: `${feedTitle} - 笔记 • 小红书 / RED`,
		description: description || `${feedTitle} 的小红书笔记`,
		image: basicInfo.imageb ?? basicInfo.images ?? basicInfo.avatar ?? basicInfo.image ?? firstUser?.avatar,
		link: `https://www.xiaohongshu.com/user/profile/${uid}`,
		items,
	});
	const response = new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=UTF-8',
			'Cache-Control': 'public, max-age=300, s-maxage=1800',
		},
	});

	if (cache) {
		const write = cache.put(cacheKey, response.clone());
		if (ctx.executionCtx?.waitUntil) ctx.executionCtx.waitUntil(write);
		else await write;
	}
	return response;
};

const setup = (route) => {
	route.get('/xiaohongshu/user/:uid', deal);
};

export default { setup };
