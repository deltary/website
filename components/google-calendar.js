import React, { useEffect, useState } from 'react';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import getEvents from '../lib/calendarUtils.js';

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { fi } from 'date-fns/locale'
const locales = {
  'fi': fi,
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function GoogleCalendar() {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    const callApi = async () => {
      setEvents(await getEvents());
    }
    callApi();
  });

  return (
    <div className="CalendarWrapper">
      <Calendar
        popup
        localizer={localizer}
        culture={'fi'}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{height: 755}}
      />
    </div>
  );
}

export default GoogleCalendar;