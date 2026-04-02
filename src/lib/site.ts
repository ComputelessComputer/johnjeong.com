export const SITE_URL = "https://johnjeong.com";
export const SITE_NAME = "John Jeong";
export const TWITTER_HANDLE = "@computeless";
export const DEFAULT_DESCRIPTION =
  "Co-founder & Co-CEO at Char. Essays, lessons, inspirations, notes, and photos.";

export const OG_TITLE_MAX_LENGTH = 96;
export const OG_DESCRIPTION_MAX_LENGTH = 180;
export const OG_EYEBROW_MAX_LENGTH = 32;

export function clampText(value: string | undefined, maxLength: number) {
  if (!value) {
    return "";
  }

  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

export function buildOgImagePath(input: {
  title: string;
  description?: string;
  eyebrow?: string;
}) {
  const params = new URLSearchParams({
    title: clampText(input.title, OG_TITLE_MAX_LENGTH),
  });

  const description = clampText(input.description, OG_DESCRIPTION_MAX_LENGTH);
  if (description) {
    params.set("description", description);
  }

  const eyebrow = clampText(input.eyebrow, OG_EYEBROW_MAX_LENGTH);
  if (eyebrow) {
    params.set("eyebrow", eyebrow);
  }

  return `/og.png?${params.toString()}`;
}

export function toAbsoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return new URL(path, SITE_URL).toString();
}
