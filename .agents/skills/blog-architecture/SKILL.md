---
name: blog-architecture
description: Architecture and implementation rules for Astro blogs, including typed content, stable routes, listings, article pages, and visual variants.
---

# Astro Blog Architecture

Use these rules when creating, migrating, or modifying blog content, indexes, article cards, blog landing pages, and individual articles.

## Objective

Keep responsibilities separate:

- Markdown contains each article’s data and body.
- Blog configuration defines identity, SEO, and visual direction.
- Data helpers query, validate, filter, sort, and paginate articles.
- Landing pages and components compose each blog overview.
- Article cards render an article preview.
- The article layout renders the individual content and shared metadata.

Do not solve different blog landing pages by adding an increasing number of conditionals to a monolithic component.

## Canonical Structure

```
/
├── public/                      # Static assets served as-is
│   ├── fonts/                   # Self-hosted woff2 fonts (Jost, Inter, Allison, Fira Code)
│   ├── icons/                   # Icon assets
│   ├── images/                  # Images (AVIF) used by articles and cards
│   ├── models/                  # 3D models (fido.glb, rendered in the hero)
│   └── favicon.svg              # Site favicon
│
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── blog/                # Blog-specific components
│   │   │   ├── ArticleCard.astro  # Card for a single article (variantes wide/tall/featured)
│   │   │   ├── BlogDirectory.astro # Blog landing: agrupa artículos por categoría
│   │   │   └── BlogGrid.astro     # Responsive CSS Grid of cards
│   │   ├── icons/
│   │   │   └── SocialIcon.astro   # Social media SVG icons
│   │   ├── Breadcrumbs.astro    # Breadcrumb navigation
│   │   ├── ButtonColor.astro    # Theme switch (light/dark)
│   │   ├── Experience.astro     # Experience timeline
│   │   ├── Footer.astro         # Site footer
│   │   ├── Hero.astro           # Home hero with the 3D viewer
│   │   ├── Logo.astro           # Site logo
│   │   ├── Navbar.astro         # Top navigation bar
│   │   ├── ProjectsPlaceholder.astro # Projects page placeholder
│   │   ├── SectionAbout.astro   # About section
│   │   ├── SectionQuote.astro   # Quote / testimonial section
│   │   ├── SectionSkill.astro   # Skills section
│   │   ├── Seo.astro            # Meta tags, Open Graph, Twitter Cards, canonical
│   │   └── VoxelViewer.astro    # Three.js GLB viewer (lazy, self-disposing)
│   ├── content/
│   │   └── content.config.ts    # Content collection "post" (Zod schema, glob loader)
│   ├── data/
│   │   └── blogPosts.ts         # Legacy static post data (no longer rendered)
│   ├── layouts/
│   │   ├── Layout.astro         # Main layout: head, SEO, navbar, footer, theme boot
│   │   └── BlogLayout.astro     # Layout for individual blog posts
│   ├── pages/                   # File-based routing
│   │   ├── index.astro          # Homepage (/)
│   │   ├── about.astro          # About me (/about)
│   │   ├── blog.astro           # Blog listing (/blog)
│   │   ├── projects.astro       # Projects, currently noindex (/projects)
│   │   └── post/                # Markdown articles, organized by category
│   │       ├── tecnologia/      #   Linux, CSS, responsive design...
│   │       └── idiomas/         #   Language learning guides
│   └── styles/
│       └── global.css           # CSS variables: colors, typography scale, theme
│
├── astro.config.mjs             # Astro config (site, legacy redirects)
├── package.json                 # Dependencies and scripts
├── pnpm-lock.yaml               # pnpm lockfile
├── pnpm-workspace.yaml          # Build allowances (esbuild, sharp)
├── tsconfig.json                # TypeScript strict + @/* alias
└── README.md                    # This file
```

Each folder directly under `src/content/blog/` represents a blog. Its name must match the `slug` configured in `src/data/blogs.ts`.

Do not mix articles from distinct blogs in a flat structure when there are dedicated landing pages for each blog.

## Content Collection

Define collections in `src/content.config.ts` using Astro’s current Content Layer, `glob()`, and a Zod schema.

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
  }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    author: z.string().min(1),
    category: z.string().min(1),
    tags: z.array(z.string()).default([]),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
    image: z.object({
      src: z.string().min(1),
      alt: z.string().min(1),
    }).optional(),
    cardVariant: z.enum(['default', 'wide', 'tall', 'featured']).default('default'),
  }),
});

export const collections = { blog };
```

A typed, validated schema is required. Do not accept dates, numbers, or URLs without validation.

## Frontmatter Rules

Example:

```yaml
---
title: "Essential Linux Commands for Beginners"
description: "A clear guide to getting started with the terminal."
publishDate: 2026-06-15
updatedDate: 2026-08-01
author: "Miguel Paez"
category: "Linux"
tags: ["linux", "terminal", "tutorial"]
image:
  src: "/images/blog/linux-terminal.webp"
  alt: "Linux terminal with commands entered"
cardVariant: "featured"
---
```

Rules:

- `publishDate` must be validated as a date.
- `updatedDate` is optional and should only be used when the article has a meaningful update.
- `readingTime` should be calculated from content at build time. Do not store it manually unless there is a justified editorial exception.
- `draft: true` excludes the article from production and public listings.
- `category` describes the article; do not create overlapping fields such as `titleCategory`.
- `tags` provide additional classification; they do not replace the category.
- `slug` is optional. When defined, it is the canonical public URL segment; otherwise, derive it from the file name.
- Images are optional, but must have meaningful alternative text when present.
- Do not use placeholder values such as `"****"` or fake URLs.
- Do not include layout paths in frontmatter.
- `cardVariant` is an exceptional visual override; do not use article metadata to define an entire blog’s landing-page design.

## Blog Configuration

`src/data/blogs.ts` is the source of truth for every public blog.

```ts
export const blogs = {
  development: {
    slug: 'development',
    title: 'Development',
    description: 'Practical guides on web development, Linux, and tools.',
    accent: 'var(--color-accent-development)',
    landingVariant: 'editorial',
  },
  languages: {
    slug: 'languages',
    title: 'Languages',
    description: 'Resources and explanations for learning languages.',
    accent: 'var(--color-accent-languages)',
    landingVariant: 'grid',
  },
} as const;
```

Each configuration must include at least:

- `slug`
- `title`
- `description`
- `landingVariant`
- Additional SEO metadata when needed

Do not duplicate the blog slug in every article’s frontmatter. Derive it from the article folder.

## Data and Helpers

`src/lib/blogPosts.ts` centralizes content access logic:

- Query the collection.
- Exclude drafts and future posts.
- Derive the blog from the entry ID or folder.
- Sort by descending `publishDate`.
- Resolve the public slug.
- Calculate estimated reading time.
- Apply pagination when a listing grows.

Presentation components must not query content or generate routes by themselves.

## Component Responsibilities

### `ArticleCard.astro`

- Renders a single article preview.
- Receives a typed entry and explicit display options.
- Does not query content or generate routes.
- Supports image, category, excerpt, date, and card variant.

### `BlogGrid.astro`

- Renders a prepared collection of article cards.
- Owns grid layout and responsive behavior.
- Does not filter or sort articles.

### `BlogDirectory.astro`

- Renders the aggregate directory of all blogs.
- Receives blog configuration and summaries.

### `BlogLanding.astro`

- Composes a blog-specific landing page.
- Selects small, controlled composition variants.
- Does not contain content-query logic.

### `SectionBlog.astro`

Treat the existing component as legacy code if it mixes content discovery, sorting, article cards, and listing styles.

Valid options:

- Rename it to `BlogPreviewSection.astro` and limit it to a homepage preview.
- Convert it into a generic component that receives prepared articles.
- Remove it after the new architecture replaces all its uses.

It must not be the source of truth for content discovery or define every blog’s design.

### `BlogLayout.astro`

Keep this layout focused exclusively on the individual article:

- Shared site layout.
- SEO metadata, canonical URL, and Open Graph metadata.
- Title, author, dates, and reading time.
- Breadcrumbs.
- Article body.
- Blog-specific class or accent when needed.

Do not include grids, card selection, or landing variants. Scope Markdown styles to the article-content wrapper.

## Routing

Use one canonical URL per responsibility:

- `/blog`: aggregate directory.
- `/blog/:blog`: blog landing page.
- `/blog/:blog/:slug`: individual article.

Examples:

```text
/blog
/blog/development
/blog/development/basic-linux-commands
/blog/languages/english-phrasal-verbs
```

Do not maintain both `src/pages/blog.astro` and `src/pages/blog/index.astro` as competing implementations of `/blog`.

In static output mode, dynamic routes must declare `getStaticPaths()`.

Preserve existing URLs during a migration. If the previous structure uses `/post/:slug`, create redirects to the new canonical URL before removing legacy routes.

## SEO and Publishing

Every article and landing page should include:

- Canonical URL.
- Open Graph metadata.
- Unique title and description.
- Sitemap.
- RSS feed.
- Exclusion of drafts and future posts.
- A 404 page or equivalent response for missing blogs and slugs.

Do not index draft pages or duplicate URLs.

## Visual Variants and Accessibility

Use semantic classes and scoped modifiers:

```html
<main class="blog-landing blog-landing--editorial" data-blog="development">
```

Rules:

- Use CSS variables or modifier classes for controlled differences.
- Do not alter global theme tokens for one blog.
- Every variant must work on desktop and mobile.
- Include visible keyboard focus states.
- Maintain readable contrast in light and dark themes.
- Respect `prefers-reduced-motion`.
- Use meaningful image alternative text.
- Avoid dense grids that only work on large screens.

## Migration Sequence

1. Inventory existing content, public URLs, and duplicates.
2. Choose one canonical article source.
3. Define the typed collection in `src/content.config.ts`.
4. Organize articles by blog folder.
5. Create `blogs.ts` with public blogs and their variants.
6. Centralize querying, filtering, sorting, and slug resolution in `blogPosts.ts`.
7. Extract the reusable card into `ArticleCard.astro`.
8. Build `/blog` as the aggregate directory.
9. Build `/blog/[blog]` as the blog-specific landing page.
10. Build `/blog/[blog]/[slug]` using `BlogLayout.astro`.
11. Create and verify redirects from legacy routes.
12. Add sitemap and RSS.
13. Remove legacy components only after all uses have been migrated.

Do not combine content relocation, visual redesign, and URL changes without verifying every resulting route.

## Project Constraints

- Use Astro and TypeScript in strict mode.
- Use `pnpm`, never `npm`, for project commands.
- Use plain CSS and the existing CSS variable design system unless a scoped blog variant requires an extension.
- Use `apply_patch` for manual edits.
- Do not start a dev server or run a production build unless explicitly requested. A human will perform the final build.
- Preserve unrelated user changes in the worktree.
- Keep data fetching and sorting out of presentational components.
- Prefer small, composable components over a universal blog component with many conditionals.