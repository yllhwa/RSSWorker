const { parseDate, parseRelativeDate } = require('../../utils/parse-date');

const weiboUtils = {
	apiHeaders: {
		'MWeibo-Pwa': 1,
		'X-Requested-With': 'XMLHttpRequest',
		'User-Agent':
			'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
	},
	resolveMblogBid: (item) => {
		let bid = item?.mblog?.bid;
		if (bid === '' && item.scheme) {
			try {
				bid = new URL(item.scheme, 'https://m.weibo.cn').searchParams.get('mblogid') || bid;
				item.mblog.bid = bid;
			} catch (e) {
				// Keep the original bid when Weibo returns an unexpected scheme shape.
			}
		}
		return bid;
	},
	filterStalePinnedItems: (items) => {
		const pinnedItems = items.filter((item) => item.isPinned);
		const ordinaryItems = items.filter((item) => !item.isPinned);
		if (pinnedItems.length === 0 || ordinaryItems.length === 0) {
			return items;
		}

		const ordinaryPostTimes = ordinaryItems.map((item) => item.pubDate?.getTime?.()).filter((time) => Number.isFinite(time));
		if (ordinaryPostTimes.length === 0) {
			return items;
		}

		const earliestOrdinaryPostTime = Math.min(...ordinaryPostTimes);
		const freshPinnedItems = pinnedItems.filter((item) => item.pubDate > earliestOrdinaryPostTime);
		return [...freshPinnedItems, ...ordinaryItems];
	},
	normalizeCreatedAt: (createdAt) => {
		if (!createdAt || createdAt instanceof Date) {
			return createdAt;
		}
		if (typeof createdAt !== 'string') {
			return createdAt;
		}
		const parsed = parseRelativeDate(createdAt);
		return parsed instanceof Date ? parsed : parseDate(createdAt);
	},
	formatTitle: (html) =>
		html
			.replace(/<span class=["']url-icon["']><img\s[^>]*?alt=["']?([^>]+?)["']?\s[^>]*?\/?><\/span>/g, '$1') // 表情转换
			.replace(/<span class=["']url-icon["']>(<img\s[^>]*>)<\/span>/g, '') // 去掉所有图标
			.replace(/<img\s[^<]*>/g, '[图片]')
			// impossible to have inline script in weibo posts, but CodeQL complains about it
			// Dismiss it through the UI: https://github.com/github/codeql/issues/11427
			.replace(/<[^<]*>/g, '')
			.replace(/\n/g, ' ')
			.trim(),
	formatExtended: (ctx, status, uid = undefined, params = {}, picsPrefixes = []) => {
		// `uid = undefined` to explicitly mark it as optional, avoiding IDEs prompting warnings
		const mergedParams = {
			readable: true,
			authorNameBold: false,
			showAuthorInTitle: false,
			showAuthorInDesc: false,
			showAuthorAvatarInDesc: false,
			showAtBeforeAuthor: false,
			showEmojiForRetweet: false,
			showRetweetTextInTitle: true,
			addLinkForPics: false,
			showTimestampInDescription: false,

			widthOfPics: -1,
			heightOfPics: -1,
			sizeOfAuthorAvatar: 48,
			showEmojiInDescription: true,
			showLinkIconInDescription: true,
			preferMobileLink: false,
		};

		params = mergedParams;

		const {
			readable,
			authorNameBold,
			showAuthorInTitle,
			showAuthorInDesc,
			showAuthorAvatarInDesc,
			showAtBeforeAuthor,
			showEmojiForRetweet,
			showRetweetTextInTitle,
			addLinkForPics,
			showTimestampInDescription,

			widthOfPics,
			heightOfPics,
			sizeOfAuthorAvatar,
			showEmojiInDescription,
			showLinkIconInDescription,
			preferMobileLink,
		} = params;

		let retweeted = '';
		// 长文章的处理
		let htmlNewLineUnreplaced = (status.longText && status.longText.longTextContent) || status.text || '';
		// 表情图标转换为文字
		if (!showEmojiInDescription) {
			htmlNewLineUnreplaced = htmlNewLineUnreplaced.replace(
				/<span class=["']?url-icon["']?><img\s[^>]*?alt=["']?([^>]+?)["']?\s[^>]*?\/><\/span>/g,
				'$1',
			);
		}
		// 去掉链接的图标，保留 a 标签链接
		if (!showLinkIconInDescription) {
			htmlNewLineUnreplaced = htmlNewLineUnreplaced.replace(
				/(<a\s[^>]*>)<span class=["']?url-icon["']?><img\s[^>]*><\/span>[^<>]*?<span class=["']?surl-text["']?>([^<>]*?)<\/span><\/a>/g,
				'$1$2</a>',
			);
		}
		// 去掉乱七八糟的图标  // 不需要，上述的替换应该已经把所有的图标都替换掉了，且这条 regex 会破坏上述替换不发生时的输出
		// htmlNewLineUnreplaced = htmlNewLineUnreplaced.replace(/<span class=["']?url-icon["']?>(<img\s[^>]*?>)<\/span>/g, '');
		// 将行内图标的高度设置为一行，改善阅读体验。但有些阅读器删除了 style 属性，无法生效  // 不需要，微博已经作此设置
		// htmlNewLineUnreplaced = htmlNewLineUnreplaced.replace(/(?<=<span class=["']?url-icon["']?>)<img/g, '<img style="height: 1em"');
		// 去掉全文
		htmlNewLineUnreplaced = htmlNewLineUnreplaced.replace(/全文<br>/g, '<br>');
		htmlNewLineUnreplaced = htmlNewLineUnreplaced.replace(/<a href="(.*?)">全文<\/a>/g, '');

		// 处理外部链接
		htmlNewLineUnreplaced = htmlNewLineUnreplaced.replace(/https:\/\/weibo\.cn\/sinaurl\/.*?&u=(http.*?")/g, (match, p1) =>
			decodeURIComponent(p1),
		);

		const category = htmlNewLineUnreplaced
			.match(/<span class=["']?surl-text["']?>#([^<>]*?)#<\/span>/g)
			?.map((item) => item.match(/#([^#]+)#/)?.[1])
			.filter(Boolean)
			.join(', ');

		let html = htmlNewLineUnreplaced.replace(/\n/g, '<br>');

		// 添加用户名和头像
		if (showAuthorInDesc) {
			let usernameAndAvatar = `<a href="https://weibo.com/${status.user.id}" target="_blank">`;
			if (showAuthorAvatarInDesc) {
				usernameAndAvatar += `<img width="${sizeOfAuthorAvatar}" height="${sizeOfAuthorAvatar}" src="${status.user.profile_image_url}" ${
					readable ? 'hspace="8" vspace="8" align="left"' : ''
				} />`;
			}
			let name = status.user.screen_name;
			if (showAtBeforeAuthor) {
				name = '@' + name;
			}
			if (authorNameBold) {
				usernameAndAvatar += `<strong>${name}</strong></a>:&ensp;`;
			} else {
				usernameAndAvatar += `${name}</a>:&ensp;`;
			}
			html = usernameAndAvatar + html;
		}

		// status.pics can be either an array or an object:
		// array: [ object, object, ... ]
		// object: { '0': object, '1': object, ... }  // REALLY AMAZING data structure
		if (status.pics && !Array.isArray(status.pics) && typeof status.pics === 'object') {
			status.pics = Object.values(status.pics);
		}

		// 添加文章头图，此处不需要回落到被转发的微博，后续处理被转发的微博时，还会执行到这里
		if (status.page_info && status.page_info.type === 'article' && status.page_info.page_pic && status.page_info.page_pic.url) {
			// 如果以后后续流程会用到其他字段，记得修改这里
			const pagePic = {
				large: {
					url: status.page_info.page_pic.url,
				},
			};
			// 文章微博一般不会有配图，但也有可能有：https://weibo.com/6882481489/Lh85BkS3m
			if (status.pics) {
				status.pics.push(pagePic);
			} else {
				status.pics = [pagePic];
			}
		}

		const livePhotoTypes = ['livephoto', 'livephotos'];
		const livePhotoCount = status.pics ? status.pics.filter((pic) => livePhotoTypes.includes(pic.type)).length : 0;
		const pics = status.pics;

		// 添加微博配图
		if (pics) {
			if (readable) {
				html += '<br clear="both" /><div style="clear: both"></div>';
			}

			// 一些 RSS Reader 会识别所有<img>标签作为内含图片显示，我们不想要头像也作为内含图片之一
			// 让所有配图在 description 的最前面再次出现一次，但宽高设为 0
			let picsPrefix = '';
			pics.forEach((item) => {
				const imageUrl = (item.large && item.large.url) || item.url;
				if (imageUrl) {
					picsPrefix += `<img width="0" height="0" hidden="true" src="${imageUrl}">`;
				}
			});
			picsPrefixes.push(picsPrefix);

			pics.forEach((item) => {
				const isLivePhoto = livePhotoTypes.includes(item.type);
				const imageUrl = (item.large && item.large.url) || item.url;
				const renderImage = () => {
					if (addLinkForPics) {
						html += '<a href="' + imageUrl + '">';
					}

					let style = '';
					html += '<img ';
					html += readable ? 'vspace="8" hspace="4"' : '';
					const imageWidth = (item.large && item.large.geo && item.large.geo.width) || widthOfPics;
					const imageHeight = (item.large && item.large.geo && item.large.geo.height) || heightOfPics;
					if (imageWidth >= 0) {
						html += ` width="${imageWidth}"`;
						style += `width: ${imageWidth}px;`;
					}
					if (imageHeight >= 0) {
						html += ` height="${imageHeight}"`;
						style += `height: ${imageHeight}px;`;
					}
					html += ` style="${style}"` + ' src="' + imageUrl + '">';

					if (addLinkForPics) {
						html += '</a>';
					}
				};

				if (isLivePhoto) {
					if (item.videoSrc) {
						let video = `<video controls="controls" poster="${imageUrl || ''}"`;
						video += ` src="${item.videoSrc}"`;
						video += ' style="width: 100%">';
						video += `<p>Live Photo 无法显示，请打开<a href="${item.videoSrc}" target="_blank" rel="noopener noreferrer">视频链接</a>观看。</p>`;
						video += '</video>';
						html += video;
					} else if (imageUrl) {
						renderImage();
					}
					if (!item.videoSrc) {
						const livePhotoUrl = imageUrl || item.url;
						html += '<br><small>Live Photo';
						if (livePhotoUrl) {
							html += `：<a href="${livePhotoUrl}" target="_blank" rel="noopener noreferrer">${livePhotoUrl}</a>`;
						}
						html += '</small>';
					}

					if (!readable) {
						html += '<br><br>';
					}

					return;
				}

				renderImage();

				if (!readable) {
					html += '<br><br>';
				}

				htmlNewLineUnreplaced += '<img src="" />';
			});
		}

		// 处理转发的微博
		if (status.retweeted_status) {
			if (readable) {
				html += `<br clear="both" /><div style="clear: both"></div><blockquote style="background: #80808010;border-top:1px solid #80808030;border-bottom:1px solid #80808030;margin:0;padding:5px 20px;">`;
			} else {
				html += `<br><blockquote> - 转发 `;
			}
			if (!status.retweeted_status.user) {
				// 当转发的微博被删除时 user 为 null
				status.retweeted_status.user = {
					profile_image_url: '',
					screen_name: '[原微博不可访问]',
					id: 'sorry',
				};
			}
			// 插入转发的微博
			const retweetedParams = Object.assign({}, params);
			retweetedParams.showAuthorInDesc = true;
			retweetedParams.showAuthorAvatarInDesc = false;
			retweetedParams.showAtBeforeAuthor = true;
			retweeted += weiboUtils.formatExtended(ctx, status.retweeted_status, undefined, retweetedParams, picsPrefixes).description;

			html += retweeted;

			if (readable) {
				html += `<br><small>原博：<a href="https://weibo.com/${status.retweeted_status.user.id}/${status.retweeted_status.bid}" target="_blank" rel="noopener noreferrer">https://weibo.com/${status.retweeted_status.user.id}/${status.retweeted_status.bid}</a></small>`;
			}
			if (showTimestampInDescription) {
				html += `<br><small>` + new Date(status.retweeted_status.created_at).toLocaleString() + `</small>`;
			}
			if (readable) {
				html += `<br clear="both" /><div style="clear: both"></div>`;
			}

			html += '</blockquote>';
		}

		if (showAuthorInDesc && showAuthorAvatarInDesc) {
			html = picsPrefixes.join('') + html;
		}

		let title = '';
		if (showAuthorInTitle) {
			title += status.user.screen_name + ': ';
		}
		if (!status.retweeted_status || showRetweetTextInTitle) {
			title += weiboUtils.formatTitle(htmlNewLineUnreplaced);
		}
		if (status.retweeted_status) {
			title += showEmojiForRetweet ? '🔁 ' : ' - 转发 ';
			title += weiboUtils.formatTitle(retweeted);
		}
		if (livePhotoCount > 0) {
			title += ' ';
			title += new Array(livePhotoCount + 1).join('[Live Photo]');
		}
		if (status.page_info && status.page_info === 'video') {
			title += ' [视频]';
		}

		uid = uid || status.user?.id;
		const bid = status.bid || status.id;
		const guid = uid ? `https://weibo.com/${uid}/${bid}` : `https://m.weibo.cn/status/${bid}`;
		const link = preferMobileLink ? `https://m.weibo.cn/status/${bid}` : guid;

		const author = status.user?.screen_name;
		const pubDate = status.created_at;

		return { description: html, title, link, guid, author, pubDate, category };
	},
	getShowData: async (ctx, uid, bid) => {
		const link = `https://m.weibo.cn/statuses/show?id=${bid}`;
		const itemResponse = await fetch(link, {
			headers: {
				Referer: `https://m.weibo.cn/u/${uid}`,
				Cookie: ctx.env.WEIBO_COOKIE || '',
				...weiboUtils.apiHeaders,
			},
		}).then((res) => res.json());
		return itemResponse.data.data;
	},
	formatVideo: (itemDesc, status) => {
		const pageInfo = status.page_info;
		let video = '<br clear="both" /><div style="clear: both"></div>';
		let anyVideo = false;
		if (pageInfo && pageInfo.type === 'video') {
			const pagePic = pageInfo.page_pic;
			const posterUrl = pagePic ? pagePic.url : '';
			const pageUrl = pageInfo.page_url; // video page url
			const mediaInfo = pageInfo.media_info || {}; // stream_url, stream_url_hd; deprecated: mp4_720p_mp4, mp4_hd_url, mp4_sd_url
			const urls = pageInfo.urls || {}; // mp4_720p_mp4, mp4_hd_mp4, hevc_mp4_hd, mp4_ld_mp4

			const video720p = urls.mp4_720p_mp4 || mediaInfo.mp4_720p_mp4 || '';
			const videoHd = urls.mp4_hd_mp4 || mediaInfo.mp4_hd_url || mediaInfo.stream_url_hd || '';
			const videoHdHevc = urls.hevc_mp4_hd || '';
			const videoLd = urls.mp4_ld_mp4 || mediaInfo.mp4_sd_url || mediaInfo.stream_url || '';

			const hasVideo = video720p || videoHd || videoHdHevc || videoLd;

			if (hasVideo) {
				video += `<video controls="controls" poster="${posterUrl}" style="width: 100%">`;
				if (video720p) {
					video += `<source src="${video720p}">`;
				}
				if (videoHd) {
					video += `<source src="${videoHd}">`;
				}
				if (videoHdHevc) {
					video += `<source src="${videoHdHevc}">`;
				}
				if (videoLd) {
					video += `<source src="${videoLd}">`;
				}
				if (pageUrl) {
					video += `<p>视频无法显示，请前往<a href="${pageUrl}" target="_blank" rel="noopener noreferrer">微博视频</a>观看。</p>`;
				}
				video += '</video>';
				anyVideo = true;
			}
		}
		if (anyVideo) {
			itemDesc += video;
		}
		return itemDesc;
	},
	formatArticle: async (ctx, itemDesc, status) => {
		const pageInfo = status.page_info;
		if (pageInfo && pageInfo.type === 'article' && pageInfo.page_url) {
			const pageUrl = pageInfo.page_url;
			const articleIdMatch = pageUrl.match(/id=(\d+)/);
			if (!articleIdMatch) {
				return itemDesc;
			}
			const articleId = articleIdMatch[1];
			const link = `https://card.weibo.com/article/m/aj/detail?id=${articleId}`;
			const response = await fetch(link, {
				headers: {
					Referer: `https://card.weibo.com/article/m/show/id/${articleId}`,
					Cookie: ctx.env.WEIBO_COOKIE || '',
					...weiboUtils.apiHeaders,
				},
			})
				.then((res) => res.json())
				.then((res) => res.data);
			const article = response.data;
			if (article && article.title && article.content) {
				const title = article.title;
				const content = article.content;
				const summary = article.summary;
				const createAt = article.create_at;
				const readCount = article.read_count;
				const isOriginal = article.is_original;
				const isArticleNonFree = article.is_article_free; // 微博起错了字段名，它为 1 时才是收费文章

				// 许多微博文章都给文字设置了白色背景，这里也只好使用白色背景了
				let html = '<br clear="both" /><br clear="both" />';
				html +=
					'<div style="clear: both"></div><div style="background: #fff;border:5px solid #80808030;margin:0;padding:3% 5%;overflow-wrap: break-word">';

				html += `<h1 style="font-size: 1.5rem;line-height: 1.25;color: #333;">${title}</h1>`; // 加入标题

				// 加入文章信息
				const iconStyle =
					'display: inline-block;margin-inline: 0.25rem;width: 2.25rem; height: 1.125rem; background: #eee; border-radius: 2px; box-sizing: border-box; text-align: center; line-height: 1.0625rem; font-size: 0.75rem; color: #aaa;';
				let articleMeta = '<p style="line-height: 1.66; color: #999;margin: 0 0 0.75rem;font-size: 0.75rem;padding: 0">';
				if (isArticleNonFree) {
					articleMeta += `<span style="${iconStyle}">试读</span> `;
				}
				if (isOriginal) {
					articleMeta += `<span style="${iconStyle}">原创</span> `;
				}
				articleMeta += `<span style="margin-inline: 0.25rem;">发布时间：${createAt}</span> `; // 发布时间
				articleMeta += `<span style="margin-inline: 0.25rem;">阅读量：${readCount}</span> `; // 阅读量
				articleMeta += '</p>';
				html += articleMeta;

				if (summary) {
					html += `<p style="color: #999;line-height: 1.5rem;padding: 0.0625rem 0 0.875rem;margin: 0">${summary}</p>`; // 摘要
				}

				html += '<div style="height: 0;border-bottom: 1px dashed #999;margin-bottom: 0.75rem;"></div>'; // 分割线

				// 正文处理，加入一些在微博文章页的 CSS 中定义的不可或缺的样式
				const rewriter = new HTMLRewriter();
				rewriter
					.on('p', {
						element: (elem) => {
							elem.setAttribute('style', 'margin: 0;padding: 0;border: 0;');
						},
					})
					.on('.image', {
						element: (elem) => {
							elem.setAttribute(
								'style',
								'display: table;text-align: center;margin-left: auto;margin-right: auto;clear: both;min-width: 50px;',
							);
						},
					})
					.on('img', {
						element: (elem) => {
							elem.setAttribute('style', 'display: block;max-width: 100%;margin-left: auto;margin-right: auto;min-width: 50px;');
						},
					});
				const contentHtml = await rewriter.transform(content).text();
				html += `<div style="line-height: 1.59;text-align: justify;font-size: 1.0625rem;color: #333;">${contentHtml}</div>`; // 正文

				html += '</div>';
				itemDesc += html;
			}
		}
		return itemDesc;
	},
	formatComments: async (ctx, itemDesc, status) => {
		if (status && status.comments_count && status.id && status.mid) {
			const id = status.id;
			const mid = status.mid;
			const link = `https://m.weibo.cn/comments/hotflow?id=${id}&mid=${mid}&max_id_type=0`;
			const response = await fetch(link, {
				headers: {
					Referer: `https://m.weibo.cn/detail/${id}`,
					Cookie: ctx.env.WEIBO_COOKIE || '',
					...weiboUtils.apiHeaders,
				},
			})
				.then((res) => res.json())
				.then((res) => res.data);
			if (response.data && response.data.data) {
				const comments = response.data.data;
				itemDesc += `<br clear="both" /><div style="clear: both"></div><div style="background: #80808010;border-top:1px solid #80808030;border-bottom:1px solid #80808030;margin:0;padding:5px 20px;">`;
				itemDesc += '<h3>热门评论</h3>';
				comments.forEach((comment) => {
					itemDesc += '<p style="margin-bottom: 0.5em;margin-top: 0.5em">';
					itemDesc += `<a href="https://weibo.com/${comment.user.id}" target="_blank">${comment.user.screen_name}</a>: ${comment.text}`;
					if (comment.comments) {
						itemDesc +=
							'<blockquote style="border-left:0.2em solid #80808080; margin-left: 0.3em; padding-left: 0.5em; margin-bottom: 0.5em; margin-top: 0.25em">';
						comment.comments.forEach((comment) => {
							itemDesc += '<div style="font-size: 0.9em">';
							itemDesc += `<a href="https://weibo.com/${comment.user.id}" target="_blank">${comment.user.screen_name}</a>: ${comment.text}`;
							itemDesc += '</div>';
						});
						itemDesc += '</blockquote>';
					}
					itemDesc += '</p>';
				});
				itemDesc += '</div>';
			}
		}
		return itemDesc;
	},
	sinaimgTvax: (() => {
		// https://datatracker.ietf.org/doc/html/rfc1808#section-2.4.3
		const regex = /(?<=\/\/)wx(?=[1-4]\.sinaimg\.cn\/)/gi;
		// const prefixes = ['tva', 'tvax'];
		// let cnt = 0;
		// const replace = (html) => {
		//     cnt = (cnt + 1) % 2;
		//     return html.replace(regex, prefixes[cnt]);
		// };
		const replace = (html) => html.replace(regex, 'tvax'); // enforce `tvax` as `tva` has a strict WAF
		const replaceKV = (obj, keys) => {
			keys.forEach((key) => {
				if (obj[key]) {
					obj[key] = replace(obj[key]);
				}
			});
		};
		const dataKeys = ['description', 'image'];
		const itemKeys = ['description'];
		return (data) => {
			if (data) {
				replaceKV(data, dataKeys);
				if (data.item) {
					data.item.forEach((item) => {
						replaceKV(item, itemKeys);
					});
				}
			}
			return data;
		};
	})(),
};

module.exports = weiboUtils;
