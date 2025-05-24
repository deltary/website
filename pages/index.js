import { getUpComingEvents } from '../lib/calendarUtils.js'
import { Document } from './document.js';
import { Node } from '../lib/DOMPolyfill.js';
import { renderCalendar } from '../components/calendar/calendar.js';

// TODO: fetch dynamically from a WP custom field
const description =
  "Delta ry on Turun yliopiston matemaattisten ja fysikaalisten tieteiden opiskelijoiden yhdistys.";

export const FrontPage = (page, navItems) => getUpComingEvents().then((events) => Document({
	...page,
	link: "index.html",
	title: "Etusivu",
	navigation: navItems,
	hero: { ...page.hero, title: page.title, description, fullheight: true },
	main: { className: "FrontPage" },
	footer: { invertColors: true, sponsors: true },
	script: (
`import { calendarBuilder } from './components/calendar/calendar.js';
window.onload = calendarBuilder();`
	),
	content: (
`<div class="info">
${page.content}
</div>
${renderCalendar(events, new Node()).outerHTML}`
),
}));
