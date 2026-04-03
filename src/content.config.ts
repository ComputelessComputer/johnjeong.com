import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const essayBaseSchema = {
  title: z.string(),
  description: z.string().optional(),
  updated_at: z.coerce.date().optional(),
  tags: z.array(z.string()).optional(),
  lang: z.enum(["en", "ko"]).default("en"),
};

const essays = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./part-of-my-brain/essays" }),
  schema: z.union([
    z.object({
      ...essayBaseSchema,
      created_at: z.coerce.date(),
      published: z.literal(true),
    }),
    z.object({
      ...essayBaseSchema,
      created_at: z.coerce.date().optional(),
      published: z.literal(false).default(false),
    }),
  ]),
});

const inspirations = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./part-of-my-brain/inspirations" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
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
    description: z.string().optional(),
    author: z.string(),
    created_at: z.coerce.date(),
    type: z.enum(["book", "course", "article"]).optional(),
    source_url: z.string().optional(),
    link: z.string().optional(),
  }),
});

// Pages: wiki-style pages linked from journals via [[page name]]
const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./part-of-my-brain/pages" }),
});

export const collections = { essays, inspirations, lessons, pages };
