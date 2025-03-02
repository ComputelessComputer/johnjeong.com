import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'postfiles.pstatic.net',
      }
    ],
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
