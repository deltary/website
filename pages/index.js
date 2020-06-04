import Head from 'next/head';
import { Header, Hero, Footer, Calendar, Sponsors } from '../components';
import { getNavigationItems, getIndexPage } from '../lib/wordpress';

// TODO: fetch dynamically from a WP custom field
const description =
  "Delta ry on Turun yliopiston matemaattisten ja fysikaalisten tieteiden opiskelijoiden yhdistys."

const HomePage = ({ navItems, page }) => {
  const { title, content, heroImage } = page;

  return (
    <>
      <Head>
        <title>Delta ry</title>
      </Head>
      <Header navItems={navItems} />
      <div className="ContentWrapper">
        <Hero title={title} description={description} image={heroImage} height="100vh" />
        <div className="FrontPage">
          <div className="FrontPage-info" dangerouslySetInnerHTML={{__html: content}} />
          <Calendar />
        </div>
        <Sponsors />
      </div>
      <Footer invertColors={true} />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      navItems: await getNavigationItems(),
      page: await getIndexPage()
    }
  };
}

export default HomePage;