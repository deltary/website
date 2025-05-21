import { subDays, startOfDay, addDays, addMonths, calendarPageRange } from './dateUtils.js';

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
      title: summary || "Nimetön tapahtuma",
      allDay: (start.date) ? true : false,
      multiDay: isMultiDay(event),
      start: start.date || start.dateTime,
      end: end.date ? subDays(new Date(end.date), 1).toJSON() : end.dateTime,
      location: location || "",
      description: description || "",
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

  return Boolean(startOfDay(endDate) - startOfDay(startDate));
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

const getCalendarEvents = async (date = new Date()) => {
  const [timeMin, timeMax] = calendarPageRange(date);
  const options = {
    timeMin: timeMin.toJSON(),
    timeMax: timeMax.toJSON(),
    maxResults: 1000,
    orderBy: "startTime"
  }
  return getEvents(options)
}

const getCalendarEventsByDay = (date) => {
  return getCalendarEvents(date).then((e) => {
    const events = {};
    e.forEach((event) => {
      for (var date=startOfDay(new Date(event.start));
        date<=new Date(event.end);
        addDays(date, 1))
      {
        if (typeof events[date.toJSON()] === 'undefined') {
          events[date.toJSON()] = [];
        }
        events[date.toJSON()].push(event);
      }
    });
    return events;
  });
}


export { getUpComingEvents, getCalendarEvents, getCalendarEventsByDay };
