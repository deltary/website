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
const parseWPLink = (link) => {
      const re = new RegExp('(\/([a-zA-Z0-9_-]*))*$');
      const [match, ...rest] = re.exec(link);
      return match.split('/')
        .filter(partition => partition !== '');
}

const getPaths = (pages) => {
  const paths = pages
    .filter(page => !page.link.endsWith('.fi/')) // TODO: find a better way to filter out index page
    .map(({ link }) => ({ params: { page: parseWPLink(link) }}));
  return paths;
}

const getPage = async (pages, slug) => {
  const matchedPage = pages.find(page =>
	  JSON.stringify(parseWPLink(page.link)) === JSON.stringify(slug));

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
