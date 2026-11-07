# 🌟 Personal Portfolio

Personal portfolio of Miguel Páez, built with [Astro](https://astro.build). A static, fast and SEO-friendly website featuring a blog grouped by categories and an interactive 3D hero model.

## 🚀 Key Features

- ⚡ **Blazing Fast Performance** - Fully static site built with Astro
- 🎨 **Modern & Responsive Design** - CSS Grid layouts that adapt to mobile, tablet and desktop
- 🌗 **Light / Dark Theme** - Toggle persisted in `localStorage`, respecting `prefers-color-scheme`
- 🎯 **SEO Optimized** - Canonical URLs, Open Graph and Twitter Card metadata via `Seo.astro`
- 🧊 **Interactive 3D Hero** - Lazy-loaded Three.js viewer (`VoxelViewer.astro`) rendering a GLB model with OrbitControls, auto-disposing resources and honoring `prefers-reduced-motion`
- 📝 **Markdown Blog** - Articles written in Markdown, grouped into categories and rendered with a dedicated layout
- 🔤 **Custom Typography** - Self-hosted Jost, Inter, Allison and Fira Code fonts (woff2, preloaded)

## 🏗️ Project Structure

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

## 🗄️ Content & Data

- **Blog articles** live as Markdown files in `src/pages/post/<categoria>/*.md`, so each file generates its own route at `/post/<categoria>/<slug>` and declares its layout (`BlogLayout.astro`) in the frontmatter.
- **Frontmatter schema** (validated in `src/content/content.config.ts`): `title`, `publishDate`, `description` are required; `author`, `icon`, `readingTime`, `titleCategory`, `image` and `sizeLayout` (`wide` | `tall` | `featured`) have sensible defaults or are optional.
- `BlogDirectory.astro` discovers articles at build time with `import.meta.glob`, sorts them by `publishDate` and groups them into categories (`tecnologia`, `idiomas`) with a title and description. Card size comes only from the explicit `sizeLayout` metadata — never from the article's index.

## 🛠️ Available Commands

All commands are run from the root of the project (package manager: **pnpm**):

| Command                | Action                                           |
|------------------------|--------------------------------------------------|
| `pnpm install`         | Install dependencies                             |
| `pnpm dev`             | Start development server at `localhost:4321`     |
| `pnpm build`           | Build for production to `./dist/`                |
| `pnpm preview`         | Preview production build locally                 |
| `pnpm check`           | Check code for errors (`astro check`)            |
| `pnpm astro ...`       | Run Astro CLI commands                          |

## 🌐 Routes

| Route                    | Description                        |
|--------------------------|------------------------------------|
| `/`                      | Homepage: hero, skills, quote      |
| `/about`                 | About me: experience and interests |
| `/blog`                  | Blog directory grouped by category |
| `/projects`              | Projects (placeholder, `noindex`)  |
| `/post/<categoria>/<slug>` | Individual blog article          |

## Production URL

Set `PUBLIC_SITE_URL` to the final HTTPS origin before deploying. Astro uses it
to generate canonical and social metadata URLs.

```bash
PUBLIC_SITE_URL=https://example.com pnpm build
```

The configured legacy blog redirects (`/post/post-1` … `/post/post-5`) produce
static redirect pages. Configure the same permanent redirects at the hosting
provider once the deployment target is selected so old URLs return HTTP 301
responses.

## 🎨 Design System

Defined as CSS variables in `src/styles/global.css`:

- **Light theme**: primary `#8A4600`, text `#0e0d0d`, background `#f1ede9`
- **Dark theme** (`.darkmode`): primary `#f59e0b`, text `#ebe4e4`, background `#0f0f0f`
- **Fonts**:
  - Jost (Headings)
  - Inter (Body text)
  - Allison (Accent text)
  - Fira Code (Code)
- **Fluid typographic scale** built with `clamp()` (`--fs-display` … `--fs-sm`)

## 📝 License

This project is open source and available under the MIT License.
