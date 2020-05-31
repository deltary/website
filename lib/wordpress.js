import fetch from 'node-fetch';
import * as R from 'ramda';

const apiUrl = process.env.WP_API_URL;

const getNavigationItems = async () => {
  // FIXME: this really shouldn't be hardcoded
  const res = await fetch(apiUrl + 'menus/v1/menus/valikko-1');
  
  if (res.status !== 200) {
    throw 'Api call failed';
  }

  const navigation = await res.json();

  const formatNavItems = (items, slugStart = "") => {
    return items.map(item => {
      const link = item.slug
        ? `${slugStart}/${item.slug}`
        : '/' + item.post_name; // this sucks

      return {
        title: item.title,
        link: link,
        items: (item.child_items) ? formatNavItems(item.child_items, link) : []
      }
    });
  }

  return formatNavItems(navigation.items);
}

const getPaths = async () => {
  // fetch list of pages
  const res = await fetch(apiUrl + 'wp/v2/pages?per_page=100');

  if (res.status !== 200) {
    throw 'Api call failed';
  }

  const pages = await res.json();

  const paths = pages
    .filter(page => !page.link.endsWith('.fi/')) // TODO: find a better way to filter out index page
    .map(({ link }) => {
      const re = new RegExp('(\/([a-zA-Z0-9_-]*))*$');
      const [match, ...rest] = re.exec(link);
      const page = match.split('/')
        .filter(partition => partition !== '');

      return { params: { page } }
  });
 
  return paths;
}

const getPage = async (slug) => {
  const res = await fetch(apiUrl + 'wp/v2/pages?per_page=100');

  if (res.status !== 200) {
    throw 'Api call failed';
  }

  const pages = await res.json();

  // this has a possibility for collisions.
  // for example, if slug is 'bar' it can match 'foo/bar'.
  const matchedPage = pages.find(page => page.link.includes(slug));
  
  return {
    title: matchedPage.title.rendered,
    content: matchedPage.content.rendered,
    modified: matchedPage.modified
  }
}

const getIndexPage = async () => {
  const res = await fetch(apiUrl + 'wp/v2/pages?per_page=100');

  if (res.status !== 200) {
    throw 'Api call failed';
  }

  const pages = await res.json();

  // TODO: find a better way to find index page
  const matchedPage = pages.find(page => page.link.endsWith('.fi/'));

  const heroImage = await getHeroImage(matchedPage);
  
  return {
    title: matchedPage.title.rendered,
    content: matchedPage.content.rendered,
    modified: matchedPage.modified,
    heroImage
  }
}

const getHeroImage = async (matchedPage) => {
  const featuredImagePath = R.path(['_links', 'wp:featuredmedia', 0, 'href'], matchedPage);
  const res = await fetch(featuredImagePath);
  const json = await res.json();
  return json.source_url;
}

export { getNavigationItems, getPaths, getPage, getIndexPage }