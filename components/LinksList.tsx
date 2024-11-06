import Link from "next/link";

const LinksList = () => {
  return (
    <section id="links">
      <ul className="list-disc ml-4 text-sm">
        <li>
          <Link
            href="/essays"
            className="hover:text-blue-400 text-blue-600 underline"
          >
            Essays
          </Link>
        </li>
        <li>
          <Link
            href="/readings"
            className="hover:text-blue-400 text-blue-600 underline"
          >
            Readings
          </Link>
        </li>
        <li>
          <Link
            href="/inspirations"
            className="hover:text-blue-400 text-blue-600 underline"
          >
            Inspirations
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/johntopia/"
            className="hover:text-blue-400 text-blue-600 underline"
          >
            LinkedIn
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ComputelessComputer"
            className="hover:text-blue-400 text-blue-600 underline"
          >
            GitHub
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://soundcloud.com/dinojung"
            className="hover:text-blue-400 text-blue-600 underline"
          >
            Soundcloud
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default LinksList;
