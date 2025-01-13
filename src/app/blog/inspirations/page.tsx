import Link from 'next/link'
import { getContentList } from '@/utils/content'
import type { ContentItem } from '@/utils/content'
import YouTubePlayer from '@/components/YouTubePlayer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inspirations',
  description: 'Collection of inspiring content that shaped my thoughts and beliefs.',
  openGraph: {
    title: 'Inspirations · John Jeong',
    description: 'Collection of inspiring content that shaped my thoughts and beliefs.',
  },
}

export default async function InspirationsPage() {
  const inspirations = await getContentList('inspirations')

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Inspirations</h1>
      <div className="space-y-12">
        {inspirations.map((inspiration: ContentItem) => (
          <article key={inspiration.slug} className="border-b pb-6">
            {inspiration.youtube_video_id && (
              <div className="mb-6">
                <YouTubePlayer id={inspiration.youtube_video_id} />
              </div>
            )}
            <Link href={`/inspirations/${encodeURIComponent(inspiration.slug)}`} className="group">
              <h2 className="text-xl font-semibold group-hover:text-blue-600">
                {inspiration.title}
              </h2>
              <time className="text-sm text-gray-500">
                {new Date(inspiration.created_at).toLocaleDateString()}
              </time>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
