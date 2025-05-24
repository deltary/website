import { subDays, startOfDay, addDays, addMonths, calendarPageRange } from './dateUtils.js';
import { getJSON } from './miscUtils.js'

const GOOGLE_CALENDAR_API_KEY = ""; /* redacted */
const GOOGLE_CALENDAR_ID = ""; /* redacted */

const eventsUrl = `https://content.googleapis.com/calendar/v3/calendars/${GOOGLE_CALENDAR_ID}/events?alwaysIncludeEmail=false&showDeleted=false&showHiddenInvitations=false&singleEvents=true&key=${GOOGLE_CALENDAR_API_KEY}`;

const getEvents = async (options) => {
  const json = await getJSON(getUrl(options));
  const events = json.items;

  const parsedEvents = events.map((event, idx) => {
    const { summary, start, end, location, description } = event;

    return {
      id: idx,
      title: summary || "Nimetön tapahtuma",
      allDay: (start.date) ? true : false,
      start: start.date || start.dateTime,
      end: handleMidnight(end.date || end.dateTime).toJSON(),
      location: location || "",
      description: description || "",
    }
  });
  return parsedEvents;
}

const handleMidnight = (date) => new Date(
  (date.length === 10 || date.slice(11,-6) === '00:00:00')
    ? new Date(`${date.slice(0,10)}T00:00`) - 1
    : date
);

const getUrl = (options) => {
  let url = eventsUrl;
  Object.entries(options).forEach(([key, value]) => {
    url += `&${key}=${value}`
  });
  return url;
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
