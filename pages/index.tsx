import Bio from "@/components/Bio";
import Layout from "@/components/Layout";
import LinksList from "@/components/LinksList";
import Spotify from "@/components/Spotify";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>John Jeong</title>
        <meta
          name="description"
          content="Hey, I'm John. I am co-founder and CEO of Fastrepl."
        />
        <meta name="og:title" content="John Jeong" />
        <meta
          name="og:description"
          content="Hey, I'm John. I am co-founder and CEO of Fastrepl."
        />
        <meta name="og:site_name" content="John Jeong" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout dir={"About"} dirPath="/">
        <Bio />
        <Spotify />
        <LinksList />
      </Layout>
    </>
  );
};

export default Home;
