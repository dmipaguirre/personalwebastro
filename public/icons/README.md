# Icons Folder

This folder contains SVG icons used throughout the site.

## Structure
- Place all SVG files directly in this folder
- Use descriptive names (e.g., `point.svg`, `calendar.svg`, `user.svg`)
- Icons are accessible via `/icons/filename.svg` in the project

## Usage in Astro
```astro
<!-- Direct SVG embedding -->
<img src="/icons/point.svg" alt="Point icon" width="14" height="14" />

<!-- Or inline SVG for better control -->
<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
  <!-- SVG content here -->
</svg>
```

## Recommended Sources
- [Tabler Icons](https://tabler-icons.io/) - Free, consistent icon set
- [Heroicons](https://heroicons.com/) - By Tailwind CSS team
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons
- [Feather Icons](https://feathericons.com/) - Simple, elegant icons
