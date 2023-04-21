import Link from "next/link";

type Props = {
  dir: string;
  dirPath: string;
  subDir?: string;
};

const Header = ({ dir, dirPath, subDir }: Props) => {
  return (
    <header className="w-full p-4 flex flex-col gap-2">
      <h1 className="font-bold text-2xl">
        <Link href="/">John Jeong</Link>
      </h1>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <Link
              href={dirPath}
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              {dir}
            </Link>
          </li>
          {subDir !== undefined && (
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="ml-1 font-medium text-gray-500 md:ml-2">
                  {subDir}
                </span>
              </div>
            </li>
          )}
        </ol>
      </nav>
    </header>
  );
};

export default Header;
