import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const essays = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./part-of-my-brain/essays" }),
  schema: z.object({
    title: z.string(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date().optional(),
    published: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  }),
});

// Journals: no frontmatter, date derived from filename (e.g., 2026_01_02.md)
const journals = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./part-of-my-brain/journals" }),
});

const inspirations = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./part-of-my-brain/inspirations" }),
  schema: z.object({
    title: z.string(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date().optional(),
    type: z.enum(["youtube", "podcast", "talk", "article"]).optional(),
    source_url: z.string().optional(),
    youtube_video_id: z.string().optional(),
    speaker: z.string().optional(),
  }),
});

const lessons = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./part-of-my-brain/lessons" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    created_at: z.coerce.date(),
    type: z.enum(["book", "course", "article"]).optional(),
    source_url: z.string().optional(),
  }),
});

export const collections = { essays, journals, inspirations, lessons };
