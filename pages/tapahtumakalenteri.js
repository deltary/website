import Head from 'next/head';
import React, { useEffect } from 'react';
import { Header, Hero, Footer } from '../components';
import { renderCalendar, calendarBuilder } from '../components/google-calendar/google-calendar.js';
import { getCalendarEventsByDay } from '../lib/calendarUtils.js';
import { Node } from '../lib/DOMPolyfill.js';
import { getNavigationItems } from '../lib/wordpress';
import { readJSON } from '../lib/fsUtils';

function CalendarPage ({ navItems, calendarEvents }) {
  if (typeof window === 'undefined') {
    var document = new Node();
  } else {
    useEffect(() => {
      const updateCalendar = calendarBuilder();
      updateCalendar();
    }, []);
  }
  return (
    <>
      <Head>
        <title>Tapahtumakalenteri | Delta ry</title>
      </Head>
      <Header navItems={navItems}/>
      <Hero title="Tapahtumakalenteri" />
      <article className="Page" dangerouslySetInnerHTML={{
	      __html: renderCalendar(calendarEvents, new Date(), document).outerHTML,
      }}>
      </article>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const navigation = readJSON('navitems.json');

  return {
    props: {
      navItems: await getNavigationItems(navigation),
      calendarEvents: await getCalendarEventsByDay(),
    }
  };
}

export default CalendarPage;
