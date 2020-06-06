import fetch from 'node-fetch';
import * as R from 'ramda';

const getNavigationItems = (navigation) => {
  const formatNavItems = (items, slugStart = "") => {
    return items.map(item => {
      const link = item.slug
        ? `${slugStart}/${item.slug}`
        : item.url; // this doesn't suck

      return {
        title: item.title,
        link: link,
        items: (item.child_items) ? formatNavItems(item.child_items, link) : []
      }
    });
  }

  return formatNavItems(navigation.items);
}

const getPaths = (pages) => {
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

const getPage = async (pages, slug) => {
  // this has a possibility for collisions.
  // for example, if slug is 'bar' it can match 'foo/bar'.
  const matchedPage = pages.find(page => page.link.includes(slug));

  const heroImage = await getHeroImage(matchedPage);
  
  return {
    title: matchedPage.title.rendered,
    content: matchedPage.content.rendered,
    modified: matchedPage.modified,
    heroImage
  }
}

const getIndexPage = async (pages) => {
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
  
  if (!featuredImagePath) return null;

  const res = await fetch(featuredImagePath);
  const json = await res.json();
  return json.source_url;
}

export { getNavigationItems, getPaths, getPage, getIndexPage }