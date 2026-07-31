# 🌟 Personal Portfolio

Welcome to my personal portfolio built with Astro! This modern, performant website showcases my work, skills, and experience in web development.

## 🚀 Key Features

- ⚡ **Blazing Fast Performance** - Built with Astro for optimal speed
- 🎨 **Modern & Responsive Design** - Looks great on all devices
- 🎯 **SEO Optimized** - Built with search engines in mind
- 🎨 **Custom Typography** - Featuring Bebas Neue and Instrument Serif
- 🌈 **Consistent Design System** - Cohesive look and feel throughout

## 🏗️ Project Structure

```
/
├── public/                      # Static public assets
│   ├── fonts/                   # Custom font files
│   ├── icons/                   # Icon assets
│   ├── images/                  # Image assets
│   └── favicon.svg              # Site favicon
│
├── src/
│   ├── assets/                  # Additional static assets (if needed)
│   ├── components/              # Reusable UI components
│   │   ├── ButtonColor.astro    # Theme switch (light/dark)
│   │   ├── ProjectsPlaceholder.astro # Projects placeholder
│   │   ├── Footer.astro         # Site footer
│   │   ├── Hero.astro           # Hero section for home page
│   │   ├── Navbar.astro         # Top navigation bar
│   │   ├── SectionAbout.astro   # About section
│   │   ├── SectionBlog.astro    # Blog section on home page
│   │   ├── SectionQuote.astro   # Quote / testimonial section
│   │   ├── SectionSkill.astro   # Skills section
│   │   └── icons/
│   │       └── IconSvg.astro    # SVG icon component
│   ├── data/                    # Data files and utilities
│   ├── layouts/                 # Layout templates
│   │   ├── Layout.astro         # Main site layout (header/footer)
│   │   └── BlogLayout.astro     # Layout for individual blog posts
│   ├── pages/                   # Application pages (file-based routing)
│   │   ├── about.astro          # About me page
│   │   ├── blog.astro           # Blog listing page
│   │   ├── index.astro          # Homepage
│   │   ├── projects.astro       # Projects showcase
│   │   └── post/                # Blog post markdown content
│   │       ├── basic-linux-commands.md
│   │       ├── css-inset-property.md
│   │       ├── hamburger-menu.md
│   │       ├── responsive-web-design.md
│   │       └── scroll-infinito.md
│   └── styles/
│       └── global.css           # Global styles and CSS variables (theme)
│
├── .gitignore                   # Git ignore file
├── astro.config.mjs             # Astro configuration
├── package.json                 # Project dependencies and scripts
├── pnpm-lock.yaml               # pnpm lockfile
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

## 🛠️ Available Commands

All commands are run from the root of the project:

| Command                | Action                                           |
|------------------------|--------------------------------------------------|
| `pnpm install`         | Install dependencies                             |
| `pnpm dev`             | Start development server at `localhost:4321`     |
| `pnpm build`           | Build for production to `./dist/`                |
| `pnpm preview`         | Preview production build locally                 |
| `pnpm astro ...`       | Run Astro CLI commands                          |
| `pnpm astro check`     | Check code for errors                            |
| `pnpm astro add`       | Add Astro integrations                          |

## Production URL

Set `PUBLIC_SITE_URL` to the final HTTPS origin before deploying. Astro uses it
to generate canonical and social metadata URLs.

```bash
PUBLIC_SITE_URL=https://example.com pnpm build
```

The configured legacy blog redirects produce static redirect pages. Configure
the same permanent redirects at the hosting provider once the deployment target
is selected so old URLs return HTTP 301 responses.

## 🎨 Design System

- **Primary Color**: `#d17f04` (Orange)
- **Fonts**: 
  - Bebas Neue (Headings)
  - Instrument Serif (Body text)
  - Allison (Accent text)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
