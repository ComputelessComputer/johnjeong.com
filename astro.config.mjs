// @ts-check
import { defineConfig } from "astro/config";
import { remarkWikilinks, rehypeWikilinks } from "./src/remark-wikilinks.mjs";

// https://astro.build/config
export default defineConfig({
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
