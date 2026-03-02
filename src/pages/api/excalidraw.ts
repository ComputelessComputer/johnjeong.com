import fs from "node:fs/promises";
import path from "node:path";
import type { APIRoute } from "astro";
import LZString from "lz-string";

export const prerender = false;

const VAULT_ROOT = path.resolve(process.cwd(), "part-of-my-brain");
const EXCALIDRAW_PATH_REGEX = /\.excalidraw(?:\.md)?$/i;
const COMPRESSED_JSON_BLOCK_REGEX = /```compressed-json\s*([\s\S]*?)\s*```/i;

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function resolveVaultPath(rawPath: string) {
  const normalized = rawPath.replace(/\\/g, "/").replace(/^\/+/, "");
  const absolutePath = path.resolve(VAULT_ROOT, normalized);

  if (
    absolutePath !== VAULT_ROOT &&
    !absolutePath.startsWith(`${VAULT_ROOT}${path.sep}`)
  ) {
    return null;
  }

  return absolutePath;
}

function normalizeExcalidrawPath(rawPath: string) {
  const normalized = decodeURIComponent(rawPath).trim();
  return normalized.replace(/\\/g, "/");
}

function getExcalidrawPathCandidates(filePath: string) {
  const candidates = [filePath];
  if (
    filePath.toLowerCase().endsWith(".excalidraw") &&
    !filePath.toLowerCase().endsWith(".excalidraw.md")
  ) {
    candidates.push(`${filePath}.md`);
  }
  return candidates;
}

async function readExcalidrawSource(filePath: string) {
  for (const candidatePath of getExcalidrawPathCandidates(filePath)) {
    const absolutePath = resolveVaultPath(candidatePath);
    if (!absolutePath) {
      continue;
    }

    try {
      const source = await fs.readFile(absolutePath, "utf8");
      return { source, resolvedPath: candidatePath };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        continue;
      }
      throw error;
    }
  }

  return null;
}

function parseScene(source: string) {
  try {
    return JSON.parse(source);
  } catch {
    const compressedMatch = source.match(COMPRESSED_JSON_BLOCK_REGEX);
    const compressed = compressedMatch?.[1]?.replace(/\s+/g, "");

    if (!compressed) {
      return null;
    }

    const decompressed = LZString.decompressFromBase64(compressed);
    if (!decompressed) {
      return null;
    }

    try {
      return JSON.parse(decompressed);
    } catch {
      return null;
    }
  }
}

export const GET: APIRoute = async ({ url }) => {
  const rawPath = url.searchParams.get("path");
  if (!rawPath) {
    return jsonResponse({ error: "Missing query parameter: path" }, 400);
  }

  const normalizedPath = normalizeExcalidrawPath(rawPath);
  if (!EXCALIDRAW_PATH_REGEX.test(normalizedPath)) {
    return jsonResponse(
      { error: "Only .excalidraw and .excalidraw.md files are supported" },
      400,
    );
  }

  let file;
  try {
    file = await readExcalidrawSource(normalizedPath);
  } catch (error) {
    return jsonResponse({ error: "Unable to read Excalidraw file" }, 500);
  }

  if (!file) {
    return jsonResponse(
      {
        error: "Excalidraw file not found",
        path: normalizedPath,
      },
      404,
    );
  }

  const scene = parseScene(file.source);
  if (!scene || typeof scene !== "object") {
    return jsonResponse(
      {
        error: "Invalid Excalidraw content",
        path: file.resolvedPath,
      },
      422,
    );
  }

  const parsed = scene as Record<string, unknown>;
  return jsonResponse({
    type: parsed.type ?? "excalidraw",
    version: parsed.version ?? 2,
    source: parsed.source ?? "unknown",
    elements: Array.isArray(parsed.elements) ? parsed.elements : [],
    appState:
      parsed.appState && typeof parsed.appState === "object"
        ? parsed.appState
        : {},
    files: parsed.files && typeof parsed.files === "object" ? parsed.files : {},
  });
};
