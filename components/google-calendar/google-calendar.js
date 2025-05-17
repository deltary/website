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

import { addDays, addMonths, startOfDay, calendarPageRange } from '../../lib/dateUtils.js';
import { getCalendarEventsByDay } from '../../lib/calendarUtils.js';

const calendarPage = (date) => {
	const pageRange = calendarPageRange(date);
	const page = [];
	for (var i=0, tmp=[], day=new Date(pageRange[0]); day<=pageRange[1]; addDays(day, 1)) {
		tmp.push(new Date(day));
		if (++i % 7 == 0) {
			page.push(Array(...tmp));
			tmp.length=0;
		}
	}
	return page;
}

export const renderCalendar = (events, date=new Date(), document=window.document) => {
	const page = calendarPage(new Date(date));
	const wrapper = document.createElement("div");
	const table = document.createElement("table");
	const caption = document.createElement("caption");
	const tableHeader = document.createElement("tr");
	caption.appendChild(document.createTextNode(new Intl.DateTimeFormat("fi-FI", {
		month: "long",
		year: "numeric",
	}).format(date)));
	table.appendChild(caption);
	Array("ma", "ti", "ke", "to", "pe", "la", "su").forEach((day) => {
		const th = document.createElement("th");
		th.appendChild(document.createTextNode(day));
		tableHeader.appendChild(th);
	});
	table.appendChild(tableHeader);
	page.forEach((week) => {
		const row = document.createElement("tr");
		week.forEach((day) => {
			const cell = document.createElement("td");
			cell.id = day.toJSON();
			cell.appendChild(document.createTextNode(day.getDate()));
			(events[cell.id] || []).forEach((event) => {
				const entry = document.createElement("div");
				entry.title = Intl.DateTimeFormat("fi-FI", {
					dateStyle: "short",
					...(!event.allDay && {
						timeStyle: "short"
					}),
					timeZone: "Europe/Helsinki",
				}).formatRange(new Date(event.start), new Date(event.end));

				entry.appendChild(document.createTextNode(event.title));
				cell.appendChild(entry);
			});
			row.appendChild(cell);
		});
		table.appendChild(row);
	});
	if (typeof window !== 'undefined') {
		renderButtons(events, date, wrapper, document).forEach(button => {
			wrapper.appendChild(button);
		});
	}
	wrapper.appendChild(table);
	wrapper.id = "calendar";
	return wrapper;
}

const renderButtons = (events, date, element, document) => Array(
	{ label: "Edellinen kuukausi", add: -1 },
	{ label: "Seuraava kuukausi", add: 1 }
).map(b => {
	const button = document.createElement("button");
	button.appendChild(document.createTextNode(b.label));
	button.onclick = calendarBuilder(addMonths(new Date(date), b.add), element);
	return button;
});

export const calendarBuilder = (
	date = new Date(),
	element = document.getElementById("calendar"),
	events = getCalendarEventsByDay(date),
) => async () => {
	element.replaceWith(renderCalendar(await events, date));
	setBgColor(document.getElementById(startOfDay(new Date()).toJSON()),
		"var(--color-pink)");
}

const setBgColor = (element, color) => {
	if (element)
		element.style.backgroundColor = color;
}
