import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'John Jeong',
    template: '%s · John Jeong',
  },
  description: 'Software Engineer based in Seoul, Korea',
  openGraph: {
    title: 'John Jeong',
    description: 'Software Engineer based in Seoul, Korea',
    url: 'https://johnjeong.com',
    siteName: 'John Jeong',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'John Jeong',
    description: 'Software Engineer based in Seoul, Korea',
    creator: '@johnjeong',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
