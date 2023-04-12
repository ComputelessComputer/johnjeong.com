import Footer from "./Footer";
import Header from "./Header";

type Props = {
  title: string;
  children: React.ReactNode;
};

const Layout = ({ title, children }: Props) => {
  return (
    <div>
      <Header title={title} />
      <main className="px-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
