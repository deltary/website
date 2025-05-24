import { getJSON } from './miscUtils.js';

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

const getPages = (pages) => pages.map((page) => ({
	link: parseWPLink(page.link),
	title: page.title.rendered,
	content: page.content.rendered,
	modified: page.modified,
	hero: { image: getHeroImage(page) },
}));

const getHeroImage = (matchedPage) => {
  const featuredImages = matchedPage['_links']['wp:featuredmedia'];
  
  if (!featuredImages) return null;

  return getJSON(featuredImages[0].href).then((img) => img.source_url);
}

export { getNavigationItems, getPages }
