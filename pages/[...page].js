import Head from 'next/head';
import { Header, Hero, Footer } from '../components';
import { getNavigationItems, getPage, getPaths } from '../lib/wordpress';

const HomePage = ({ navItems, page }) => {
  const { title, content, heroImage } = page;

  return (
    <div className="Main">
      <Head>
        <title>{title} | Delta ry</title>
      </Head>
      <Header navItems={navItems}/>
      <Hero title={title} image={heroImage} height="30vh" />
      <article className="Page">
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
      navItems: await getNavigationItems(),
      page: await getPage(slug),
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