import type { CollectionEntry } from "astro:content";

export type EssayEntry = CollectionEntry<"essays">;
export type EssayData = EssayEntry["data"];
export type PublishedEssayData = Extract<EssayData, { published: true }>;
export type PublishedEssayEntry = Omit<EssayEntry, "data"> & {
  data: PublishedEssayData;
};

export function isPublishedEssay(
  essay: EssayEntry,
): essay is PublishedEssayEntry {
  return essay.data.published;
}
