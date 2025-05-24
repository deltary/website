import { Document } from './document.js';

export const Page = (page, navItems) => Document({
	...page,
	link: page.link.join("/") + ".html",
	navigation: navItems,
	main: { className: "Page Content" },
});
