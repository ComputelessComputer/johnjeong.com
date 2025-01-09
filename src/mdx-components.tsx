import type { MDXComponents } from 'mdx/types'
import YouTubePlayer from './components/YouTubePlayer'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    YouTubePlayer,
    ...components,
  }
}