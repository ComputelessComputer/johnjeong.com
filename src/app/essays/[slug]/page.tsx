import { getContentBySlug, getContentList } from '@/utils/content'
import type { Essay } from '@/utils/content'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Layout from '@/components/Layout'
import { Metadata } from 'next'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { frontmatter } = await getContentBySlug('essays', params.slug)

  return {
    title: frontmatter.title,
    description: `An essay about ${frontmatter.title}`,
    openGraph: {
      title: `${frontmatter.title} · John Jeong`,
      description: `An essay about ${frontmatter.title}`,
      type: 'article',
      publishedTime: frontmatter.created_at,
      modifiedTime: frontmatter.updated_at,
    },
  }
}

export async function generateStaticParams() {
  const essays = await getContentList('essays') as Essay[]
  return essays.map((essay) => ({
    slug: essay.slug,
  }))
}

export default async function EssayPage({ params }: Props) {
  const { content, frontmatter } = await getContentBySlug('essays', params.slug)

  return (
    <Layout dir="Essays" dirPath="/essays">
      <article className="prose prose-lg max-w-4xl mx-auto">
        <h1>{frontmatter.title}</h1>
        <time className="text-gray-500">
          {new Date(frontmatter.created_at).toLocaleDateString()}
        </time>
        <div className="mt-8">
          <MDXRemote source={content.toString()} />
        </div>
      </article>
    </Layout>
  )
}
