import { getContentBySlug, getContentList } from '@/utils/content'
import type { Inspiration } from '@/utils/content'
import { Metadata } from 'next'
import YouTubePlayer from '@/components/YouTubePlayer'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {slug} = await params
  const { frontmatter } = await getContentBySlug('inspirations', slug)

  return {
    title: frontmatter.title,
    description: `An inspiring talk: ${frontmatter.title}`,
    openGraph: {
      title: `${frontmatter.title} · John Jeong`,
      description: `An inspiring talk: ${frontmatter.title}`,
      type: 'article',
      publishedTime: frontmatter.created_at,
      modifiedTime: frontmatter.updated_at,
    },
  }
}

export async function generateStaticParams() {
  const inspirations = await getContentList('inspirations') as Inspiration[]
  return inspirations.map((inspiration) => ({
    slug: inspiration.slug,
  }))
}

export default async function InspirationPage({ params }: Props) {
  const {slug} = await params
  const { content, frontmatter } = await getContentBySlug('inspirations', slug)

  return (
    <article className="prose prose-lg max-w-4xl mx-auto">
      <h1>{frontmatter.title}</h1>
      <time className="text-gray-500">
        {new Date(frontmatter.created_at).toLocaleDateString()}
      </time>
      <div className="mt-8">
        {frontmatter.youtube_video_id && (
          <YouTubePlayer id={frontmatter.youtube_video_id} />
        )}
        {content}
      </div>
    </article>
  )
}
