import { useRouter } from "next/router";
import Script from "next/script";
import { memo, useEffect } from "react";

const isProduction = process.env.NODE_ENV === "production";
const trackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID || "";

const GoogleAnalytics = () => {
  const router = useRouter();
  // 👇 send page views when users gets to the landing page
  useEffect(() => {
    if (!isProduction || !trackingId || router.isPreview) return;
    gtag("config", trackingId, {
      send_page_view: false, //manually send page views to have full control
    });
    gtag("event", "page_view", {
      page_path: window.location.pathname,
      send_to: trackingId,
    });
  }, [router.isPreview]);
  // 👇 send page views on route change
  useEffect(() => {
    if (!isProduction) return;
    const handleRouteChange = (url: string) => {
      if (!trackingId || router.isPreview) return;
      // manually send page views
      gtag("event", "page_view", {
        page_path: url,
        send_to: trackingId,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events, router.isPreview]);

  if (!isProduction || !trackingId || router.isPreview) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
        `}
      </Script>
    </>
  );
};

export default memo(GoogleAnalytics);
