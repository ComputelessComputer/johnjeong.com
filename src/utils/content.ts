import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'

const contentDirectory = path.join(process.cwd(), 'content')

export type ContentType = 'essays' | 'inspirations' | 'readings'

interface BaseContent {
  title: string
  created_at: string
  updated_at: string
  slug: string
}

export type Essay = BaseContent;

export interface Inspiration extends BaseContent {
  youtube_video_id: string
}

export interface Reading extends BaseContent {
  author: string
}

export type ContentItem = {
  title: string
  created_at: string
  updated_at: string
  slug: string
  youtube_video_id?: string
  author?: string
  originalFilename?: string
}

export async function getContentList(type: ContentType): Promise<ContentItem[]> {
  const dir = path.join(contentDirectory, type)
  const files = fs.readdirSync(dir)
  
  const contents = await Promise.all(
    files.map(async (filename) => {
      const fileContent = fs.readFileSync(path.join(dir, filename), 'utf8')
      const { data } = matter(fileContent)
      
      return {
        ...data,
        originalFilename: filename,
        slug: filename.replace('.md', ''),
      } as ContentItem
    })
  )

  return contents.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })
}

export async function getContentBySlug(type: ContentType, slug: string) {
  try {
    // 이미 인코딩된 슬러그가 들어올 수 있으므로, 디코딩을 두 번 시도
    const decodedSlug = decodeURIComponent(decodeURIComponent(slug))
    const dir = path.join(contentDirectory, type)
    const files = fs.readdirSync(dir)
    const filename = files.find(f => f.replace('.md', '') === decodedSlug)
    
    if (!filename) {
      throw new Error(`No file found for slug: ${slug}`)
    }

    const filePath = path.join(dir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
  
    const result = await compileMDX<Omit<ContentItem, 'slug'>>({
      source: fileContent,
      options: {
        parseFrontmatter: true,
      },
    })

    return result
  } catch (error) {
    throw error
  }
}