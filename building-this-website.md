---
title: "Building This Website"
created_at: 2026-01-02
published: true
tags: [meta, engineering]
---

I rebuilt my website. Here's how it works.

## The Problem

I wanted a simple setup:
- Write in Obsidian (my note-taking app)
- Publish selected content to the web
- Let readers comment without me managing a database

## The Architecture

Two repositories:

1. **part-of-my-brain** - My Obsidian vault (public)
2. **johnjeong** - The Astro site that renders it

The vault contains four folders:
- `essays/` - Original thoughts
- `journals/` - Daily logs
- `inspirations/` - Podcasts, talks, videos that motivate me
- `lessons/` - Knowledge from books and courses

The site pulls content via git submodule. When I push to either repo, the site rebuilds.

## Content as Markdown

Each content type has a simple frontmatter schema.

Essays:
```yaml
---
title: "Essay Title"
created_at: 2026-01-02
published: true
tags: [philosophy, tech]
---
```

Journals have no frontmatter - the date comes from the filename (`2026_01_02.md`).

Inspirations include the source type:
```yaml
---
title: "Steve Jobs Stanford Commencement"
created_at: 2026-01-02
type: youtube
youtube_video_id: "UF8uR6Z6KLc"
speaker: "Steve Jobs"
---
```

Lessons track the author:
```yaml
---
title: "Traction"
author: "Gabriel Weinberg"
created_at: 2026-01-02
type: book
---
```

## Comments via GitHub

I use Giscus for comments. When someone comments on an essay, it creates a discussion in the vault repo's GitHub Discussions. No database, no auth system to maintain.

Each content type maps to a discussion category:
- Essays → `Essays` category
- etc.

## Questions

I added a `Questions` category in GitHub Discussions. The site has a form that submits questions directly there. It's like a self-hosted AMA.

## Why This Works

1. **Obsidian is my CMS** - I write where I already take notes
2. **Git is my sync** - Version history, backup, collaboration
3. **GitHub is my community layer** - Discussions for comments and Q&A
4. **Astro is my renderer** - Fast static site, markdown-native

The whole thing is just markdown files and a static site generator. No database, no CMS admin panel, no complexity.
