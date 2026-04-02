import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
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

function resolvePartOfMyBrainAssetUrl(source, importer) {
  if (typeof source !== "string" || typeof importer !== "string") {
    return null;
  }

  const sourcePath = source.split("?")[0]?.trim();
  if (
    !sourcePath ||
    sourcePath.includes("/") ||
    sourcePath.includes("\\") ||
    !IMAGE_EXTENSIONS_REGEX.test(sourcePath)
  ) {
    return null;
  }

  const importerPath = importer.startsWith("file://")
    ? fileURLToPath(importer)
    : importer;
  const normalizedImporterPath = importerPath.replaceAll("\\", "/");
  const vaultMarker = "/part-of-my-brain/";
  const markerIndex = normalizedImporterPath.lastIndexOf(vaultMarker);

  if (markerIndex === -1) {
    return null;
  }

  const vaultRoot = normalizedImporterPath.slice(
    0,
    markerIndex + vaultMarker.length,
  );
  const candidatePath = path.posix.join(vaultRoot, "assets", sourcePath);

  return existsSync(candidatePath) ? candidatePath : null;
}

function contentImageFallbackPlugin() {
  return {
    name: "content-image-fallback-plugin",
    enforce: "pre",
    resolveId(source, importer) {
      const resolvedAsset = resolvePartOfMyBrainAssetUrl(source, importer);
      return resolvedAsset ?? null;
    },
  };
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
  site: "https://johnjeong.com",
  vite: {
    plugins: [contentImageFallbackPlugin(), markdownAssetsPathPlugin()],
  },
  markdown: {
    remarkPlugins: [remarkWikilinks],
    rehypePlugins: [rehypeWikilinks],
  },
});
