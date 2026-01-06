import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import { remarkWikilinks, rehypeWikilinks } from "./src/remark-wikilinks.mjs";

export default defineConfig({
  adapter: vercel(),
  markdown: {
    remarkPlugins: [remarkWikilinks],
    rehypePlugins: [rehypeWikilinks],
  },
});
