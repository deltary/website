const assetPrefix = process.env.ASSET_PREFIX;

const asLink = link => `${assetPrefix}${link}`;

export { asLink };