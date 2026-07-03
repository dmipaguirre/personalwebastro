# AGENTS.md - Personal Web Astro

## Stack
- **Framework**: Astro 5.x
- **Package Manager**: pnpm (not npm)
- **Language**: TypeScript (strict mode)
- **Styling**: Plain CSS with CSS variables (no preprocessor)

## Commands
```bash
pnpm install      # Install dependencies
pnpm dev          # Dev server at localhost:4321
pnpm build        # Production build to ./dist/
pnpm preview      # Preview production build
pnpm astro check  # TypeScript type checking
pnpm astro add    # Add integrations
```

## Project Structure
- Blog posts: Markdown files in `src/pages/post/` (not a content collection)
- Components: `src/components/*.astro`
- Layouts: `src/layouts/Layout.astro`, `BlogLayout.astro`
- Styles: `src/styles/global.css` (CSS variables for theming)

## Path Aliases
- `@/*` maps to `src/*` (configured in tsconfig.json)

## Important Config
- **Site URL**: `astro.config.mjs` currently has no `site` property. Set it before adding sitemap/RSS integrations.
- **Domain needed**: Before deploying, set `site: 'https://yourdomain.com'` in astro.config.mjs

## Design Tokens (global.css)
- Primary: `#8A4600` (light) / `#d79925` (dark)
- Font stack: Bebas Neue, Instrument Serif, Allison (self-hosted in public/fonts/)
