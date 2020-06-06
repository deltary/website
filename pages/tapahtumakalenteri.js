import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Header, Hero, Footer, GoogleCalendar } from '../components';
import { getNavigationItems } from '../lib/wordpress';
import { readJSON } from '../lib/fsUtils';

function CalendarPage ({ staticNavItems }) {
  const [navItems, setNavItems] = useState(staticNavItems);

  useEffect(() => {
    const callApi = async () => {
      setNavItems(await getNavigationItems())
    }
    callApi();
  }, []);

  return (
    <>
      <Head>
        <title>Tapahtumakalenteri | Delta ry</title>
        <link rel='stylesheet' href='/tapahtumakalenteri.scss' />
      </Head>
      <Header navItems={navItems}/>
      <Hero title="Tapahtumakalenteri" height="30vh" />
      <article className="Page">
        <div className="ContentWrapper">
          <GoogleCalendar />
        </div>
      </article>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const navigation = readJSON('navitems.json');

  return {
    props: {
      staticNavItems: await getNavigationItems(navigation)
    }
  };
}
  
export default CalendarPage;