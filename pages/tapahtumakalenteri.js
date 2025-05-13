import Head from 'next/head';
import { Header, Hero, Footer, GoogleCalendar } from '../components';
import { getNavigationItems } from '../lib/wordpress';
import { readJSON } from '../lib/fsUtils';

function CalendarPage ({ navItems }) {

  return (
    <>
      <Head>
        <title>Tapahtumakalenteri | Delta ry</title>
      </Head>
      <Header navItems={navItems}/>
      <Hero title="Tapahtumakalenteri" />
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
      navItems: await getNavigationItems(navigation)
    }
  };
}

export default CalendarPage;
