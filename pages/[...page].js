import Head from 'next/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { getNavigationItems, getPage, getPaths } from '../lib/wordpress';

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

export async function getStaticProps(context) {
  return {
    props: {
      navItems: await getNavigationItems(),
      page: await getPage(context)
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: await getPaths(),
    fallback: false
  }
}

export default HomePage;