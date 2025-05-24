export const Hero = async ({ image, fullheight, title, description = "" }) => (
`<div class="Hero"
${image ? `style="background-image: url(${await image})"` : ""}>
<div class="colorOverlay">
<div class="info ${fullheight ? "fullheight" : ""}">
<h1>${title}</h1>
${description}
</div>
</div>
</div>`
);
