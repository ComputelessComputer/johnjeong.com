import Link from 'next/link'
import { getContentList } from '@/utils/content'
import type { ContentItem } from '@/utils/content'
import Layout from '@/components/Layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Essays',
  description: 'Essays by John Jeong about software engineering, personal growth, and more.',
  openGraph: {
    title: 'Essays · John Jeong',
    description: 'Essays by John Jeong about software engineering, personal growth, and more.',
  },
}

export default async function EssaysPage() {
  const essays = await getContentList('essays')

  return (
    <Layout dir="Essays" dirPath="/essays">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Essays</h1>
        <div className="space-y-6">
          {essays.map((essay: ContentItem) => (
            <article key={essay.id} className="border-b pb-6">
              <Link href={`/essays/${essay.slug}`} className="group">
                <h2 className="text-xl font-semibold group-hover:text-blue-600">
                  {essay.title}
                </h2>
                <time className="text-sm text-gray-500">
                  {new Date(essay.created_at).toLocaleDateString()}
                </time>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  )
}
