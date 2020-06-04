export const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

export const pageview = (url) => {
  // suppress gtag in environments other than prod
  try {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  } catch (err) {}
}

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}