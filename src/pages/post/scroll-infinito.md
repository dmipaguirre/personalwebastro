---
layout: ../../layouts/BlogLayout.astro
title: 'Creating an Infinite Scrolling Text Marquee'
publishDate: '2025-11-24'
description: 'Create a seamless horizontal text marquee with duplicated content and a lightweight CSS animation.'
author: 'Miguel Páez'
image:
  url: "/images/social-card.png"
  alt: "Miguel Páez web development notes."
icon: "pending"
readingTime: '2'
titleCategory: "CSS Animation"
---

The infinite marquee is a visually striking design pattern used to showcase brands, testimonials, or key headings. While it might look complex, the logic behind it is surprisingly simple: **visual duplication**.

To create a seamless loop, we place two identical content blocks side-by-side. As the first block slides out of view, the second block takes its place perfectly, creating the illusion of a never-ending stream of text.

## The HTML Structure

The secret is in the repetition. We create a container (`.name-h1`) that holds two identical wrappers (`.name-wrap`). 

```html
<div class="big-name">
  <div class="name-h1">
    <!-- First occurrence -->
    <div class="name-wrap">
      <p>Duban Miguel Páez<span class="spacer">-</span></p>
    </div>
    <!-- Duplicate occurrence for seamless looping -->
    <div class="name-wrap">
      <p>Duban Miguel Páez<span class="spacer">-</span></p>
    </div>
  </div>
</div>
```

## The CSS Magic

We use `display: flex` to keep the blocks side-by-side and `overflow: hidden` on the parent to prevent the page from growing horizontally. The animation translates the blocks by `-100%` of their own width.

```css
.big-name {
   width: 100%;
   overflow: hidden;
}

.name-h1 {
   display: flex;
}

.name-wrap {
   /* The animation duration (22s) controls the speed */
   animation: scroll-infinite 22s linear infinite;
}

p {
   display: flex;
   align-items: center;
   color: var(--color-white);
   line-height: 1;
   /* Responsive font size using max() */
   font-size: max(9em, 15vw);
   white-space: nowrap;
   pointer-events: none;
   margin: 0;
   padding: 0;
}

.name-wrap .spacer {
   padding: 0 3vw;
}

@keyframes scroll-infinite {
   0% {
      transform: translateX(0);
   }
   100% {
      transform: translateX(-100%);
   }
}
```

## Accessibility: Respecting User Preferences

Continuous movement can be distracting or even cause nausea for some users. It is a best practice to disable animations for users who have enabled "Reduced Motion" in their system settings.

```css
@media (prefers-reduced-motion: reduce) {
  .name-wrap {
    animation: none;
  }
}
```

### Key Takeaways
- **Duplication**: You need at least two identical blocks to avoid a "jump" when the animation resets.
- **Linear Timing**: Use `linear` instead of `ease` to ensure the scroll speed remains constant.
- **Performance**: Using `transform: translateX()` is significantly more performant than animating `left` or `margin`, as it leverages the GPU.
