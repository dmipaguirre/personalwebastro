---
layout: ../../layouts/BlogLayout.astro
title: 'A Guide to Responsive Web Design'
publishDate: 'November 19, 2025'
description: 'Responsive Web Design with Flexbox and Grid'
author: 'Miguel Páez'
image:
  url: "../images/Responsive.png"
  alt: "The Astro logo on a dark background with a pink glow."
slug: "responsive-web-design"
icon: "layout"
readingTime: '4'
---


Con el creciente auge de dispositivos electrónicos como tablets, smartphones y computadores portátiles, el diseño web moderno debe adaptarse a pantallas de diferentes tamaños y resoluciones. 

Dentro del desarrollo web, especialmente en el diseño responsivo, existen técnicas que permiten adaptar la estructura de un sitio utilizando propiedades de CSS como Flexbox y CSS Grid. Ambas herramientas facilitan la organización del contenido y su redistribución según el tamaño del dispositivo.

## ¿Qué son Flexbox y CSS Grid?



## Comportamiento de cajas utilizando Flexbox


Estructura del nuestro documento CSS:


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
Estructura de nuestro documento HTML:

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


## Comportamiento de cajas con propiedades CSS Grid
Estructura de nuestro documento CSS:

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
Estructura de nuestro documento HTML:

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
