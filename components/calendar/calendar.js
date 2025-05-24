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

import { getUpComingEvents } from '../../lib/calendarUtils.js';

export const renderCalendar = (events, document=window.document) => {
	const wrapper = document.createElement("div");
	const heading = document.createElement("h2");
	const calendarEvents = document.createElement("dl");
	const calendarLink = document.createElement("a");
	heading.appendChild(document.createTextNode("Tapahtumat"));
	wrapper.appendChild(heading);
	if (events.length) {
		events.forEach((event) => {
			const formatter = new Intl.DateTimeFormat("fi-FI", {
				weekday: "long",
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
				...(!event.allDay && {
					hour: "2-digit",
					minute: "2-digit",
				}),
				timeZone: "Europe/Helsinki",
			});
			const eventTitle = document.createElement("dt");
			const eventTime = document.createElement("dd");
			eventTitle.appendChild(document.createTextNode(event.title));
			calendarEvents.appendChild(eventTitle);
			eventTime.appendChild(document.createTextNode(
				formatter.formatRange(new Date(event.start), new Date(event.end))
			));
			calendarEvents.appendChild(eventTime);
			if (event.location) {
				const eventLocation = document.createElement("dd");
				eventLocation.appendChild(document.createTextNode(event.location));
				calendarEvents.appendChild(eventLocation);
			}
		});
		wrapper.appendChild(calendarEvents);
	} else {
		const noEvents = document.createElement("p");
		noEvents.appendChild(document.createTextNode("Ei tulevia tapahtumia"));
		wrapper.appendChild(noEvents);
	}
	calendarLink.appendChild(document.createTextNode("Linkki kalenteriin"));
	calendarLink.href = "/tapahtumakalenteri";
	wrapper.appendChild(calendarLink);
	wrapper.className = "Calendar";
	return wrapper;
}

export const calendarBuilder = (
	element = document.getElementsByClassName("Calendar")[0],
	events = getUpComingEvents(),
) => async () => {
	element.replaceWith(renderCalendar(await events));
}
