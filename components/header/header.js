import { Brand } from '../brand/brand.js';
import { Navigation } from './navigation.js';
import { Hero } from '../hero/hero.js';

export const Header = (props) => (
`<header>
${Brand(props)}
<div class="NavigationButton">
<a href="#nav" id="nav-icon-open"></a>
<a href="#" id="nav-icon-close"></a>
<span></span>
<span></span>
<span></span>
<span></span>
</div>
${Navigation(props.navigation)}
</header>`
);
