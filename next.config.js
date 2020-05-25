const webpack = require('webpack');

const assetPrefix = {
  'dev': '',
  'test': '/website',
  'staging': '/new',
  'production': ''
}[process.env.NODE_ENV];

module.exports = {
  assetPrefix: assetPrefix,
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.ASSET_PREFIX': JSON.stringify(assetPrefix)
      })
    );

    return config;
  },
  env: {
    WP_API_URL: process.env.WP_API_URL
  }
};