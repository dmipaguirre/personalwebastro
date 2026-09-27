---
layout: ../../layouts/BlogLayout.astro
title: 'Building a Responsive Hamburger Menu'
publishDate: '2025-11-24'
description: 'Two practical approaches to building a responsive navigation bar with a hamburger menu for small screens.'
author: 'Miguel Páez'
image:
  url: "/images/social-card.png"
  alt: "Miguel Páez web development notes."
icon: "pending"
readingTime: '5'
sizeLayout: "tall"
titleCategory: "CSS Hamburger"
---

This article presents two compact ways to build a responsive navigation bar that collapses into a hamburger menu on small screens.



## Approach one: a compact complete example

```html
<!-- ====== HTML ====== -->

<header class="navbar">
    <div class="logo">My Brand</div>
    
    <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    </button>

    <nav class="nav-menu">
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
</header>

<main style="padding: 20px;">
    <h1>Main content</h1>
    <p>Resize the window to see the navigation collapse into a hamburger icon.</p>
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
        hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
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

```

## Approach two: an off-canvas menu

```html
<header class="navbar">
    <a href="#" class="logo">My Site</a>
    
    <nav class="nav-menu" id="navMenu">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
    </nav>

    <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    </button>
</header>
```

```css
/* Global and navigation styles */
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

/* Hamburger icon */
.hamburger {
    display: none; /* Hidden on desktop */
    border: 0;
    background: transparent;
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
/* Responsive mobile menu */
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
    hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
});

const navLinks = navMenu.querySelectorAll('a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});
```

These examples focus on the layout mechanics. In production, also return focus when the menu closes and prevent hidden links from remaining in the keyboard tab order.
