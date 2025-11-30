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
│   │   ├── Construction404.astro# 404 / under construction component
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
│   │       ├── post-1.md
│   │       ├── post-2.md
│   │       ├── post-3.md
│   │       └── post-4.md
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

## 🎨 Design System

- **Primary Color**: `#d17f04` (Orange)
- **Fonts**: 
  - Bebas Neue (Headings)
  - Instrument Serif (Body text)
  - Allison (Accent text)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
