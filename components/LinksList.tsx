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
            href="https://ergosphere.co/john"
            className="hover:text-blue-400 text-blue-600 underline"
          >
            My Projects
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
