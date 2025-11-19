---
layout: ../../layouts/BlogLayout.astro
title: 'A way to Responsive Web Design'
publishDate: 'Noviember 19, 2025'
description: 'Responsive Web Design with Flexbox and Grid'
autor: 'Miguel Páez'
slug: "--"
icon: "---"
readingTime: 'Pendiente'
---

Con el creciente auge de los dispositivos electrónicos, como tablet, smartphone y computadoras portatiles 

Dentro del mundo del desarrollo web, mas específicamente dentro del diseño responsivo, existen alternativas que permiten estructurar los cambios en el diseño con propiedades CSS como lo son las propiedades Flexbox o CSS Grid.

## Pongamos un poco en contexto que significan propiedades Flexbox y CSS Grid.



## Comportamiento de cajas con propiedades Flebox

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

npx ttf2woff ./src/fonts/InstrumentSerif-Regular.ttf ./src/fonts/InstrumentSerif-Regular.woff