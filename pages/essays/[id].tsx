import Layout from "@/components/Layout";
import { formatYYYYMMdd } from "@/lib/formator";
import { supabase } from "@/lib/supabase";
import Essay from "@/models/Essay";
import Head from "next/head";

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
        <meta
          property="og:url"
          content={`https://johnjeong.com/essays/${essay.id}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout title={essay.title}>
        <section id="essay">
          <p className="text-sm mb-2">
            Created at: {formatYYYYMMdd(essay.createdAt)}
          </p>
          {essay.content.split("\n").map((paragraph, index) => (
            <p className="mb-2" key={index}>
              {paragraph}
            </p>
          ))}
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
    revalidate: 3600,
  };
};
