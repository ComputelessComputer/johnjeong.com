import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import ReadingPreview from "@/models/ReadingPreview";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

type Props = {
  previews: ReadingPreview[];
};

const Readings = ({ previews }: Props) => {
  return (
    <>
      <Head>
        <title>Readings · John Jeong</title>
        <meta name="description" content="Readings by John Jeong" />
        <meta property="og:title" content="Readings · John Jeong" />
        <meta property="og:description" content="Readings by John Jeong" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout dir={"Readings"} dirPath="/readings">
        <section id="readings">
          <ul className="ml-4 list-disc">
            {previews.map((preview) => (
              <li key={preview.id}>
                <Link
                  className="hover:text-blue-400 text-blue-600 underline"
                  href={`/readings/${preview.id}`}
                >
                  {preview.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    </>
  );
};

export default Readings;

export const getStaticProps: GetStaticProps = async (context) => {
  const { data, error } = await supabase
    .from("readings")
    .select("id,title,created_at,author")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }

  const previews: ReadingPreview[] = data.map((reading) => ({
    id: reading.id,
    title: reading.title,
    createdAt: reading.created_at,
    author: reading.author,
  }));

  return {
    props: {
      previews,
    },
    revalidate: 60,
  };
};
