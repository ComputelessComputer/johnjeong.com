import { getContentBySlug, getContentList } from '@/utils/content'
import type { Inspiration } from '@/utils/content'
import Layout from '@/components/Layout'
import { Metadata } from 'next'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { frontmatter } = await getContentBySlug('inspirations', params.slug)

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
  const { content, frontmatter } = await getContentBySlug('inspirations', params.slug)

  return (
    <Layout dir="Inspirations" dirPath="/inspirations">
      <article className="prose prose-lg max-w-4xl mx-auto">
        <h1>{frontmatter.title}</h1>
        <time className="text-gray-500">
          {new Date(frontmatter.created_at).toLocaleDateString()}
        </time>
        <div className="aspect-w-16 aspect-h-9 my-8">
          <iframe
            src={`https://www.youtube.com/embed/${frontmatter.youtube_video_id}`}
            title={frontmatter.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="mt-8">
          {content}
        </div>
      </article>
    </Layout>
  )
}
