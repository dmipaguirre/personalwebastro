# 🌟 Personal Portfolio

Personal portfolio of Miguel Páez, built with [Astro](https://astro.build). A static, fast and SEO-friendly website featuring a blog grouped by categories and an interactive 3D hero model.

## 🚀 Key Features

- ⚡ **Blazing Fast Performance** - Fully static site built with Astro
- 🎨 **Modern & Responsive Design** - CSS Grid layouts that adapt to mobile, tablet and desktop
- 🌗 **Light / Dark Theme** - Toggle persisted in `localStorage`, respecting `prefers-color-scheme`
- 🎯 **SEO Optimized** - Canonical URLs, Open Graph and Twitter Card metadata via `Seo.astro`
- 🧊 **Interactive 3D Hero** - Lazy-loaded Three.js viewer (`VoxelViewer.astro`) rendering a GLB model with OrbitControls on demand (only while visible or changing), keyboard rotation (arrow keys on focus), auto-disposing resources and honoring `prefers-reduced-motion`
- 📝 **Markdown Blog** - Articles written in Markdown, grouped into categories and rendered with a dedicated layout
- 🗂️ **Folder-style Blog Directory** - Categories shown as stacked folders with staggered tabs, a CSS-only radio switch, hover lift for background folders and a "bring to front" transition
- 🍞 **Breadcrumbs in Articles** - `Blog / Category / Title` navigation; the category crumb returns to the same folder in `/blog` via a `#hash`
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
│   │   │   ├── ArticleCard.astro  # Article preview row (index, date, title, tag, "Leer →")
│   │   │   ├── BlogDirectory.astro # Folder stage: stacked folders with tabs, one radio per category
│   │   │   └── BlogGrid.astro     # Scrollable viewer with fade masks and themed scrollbar
│   │   ├── icons/
│   │   │   └── SocialIcon.astro   # Social media SVG icons
│   │   ├── Breadcrumbs.astro    # Breadcrumb navigation (receives `items` as props)
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
│   │   ├── blogCategories.ts    # Category config, titleCategory map and getCategoryKey()
│   │   └── blogPosts.ts         # getAllPosts(), formatPostDate(), padIndex(), PostEntry/PostFrontmatter (+ legacy static data)
│   ├── layouts/
│   │   ├── Layout.astro         # Main layout: head, SEO, navbar, footer, theme boot
│   │   └── BlogLayout.astro     # Layout for individual blog posts (SEO, meta, breadcrumbs)
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
- `BlogDirectory.astro` discovers articles at build time with `import.meta.glob`, sorts them by `publishDate` and groups them into categories (`idiomas`, `tecnologia`, `escritos` — only non-empty folders are rendered). Category titles, headlines and the `titleCategory` map live in `src/data/blogCategories.ts`, shared with `BlogLayout.astro` so breadcrumb labels always match the directory.
- **Folder stage**: each category is a self-contained `.folder-unit` (tab + body) stacked with depth layers (`z-index` 10/20/30). Tabs are staggered left/center/right; a hidden radio per folder (`name="blog-folder"`) drives the selection with pure CSS (`:checked ~`). Only background folders lift on hover; clicking one brings it to front with a transition. Tabs rotate to the right edge below 768px.
- **Article rows** (`ArticleCard.astro`) use a 12-column grid: index + date, truncated title, category tag and "Leer →", with a subtle horizontal shift on hover. Card size comes only from the explicit `sizeLayout` metadata — never from the article's index.
- **Breadcrumbs**: `BlogLayout.astro` builds `Blog / <category> / <title>` from the frontmatter. The category crumb links to `/blog/#<category>`; a small script in `BlogDirectory.astro` reads the hash on load and selects that folder.

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
| `/blog`                  | Blog directory: stacked folders by category (supports `/blog/#tecnologia`, `/blog/#idiomas`, `/blog/#escritos`) |
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
- **Layout tokens**: `--page-max-width`, `--page-pad-x`, `--page-pad-y`, `--page-margin` shared by every section, plus `--ease-out` for motion
- **Folder palette**: `--color-white`, `--color-ink`, `--color-cream`, `--color-orange`, `--color-stone` feed the blog folder themes

## 📝 License

This project is open source and available under the MIT License.
