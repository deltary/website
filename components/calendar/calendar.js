import React, { useState, useEffect } from 'react';
import { getUpComingEvents } from '../../lib/calendarUtils';
import Link from 'next/link';

function Calendar({ staticEvents }) {
  if (typeof window === 'undefined') {
    var events = staticEvents;
  } else {
    var [events, setEvents] = useState(staticEvents);
    useEffect(() => {
      const callApi = async () => {
        setEvents(await getUpComingEvents());
      };
      callApi();
    }, []);
}
  return (
    <div className="Calendar">
      <h1>Tapahtumat</h1>
      {events.length
      ? events.map(event => {
        const format = new Intl.DateTimeFormat("fi-FI", {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          ...(!event.allDay && {
            hour: "2-digit",
            minute: "2-digit",
          }),
          timeZone: "Europe/Helsinki",
        });
        const start = new Date(event.start);
        const end = new Date(event.end);
        return (
          <div className="CalendarEvent" key={event.title}>
            <time>{format.formatRange(start, end)}</time>
            <p className="title">{event.title}</p>
            <p>{event.location}</p>
          </div>
        );
      })
      : <h3>Ei tulevia tapahtumia</h3>}
      <Link href="/tapahtumakalenteri" >
        <a>Linkki kalenteriin</a>
      </Link>
    </div>
  );
}

export default Calendar;
