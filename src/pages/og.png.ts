import type { APIRoute } from "astro";
import { ImageResponse } from "@vercel/og";
import { createElement } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
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
        backgroundColor: "#ffffff",
        color: "#1a1a1a",
      },
      div(
        {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "1px solid #e6e6e6",
          padding: "46px 52px",
        },
        div(
          {
            display: "flex",
            fontSize: 18,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "#666666",
          },
          eyebrow,
        ),
        div(
          {
            display: "flex",
            fontSize: getTitleSize(title),
            lineHeight: 1.02,
            letterSpacing: "-0.06em",
            fontWeight: 400,
            fontStyle: "italic",
            fontFamily: "Instrument Serif",
            maxWidth: "900px",
          },
          title,
        ),
        div(
          {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#666666",
          },
          div({ display: "flex" }, "johnjeong.com"),
          div({ display: "flex" }, "simple & intuitive stuff"),
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
