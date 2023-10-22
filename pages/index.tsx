import Bio from "@/components/Bio";
import Layout from "@/components/Layout";
import LinksList from "@/components/LinksList";
import Spotify from "@/components/Spotify";
import Head from "next/head";
import Link from "next/link";
import ReactPlayer from "react-player";
import SoundCloudPlayer from "react-player/soundcloud";

const Home = () => {
  return (
    <>
      <Head>
        <title>John Jeong</title>
        <meta
          name="description"
          content="I am John Jeong, cofounder and Business Owner of Pado."
        />
        <meta name="og:title" content="John Jeong" />
        <meta
          name="og:description"
          content="I am John Jeong, cofounder and Business Owner of Pado."
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
