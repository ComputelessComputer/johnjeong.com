import Link from "next/link";

type Props = {
  subtitle: string;
};

const Header = ({ subtitle }: Props) => {
  return (
    <header className="w-full p-4">
      <h1 className="font-bold text-2xl">
        <span>
          <Link href="/">Johntopia</Link>
        </span>{" "}
        / {subtitle}
      </h1>
    </header>
  );
};

export default Header;
