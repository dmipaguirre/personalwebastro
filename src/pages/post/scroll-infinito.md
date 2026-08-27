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
sizeLayout: "tall"
---
An infinite marquee works by placing two identical content blocks side by side and translating each block by its full width. When one leaves the viewport, the duplicate maintains the visual loop.

## HTML structure

```html
<div class="big-name">
  <div class="name-h1">
    <div class="name-wrap">
      <p>Duban Miguel Páez<span class="spacer">-</span></p>
    </div>
    <div class="name-wrap">
      <p>Duban Miguel Páez<span class="spacer">-</span></p>
    </div>
  </div>
</div>
```

## CSS animation

```css
.big-name {
   width: 100%;
   overflow: hidden;
}

.name-h1 {
   display: flex;
}

.name-wrap {
   animation: scroll-infinite 22s linear infinite;
}

p {
   pointer-events: none;
   display: flex;
   align-items: center;
   color: var(--color-white);
   line-height: 1;
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

Because the movement is decorative, disable it for people who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .name-wrap {
    animation: none;
  }
}
```
