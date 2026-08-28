---
name: blog-architecture
description: Architecture and implementation rules for the Astro blog, including typed Markdown content, blog-specific landing pages, shared article rendering, and visual variants.
---

# Blog Architecture

Use this skill when creating, migrating, or modifying blog content, blog indexes, article cards, blog landing pages, or the individual article layout in this project.

## Objective

Keep these concerns separate:

- Markdown content contains article data and article body content.
- Blog configuration defines the identity and visual direction of each blog.
- Data helpers discover, validate, filter, and sort posts.
- Landing components compose a blog overview.
- Article cards render one post preview.
- `BlogLayout.astro` renders one article and its shared metadata.

Do not solve different blog landing pages by adding a growing set of conditionals to one monolithic component.

## Canonical Content Structure

The target structure is:

```text
src/
├── content/
│   └── blog/
│       ├── development/
│       │   ├── basic-linux-commands.md
│       │   └── css-inset-property.md
│       └── languages/
│           └── grammar-de.md
├── content.config.ts
├── data/
│   ├── blogs.ts
│   └── blogPosts.ts
├── components/
│   └── blog/
│       ├── ArticleCard.astro
│       ├── BlogDirectory.astro
│       ├── BlogLanding.astro
│       ├── BlogGrid.astro
│       └── BlogEditorial.astro
└── pages/
    ├── blog/
    │   ├── index.astro
    │   └── [blog]/
    │       └── index.astro
    └── post/
        └── [slug].astro
```

Use one canonical content source. Do not maintain equivalent `.md` and `.mdx` copies of the same article. The current articles do not require MDX, so prefer Markdown unless an article genuinely needs embedded Astro components.

During migration, `src/data/blogPosts.ts` may temporarily adapt the existing `import.meta.glob` implementation. New code should not duplicate content discovery in page components.

## Frontmatter Rules

Use a typed content schema. Common fields should have stable types:

```yaml
---
title: "Essential Linux Commands for Beginners"
description: "A simple and clear guide..."
publishDate: 2026-06-15
author: "Miguel Paez"
readingTime: 5
category: "Linux"
image:
  src: "/images/linux.png"
  alt: "Linux terminal"
---
```

Rules:

- Use a date type or a validated ISO date, never unchecked date strings.
- Use a number for `readingTime`, not a numeric string.
- Keep `image` optional and validate both its source and alternative text.
- Use `category` for article metadata. Do not introduce overlapping names such as `titleCategory` without a concrete reason.
- Use the content folder as the canonical blog identity. Avoid duplicating the same identity in frontmatter.
- Do not use placeholder values such as `"****"` for URLs.
- Do not put a layout path in frontmatter when rendering through a content collection and a dynamic article route.
- Keep presentation overrides exceptional. If most articles in a blog share a behavior, put that behavior in the blog configuration instead.

If a one-off card composition is necessary, use a narrow field such as `cardVariant: "default" | "wide" | "tall" | "featured"`. Do not use article metadata to describe the entire landing page design.

## Blog Configuration

Define the editorial and visual identity of each blog in `src/data/blogs.ts`:

```ts
export const blogs = {
  development: {
    title: "Development",
    description: "Web development, CSS, Linux, and useful tools.",
    variant: "grid",
    showImages: true,
  },
  languages: {
    title: "Languages",
    description: "Practical language learning guides.",
    variant: "editorial",
    showImages: false,
  },
} as const;
```

The configuration may control:

- Landing variant.
- Header and description.
- Whether cards show images, excerpts, categories, or dates.
- Featured article behavior.
- Accent color or scoped CSS variables.
- Blog navigation and related links.

Prefer a small finite set of named variants over arbitrary style values in Markdown. Add a new variant only when the information hierarchy or composition is genuinely different.

## Component Responsibilities

### `ArticleCard.astro`

- Present one post preview.
- Receive a typed post entry and explicit display options.
- Remain independent of content discovery and route generation.
- Support optional image, category, excerpt, date, and card variant.

### `BlogGrid.astro`

- Render a collection of article cards.
- Own grid-specific layout and responsive behavior.
- Accept posts and configuration through props.

### Blog-specific landing components

Use separate components such as `BlogGrid.astro`, `BlogEditorial.astro`, or `BlogVisual.astro` when the DOM structure and information hierarchy differ. Keep shared primitives reusable, but do not force every blog into the same grid.

### `BlogLanding.astro`

- Receive one blog configuration and its posts.
- Select the appropriate landing component from the finite variant registry.
- Coordinate composition only; do not contain every visual implementation inline.

### `BlogDirectory.astro`

- Render the aggregate `/blog` page.
- Present links and descriptions for the available blogs.
- Optionally show a small recent-post preview, but do not turn the aggregate page into an accidental duplicate of every blog landing page.

### `SectionBlog.astro`

Treat the existing `SectionBlog.astro` as legacy code. It currently discovers content, sorts posts, renders cards, and owns all listing styles. Do not expand it to render every blog variant.

Prefer one of these outcomes:

- Rename it to `BlogPreviewSection.astro` and use it only for a limited homepage preview.
- Convert it into a generic section that receives already-prepared posts and options.
- Remove it after the new blog landing architecture replaces its usage.

It must not be the source of truth for content discovery or blog-specific design.

### `BlogLayout.astro`

Keep this layout focused on an individual article:

- Shared site layout and SEO metadata.
- Article title, author, date, and reading time.
- Article body slot.
- Optional blog-aware class, accent, or breadcrumb.

Do not place blog listing grids, card selection, or landing-page variants in this layout. Avoid generic global selectors such as `.blog-header` when an article-specific class can prevent collisions. Scope Markdown styles beneath the article content wrapper.

## Routing

Use one canonical route for each responsibility:

- `/blog`: aggregate directory in `src/pages/blog/index.astro`.
- `/blog/:blog`: blog-specific landing in `src/pages/blog/[blog]/index.astro`.
- `/post/:slug`: individual article in `src/pages/post/[slug].astro`.

Do not keep both `src/pages/blog.astro` and `src/pages/blog/index.astro` as competing implementations of `/blog`. Prefer `blog/index.astro` because it supports sibling dynamic blog routes.

Preserve existing article slugs during migration whenever possible. If a content collection adds directory segments to entry IDs, map the public slug explicitly instead of changing URLs unintentionally.

## Styling Variants

Use semantic classes and scoped blog modifiers:

```html
<main class="blog-landing blog-landing--editorial" data-blog="languages">
```

Use CSS variables or modifier classes for controlled differences. Do not mutate global theme tokens for one blog. Keep each landing component responsible for its own layout, and ensure every variant works on desktop and mobile.

Every variant must provide:

- Visible keyboard focus states.
- Readable contrast in light and dark themes.
- Responsive behavior without relying on dense desktop-only grids.
- Reduced-motion behavior for animated decoration.
- Meaningful alternative text when images are present.

## Migration Sequence

When migrating the current implementation:

1. Choose one canonical content source and remove duplicate article copies only after verifying the chosen source.
2. Introduce the typed post model and centralize discovery in `blogPosts.ts`.
3. Add blog grouping through canonical content folders.
4. Create `blogs.ts` with a small set of landing variants.
5. Extract the current card into `ArticleCard.astro`.
6. Build `/blog` as the aggregate directory.
7. Build `/blog/[blog]` with a landing component selected from configuration.
8. Implement `/post/[slug]` with static paths and the shared `BlogLayout.astro`.
9. Preserve legacy article redirects and URLs.
10. Remove the legacy `SectionBlog.astro` only after all usages are migrated.

Do not combine content relocation, visual redesign, and URL changes without checking each resulting route independently.

## Project Constraints

- Use Astro and TypeScript strict mode.
- Use `pnpm`, never `npm`, for project commands.
- Use plain CSS and the existing CSS variable design system unless a scoped blog variant requires an extension.
- Use `apply_patch` for manual edits.
- Do not start a dev server or run a production build unless explicitly requested. A human will perform the final build.
- Preserve unrelated user changes in the worktree.
- Keep data fetching and sorting out of presentational components.
- Prefer small, composable components over a universal blog component with many conditionals.
