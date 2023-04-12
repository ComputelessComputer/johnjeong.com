import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Head>
        <title>John Jeong</title>
      </Head>
      <Layout title={"John Jeong"}>
        <section id="bio" className="mb-4">
          <p>Hello world!</p>
          <p>I am John Jeong, currently the Business Owner @ Team Normal.</p>
          <p>I love simple, intuitive designs.</p>
          <p>
            I love listening to music. Below are the songs that I listen on
            repeat.
          </p>
          <p>
            Feel free to contact me via{" "}
            <span>
              <Link
                href="mailto:jeeheontransformers@gmail.com"
                className="hover:text-blue-400 text-blue-600 underline"
              >
                email
              </Link>
            </span>{" "}
            or{" "}
            <span>
              <Link
                href="https://linkedin.com/in/johntopia"
                className="hover:text-blue-400 text-blue-600 underline"
              >
                LinkedIn
              </Link>
            </span>
            .
          </p>
        </section>
        <section id="spotify" className="mb-4">
          <iframe
            className="rounded-xl"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1Epzmr4jjbZGin"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </section>
        <section id="links">
          <ul className="list-disc ml-4">
            <li>
              <Link
                href="https://ergosphere.co/john"
                className="hover:text-blue-400 text-blue-600 underline"
              >
                My Projects
              </Link>
            </li>
            <li>
              <Link
                href="https://johnjeong.substack.com/"
                className="hover:text-blue-400 text-blue-600 underline"
              >
                Chef John's Knowledge Omakase
              </Link>
            </li>
          </ul>
        </section>
      </Layout>
    </>
  );
};

export default Home;
