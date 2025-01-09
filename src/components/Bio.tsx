import Image from 'next/image'
import Link from 'next/link'

export default function Bio() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 py-8">
      <Image
        src="/profile.jpg"
        alt="John Jeong"
        width={120}
        height={120}
        className="rounded-full"
      />
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">John Jeong</h1>
        <p className="text-gray-600 mb-4">
          Software Engineer based in Seoul, Korea. I write about software engineering,
          personal growth, and things that inspire me.
        </p>
        <div className="flex gap-4">
          <Link
            href="https://github.com/johnjeong"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            GitHub
          </Link>
          <Link
            href="https://twitter.com/johnjeong"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            Twitter
          </Link>
          <Link
            href="mailto:hello@johnjeong.com"
            className="text-gray-600 hover:text-blue-600"
          >
            Email
          </Link>
        </div>
      </div>
    </div>
  )
}
