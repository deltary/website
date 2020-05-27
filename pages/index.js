import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navigation from '../components/navigation';
import Hero from '../components/hero';
import Footer from '../components/footer';
import Calendar from '../components/calendar';
import Sponsors from '../components/sponsors';
import { getNavigationItems } from '../lib/wordpress';

const description =
  "Delta ry on Turun yliopiston matemaattisten ja fysikaalisten tieteiden opiskelijoiden yhdistys."

const HomePage = ({ staticNavItems }) => {
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
        <title>Delta ry</title>
      </Head>
      <Navigation navItems={navItems} />
      <div className="ContentWrapper">
        <Hero title="Delta ry" description={description} />
        <div className="FrontPage">
          <div className="FrontPage-info">
            {/* TODO: this should be fetched from WordPress */}
            <h1>Delta ry?</h1>
            <p>
              Tähän vois kirjotella semmosen sopivanpitusen kuvauksen Deltasta jonka jaksaa etusivulle ländääjä lukea.
              Toi Yhdistys-sivun kuvaus on vähän turhan hoosee. Et jos joku ihan korkeintaan tän mittanen kuvaus niin vois
              samalla laskee että on abaut samankorkunen kun toi vieressä oleva kalenteri. Tää contentti on kans pakko
              tulla WordPressista tai webmasterit ei saa ikinä rauhaa kun pitää korjailla jotain typoja ja muuta.
            </p>
            <a>Mukaan toimintaan</a>
          </div>
          <Calendar />
        </div>
        <Sponsors />
      </div>
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

export default HomePage;