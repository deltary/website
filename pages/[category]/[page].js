import Head from 'next/head';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import { getNavigationItems, getPage } from '../../lib/wordpress';

import "./page.scss";

const HomePage = ({ navItems, page }) => {

  const { title, content, modified } = page;
  return (
    <div className="Main">
      <Head>
        <title>{title} | Delta ry</title>
      </Head>
      <Navigation navItems={navItems}/>
      <article className="Page">
        <h1 className="Page__title">{title}</h1>
        <div className="Content" dangerouslySetInnerHTML={{__html: content}}></div>
      </article>
      <Footer />
    </div>
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