import { getContentBySlug, getContentList } from '@/utils/content'
import type { Essay } from '@/utils/content'
import { Metadata } from 'next'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {slug} = await params
  const { frontmatter } = await getContentBySlug('essays', slug)

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
    slug: essay.slug,  // getContentList에서 원본 파일명을 슬러그로 사용
  }))
}

export default async function EssayPage({ params }: Props) {
  const {slug} = await params
  const { content, frontmatter } = await getContentBySlug('essays', slug)

  return (

      <article className="prose prose-lg max-w-4xl mx-auto">
        <h1>{frontmatter.title}</h1>
        <time className="text-gray-500">
          {new Date(frontmatter.created_at).toLocaleDateString()}
        </time>
        <div className="mt-8">
          {content}
        </div>
      </article>
  )
}
