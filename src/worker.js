import { Hono } from 'hono';
import { basicAuth } from 'hono/basic-auth';
import { cors } from 'hono/cors';
import indexHtml from './index.html';
import robotsTxt from './robots.txt';

import route from './route';

const app = new Hono();

app.route('/rss', route);
app.get('/', (ctx) => {
	return ctx.html(indexHtml);
});
app.get('robots.txt', (ctx) => {
	return ctx.text(robotsTxt);
});
app.get('/debug', (ctx) => {
	return ctx.json(ctx.req.raw?.cf);
});
// app.use(
// 	'/*',
// 	basicAuth({
// 		username: 'user',
// 		password: 'password',
// 	})
// );
app.use('/*', cors());

export default app;
