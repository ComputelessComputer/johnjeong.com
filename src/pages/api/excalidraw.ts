import fs from "node:fs/promises";
import path from "node:path";
import type { APIRoute } from "astro";

export const prerender = false;

const VAULT_ROOT = path.resolve(process.cwd(), "part-of-my-brain");

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

export const GET: APIRoute = async ({ url }) => {
  const rawPath = url.searchParams.get("path");
  if (!rawPath) {
    return jsonResponse({ error: "Missing query parameter: path" }, 400);
  }

  const decodedPath = decodeURIComponent(rawPath).trim();
  if (!decodedPath.toLowerCase().endsWith(".excalidraw")) {
    return jsonResponse({ error: "Only .excalidraw files are supported" }, 400);
  }

  const absolutePath = resolveVaultPath(decodedPath);
  if (!absolutePath) {
    return jsonResponse({ error: "Invalid file path" }, 403);
  }

  let source: string;
  try {
    source = await fs.readFile(absolutePath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return jsonResponse(
        {
          error: "Excalidraw file not found",
          path: decodedPath,
        },
        404,
      );
    }

    return jsonResponse({ error: "Unable to read Excalidraw file" }, 500);
  }

  let scene: unknown;
  try {
    scene = JSON.parse(source);
  } catch {
    return jsonResponse(
      {
        error: "Invalid Excalidraw JSON",
        path: decodedPath,
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
