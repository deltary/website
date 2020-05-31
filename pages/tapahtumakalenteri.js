import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Header, Footer, GoogleCalendar } from '../components';
import { getNavigationItems } from '../lib/wordpress';


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
      <article className="Page">
        <h1 className="Page__title">{"Tapahtumakalenteri"}</h1>
        <div className="ContentWrapper">
          <GoogleCalendar />
        </div>
      </article>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      staticNavItems: await getNavigationItems()
    }
  };
}
  
export default CalendarPage;