# RSSWorker

RSSWorker 是一个轻量级的 RSS 订阅工具，可以部署在 Cloudflare Worker 上。

## 支持

注：以下路由均在 `[域名]/rss/` 下，如 `https://example.com/rss/bilibili/user/dynamic/1`。

- bilibili 动态 (/bilibili/user/dynamic/:uid)
- bilibili 视频 (/bilibili/user/video/:uid)
- telegram 频道 (/telegram/channel/:username)
- weibo 用户 (/weibo/user/:uid)
- 小红书用户 (/xiaohongshu/user/:uid)

> 小红书更新后不能再使用小红书号，需要使用小红书用户ID。  
> 获取方法：  
> 移动端：用户页面 > 右上角三个点 > 复制链接 > 获取链接中的用户ID  
> 网页端：用户页面 > 链接中的用户ID  
> 格式：https://www.xiaohongshu.com/user/profile/5d2aec020000000012037401

## 部署

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/yllhwa/RSSWorker)

## 开发

在 `src/lib/[网站名称]/[功能]` 参照已有的 demo 添加脚本，然后在 `src/route.js` 中添加插件即可。

注意事项：
1. Cloudflare Worker 有最大打包体积限制（免费用户 1 MB，付费用户 10 MB），所以插件需要尽量轻量化。如使用 fetch 进行请求、使用 Cloudflare Worker 提供的 HTMLRewriter 进行 HTML 解析等。

模板引擎使用的格式为：

```js
let items = [
	{
		title: 'Bilibili User Dynamic',
		link: `https://space.bilibili.com/${uid}/dynamic`,
		description: 'Bilibili User Dynamic233',
		pubDate: new Date().toUTCString(),
		guid: `https://space.bilibili.com/${uid}/dynamic`,
		author: 'bilibili@bilibili.com',
		category: 'video',
		comments: `https://space.bilibili.com/${uid}/dynamic`,
		enclosure: {
			url: 'https://www.bilibili.com/favicon.ico',
			type: 'image/x-icon',
			length: 0,
		},
		source: {
			title: 'Bilibili',
			url: 'https://www.bilibili.com',
		},
	},
];
let data = {
    title: `bilibili 动态`,
    link: `https://space.bilibili.com/${uid}/dynamic`,
    description: `${globalUsername} 的 bilibili 动态`,
    language: 'zh-cn',
    category: 'bilibili',
    items: items,
};
```

## 致谢

- [RSSHub](https://github.com/DIYgod/RSSHub) 灵感和部分代码来源

- [NodeSupport](https://github.com/NodeSeekDev/NodeSupport)赞助了本项目

[![image](https://img.imgdd.com/a3ae28fb-ec40-451b-9470-b14aa6dc034a.png)](https://yxvm.com/)
