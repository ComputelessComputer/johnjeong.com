import { getContentList } from "@/utils/content";
import Link from "next/link";

export default async function Blog() {
  // Get the most recent 10 posts from each category
  const [essays, inspirations, readings] = await Promise.all([
    getContentList("essays", {
      limit: 10,
      sortBy: "created_at",
      sortOrder: "desc",
    }),
    getContentList("inspirations", {
      limit: 10,
      sortBy: "created_at",
      sortOrder: "desc",
    }),
    getContentList("readings", {
      limit: 10,
      sortBy: "created_at",
      sortOrder: "desc",
    }),
  ]);

  // Combine all posts and sort by date
  const allPosts = [
    ...essays.map((post) => ({ ...post, category: "essays" })),
    ...inspirations.map((post) => ({ ...post, category: "inspirations" })),
    ...readings.map((post) => ({ ...post, category: "readings" })),
  ].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold">Blog</h1>

      <div className="space-y-8">
        {allPosts.map((post) => {
          const date = new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return (
            <article key={`${post.category}/${post.slug}`} className="group">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <time dateTime={post.created_at}>{date}</time>
                  <span>·</span>
                  <span className="capitalize">{post.category}</span>
                </div>
                <h2 className="text-xl font-semibold group-hover:text-blue-600">
                  <Link href={`/blog/${post.category}/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
