import Link from 'next/link'
import { getContentList } from '@/utils/content'
import type { ContentItem } from '@/utils/content'
import Layout from '@/components/Layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inspirations',
  description: 'Videos and talks that inspire me.',
  openGraph: {
    title: 'Inspirations · John Jeong',
    description: 'Videos and talks that inspire me.',
  },
}

export default async function InspirationsPage() {
  const inspirations = await getContentList('inspirations')

  return (
    <Layout dir="Inspirations" dirPath="/inspirations">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Inspirations</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {inspirations.map((inspiration: ContentItem) => (
            <article key={inspiration.id} className="border rounded-lg p-4">
              <Link href={`/inspirations/${inspiration.slug}`} className="group">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <img
                    src={`https://img.youtube.com/vi/${inspiration.youtube_video_id}/maxresdefault.jpg`}
                    alt={inspiration.title}
                    className="object-cover rounded"
                  />
                </div>
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
    </Layout>
  )
}
