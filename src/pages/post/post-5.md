---
layout: ../../layouts/BlogLayout.astro
title: 'Understanding the inset property in CSS'
publishDate: 'December 17, 2025'
description: 'Understanding the inset property in CSS.'
author: 'Miguel Páez'
image:
  url: "https://docs.astro.build/assets/rose.webp"
  alt: "The Astro logo on a dark background with a pink glow."
slug: ""
icon: "pending"
readingTime: '5'
---

The inset keyword is one of the most powerful and modern CSS shortcuts. It can be confusing because it functions both as a value function and a shorthand property, leading to very different effects.

## 1. `inset()` as a FUNCTION — Defining Shapes

In this context, `inset()` is a geometric function that defines a rectangle. Its primary use is with the `clip-path` property.

| Property  | Function                       | Primary Use                                |
|-----------|--------------------------------|--------------------------------------------|
| `clip-path` | `inset(top right bottom left)` | Creates a rectangular mask over the element. Everything outside that rectangle becomes invisible. |
**Example:**

```css
/* Rectangular mask with rounded top corners */
clip-path: inset(0 round 2rem 2rem 0 0);
```

**Quick explanation:**
- `inset(0)`: a rectangle that exactly matches the element's bounds.
- `round`: makes the rectangle's corners rounded.
- `2rem 2rem 0 0`: applies a 2rem radius to the top-left and top-right corners; the bottom corners remain 0.

## 2. `inset` as a PROPERTY — Positioning Shorthand

This is the most common usage: `inset` is a shorthand property that replaces `top`, `right`, `bottom`, and `left` for positioned elements (`absolute`, `fixed`, or `sticky`).

**Syntax and equivalences:**

```css
/* 1 value */
inset: 10px; /* top:10px; right:10px; bottom:10px; left:10px; */

/* 2 values */
inset: 10px 20px; /* top/bottom:10px; left/right:20px; */

/* 4 values */
inset: 10px 20px 30px 40px; /* top:10px; right:20px; bottom:30px; left:40px; */
```

**Typical use case — Full-page overlay:**

```css
.ModalOverlay {
  position: fixed;
  /* Fills the viewport with a fixed 50px margin */
  inset: 50px;
  background: rgba(0, 0, 0, 0.7);
}
```

**Critical rule — Dimension conflict**

When `inset` is used with `position: absolute` (or `fixed`), if opposite values are specified (top+bottom or left+right), **the browser stretches the element to maintain those offsets** and **ignores** any explicit `width` or `height`.

**When `inset` wins (stretching):**
- Defining `top` and `bottom` with fixed values forces an implicit height.
- Defining `left` and `right` with fixed values forces an implicit width.

## Design examples

**Goal: center a fixed-size element (80×40)**

```css
/* Incorrect — causes stretching */
.element {
  position: absolute;
  inset: 50px 100px; /* this sets top+bottom and left+right per the shorthand */
  width: 80px; /* ignored when top+bottom are defined */
  height: 40px; /* ignored when left+right are defined */
}

/* Correct — centered with fixed size */
.element-centered {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 40px;
  transform: translate(-50%, -50%);
}
```

**Goal: fill an area with a fixed margin**

```css
.area-fill {
  position: absolute;
  inset: 0; /* omit explicit width/height */
  /* or */
  inset: 50px; /* will leave a 50px margin on all sides */
}
```

## Conclusion

- Use `inset()` (function) when you need to define shapes and masks (e.g. `clip-path`).
- Use `inset` (property) when you want to control positional offsets concisely.
- Avoid combining `inset` that fixes both axes with explicit dimensions if you don't want the element to stretch.