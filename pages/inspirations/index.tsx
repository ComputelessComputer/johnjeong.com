import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import InspirationPreview from "@/models/InspirationPreview";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

type Props = {
  previews: InspirationPreview[];
};

const Inspirations = ({ previews }: Props) => {
  return (
    <>
      <Head>
        <title>Inspirations · John Jeong</title>
        <meta name="description" content="Inspirations by John Jeong" />
        <meta property="og:title" content="Inspirations · John Jeong" />
        <meta property="og:description" content="Inspirations by John Jeong" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout dir={"Inspirations"} dirPath="/inspirations">
        <section id="essays">
          <ul className="ml-4 list-disc">
            {previews.map((preview) => (
              <li key={preview.id}>
                <Link
                  className="hover:text-blue-400 text-blue-600 underline"
                  href={`/inspirations/${preview.id}`}
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

export default Inspirations;

export const getStaticProps: GetStaticProps = async (context) => {
  const { data, error } = await supabase
    .from("inspirations")
    .select("id,title,created_at")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }

  const previews: InspirationPreview[] = data.map((essay) => ({
    id: essay.id,
    title: essay.title,
    createdAt: essay.created_at,
  }));

  return {
    props: {
      previews,
    },
    revalidate: 60,
  };
};
