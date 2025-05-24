import { Brand } from '../brand/brand.js';

export const Navigation = (items = {}) => (
`<nav id="nav">
${Brand({ invertColors: true })}
<div class="Menu">
${(items || []).map((category) => (
`<div class="Menu__category">
<h3>${category.title}</h3>
<ul class="Menu__contents">
${category.items.map((subItem) => (
`<li class="Menu__site"><a href="${subItem.link}">${subItem.title}</a></li>`
)).join("")}
</ul>
</div>`
)).join("\n")}
</div>
</nav>`
);
