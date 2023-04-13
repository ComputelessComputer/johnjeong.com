import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="og:image"
          content={
            process.env.NEXT_PUBLIC_SUPABASE_URL +
            "/storage/v1/object/public/public/johnjeong_og_image.png"
          }
        />
        <meta name="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
          }}
        />
      </body>
    </Html>
  );
}
