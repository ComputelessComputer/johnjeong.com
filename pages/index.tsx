import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";

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
        <section id="bio" className="mb-4 text-sm">
          <p>
            I am John Jeong, co-founder and Business Owner of{" "}
            <span>
              <Link
                href="https://padocorp.com"
                className="hover:text-blue-400 text-blue-600 underline"
              >
                Pado
              </Link>
            </span>
            .
          </p>
          <p>I love simple, intuitive designs.</p>
          <p>
            I enjoy listening to music; below are the songs that I listen on
            repeat.
          </p>
          <p>
            Feel free to contact me via{" "}
            <span>
              <Link
                href="mailto:john@padocorp.com"
                className="hover:text-blue-400 text-blue-600 underline"
              >
                email
              </Link>
            </span>{" "}
            or just arrange a{" "}
            <span>
              <Link
                href="https://www.sendtime.io/ko/reservation?i=I2heZH"
                className="hover:text-blue-400 text-blue-600 underline"
              >
                meeting
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
                href="https://johnjeong.substack.com/"
                className="hover:text-blue-400 text-blue-600 underline"
              >
                {"Chef John's Knowledge Omakase"}
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://linkedin.com/in/johntopia"
                className="hover:text-blue-400 text-blue-600 underline"
              >
                LinkedIn
              </Link>
            </li>
          </ul>
        </section>
      </Layout>
    </>
  );
};

export default Home;
