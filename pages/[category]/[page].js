import Head from 'next/head';
import Navigation from '../../components/navigation';
import { getNavigationItems, getPage } from '../../wordpress';

import "./page.scss";

const HomePage = ({ navItems, page }) => {

  const { title, content, modified } = page;
  return (
    <>
      <Head>
        <title>Delta ry</title>
      </Head>
      <Navigation navItems={navItems}/>
      <article className="Page">
        <h1 className="Page__title">{title}</h1>
        <div className="Content" dangerouslySetInnerHTML={{__html: content}}></div>
      </article>
    </>
  );
}

HomePage.getInitialProps = async (req) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps;
  }

  return {
    navItems: await getNavigationItems(req),
    page: await getPage(req)
  }
};

export default HomePage;