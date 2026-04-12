import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const emptyishToUndefined = (value: unknown) =>
  value === "" || value === null ? undefined : value;

const optionalDraftString = z.preprocess(
  emptyishToUndefined,
  z.string().optional(),
);
const optionalDraftDate = z.preprocess(
  emptyishToUndefined,
  z.coerce.date().optional(),
);
const optionalDraftTags = z.preprocess(
  emptyishToUndefined,
  z.array(z.string()).optional(),
);
const draftLang = z.preprocess(
  emptyishToUndefined,
  z.enum(["en", "ko"]).default("en"),
);

const essayBaseSchema = {
  title: z.string(),
  lang: z.enum(["en", "ko"]).default("en"),
};

const essays = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./part-of-my-brain/essays" }),
  schema: z.union([
    z.object({
      ...essayBaseSchema,
      description: optionalDraftString,
      updated_at: optionalDraftDate,
      tags: optionalDraftTags,
      created_at: z.coerce.date(),
      published: z.literal(true),
    }),
    z.object({
      ...essayBaseSchema,
      description: optionalDraftString,
      updated_at: optionalDraftDate,
      tags: optionalDraftTags,
      lang: draftLang,
      created_at: optionalDraftDate,
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
