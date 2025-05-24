import { Document } from './document.js';
import { renderCalendar } from '../components/google-calendar/google-calendar.js';
import { getCalendarEventsByDay } from '../lib/calendarUtils.js';
import { Node } from '../lib/DOMPolyfill.js';

export const CalendarPage = (navItems) => getCalendarEventsByDay().then((events) => Document({
	link: "tapahtumakalenteri.html",
	title: "Tapahtumakalenteri",
	script: (
`import { calendarBuilder } from './components/google-calendar/google-calendar.js';
window.onload = calendarBuilder();`
	),
	navigation: navItems,
	main: { className: "Page" },
	content: renderCalendar(events, new Date(), new Node()).outerHTML,
}));
