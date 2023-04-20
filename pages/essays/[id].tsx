import Layout from "@/components/Layout";
import formatDate from "@/lib/formatDate";
import { supabase } from "@/lib/supabase";
import Essay from "@/models/Essay";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  essay: Essay;
};

const Essay = ({ essay }: Props) => {
  return (
    <>
      <Head>
        <title>{essay.title}</title>
        <meta name="description" content={essay.content.substring(0, 120)} />
        <meta property="og:title" content={essay.title} />
        <meta
          property="og:description"
          content={essay.content.substring(0, 120)}
        />
        <meta property="og:type" content="article" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout subtitle={essay.title}>
        <section id="essay">
          <p className="text-sm mb-2">
            Created at: {formatDate(essay.createdAt)}
          </p>
          <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {essay.content}
            </ReactMarkdown>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Essay;

export const getStaticPaths = async () => {
  const { data } = await supabase
    .from("essays")
    .select("id")
    .order("id", { ascending: false });

  const paths = data?.map((essay) => ({
    params: { id: String(essay.id) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: any) => {
  const { data, error } = await supabase
    .from("essays")
    .select("*")
    .eq("id", Number(context.params.id))
    .single();

  if (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }

  const essay: Essay = {
    id: data.id,
    title: data.title,
    content: data.content,
    createdAt: data.created_at,
  };

  return {
    props: {
      essay,
    },
    revalidate: 60,
  };
};
