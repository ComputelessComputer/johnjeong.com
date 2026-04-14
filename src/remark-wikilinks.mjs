import path from "node:path";
import { visit } from "unist-util-visit";

const ASSETS_DIR_PREFIX = "../assets/";
const IMAGE_EXTENSIONS_REGEX =
  /\.(avif|bmp|gif|ico|jpe?g|png|svg|tiff?|webp)(?:[?#].*)?$/i;
const EXCALIDRAW_FILE_REGEX = /\.excalidraw(?:\.md)?(?:[?#].*)?$/i;
const WIKILINK_OR_EMBED_REGEX = /(!)?\[\[([^[\]]+)\]\]/g;
const MARKDOWN_EXTENSION_REGEX = /\.md$/i;
const ESSAYS_DIR_SEGMENT = "/part-of-my-brain/essays/";
const VAULT_DIR_SEGMENT = "/part-of-my-brain/";
const BARE_RELATIVE_ENTRY_REGEX = /^[a-z0-9._-]+$/i;
const BARE_ESSAY_LINK_REGEX =
  /^(?<slug>[a-z0-9]+(?:-[a-z0-9]+)*)(?<suffix>(?:[?#].*)?)$/i;

function isExternalOrAbsoluteUrl(url) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(url);
}

function isEssayMarkdownFile(file) {
  const filePath = getMarkdownFilePath(file);

  return filePath.replaceAll("\\", "/").includes(ESSAYS_DIR_SEGMENT);
}

function getMarkdownFilePath(file) {
  if (!file) {
    return "";
  }

  return typeof file.path === "string"
    ? file.path
    : Array.isArray(file.history) && typeof file.history[0] === "string"
      ? file.history[0]
      : "";
}

function getVaultRelativeFilePath(file) {
  const filePath = getMarkdownFilePath(file).replaceAll("\\", "/");
  const markerIndex = filePath.lastIndexOf(VAULT_DIR_SEGMENT);

  if (markerIndex === -1) {
    return "";
  }

  return filePath.slice(markerIndex + VAULT_DIR_SEGMENT.length);
}

function splitWikilinkTarget(target) {
  if (typeof target !== "string") {
    return { path: "", suffix: "" };
  }

  const trimmed = target.trim();
  const suffixIndex = trimmed.search(/[?#]/);

  if (suffixIndex === -1) {
    return { path: trimmed, suffix: "" };
  }

  return {
    path: trimmed.slice(0, suffixIndex),
    suffix: trimmed.slice(suffixIndex),
  };
}

function stripMarkdownExtension(value) {
  return typeof value === "string"
    ? value.replace(MARKDOWN_EXTENSION_REGEX, "")
    : value;
}

function parseWikilinkBody(body) {
  const trimmed = typeof body === "string" ? body.trim() : "";
  const separatorIndex = trimmed.indexOf("|");

  if (separatorIndex === -1) {
    return {
      target: trimmed,
      label: getDefaultWikilinkLabel(trimmed),
    };
  }

  const target = trimmed.slice(0, separatorIndex).trim();
  const label = trimmed.slice(separatorIndex + 1).trim();

  return {
    target,
    label: label || getDefaultWikilinkLabel(target),
  };
}

function getDefaultWikilinkLabel(target) {
  const { path: targetPath } = splitWikilinkTarget(target);
  const normalizedTargetPath = stripMarkdownExtension(
    targetPath.replaceAll("\\", "/"),
  );

  if (!normalizedTargetPath) {
    return "";
  }

  return normalizedTargetPath.split("/").pop() ?? normalizedTargetPath;
}

function getWikilinkCurrentDirectory(file) {
  const vaultRelativeFilePath = getVaultRelativeFilePath(file);

  if (!vaultRelativeFilePath) {
    return "";
  }

  return path.posix.dirname(vaultRelativeFilePath);
}

function getTopLevelVaultDirectory(directoryPath) {
  if (typeof directoryPath !== "string" || !directoryPath) {
    return "";
  }

  return directoryPath.split("/")[0] ?? "";
}

function canResolveBareWikilinkRelative(targetPath, file) {
  if (
    typeof targetPath !== "string" ||
    !targetPath ||
    targetPath.includes("/") ||
    !BARE_RELATIVE_ENTRY_REGEX.test(targetPath)
  ) {
    return false;
  }

  const currentDirectory = getWikilinkCurrentDirectory(file);
  const currentCollection = getTopLevelVaultDirectory(currentDirectory);

  return (
    currentCollection === "essays" ||
    currentCollection === "inspirations" ||
    currentCollection === "lessons"
  );
}

function mapVaultPathToUrl(vaultPath, suffix = "") {
  if (typeof vaultPath !== "string") {
    return null;
  }

  const normalizedPath = stripMarkdownExtension(
    vaultPath.replaceAll("\\", "/").replace(/^\/+/, ""),
  );

  if (!normalizedPath || normalizedPath === ".") {
    return null;
  }

  const [collection, ...segments] = normalizedPath.split("/");
  const entryPath = segments.join("/");

  if (collection === "essays" && entryPath) {
    return `/essays/${entryPath}${suffix}`;
  }

  if (collection === "inspirations" && entryPath) {
    return `/inspirations/${entryPath}${suffix}`;
  }

  if (collection === "lessons" && entryPath) {
    return `/lessons/${entryPath}${suffix}`;
  }

  if (collection === "pages" && entryPath) {
    return `/pages/${slugifyPageName(entryPath)}${suffix}`;
  }

  return null;
}

function resolveWikilinkUrl(target, file) {
  if (typeof target !== "string") {
    return target;
  }

  const trimmed = target.trim();
  if (!trimmed) {
    return trimmed;
  }

  if (isExternalOrAbsoluteUrl(trimmed)) {
    return trimmed;
  }

  const { path: targetPath, suffix } = splitWikilinkTarget(trimmed);
  const normalizedTargetPath = targetPath.replaceAll("\\", "/");

  if (!normalizedTargetPath) {
    return trimmed;
  }

  if (
    normalizedTargetPath.startsWith("./") ||
    normalizedTargetPath.startsWith("../")
  ) {
    const currentDirectory = getWikilinkCurrentDirectory(file);

    if (currentDirectory) {
      const resolvedPath = path.posix.normalize(
        path.posix.join(currentDirectory, normalizedTargetPath),
      );
      const resolvedUrl = mapVaultPathToUrl(resolvedPath, suffix);

      if (resolvedUrl) {
        return resolvedUrl;
      }
    }
  }

  if (normalizedTargetPath.includes("/")) {
    const directUrl = mapVaultPathToUrl(
      path.posix.normalize(normalizedTargetPath),
      suffix,
    );

    if (directUrl) {
      return directUrl;
    }
  } else if (canResolveBareWikilinkRelative(normalizedTargetPath, file)) {
    const currentDirectory = getWikilinkCurrentDirectory(file);

    if (currentDirectory) {
      const resolvedUrl = mapVaultPathToUrl(
        path.posix.join(currentDirectory, normalizedTargetPath),
        suffix,
      );

      if (resolvedUrl) {
        return resolvedUrl;
      }
    }
  }

  return `/pages/${slugifyPageName(getDefaultWikilinkLabel(targetPath))}${suffix}`;
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
        const { target, label } = parseWikilinkBody(match[2]);
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
              alt: label || (target.split("/").pop() ?? target),
            });
          } else {
            // Preserve unknown embed syntax as plain text.
            children.push({
              type: "text",
              value: match[0],
            });
          }
        } else {
          children.push({
            type: "link",
            url: resolveWikilinkUrl(target, file),
            children: [{ type: "text", value: label }],
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
  return (tree, file) => {
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
        const { target, label } = parseWikilinkBody(match[2]);

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
                alt: label || (target.split("/").pop() ?? target),
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
          children.push({
            type: "element",
            tagName: "a",
            properties: { href: resolveWikilinkUrl(target, file) },
            children: [{ type: "text", value: label }],
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
