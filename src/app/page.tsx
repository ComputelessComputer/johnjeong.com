import Bio from "@/components/Bio";
import { getContentList } from "@/utils/content";
import type { ContentItem } from "@/utils/content";
import Link from "next/link";

export default async function Home() {
  const essays: ContentItem[] = await getContentList("essays");
  const inspirations: ContentItem[] = await getContentList("inspirations");
  const readings: ContentItem[] = await getContentList("readings");

  return (
    <>
      <Bio />

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <section>
          <h2 className="text-xl font-bold mb-4">Latest Essays</h2>
          <ul className="space-y-2">
            {essays.slice(0, 5).map((essay: ContentItem) => (
              <li key={essay.slug}>
                <Link
                  href={`/essays/${essay.slug}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {essay.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Recent Inspirations</h2>
          <ul className="space-y-2">
            {inspirations.slice(0, 5).map((inspiration: ContentItem) => (
              <li key={inspiration.slug}>
                <Link
                  href={`/inspirations/${inspiration.slug}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {inspiration.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Reading Notes</h2>
          <ul className="space-y-2">
            {readings.slice(0, 5).map((reading: ContentItem) => (
              <li key={reading.slug}>
                <Link
                  href={`/readings/${reading.slug}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {reading.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
