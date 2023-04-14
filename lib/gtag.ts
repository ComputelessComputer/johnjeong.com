export const TRACKING_ID = process.env.GOOGLE_ANALYTICS_ID || "";

export const pageview = (url: string) => {
  window.gtag("config", TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: number;
}) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
