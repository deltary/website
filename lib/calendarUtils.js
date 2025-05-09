import fetch from 'node-fetch';
import { subDays, subYears, startOfDay, addMonths, getDayOfYear } from 'date-fns';

const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const GOOGLE_CALENDAR_API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;

const eventsUrl = `https://content.googleapis.com/calendar/v3/calendars/${GOOGLE_CALENDAR_ID}/events?alwaysIncludeEmail=false&showDeleted=false&showHiddenInvitations=false&singleEvents=true&key=${GOOGLE_CALENDAR_API_KEY}`;

const getEvents = async (options) => {
  const res = await fetch(getUrl(options));
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

const getUrl = (options) => {
  let url = eventsUrl;
  Object.entries(options).forEach(([key, value]) => {
    url += `&${key}=${value}`
  });
  return url;
}

const isMultiDay = (event) => {
  const { start, end } = event;
  const startDate = new Date((start.date) ? start.date : start.dateTime);
  const endDate = (end.date) ? subDays(new Date(end.date), 1) : new Date(end.dateTime);

  return !(getDayOfYear(startDate) === getDayOfYear(endDate));
}

const getUpComingEvents = async (limit = 3) => {
  const options = {
    timeMin: startOfDay(new Date()).toISOString(),
    timeMax: addMonths(new Date(), 5).toISOString(),
    maxResults: limit,
    orderBy: "startTime"
  }
  return getEvents(options);
}

const getCalendarEvents = async () => {
  const options = {
    timeMin: subYears(new Date(), 2).toISOString(),
    maxResults: 1000,
    orderBy: "startTime"
  }
  return getEvents(options)
}


export { getCalendarEvents, getUpComingEvents };
