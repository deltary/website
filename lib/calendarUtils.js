import fetch from 'node-fetch';
import { subDays, startOfDay, addMonths, getDayOfYear } from 'date-fns';

const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const GOOGLE_CALENDAR_API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;

const eventsUrl = `https://content.googleapis.com/calendar/v3/calendars/${GOOGLE_CALENDAR_ID}/events?alwaysIncludeEmail=false&showDeleted=false&showHiddenInvitations=false&singleEvents=true&key=${GOOGLE_CALENDAR_API_KEY}&orderBy=startTime`;

async function getEvents(url = eventsUrl) {

  const res = await fetch(url);
  const json = await res.json();
  const events = json.items;

  const parsedEvents = events.map((event, idx) => {
    const { summary, start, end, location, description } = event;

    return {
      id: idx,
      title: summary,
      allDay: (start.date) ? true : false,
      multiDay: isMultiDay(event),
      start: new Date((start.date) ? start.date : start.dateTime),
      end: (end.date) ? subDays(new Date(end.date), 1) : new Date(end.dateTime),
      location: location,
      description: description,
    }
  });
  return parsedEvents;
}

function isMultiDay(event) {
  const { start, end } = event;
  const startDate = new Date((start.date) ? start.date : start.dateTime);
  const endDate = (end.date) ? subDays(new Date(end.date), 1) : new Date(end.dateTime);
  
  return !(getDayOfYear(startDate) === getDayOfYear(endDate));
}

async function getUpComingEvents(limit = 3) {
  const timeMin = startOfDay(new Date()).toISOString();
  const timeMax = addMonths(new Date(), 2).toISOString();
  const url = eventsUrl + `&maxResults=${limit}&timeMin=${timeMin}&timeMax=${timeMax}`;
  return await getEvents(url);
}


export { getEvents, getUpComingEvents };
