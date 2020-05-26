import React from 'react';

import {Calendar, dateFnsLocalizer } from 'react-big-calendar';

import GetEvents from '../lib/calendarUtils.js';

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
    return (
        <div className="CalendarWrapper">
            <Calendar
                popup
                localizer={localizer}
                culture={'fi'}
                events={GetEvents()}
                startAccessor="start"
                endAccessor="end"
                style={{height: 755}}
            />
        </div>
    );
  }
  
  export default GoogleCalendar;