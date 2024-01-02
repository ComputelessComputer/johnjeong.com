import Layout from "@/components/Layout";
import formatDate from "@/lib/formatDate";
import { supabase } from "@/lib/supabase";
import Inspiration from "@/models/Inspiration";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import YouTube from "react-youtube";

type Props = {
  inspiration: Inspiration;
};

const Inspiration = ({ inspiration }: Props) => {
  return (
    <>
      <Head>
        <title>{inspiration.title}</title>
        <meta
          name='description'
          content={inspiration.content.substring(0, 120)}
        />
        <meta property='og:title' content={inspiration.title} />
        <meta
          property='og:description'
          content={inspiration.content.substring(0, 120)}
        />
        <meta property='og:type' content='article' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Layout
        dir={"Inspirations"}
        dirPath='/inspirations'
        subDir={inspiration.title}
      >
        <section id='inspiration-youtube' className='mb-4'>
          <div className='w-full'>
            <div className='aspect-w-16 aspect-h-9'>
              <YouTube
                videoId={inspiration.youtubeVideoId}
                id='inspiration-youtube-video'
                containerClassName='w-full h-auto' // This will be the class for the div wrapping the iframe
                className='w-full h-full' // This will be the class for the iframe itself
              />
            </div>
          </div>
        </section>
        <section id='inspiration-content'>
          <p className='text-sm mb-4'>
            Created at: {formatDate(inspiration.createdAt)}
          </p>
          <div className='prose'>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {inspiration.content}
            </ReactMarkdown>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Inspiration;

export const getStaticPaths = async () => {
  const { data } = await supabase
    .from("inspirations")
    .select("id")
    .order("id", { ascending: false });

  const paths = data?.map((inspiration) => ({
    params: { id: String(inspiration.id) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: any) => {
  const { data, error } = await supabase
    .from("inspirations")
    .select("*")
    .eq("id", Number(context.params.id))
    .single();

  if (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }

  const inspiration: Inspiration = {
    id: data.id,
    title: data.title,
    content: data.content,
    createdAt: data.created_at,
    youtubeVideoId: data.youtube_video_id,
  };

  return {
    props: {
      inspiration,
    },
    revalidate: 60,
  };
};
