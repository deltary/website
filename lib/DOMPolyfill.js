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


export class Node {
	constructor(tag) {
		this.tag = tag;
		this.children = [];
	}
	createElement(tag) {
		return new Node(tag)
	}
	createTextNode(content) {
		return { outerHTML: content };
	}
	appendChild(node) {
		this.children.push(node);
		return node;
	}
	replaceWith(node) {
		return Object.assign(this, node);
	}
	get outerHTML() {
		return `<${this.tag +
				(this.id ? ` id="${this.id}"` : "") +
				(this.title ? ` title="${this.title}"` : "") +
				(this.className ? ` class="${this.className}"` : "") +
				(this.href ? ` href="${this.href}"` : "")
			}>` +
			this.children.map((node) => node.outerHTML).join("") +
			`</${this.tag}>`
	}
}
