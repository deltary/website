import fetch from 'node-fetch';
import { subDays } from 'date-fns';

const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const GOOGLE_CALENDAR_API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;

const eventsUrl = `https://content.googleapis.com/calendar/v3/calendars/${GOOGLE_CALENDAR_ID}/events?alwaysIncludeEmail=false&showDeleted=false&showHiddenInvitations=false&singleEvents=true&key=${GOOGLE_CALENDAR_API_KEY}&orderBy=startTime`;

async function getEvents() {

  const res = await fetch(eventsUrl);
  const json = await res.json();
  const events = json.items;

  const parsedEvents = events.map((event, idx) => {
    const { summary, start, end } = event;

    return {
      id: idx,
      title: summary,
      allDay: (start.date) ? true : false,
      start: new Date((start.date) ? start.date : start.dateTime),
      end: (end.date) ? subDays(new Date(end.date), 1) : new Date(end.dateTime),
    }
  });
  return parsedEvents;
}

export default getEvents;
