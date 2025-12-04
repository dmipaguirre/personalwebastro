---
layout: ../../layouts/BlogLayout.astro
title: 'Scrol infinito'
publishDate: 'November 24, 2025'
description: 'Scrol infinito.'
author: 'Miguel Páez'
slug: "hamburger-menu"
icon: "pending"
readingTime: '5'
---
# Scroll infinito

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


.big-name {
   width: 100%;
   overflow: hidden; /* IMPORTANTE: oculta lo que sale */
}

.name-h1 {
   display: flex;
 /* Ajusta al contenido */
}

.name-wrap {
   animation: scroll-infinite 22s linear infinite; /* Aquí la magia */
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

/* La animación */
@keyframes scroll-infinite {
   0% {
      transform: translateX(0);
   }
   100% {
      transform: translateX(-100%);
   }
}