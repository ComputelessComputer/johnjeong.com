# johnjeong.com

Personal website built with Astro.

## Architecture

Two-repo setup:

```
part-of-my-brain/           # github.com/ComputelessComputer/part-of-my-brain
├── essays/
├── journals/
├── inspirations/
└── lessons/

johnjeong/                  # github.com/ComputelessComputer/johnjeong.com (this repo)
├── src/
│   ├── pages/
│   ├── layouts/
│   └── components/
├── part-of-my-brain/       # git submodule
└── public/
```

## Content Management

- **CMS**: Obsidian (separate repo)
- **Sync**: Git submodule links vault to site
- **Build**: Push to either repo triggers rebuild
- **Schema**: Each content type has required frontmatter

### Frontmatter Schemas

**Essays** - Original thoughts
```yaml
---
title: string
created_at: date
updated_at: date (optional)
published: boolean (default: false)
tags: string[] (optional)
---
```

**Journals** - Daily logs
- No frontmatter needed
- Date derived from filename: `2026_01_02.md`

**Inspirations** - Motivational content (podcasts, YouTube, talks)
```yaml
---
title: string
created_at: date
type: "youtube" | "podcast" | "talk" | "article"
source_url: string (optional)
youtube_video_id: string (optional)
speaker: string (optional)
---
```

**Lessons** - Knowledge from books/courses
```yaml
---
title: string
author: string
created_at: date
type: "book" | "course" | "article" (optional)
source_url: string (optional)
---
```

## Community Features

Powered by GitHub Discussions on the vault repo.

### Comments (Giscus)
- Each essay maps to a discussion in `Essays` category
- Readers authenticate via GitHub

### Questions (AMA)
- Form submits to `Questions` category
- Answered questions displayed on site

## Commands

| Command | Action |
|:--------|:-------|
| `pnpm dev` | Start dev server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview build locally |
