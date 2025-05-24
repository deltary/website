import { Page } from './page.js';

export const NoSuchPage = (navItems) => Page({
	link: ["404"],
	title: "404",
	content: (
`<h1>Sivu kadoksissa</h1>
<p>
Etsimääsi sivua ei löytynyt. <a href="/">Palaa etusivulle</a>
tai <a href="#nav">tutkaile sivukarttaa</a>.
</p>`
)}, navItems);
