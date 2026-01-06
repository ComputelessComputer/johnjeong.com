import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import { remarkWikilinks, rehypeWikilinks } from "./src/remark-wikilinks.mjs";

export default defineConfig({
  adapter: vercel(),
  image: {
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },
  markdown: {
    remarkPlugins: [remarkWikilinks],
    rehypePlugins: [rehypeWikilinks],
  },
});
