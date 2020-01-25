import Head from 'next/head';
import fetch from 'node-fetch';
import * as R from 'ramda';
import Navigation from '../components/navigation';

import "./index.scss";

const HomePage = ({ navItems }) => {
  return (
    <>
      <Head>
        <title>Delta ry</title>
      </Head>
      <Navigation navItems={navItems}/>
      <div className="ContentWrapper">
        <div className="InfoContainer">
          <div className="Info">
            <h1>Delta ry?</h1>
            Delta ry on Turun yliopiston matemaattisten ja fysikaalisten tieteiden opiskelijoiden yhdistys.
          </div>
        </div>
      </div>
      <div className="Content">
        Tähän sitten sitä sisältöä, kuvia ja muuta.
      </div>
    </>
  );
}

// Fetch data during buildtime, not on statically exported site.
HomePage.getInitialProps = async (req) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps;
  }

  // TODO: move this logic to a more proper place

  const apiUrl = process.env.WP_API_URL;

  // this really shouldn't be hardcoded
  const res = await fetch(apiUrl + 'menus/v1/menus/valikko-1');
  
  if (res.status !== 200) {
    throw 'Api call failed';
  }

  const navigation = await res.json();

  const navItems = Object.values(navigation.items)
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
          [categoryKey || '0']: {
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
        [categoryKey || '0']: {
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
    const arr = Object.values(navItems)
      .sort(sortByMenuOrder)
      .map(navItem => ({
        ...navItem,
        menu_order: undefined,
        items: navItem.items
          .sort(sortByMenuOrder)
          .map(item => R.omit(['menu_order'], item))
      }));

  return { navItems: arr };
}

export default HomePage;