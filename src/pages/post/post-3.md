---
layout: ../../layouts/BlogLayout.astro
title: 'Two way by construction navegacion bar'
publishDate: 'November 24, 2025'
description: 'Two way by construction navegacion bar.'
author: 'Miguel Páez'
image:
  url: "https://docs.astro.build/assets/rose.webp"
  alt: "Ilustración de una barra de navegación responsive."
slug: "hamburger-menu"
icon: "pending"
readingTime: '5'
---
# Navbar Responsive con Menú Hamburguesa

Este es el **código completo (HTML + CSS + JS)** para una barra de navegación responsive que incluye menú hamburguesa en móviles.



## Código Completo

```html
<!-- ====== HTML ====== -->

<header class="navbar">
    <div class="logo">Mi Marca</div>
    
    <button class="hamburger" id="hamburger" aria-label="Abrir menú">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    </button>

    <nav class="nav-menu">
        <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#portafolio">Portafolio</a></li>
            <li><a href="#contacto">Contacto</a></li>
        </ul>
    </nav>
</header>

<main style="padding: 20px;">
    <h1>Contenido Principal</h1>
    <p>Ajusta el tamaño de la ventana para ver cómo el menú de navegación se colapsa en el icono de hamburguesa.</p>
</main>



<!-- ====== CSS ====== -->

<style>
:root {
    --primary-color: #333;
    --text-color: #fff;
    --hover-color: #575757;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: sans-serif;
    line-height: 1.6;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--primary-color);
    padding: 10px 20px;
}

.logo {
    color: var(--text-color);
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-menu ul {
    list-style: none;
    display: flex;
}

.nav-menu ul li a {
    color: var(--text-color);
    text-decoration: none;
    padding: 10px 15px;
    display: block;
    transition: background-color 0.3s;
}

.nav-menu ul li a:hover {
    background-color: var(--hover-color);
}

.hamburger {
    display: none;
    border: 0;
    background: none;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    position: relative;
    z-index: 1000;
}

.bar {
    display: block;
    width: 100%;
    height: 3px;
    background-color: var(--text-color);
    margin: 6px 0;
    transition: all 0.3s ease-in-out;
}

.hamburger:hover .bar:nth-child(2) {
    opacity: 0;
}

.hamburger:hover .bar:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
}

.hamburger:hover .bar:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
}

@media (max-width: 768px) {
    .hamburger {
        display: block;
    }

    .nav-menu {
        display: none;
        position: absolute;
        top: 58px;
        left: 0;
        width: 100%;
        background-color: var(--primary-color);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .nav-menu.active {
        display: block;
    }

    .nav-menu ul {
        flex-direction: column;
    }

    .nav-menu ul li a {
        padding: 15px 20px;
        border-bottom: 1px solid var(--hover-color);
    }

    .nav-menu ul li:last-child a {
        border-bottom: none;
    }
}
</style>



<!-- ====== JAVASCRIPT ====== -->

<script>
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const classhamburger = document.getElementsByClassName('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    console.log(classhamburger);

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
});
</script>

---

```html
<header class="navbar">
    <a href="#" class="logo">Mi Sitio</a>
    
    <nav class="nav-menu" id="navMenu">
        <a href="#">Inicio</a>
        <a href="#">Acerca de</a>
        <a href="#">Servicios</a>
        <a href="#">Contacto</a>
    </nav>

    <div class="hamburger" id="hamburger">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    </div>
</header>
```

```css
/* Estilos Globales y de la Barra de Navegación */
body {
    margin: 0;
    font-family: Arial, sans-serif;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    padding: 15px 20px;
    color: white;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    text-decoration: none;
}

.nav-menu a {
    color: white;
    text-decoration: none;
    padding: 0 15px;
    transition: color 0.3s;
}

.nav-menu a:hover {
    color: #ff9900;
}

/* Estilos del Icono de Hamburguesa */
.hamburger {
    display: none; /* Oculto en escritorio */
    cursor: pointer;
    padding: 5px;
}

.bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    background-color: white;
    transition: all 0.3s ease-in-out;
}

/* ------------------------------------- */
/* ESTILOS PARA LA VISTA MÓVIL (Menú Responsive) */
/* ------------------------------------- */
.hamburger.active .bar:nth-child(2) {
    opacity: 0;
}

.hamburger.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.hamburger.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}

@media screen and (max-width: 768px) {
    .hamburger {
        display: block;
    }

    .nav-menu {
        position: fixed;
        top: 60px;
        left: 100%;
        width: 100%;
        height: 100%;
        background-color: #222;
        flex-direction: column;
        text-align: center;
        transition: left 0.3s ease-in-out;
        padding: 20px 0;
    }

    .nav-menu.active {
        left: 0;
    }

    .nav-menu a {
        display: block;
        padding: 15px 0;
        border-bottom: 1px solid #444;
    }
    
    .nav-menu a:last-child {
        border-bottom: none;
    }
}
```

```javascript
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

const navLinks = navMenu.querySelectorAll('a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});
```
