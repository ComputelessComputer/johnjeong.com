import Link from 'next/link'

interface HeaderProps {
  dir?: string
  dirPath?: string
  subDir?: string
}

export default function Header({ dir, dirPath, subDir }: HeaderProps) {
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-lg font-bold hover:text-blue-600">
            John Jeong
          </Link>
          <div className="flex space-x-4 text-sm text-gray-600">
            <Link href="/essays" className="hover:text-blue-600">
              Essays
            </Link>
            <Link href="/inspirations" className="hover:text-blue-600">
              Inspirations
            </Link>
            <Link href="/readings" className="hover:text-blue-600">
              Readings
            </Link>
          </div>
        </div>
        {dir && (
          <div className="mt-2 text-sm text-gray-500">
            <Link href={dirPath || '#'} className="hover:text-blue-600">
              {dir}
            </Link>
            {subDir && (
              <>
                <span className="mx-2">/</span>
                <span>{subDir}</span>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
