import { format } from "date-fns";

export default function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  return format(date, "yyyy-MM-dd HH:mm:ss");
}
