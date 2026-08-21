---
layout: ../../layouts/BlogLayout.astro
title: 'A Guide to Responsive Web Design'
publishDate: '2025-11-19'
description: 'Learn how Flexbox and CSS Grid adapt page layouts across desktop, tablet, and mobile screens.'
author: 'Miguel Páez'
image:
  url: "/images/social-card.png"
  alt: "Miguel Páez web development notes."
icon: "layout"
readingTime: '4'
---


As tablets, smartphones, and laptops have become ubiquitous, modern websites must adapt to screens with different sizes and resolutions.

Flexbox and CSS Grid provide complementary ways to organize content and redistribute it according to the available space.

## What are Flexbox and CSS Grid?

Flexbox is designed for one-dimensional layouts arranged in a row or column. CSS Grid controls rows and columns together, making it a better fit for broader page structures. Both can be combined with media queries to change a layout at meaningful breakpoints.

## Building the layout with Flexbox

CSS structure:


```astro
* {
  box-sizing: border-box;
}

body {
  display: flex;
  flex-wrap: wrap;
}

.left {
  background-color: #2196F3;
  padding: 20px;
  flex: 0 0 20%;
}

.main {
  background-color: #f1f1f1;
  padding: 20px;
  flex: 0 0 60%;
}

.right {
  background-color: #04AA6D;
  padding: 20px;
  flex: 0 0 20%;
}

@media screen and (max-width: 800px) {
  .left, .main, .right {
    flex: 0 0 100%;
  }
}
```
HTML structure:

```astro
<div class="left">
  <p>Left Menu</p>
</div>
<div class="main">
  <p>Main Content</p>
</div>
<div class="right">
  <p>Right Content</p>
</div>
```


## Building the layout with CSS Grid

CSS structure:

```astro
* {
  box-sizing: border-box;
}

body {
  display: grid;
  grid-template-columns: 20% 60% 20%;
}

.left {
  background-color: #2196F3;
  padding: 20px;
}

.main {
  background-color: #f1f1f1;
  padding: 20px;
}

.right {
  background-color: #04AA6D;
  padding: 20px;
}

@media screen and (max-width: 800px) {
  body {
    grid-template-columns: 100%;
  }
}
```
HTML structure:

```astro
<div class="left">
  <p>Left Menu</p>
</div>
<div class="main">
  <p>Main Content</p>
</div>
<div class="right">
  <p>Right Content</p>
</div>
```

## Choosing between them

Use Flexbox when content primarily flows along one axis. Use Grid when rows and columns need to align as a system. The best responsive layouts often use both tools at different levels of the page.
