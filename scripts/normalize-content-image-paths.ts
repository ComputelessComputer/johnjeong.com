import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, relative } from "node:path";

const CONTENT_ROOT = "part-of-my-brain";
const ASSETS_DIR = join(CONTENT_ROOT, "assets");
const MARKDOWN_DIRS = [
  "essays",
  "inspirations",
  "journals",
  "lessons",
  "pages",
];
const MARKDOWN_EXT = ".md";
const IMAGE_LINK_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;

function walkMarkdownFiles(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      walkMarkdownFiles(fullPath, files);
      continue;
    }

    if (fullPath.endsWith(MARKDOWN_EXT)) {
      files.push(fullPath);
    }
  }

  return files;
}

function isLikelyLocalPath(path: string): boolean {
  return (
    path.length > 0 &&
    !path.startsWith("http://") &&
    !path.startsWith("https://") &&
    !path.startsWith("/") &&
    !path.startsWith("#") &&
    !path.startsWith("data:")
  );
}

function normalizeImageLinks(filePath: string): boolean {
  const source = readFileSync(filePath, "utf8");
  let changed = false;

  const next = source.replace(IMAGE_LINK_RE, (fullMatch, altText, rawHref) => {
    const href = rawHref.trim();

    if (!isLikelyLocalPath(href)) {
      return fullMatch;
    }

    const [pathWithoutSuffix, suffix = ""] = href.split(/([?#].*)/, 2);
    const currentResolvedPath = join(dirname(filePath), pathWithoutSuffix);

    if (existsSync(currentResolvedPath)) {
      return fullMatch;
    }

    const assetsCandidate = join(ASSETS_DIR, basename(pathWithoutSuffix));
    if (!existsSync(assetsCandidate)) {
      return fullMatch;
    }

    let relativePath = relative(dirname(filePath), assetsCandidate).replaceAll(
      "\\",
      "/",
    );
    if (!relativePath.startsWith(".")) {
      relativePath = `./${relativePath}`;
    }

    changed = true;
    return `![${altText}](${relativePath}${suffix})`;
  });

  if (!changed) {
    return false;
  }

  writeFileSync(filePath, next);
  return true;
}

function main() {
  let updatedFiles = 0;

  for (const dirName of MARKDOWN_DIRS) {
    const contentDir = join(CONTENT_ROOT, dirName);
    if (!existsSync(contentDir)) {
      continue;
    }

    const markdownFiles = walkMarkdownFiles(contentDir);
    for (const markdownFile of markdownFiles) {
      if (normalizeImageLinks(markdownFile)) {
        updatedFiles += 1;
      }
    }
  }

  console.log(`[normalize-content-image-paths] updated files: ${updatedFiles}`);
}

main();
