import Layout from "@/components/Layout";
import formatDate from "@/lib/formatDate";
import { supabase } from "@/lib/supabase";
import Reading from "@/models/Reading";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  reading: Reading;
};

const Reading = ({ reading }: Props) => {
  return (
    <>
      <Head>
        <title>
          {reading.title} by {reading.author}
        </title>
        <meta name="description" content={reading.content.substring(0, 120)} />
        <meta
          property="og:title"
          content={`${reading.title} by ${reading.author}`}
        />
        <meta
          property="og:description"
          content={reading.content.substring(0, 120)}
        />
        <meta property="og:type" content="article" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout dir={"Readings"} dirPath="/readings" subDir={reading.title}>
        <section id="reading">
          <p className="text-sm mb-4">
            Created at: {formatDate(reading.createdAt)}
          </p>
          <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {reading.content}
            </ReactMarkdown>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Reading;

export const getStaticPaths = async () => {
  const { data } = await supabase
    .from("readings")
    .select("id")
    .order("id", { ascending: false });

  const paths = data?.map((reading) => ({
    params: { id: String(reading.id) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: any) => {
  const { data, error } = await supabase
    .from("readings")
    .select("*")
    .eq("id", Number(context.params.id))
    .single();

  if (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }

  const reading: Reading = {
    id: data.id,
    title: data.title,
    content: data.content,
    createdAt: data.created_at,
    author: data.author,
  };

  return {
    props: {
      reading,
    },
    revalidate: 60,
  };
};
