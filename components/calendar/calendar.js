import React, { useState, useEffect } from 'react';
import { getUpComingEvents } from '../../lib/calendarUtils';
import { format } from 'date-fns';
import { fi } from 'date-fns/locale';
import Link from 'next/link';

const locale = { locale: fi };

function Calendar() {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    const callApi = async () => {
      setEvents(await getUpComingEvents());
    }
    callApi();
  }, []);

  return (
    <div className="Calendar">
      <h1>Tapahtumat</h1>
      {events.length 
      ? events.map(event => {
        const formatRange = (start, end) => start + ' - ' + end;
        const time = event.allDay
          ? event.multiDay
            ? formatRange(
                format(event.start, "cccc, dd.MM.", locale),
                format(event.end, "cccc, dd.MM.", locale)
              )
            : format(event.start, "cccc, dd.MM.", locale)
          : event.multiDay
            ? formatRange(
                format(event.start, "cccc, dd.MM. 'kello' H:mm", locale),
                format(event.end, "cccc, dd.MM. 'kello' H:mm", locale)
              )
            : formatRange(
                format(event.start, "cccc, dd.MM. 'kello' H:mm", locale),
                format(event.end, "H:mm", locale)
              );
        return (
          <div className="CalendarEvent" key={event.title}>
            <p>{time}</p>
            <h1>{event.title}</h1>
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