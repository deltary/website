import Head from 'next/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { getNavigationItems } from '../lib/wordpress';

const HomePage = ({ navItems }) => {
  return (
    <>
      <Head>
        <title>Delta ry</title>
      </Head>
      <Navigation navItems={navItems}/>
      <div className="ContentWrapper">
        <div className="InfoContainer">
          <div className="Info">
            <h1>Delta ry?</h1>
            Delta ry on Turun yliopiston matemaattisten ja fysikaalisten tieteiden opiskelijoiden yhdistys.
          </div>
        </div>
      </div>
      <div className="LandingPage">
        Tähän sitten sitä sisältöä, kuvia ja muuta.
      </div>
      <Footer />
    </>
  );
}

HomePage.getInitialProps = async (req) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps;
  }

  return {
    navItems: await getNavigationItems()
  }
}

export default HomePage;