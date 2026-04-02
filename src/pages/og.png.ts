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

export const GET: APIRoute = ({ url }) => {
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

  return new ImageResponse(
    div(
      {
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "28px",
        backgroundColor: "#ede7de",
        color: "#1a1a1a",
      },
      div(
        {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "44px 48px",
          border: "1px solid #d5cec3",
          backgroundColor: "#fffdf8",
        },
        div(
          {
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "#6f685f",
          },
          div({ display: "flex" }, eyebrow),
          div({ display: "flex" }, "johnjeong.com"),
        ),
        div(
          {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          },
          div(
            {
              display: "flex",
              fontSize: getTitleSize(title),
              lineHeight: 1.02,
              letterSpacing: "-0.05em",
              fontWeight: 700,
              maxWidth: "1000px",
            },
            title,
          ),
          div(
            {
              display: "flex",
              fontSize: 30,
              lineHeight: 1.32,
              color: "#5e584f",
              maxWidth: "920px",
            },
            description,
          ),
        ),
        div(
          {
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          },
          div(
            {
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontSize: 28,
            },
            div({
              width: "14px",
              height: "14px",
              display: "flex",
              borderRadius: "9999px",
              backgroundColor: "#1a1a1a",
            }),
            div({ display: "flex" }, SITE_NAME),
          ),
          div(
            {
              display: "flex",
              fontSize: 24,
              color: "#6f685f",
            },
            "simple & intuitive stuff",
          ),
        ),
      ),
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      headers: {
        "cache-control":
          "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
};
