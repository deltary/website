export const Head = ({ title, script }) => {
  return (
`<head itemscope itemtype="https://schema.org/WebPage">
<meta charset="utf-8">
<title>${title ? title + " | Delta ry" : "Delta ry"}</title>
<link rel="stylesheet" href="/styles.css">
<meta name="description" content="Turun yliopiston matemaattisten ja fysikaalisten tieteiden opiskelijoiden yhdistys Delta ry">
<meta itemprop="description" content="Turun yliopiston matemaattisten ja fysikaalisten tieteiden opiskelijoiden yhdistys Delta ry">
<meta itemprop="image" content="/deltautufi_banner.jpg">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#4b1581">
${script ? (
`<script async type="module">
${script}
</script>`
) : ""}
</head>`
)}
