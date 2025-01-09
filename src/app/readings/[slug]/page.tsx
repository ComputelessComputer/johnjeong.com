import { getContentBySlug, getContentList } from '@/utils/content'
import type { Reading } from '@/utils/content'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Layout from '@/components/Layout'
import { Metadata } from 'next'

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const readings = await getContentList('readings') as Reading[]
  return readings.map((reading) => ({
    slug: reading.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { frontmatter } = await getContentBySlug('readings', params.slug)

  return {
    title: frontmatter.title,
    description: `Book notes: ${frontmatter.title} by ${frontmatter.author}`,
    openGraph: {
      title: `${frontmatter.title} · John Jeong`,
      description: `Book notes: ${frontmatter.title} by ${frontmatter.author}`,
      type: 'article',
      publishedTime: frontmatter.created_at,
      modifiedTime: frontmatter.updated_at,
    },
  }
}

export default async function ReadingPage({ params }: Props) {
  const { content, frontmatter } = await getContentBySlug('readings', params.slug)

  return (
    <Layout dir="Readings" dirPath="/readings">
      <article className="max-w-4xl mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">{frontmatter.title}</h1>
          <p className="text-xl text-gray-600">by {frontmatter.author}</p>
          <time className="text-gray-500">
            {new Date(frontmatter.created_at).toLocaleDateString()}
          </time>
        </header>
        <div className="prose prose-lg max-w-none">
          {content}
        </div>
      </article>
    </Layout>
  )
}
