import { Hono } from 'hono';

const route = new Hono();

let getDealFunc = (module) => {
	return module.deal;
};

route.get('/bilibili/user/dynamic/:uid', getDealFunc(await import('./lib/bilibili/user/dynamic')));
// route.get('/bilibili/test', getDealFunc(await import('./lib/bilibili/user/test_grpc')));
route.get('/telegram/channel/:username', getDealFunc(await import('./lib/telegram/channel')));
route.get('/test/:username', getDealFunc(await import('./lib/tests/HTMLRewriterTest')));

export default route;
