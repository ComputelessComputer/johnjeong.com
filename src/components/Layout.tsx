import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
  dir?: string
  dirPath?: string
  subDir?: string
}

export default function Layout({ children, dir, dirPath, subDir }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header dir={dir} dirPath={dirPath} subDir={subDir} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
