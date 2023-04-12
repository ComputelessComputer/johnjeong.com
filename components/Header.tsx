type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <header className="w-full p-4">
      <h1 className="font-bold text-2xl">{title}</h1>
    </header>
  );
};

export default Header;
