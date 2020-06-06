import Head from 'next/head';
import Link from 'next/link';

import { Header, Hero, Footer } from '../components';
import { getNavigationItems } from '../lib/wordpress';

const Custom404 = ({ navItems }) => {
  return (
    <div className="Main">
      <Head>
        <title>Error | Delta ry</title>
      </Head>
      <Header navItems={navItems} />
      <Hero title="404" height="30vh" />
      <article className="Page">
        <div className="Content">
        <h1>404</h1>
        Etsimääsi sivua ei löytynyt.
        {' '}
        <Link href="/" >
          <a>Palaa etusivulle</a>
        </Link>
        {' '}
        tai navigoi toiselle sivulle.
        </div>
      </article>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      navItems: await getNavigationItems()
    }
  };
}

export default Custom404;