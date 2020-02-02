const withSass = require('@zeit/next-sass');
const fetch = require('node-fetch');
const webpack = require('webpack');

const assetPrefix = {
  'dev': '',
  'test': '/website',
  'staging': '/new',
  'production': ''
}[process.env.NODE_ENV];

module.exports = withSass({
  exportPathMap: async () => {
    // fetch list of pages
    const response = await fetch(process.env.WP_API_URL + 'wp/v2/pages?per_page=100')
      .then(res => res.json());
    const pathMap = response
      .reduce(
        (pages, { link }) => {
          const re = new RegExp('([a-zA-Z0-9_-]*)/([a-zA-Z0-9_-]*).$');
          const [match, category, page] = re.exec(link);
          
          const isTopLevel = category === 'fi';

          const route = isTopLevel
            ? '/' + page
            : `/${category}/${page}`;

          template = isTopLevel
            ? '/[category]'
            : '/[category]/[page]'
          
          return {
            ...pages,
            [route]: { page: template }
          }
        }, 
        { '/': { page: '/' }
      });

    console.log('Generated routes:')
    console.log(pathMap);
    return pathMap;
  },
  assetPrefix: assetPrefix,
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.ASSET_PREFIX': JSON.stringify(assetPrefix)
      })
    );

    return config;
  }
});