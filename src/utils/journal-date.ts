const DEFAULT_TIME_ZONE = "Asia/Seoul";
const MS_PER_DAY = 86_400_000;

const CITY_TIME_ZONE_MAP: Record<string, string> = {
  seoul: "Asia/Seoul",
  tokyo: "Asia/Tokyo",
  singapore: "Asia/Singapore",
  taipei: "Asia/Taipei",
  london: "Europe/London",
  paris: "Europe/Paris",
  berlin: "Europe/Berlin",
  newyork: "America/New_York",
  nyc: "America/New_York",
  boston: "America/New_York",
  toronto: "America/Toronto",
  chicago: "America/Chicago",
  denver: "America/Denver",
  la: "America/Los_Angeles",
  sf: "America/Los_Angeles",
  seattle: "America/Los_Angeles",
  vancouver: "America/Vancouver",
  sanfrancisco: "America/Los_Angeles",
  losangeles: "America/Los_Angeles",
};

function normalizeCity(city?: string): string {
  if (!city) return "";
  return city.toLowerCase().replace(/[^a-z]/g, "");
}

function parseDateParts(dateStr: string): [number, number, number] {
  const [year, month, day] = dateStr.split("-").map(Number);
  return [year, month, day];
}

function getTodayDateStrInTimeZone(timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) return new Date().toISOString().slice(0, 10);

  return `${year}-${month}-${day}`;
}

function dateStrToDayNumber(dateStr: string): number {
  const [year, month, day] = parseDateParts(dateStr);
  return Math.floor(Date.UTC(year, month - 1, day) / MS_PER_DAY);
}

function formatDateAtUtcNoon(
  dateStr: string,
  options: Intl.DateTimeFormatOptions,
): string {
  const [year, month, day] = parseDateParts(dateStr);
  const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0, 0));
  return new Intl.DateTimeFormat("en-US", {
    ...options,
    timeZone: "UTC",
  }).format(date);
}

export function getJournalTimeZone(city?: string): string {
  const normalized = normalizeCity(city);
  return CITY_TIME_ZONE_MAP[normalized] ?? DEFAULT_TIME_ZONE;
}

export function formatJournalDate(dateStr: string): string {
  return formatDateAtUtcNoon(dateStr, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getJournalRelativeDate(
  dateStr: string,
  timeZone: string,
): string {
  const todayDateStr = getTodayDateStrInTimeZone(timeZone);
  const diffDays =
    dateStrToDayNumber(todayDateStr) - dateStrToDayNumber(dateStr);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays > 1 && diffDays < 7) return `${diffDays} days ago`;
  if (diffDays >= 7 && diffDays < 14) {
    const dayName = formatDateAtUtcNoon(dateStr, { weekday: "long" });
    return `Last ${dayName}`;
  }
  if (diffDays === -1) return "Tomorrow";
  if (diffDays < -1 && diffDays > -7) return `in ${Math.abs(diffDays)} days`;
  return formatJournalDate(dateStr);
}
