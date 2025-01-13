import Header from "@/components/Header";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://johnjeong.com"),
  title: {
    default: "John Jeong",
    template: "%s · John Jeong",
  },
  description: "It's time to build!",
  openGraph: {
    title: "John Jeong",
    description: "It's time to build!",
    url: "https://johnjeong.com",
    siteName: "John Jeong",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "John Jeong",
    description: "It's time to build!",
    creator: "@computeless",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_TRACKING_ID!} />
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
