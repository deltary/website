import React, { useState, useEffect } from 'react';
import { getUpComingEvents } from '../lib/calendarUtils';
import { format } from 'date-fns';
import { fi } from 'date-fns/locale'

const locale = { locale: fi };

function Calendar() {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    const callApi = async () => {
      setEvents(await getUpComingEvents());
    }
    callApi();
  }, []);

  console.log(events);

  return (
    <div className="Calendar">
      <h1>Tapahtumat</h1>
      {events.map(event => {
        const formatRange = (start, end) => start + ' - ' + end;
        const time = event.allDay
          ? formatRange(
              format(event.start, "EEEE, dd.MM. 'kello' H:mm", locale),
              format(event.end, "H:mm", locale)
            )
          : formatRange(
              format(event.start, "EEEE dd.MM.", locale),
              format(event.end, "EEEE dd.MM.", locale)
            );
        return (
          <div className="CalendarEvent">
            <p>{time}</p>
            <h1>{event.title}</h1>
            <p>{event.location}</p>
          </div>
        );
      })}
      <a>Linkki kalenteriin</a>
    </div>
  );
}

export default Calendar;