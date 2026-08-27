# AGENTS.md - Personal Web Astro

## Stack
- **Framework**: Astro 5.x
- **Package Manager**: pnpm (not npm)
- **Language**: TypeScript (strict mode)
- **Styling**: Plain CSS with CSS variables (no preprocessor)


## Project Structure
- Blog posts: MDX files in `src/post/*.mdx` (not a content collection; allow embedding Astro components)
- Blog data helper: `src/data/blogPosts.ts` (`getAllPosts()`, `formatPostDate()`, `PostEntry`/`PostFrontmatter` types)
- Blog listing: `src/pages/blog/index.astro` (grid + styles, renders `ArticleCard` for each post) → route `/blog`
- Blog article: `src/pages/post/[slug].astro` (dynamic `getStaticPaths`, wraps MDX content with `BlogLayout`) → route `/post/:slug`
- Article preview: `src/components/blog/ArticleCard.astro` (presentational only, no styles; receives `post: PostEntry`)
- Article layout: `src/layouts/BlogLayout.astro` (full post rendering, SEO, meta)
- Legacy: `src/components/SectionBlog.astro` retained as backup (no longer used by `/blog`)
- Components: `src/components/*.astro`
- Layouts: `src/layouts/Layout.astro`, `BlogLayout.astro`
- Styles: `src/styles/global.css` (CSS variables for theming)

## Path Aliases
- `@/*` maps to `src/*` (configured in tsconfig.json)

## Important Config
- **Site URL**: `astro.config.mjs` sets `site` from `PUBLIC_SITE_URL` env var (`https://` only, no creds/query/hash). Set it before deploying: `PUBLIC_SITE_URL=https://yourdomain.com pnpm build`.
- **Integrations**: `@astrojs/mdx` enabled in `astro.config.mjs:35`; all posts are `.mdx` so they can embed Astro components.
- **Legacy redirects**: `astro.config.mjs:27` maps `/post/post-1` … `/post/post-5` to canonical slugs (generate static redirect pages; also configure 301 at hosting).

## Design Tokens (global.css)
- Primary: `#8A4600` (light) / `#d79925` (dark)
- Font stack: Bebas Neue, Instrument Serif, Allison (self-hosted in public/fonts/)

## Restricciones
- **Package Manager**: pnpm (not npm)
- No levantes servidores ni hagas `builds`, simplemente avisa, que lo hará un humano.
- Si una página se está repitiendo mucho, contempla separarlo a un componente Astro.
