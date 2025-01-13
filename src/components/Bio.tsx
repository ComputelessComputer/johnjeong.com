import Image from "next/image";
import Link from "next/link";

export default function Bio() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 py-8">
      <div className="size-28 relative">
        <Image
          src="/john.jpeg"
          alt="John Jeong"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">John Jeong</h1>
        <p className="text-gray-600 mb-4">
          I like to dream. I like to build. I am interested in energy, defense,
          and technology. I have a firm yet flexible view of the world,
          including politics.
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
  );
}
