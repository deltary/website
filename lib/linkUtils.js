const assetPrefix = process.env.ASSET_PREFIX;

const asLink = link => `${assetPrefix}${link}`;

const asPageLink = link => assetPrefix === '/new'
  ? `${assetPrefix}${link}.html`
  : `${assetPrefix}${link}`;

export { asLink, asPageLink };