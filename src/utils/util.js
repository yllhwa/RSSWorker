import atomTemplate from '../templates/atom.txt';
import rss2Template from '../templates/rss2.txt';

import mustache from 'mustache';

let renderAtom = (content) => {
	let renderedText = mustache.render(atomTemplate, content);
	return renderedText;
};

let renderRss2 = (content) => {
	let renderedText = mustache.render(rss2Template, content);
	return renderedText;
};

export { renderAtom, renderRss2 };
