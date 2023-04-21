import Footer from "./Footer";
import Header from "./Header";

type Props = {
  dir: string;
  dirPath: string;
  subDir?: string;
  children: React.ReactNode;
};

const Layout = ({ dir, dirPath, subDir, children }: Props) => {
  return (
    <div>
      <Header dir={dir} dirPath={dirPath} subDir={subDir} />
      <main className="px-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
