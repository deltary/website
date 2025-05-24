import { Head } from '../components/head/head.js';
import { Header } from '../components/header/header.js';
import { Hero } from '../components/hero/hero.js';
import { Footer } from '../components/footer/footer.js';

export const Document = async (props) => ({
	link: props.link,
	content: (
`<!DOCTYPE html>
<html lang="fi">
${Head(props)}
<body>
${Header(props)}
${await Hero({ title: props.title, ...props.hero })}
<main class="${props.main.className}">
${props.content}
</main>
${Footer(props.footer)}
</body>
</html>
`)
});
