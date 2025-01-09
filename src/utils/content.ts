import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import YouTubePlayer from '@/components/YouTubePlayer'

const contentDirectory = path.join(process.cwd(), 'content')

const components = {
  YouTubePlayer,
}

export type ContentType = 'essays' | 'inspirations' | 'readings'

interface BaseContent {
  id: number
  title: string
  created_at: string
  updated_at: string
  slug: string
}

export interface Essay extends BaseContent {}

export interface Inspiration extends BaseContent {
  youtube_video_id: string
}

export interface Reading extends BaseContent {
  author: string
}

export type ContentItem = {
  id: number
  title: string
  created_at: string
  updated_at: string
  slug: string
  youtube_video_id?: string
  author?: string
}

export async function getContentList(type: ContentType): Promise<ContentItem[]> {
  const dir = path.join(contentDirectory, type)
  const files = fs.readdirSync(dir)
  
  const contents = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(dir, filename)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContent)
      
      return {
        ...data,
        slug: filename.replace('.mdx', ''),
      } as ContentItem
    })
  )
  
  return contents.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}

export async function getContentBySlug(type: ContentType, slug: string) {
  const filePath = path.join(contentDirectory, type, `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  
  const result = await compileMDX({
    source: fileContent,
    components,
    options: {
      parseFrontmatter: true,
    },
  })

  return {
    content: result.content,
    frontmatter: {
      ...result.frontmatter,
      slug,
    } as ContentItem,
  }
}
