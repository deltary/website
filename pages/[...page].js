import Head from 'next/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { getNavigationItems, getPage, getPaths } from '../lib/wordpress';
import { useState, useEffect } from 'react';

const HomePage = ({ staticNavItems, staticPage, slug }) => {
  const [navItems, setNavItems] = useState(staticNavItems);
  const [page, setPage] = useState(staticPage);

  useEffect(() => {
    const callApi = async () => {
      setNavItems(await getNavigationItems());
      setPage(await getPage(slug));
    }
    callApi();
  }, []);

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

export async function getStaticProps(context) {
  const slug = context.params.page.join('/');

  return {
    props: {
      staticNavItems: await getNavigationItems(),
      staticPage: await getPage(slug),
      slug
    }
  };
}

export async function getStaticPaths() {
  return {
    paths: await getPaths(),
    fallback: false
  };
}

export default HomePage;