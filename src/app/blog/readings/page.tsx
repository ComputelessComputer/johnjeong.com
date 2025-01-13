import Link from 'next/link'
import { getContentList } from '@/utils/content'
import type { ContentItem } from '@/utils/content'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reading Notes',
  description: 'Notes and thoughts from books I have read.',
  openGraph: {
    title: 'Reading Notes · John Jeong',
    description: 'Notes and thoughts from books I have read.',
  },
}

export default async function ReadingsPage() {
  const readings = await getContentList('readings')

  return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Reading Notes</h1>
        <div className="space-y-6">
          {readings.map((reading: ContentItem) => (
            <article key={reading.slug} className="border-b pb-6">
              <Link href={`/readings/${encodeURIComponent(reading.slug)}`} className="group">
                <h2 className="text-xl font-semibold group-hover:text-blue-600">
                  {reading.title}
                </h2>
                <p className="text-gray-600">by {reading.author}</p>
                <time className="text-sm text-gray-500">
                  {new Date(reading.created_at).toLocaleDateString()}
                </time>
              </Link>
            </article>
          ))}
        </div>
      </div>
  )
}
