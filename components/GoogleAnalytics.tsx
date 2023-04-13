import { useRouter } from "next/router";
import Script from "next/script";
import { memo, useEffect } from "react";

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const TRACKING_ID = process.env.GOOGLE_ANALYTICS_ID;

const GoogleAnalytics = () => {
  const router = useRouter();
  // 👇 send page views when users gets to the landing page
  useEffect(() => {
    if (!IS_PRODUCTION) return;
    if (!TRACKING_ID || router.isPreview) return;
    gtag("config", TRACKING_ID, {
      send_page_view: false,
    });
    gtag("event", "page_view", {
      page_path: window.location.pathname,
      send_to: TRACKING_ID,
    });
  }, [router.isPreview]);
  // 👇 send page views on route change
  useEffect(() => {
    if (!IS_PRODUCTION) return;
    const handleRouteChange = (url: string) => {
      if (!TRACKING_ID || router.isPreview) return;
      // manually send page views
      gtag("event", "page_view", {
        page_path: url,
        send_to: TRACKING_ID,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events, router.isPreview]);
  // 👇 prevent rendering scripts if there is no TRACKING_ID or if it's preview mode.
  if (!TRACKING_ID || router.isPreview) {
    return null;
  }
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
      ></Script>
      {/* 👇 gtag function definition. notice that we don't send page views at this point.  */}
      <Script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
        }}
      />
    </>
  );
};

export default memo(GoogleAnalytics);
