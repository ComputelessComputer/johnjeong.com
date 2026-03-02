import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import { remarkWikilinks, rehypeWikilinks } from "./src/remark-wikilinks.mjs";

const IMAGE_EXTENSIONS_REGEX =
  /\.(avif|bmp|gif|ico|jpe?g|png|svg|tiff?|webp)(?:[?#].*)?$/i;

function normalizeMarkdownImageUrl(url) {
  if (typeof url !== "string") {
    return url;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return trimmed;
  }

  if (
    trimmed.startsWith("../assets/") ||
    trimmed.startsWith("./assets/") ||
    trimmed.startsWith("assets/")
  ) {
    return trimmed.replace(/^(?:\.\/)?assets\//, "../assets/");
  }

  if (trimmed.startsWith("asset://localhost/")) {
    const decoded = decodeURIComponent(
      trimmed.replace("asset://localhost/", "/"),
    );
    const filename = decoded.split("/").pop();
    return filename ? `../assets/${filename}` : trimmed;
  }

  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.startsWith("./") || trimmed.startsWith("../")) {
    return trimmed;
  }

  if (!trimmed.includes("/") && IMAGE_EXTENSIONS_REGEX.test(trimmed)) {
    return `../assets/${trimmed}`;
  }

  return trimmed;
}

function rewriteMarkdownImageUrls(source) {
  return source.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (full, alt, rawUrl) => {
    const normalizedUrl = normalizeMarkdownImageUrl(rawUrl);
    if (normalizedUrl === rawUrl) {
      return full;
    }

    return `![${alt}](${normalizedUrl})`;
  });
}

function markdownAssetsPathPlugin() {
  return {
    name: "markdown-assets-path-plugin",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".md") || !id.includes("/part-of-my-brain/")) {
        return null;
      }

      const rewritten = rewriteMarkdownImageUrls(code);
      if (rewritten === code) {
        return null;
      }

      return {
        code: rewritten,
        map: null,
      };
    },
  };
}

export default defineConfig({
  adapter: vercel(),
  vite: {
    plugins: [markdownAssetsPathPlugin()],
  },
  markdown: {
    remarkPlugins: [remarkWikilinks],
    rehypePlugins: [rehypeWikilinks],
  },
});
