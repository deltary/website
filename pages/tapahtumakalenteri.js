import Head from 'next/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import GoogleCalendar from '../components/google-calendar';
import { getNavigationItems } from '../lib/wordpress';


const CalendarPage = ({ navItems }) => {
  return (
    <>
      <Head>
        <title>Delta ry</title>
        <link rel='stylesheet' href='/tapahtumakalenteri.scss' />
      </Head>
      <Navigation navItems={navItems}/>
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

CalendarPage.getInitialProps = async (req) => {
    if (process.browser) {
        return __NEXT_DATA__.props.pageProps;
    }

    return {
        navItems: await getNavigationItems()
    }
}

  
export default CalendarPage;