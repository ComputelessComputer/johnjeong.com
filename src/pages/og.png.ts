import type { APIRoute } from "astro";
import { ImageResponse } from "@vercel/og";
import { createElement } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  DEFAULT_DESCRIPTION,
  OG_DESCRIPTION_MAX_LENGTH,
  OG_EYEBROW_MAX_LENGTH,
  OG_TITLE_MAX_LENGTH,
  SITE_NAME,
  clampText,
} from "../lib/site";

export const prerender = false;

const WIDTH = 1200;
const HEIGHT = 630;
const INSTRUMENT_SERIF_ITALIC_PATH = "/fonts/instrument-serif-italic.ttf";
const fontCache = new Map<string, Promise<ArrayBuffer>>();

function div(style: CSSProperties, ...children: ReactNode[]) {
  return createElement("div", { style }, ...children);
}

function getTextParam(
  url: URL,
  key: string,
  fallback: string,
  maxLength: number,
) {
  const value = clampText(url.searchParams.get(key) ?? fallback, maxLength);
  return value || fallback;
}

function getTitleSize(title: string) {
  if (title.length > 84) {
    return 62;
  }

  if (title.length > 56) {
    return 72;
  }

  return 82;
}

function getInstrumentSerifItalic(url: URL) {
  const fontUrl = new URL(INSTRUMENT_SERIF_ITALIC_PATH, url.origin).toString();

  if (!fontCache.has(fontUrl)) {
    fontCache.set(
      fontUrl,
      fetch(fontUrl).then(async (response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to load Instrument Serif italic font: ${response.status}`,
          );
        }

        return response.arrayBuffer();
      }),
    );
  }

  return fontCache.get(fontUrl)!;
}

export const GET: APIRoute = async ({ url }) => {
  const title = getTextParam(url, "title", SITE_NAME, OG_TITLE_MAX_LENGTH);
  const description = getTextParam(
    url,
    "description",
    DEFAULT_DESCRIPTION,
    OG_DESCRIPTION_MAX_LENGTH,
  );
  const eyebrow = getTextParam(
    url,
    "eyebrow",
    SITE_NAME,
    OG_EYEBROW_MAX_LENGTH,
  );
  const instrumentSerifItalic = await getInstrumentSerifItalic(url);

  return new ImageResponse(
    div(
      {
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "48px",
        backgroundImage:
          "linear-gradient(135deg, #ffffff 0%, #f5f5f5 58%, #e9e9e9 100%)",
        color: "#1a1a1a",
      },
      div(
        {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "1px solid #dddddd",
          padding: "46px 52px",
          backgroundColor: "rgba(255, 255, 255, 0.72)",
        },
        div(
          {
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "920px",
          },
          div(
            {
              display: "flex",
              fontSize: getTitleSize(title),
              lineHeight: 1.02,
              letterSpacing: "-0.06em",
              fontWeight: 400,
              fontStyle: "italic",
              fontFamily: "Instrument Serif",
            },
            title,
          ),
          div(
            {
              display: "flex",
              fontSize: 30,
              lineHeight: 1.35,
              letterSpacing: "-0.03em",
              color: "#4f4f4f",
              maxWidth: "840px",
            },
            description,
          ),
        ),
        div(
          {
            display: "flex",
            alignItems: "center",
            fontSize: 21,
            color: "#666666",
            letterSpacing: "-0.02em",
          },
          `johnjeong.com / ${eyebrow}`,
        ),
      ),
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: "Instrument Serif",
          data: instrumentSerifItalic,
          weight: 400,
          style: "italic",
        },
      ],
      headers: {
        "cache-control":
          "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
};
