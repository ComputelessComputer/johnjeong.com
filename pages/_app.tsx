import "@/styles/globals.css";
import type { AppProps } from "next/app";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const isProduction = process.env.NODE_ENV === "production";

export default function App({ Component, pageProps }: AppProps) {
  if (!isProduction) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}
