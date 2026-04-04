import { visit } from "unist-util-visit";

const ASSETS_DIR_PREFIX = "../assets/";
const IMAGE_EXTENSIONS_REGEX =
  /\.(avif|bmp|gif|ico|jpe?g|png|svg|tiff?|webp)(?:[?#].*)?$/i;
const EXCALIDRAW_FILE_REGEX = /\.excalidraw(?:\.md)?(?:[?#].*)?$/i;
const WIKILINK_OR_EMBED_REGEX = /(!)?\[\[([^[\]]+)\]\]/g;
const ESSAYS_DIR_SEGMENT = "/part-of-my-brain/essays/";
const BARE_ESSAY_LINK_REGEX =
  /^(?<slug>[a-z0-9]+(?:-[a-z0-9]+)*)(?<suffix>(?:[?#].*)?)$/i;

function isExternalOrAbsoluteUrl(url) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(url);
}

function isEssayMarkdownFile(file) {
  if (!file) {
    return false;
  }

  const filePath =
    typeof file.path === "string"
      ? file.path
      : Array.isArray(file.history) && typeof file.history[0] === "string"
        ? file.history[0]
        : "";

  return filePath.replaceAll("\\", "/").includes(ESSAYS_DIR_SEGMENT);
}

function normalizeEssayLinkUrl(url) {
  if (typeof url !== "string") {
    return url;
  }

  const trimmed = url.trim();
  if (
    !trimmed ||
    isExternalOrAbsoluteUrl(trimmed) ||
    trimmed.startsWith("./") ||
    trimmed.startsWith("../") ||
    trimmed.includes("/") ||
    trimmed.includes("\\")
  ) {
    return trimmed;
  }

  const match = BARE_ESSAY_LINK_REGEX.exec(trimmed);
  if (!match?.groups?.slug) {
    return trimmed;
  }

  return `/essays/${match.groups.slug}${match.groups.suffix ?? ""}`;
}

function normalizeImageUrl(url) {
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
    return trimmed.replace(/^(?:\.\/)?assets\//, ASSETS_DIR_PREFIX);
  }

  if (trimmed.startsWith("asset://localhost/")) {
    const decoded = decodeURIComponent(
      trimmed.replace("asset://localhost/", "/"),
    );
    const filename = decoded.split("/").pop();
    return filename ? `${ASSETS_DIR_PREFIX}${filename}` : trimmed;
  }

  if (isExternalOrAbsoluteUrl(trimmed)) {
    return trimmed;
  }

  // Keep explicit relative paths as-is, except bare filenames (handled below).
  if (trimmed.startsWith("./") || trimmed.startsWith("../")) {
    return trimmed;
  }

  // Convert bare markdown image filenames to the shared assets directory.
  if (!trimmed.includes("/") && IMAGE_EXTENSIONS_REGEX.test(trimmed)) {
    return `${ASSETS_DIR_PREFIX}${trimmed}`;
  }

  return trimmed;
}

function isExcalidrawFilePath(path) {
  return typeof path === "string" && EXCALIDRAW_FILE_REGEX.test(path.trim());
}

function slugifyPageName(pageName) {
  return pageName.toLowerCase().replace(/\s+/g, "-");
}

function createExcalidrawEmbedHtml(path) {
  const encodedPath = encodeURIComponent(path);
  const fallbackHref = `/api/excalidraw?path=${encodedPath}`;
  return `<figure class="excalidraw-figure"><div class="excalidraw-embed" data-excalidraw-path="${encodedPath}"><a href="${fallbackHref}">${path}</a></div></figure>`;
}

function consumeTrailingEmbedBang(parent, index) {
  if (!parent || typeof index !== "number" || index <= 0) {
    return false;
  }

  const previousSibling = parent.children?.[index - 1];
  if (
    !previousSibling ||
    previousSibling.type !== "text" ||
    typeof previousSibling.value !== "string" ||
    !previousSibling.value.endsWith("!")
  ) {
    return false;
  }

  previousSibling.value = previousSibling.value.slice(0, -1);
  return true;
}

/**
 * Remark plugin to transform [[page name]] syntax into links to /pages/slug
 */
export function remarkWikilinks() {
  return (tree, file) => {
    const isEssayFile = isEssayMarkdownFile(file);

    visit(tree, "image", (node, index, parent) => {
      if (
        isExcalidrawFilePath(node.url) &&
        parent &&
        typeof index === "number"
      ) {
        parent.children.splice(index, 1, {
          type: "html",
          value: createExcalidrawEmbedHtml(node.url.trim()),
        });
        return index + 1;
      }

      node.url = normalizeImageUrl(node.url);
    });

    if (isEssayFile) {
      visit(tree, "link", (node) => {
        node.url = normalizeEssayLinkUrl(node.url);
      });
    }

    visit(tree, "text", (node, index, parent) => {
      const text = node.value;

      if (
        !WIKILINK_OR_EMBED_REGEX.test(text) ||
        !parent ||
        typeof index !== "number"
      ) {
        return;
      }

      // Reset regex lastIndex after test
      WIKILINK_OR_EMBED_REGEX.lastIndex = 0;

      const children = [];
      let lastIndex = 0;
      let match;

      while ((match = WIKILINK_OR_EMBED_REGEX.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          children.push({
            type: "text",
            value: text.slice(lastIndex, match.index),
          });
        }

        let isEmbed = Boolean(match[1]);
        const target = match[2].trim();
        if (!isEmbed && match.index === 0) {
          isEmbed = consumeTrailingEmbedBang(parent, index);
        }

        if (isEmbed) {
          if (isExcalidrawFilePath(target)) {
            children.push({
              type: "html",
              value: createExcalidrawEmbedHtml(target),
            });
          } else if (IMAGE_EXTENSIONS_REGEX.test(target)) {
            children.push({
              type: "image",
              url: normalizeImageUrl(target),
              alt: target.split("/").pop() ?? target,
            });
          } else {
            // Preserve unknown embed syntax as plain text.
            children.push({
              type: "text",
              value: match[0],
            });
          }
        } else {
          const slug = slugifyPageName(target);

          children.push({
            type: "link",
            url: `/pages/${slug}`,
            children: [{ type: "text", value: target }],
          });
        }

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text after last match
      if (lastIndex < text.length) {
        children.push({
          type: "text",
          value: text.slice(lastIndex),
        });
      }

      // Replace the text node with the new children
      if (children.length > 0) {
        parent.children.splice(index, 1, ...children);
        return index + children.length;
      }
    });
  };
}

/**
 * Rehype plugin to transform [[page name]] syntax into links (operates on HTML)
 */
export function rehypeWikilinks() {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      const wikilinkRegex = /(!)?\[\[([^[\]]+)\]\]/g;
      const text = node.value;

      if (!wikilinkRegex.test(text) || !parent || typeof index !== "number") {
        return;
      }

      // Reset regex lastIndex after test
      wikilinkRegex.lastIndex = 0;

      const children = [];
      let lastIndex = 0;
      let match;

      while ((match = wikilinkRegex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          children.push({
            type: "text",
            value: text.slice(lastIndex, match.index),
          });
        }

        let isEmbed = Boolean(match[1]);
        const target = match[2].trim();

        if (!isEmbed && match.index === 0) {
          isEmbed = consumeTrailingEmbedBang(parent, index);
        }

        if (isEmbed) {
          if (isExcalidrawFilePath(target)) {
            const encodedPath = encodeURIComponent(target);
            children.push({
              type: "element",
              tagName: "figure",
              properties: { className: ["excalidraw-figure"] },
              children: [
                {
                  type: "element",
                  tagName: "div",
                  properties: {
                    className: ["excalidraw-embed"],
                    dataExcalidrawPath: encodedPath,
                  },
                  children: [
                    {
                      type: "element",
                      tagName: "a",
                      properties: {
                        href: `/api/excalidraw?path=${encodedPath}`,
                      },
                      children: [{ type: "text", value: target }],
                    },
                  ],
                },
              ],
            });
          } else if (IMAGE_EXTENSIONS_REGEX.test(target)) {
            children.push({
              type: "element",
              tagName: "img",
              properties: {
                src: normalizeImageUrl(target),
                alt: target.split("/").pop() ?? target,
              },
              children: [],
            });
          } else {
            children.push({
              type: "text",
              value: match[0],
            });
          }
        } else {
          const slug = slugifyPageName(target);

          children.push({
            type: "element",
            tagName: "a",
            properties: { href: `/pages/${slug}` },
            children: [{ type: "text", value: target }],
          });
        }

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text after last match
      if (lastIndex < text.length) {
        children.push({
          type: "text",
          value: text.slice(lastIndex),
        });
      }

      // Replace the text node with the new children
      if (children.length > 0) {
        parent.children.splice(index, 1, ...children);
        return index + children.length;
      }
    });
  };
}

export default remarkWikilinks;
