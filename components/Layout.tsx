import Footer from "./Footer";
import Header from "./Header";

type Props = {
  subtitle: string;
  children: React.ReactNode;
};

const Layout = ({ subtitle, children }: Props) => {
  return (
    <div>
      <Header subtitle={subtitle} />
      <main className="px-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
