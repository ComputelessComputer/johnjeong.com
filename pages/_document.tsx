import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="John Jeong's personal website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="og:title" content="John Jeong" />
        <meta name="og:description" content="John Jeong's personal website" />
        <meta name="og:image" content="/images/johnjeong_og_image.png" />
        <meta name="og:url" content="https://johnjeong.com" />
        <meta name="og:site_name" content="John Jeong" />
        <meta name="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
