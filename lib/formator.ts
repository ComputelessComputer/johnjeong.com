import { format } from "date-fns";

export function formatYYYYMMdd(timestamp: string) {
  const date = new Date(timestamp);
  return format(date, "yyyy-MM-dd");
}
