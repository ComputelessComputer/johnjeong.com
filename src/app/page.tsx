import Link from "next/link";

export default async function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between">
      <div className="absolute left-0 top-0 z-0 h-full w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/bg-video-poster.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="relative z-10 flex flex-grow flex-col items-center justify-center px-4 font-mono">
        <h1 className="mt-12 text-center text-4xl font-bold cursor-pointer hover:text-blue-600">
          <Link href="/about">John Jeong</Link>
        </h1>
        <h2 className="mt-12 text-center text-xl">Dreamer. Builder. Artist.</h2>
      </div>

      <footer className="relative z-10 w-full flex flex-wrap items-center justify-center gap-2 px-4 pb-4 text-xs sm:justify-between">
        <div className="flex flex-wrap justify-center gap-4 sm:flex-1 sm:justify-start">
          <Link
            href="mailto:jeeheontransformers@gmail.com"
            className="text-center decoration-dotted hover:underline sm:text-left"
          >
            Contact
          </Link>
          <Link
            href="https://github.com/ComputeLessComputer"
            className="text-center decoration-dotted hover:underline sm:text-left"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <Link
            href="https://www.x.com/company/computeless/"
            className="text-center decoration-dotted hover:underline sm:text-left"
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </Link>
          <Link
            href="https://www.linkedin.com/company/johntopia/"
            className="text-center decoration-dotted hover:underline sm:text-left"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
          <Link
            href="/blog"
            className="text-center decoration-dotted hover:underline sm:text-left"
          >
            Blog
          </Link>
        </div>

        <div className="w-full text-center text-black sm:w-auto sm:text-left md:text-white/70">
          <p> 2024 John Jeong. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
