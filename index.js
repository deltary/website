/*
 * Copyright (c) 2025 Tuomas Ahola <taahol@utu.fi>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

import { getJSON } from './lib/miscUtils.js';
import { getPages, getNavigationItems } from './lib/wordpress.js';
import { Page } from './pages/page.js';
import { FrontPage } from './pages/index.js';
import { CalendarPage } from './pages/tapahtumakalenteri.js';
import { NoSuchPage } from './pages/404.js';
import { readdir, mkdir, writeFile } from 'fs';
import { cp } from './lib/fsUtils.js';
import  path from 'path';

const WP_API_URL = ""; /* redacted */

Array('pages', 'components', 'lib').forEach((path) => {
	cp(path, `./public/${path}`, (file) => (err) => {
		if (err) throw err;
		// console.log(`Wrote ${file}`);
	});
});

Promise.all([
	{ path: "wp/v2/pages?per_page=100", then: getPages },
	{ path: "menus/v1/menus/valikko-1", then: getNavigationItems },
].map(({ path, then }) => getJSON(WP_API_URL + path).then(then))
).then(([ pages, navItems ]) => Array(
	...pages.map((page) => (page.link.length ? Page : FrontPage)(page, navItems)),
	CalendarPage(navItems),
	NoSuchPage(navItems),
).forEach(async (page) => {
	const { link, content } = await page;
	mkdir(path.dirname(`./public/${link}`), { recursive: true }, (err) => {
		if (err) throw err;
		writeFile(`./public/${link}`, content, (err) => {
			if (err) throw err;
			// console.log(`Wrote ./public/${link}`);
		});
	});
}));
