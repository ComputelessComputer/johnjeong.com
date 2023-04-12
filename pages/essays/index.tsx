import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import EssayPreview from "@/models/EssayPreview";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

type Props = {
  essayPreviews: EssayPreview[];
};

const Essays = ({ essayPreviews }: Props) => {
  return (
    <>
      <Head>
        <title>Essays · John Jeong</title>
        <meta name="description" content="Essays by John Jeong" />
        <meta property="og:title" content="Essays · John Jeong" />
        <meta property="og:description" content="Essays by John Jeong" />
        <meta property="og:url" content="https://johnjeong.com/essays" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout title={"Essays"}>
        <section id="essays">
          <ul className="ml-4">
            {essayPreviews.map((essayPreview) => (
              <li key={essayPreview.id}>
                <Link
                  className="hover:text-blue-400 text-blue-600 underline"
                  href={`/essays/${essayPreview.id}`}
                >
                  {essayPreview.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    </>
  );
};

export default Essays;

export const getStaticProps: GetStaticProps = async (context) => {
  const { data, error } = await supabase
    .from("essays")
    .select("id,title, created_at")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }

  const essayPreviews: EssayPreview[] = data.map((essay) => ({
    id: essay.id,
    title: essay.title,
    createdAt: essay.created_at,
  }));

  return {
    props: {
      essayPreviews,
    },
    revalidate: 3600,
  };
};
