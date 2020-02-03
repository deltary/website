import fetch from 'node-fetch';
import * as R from 'ramda';

const apiUrl = process.env.WP_API_URL;

const getNavigationItems = async (req) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps;
  }

  // this really shouldn't be hardcoded
  const res = await fetch(apiUrl + 'menus/v1/menus/valikko-1');
  
  if (res.status !== 200) {
    throw 'Api call failed';
  }

  const navigation = await res.json();

  const navItemsGrouped = Object.values(navigation.items)
    .filter(item => item.object === 'page')
    .reduce((acc, { title, object_id, post_parent, menu_order, slug }) => {
      // find if the navitem is a top level category
      const isTopLevel = post_parent === 0;
      const categoryKey = isTopLevel ? object_id || '0' : post_parent;
      
      const oldCategory = acc[categoryKey] || {};

      // add new top level item
      if (isTopLevel) {
        return {
          ...acc,
          [categoryKey]: {
            title,
            link: '/' + (slug || ''),
            menu_order: menu_order,
            items: oldCategory.items || []
          }
        }
      }

      // add new subitem
      return {
        ...acc,
        [categoryKey]: {
          ...oldCategory,
          items: [
            ...oldCategory.items,
            { title, menu_order, link: `${oldCategory.link}/${slug}` }
          ]
        }
      }
    }, {});

  const sortByMenuOrder = (a,b) => a.menu_order - b.menu_order;

  // convert to array, sort by menuorder and delete menu_order property from output
  const navItems = Object.values(navItemsGrouped)
    .sort(sortByMenuOrder)
    .map(navItem => ({
      ...R.omit(['menu_order'], navItem),
      items: navItem.items
        .sort(sortByMenuOrder)
        .map(item => R.omit(['menu_order'], item))
    }));

  return navItems;
}

const getPage = async (req) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps;
  }

  const res = await fetch(apiUrl + 'wp/v2/pages?per_page=100');

  if (res.status !== 200) {
    throw 'Api call failed';
  }

  const pages = await res.json();

  // TODO: this really should mind the category
  const matchedPage = pages.find(page => page.link.includes(req.asPath));
  
  return {
    title: matchedPage.title.rendered,
    content: matchedPage.content.rendered,
    modified: matchedPage.modified
  }
}

export { getNavigationItems, getPage }