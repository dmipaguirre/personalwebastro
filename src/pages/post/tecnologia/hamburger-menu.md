---
layout: ../../../layouts/BlogLayout.astro
title: 'Building a Responsive Hamburger Menu'
publishDate: '2025-11-24'
description: 'Two practical approaches to building a responsive navigation bar with a hamburger menu for small screens.'
author: 'Miguel Páez'
image:
  url: "/images/social-card.avif"
  alt: "Miguel Páez web development notes."
icon: "pending"
readingTime: '5'
sizeLayout: "tall"
titleCategory: "CSS Hamburger"
---

Creating a responsive navigation bar is a fundamental skill in modern web development. The "hamburger menu" is the standard pattern for collapsing complex navigation into a single icon on small screens to preserve screen real estate.

In this guide, I'll walk you through two different implementation strategies: a **simple dropdown** and an **off-canvas side menu**.

## Approach 1: Simple Dropdown Menu

This approach is ideal for smaller sites. The menu simply expands vertically below the navbar when the hamburger icon is clicked.

### HTML Structure
We use a `<button>` for the hamburger to ensure accessibility, and a `<nav>` element to wrap our links.

```html
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
```

### Styling the Layout
The key here is using a media query to switch the `.nav-menu` from a horizontal flexbox to a hidden absolute-positioned block.

```css
:root {
    --primary-color: #333;
    --text-color: #fff;
    --hover-color: #575757;
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

/* Hamburger Animation */
.hamburger.active .bar:nth-child(2) { opacity: 0; }
.hamburger.active .bar:nth-child(1) { transform: translateY(9px) rotate(45deg); }
.hamburger.active .bar:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }

@media (max-width: 768px) {
    .hamburger { display: block; }

    .nav-menu {
        display: none;
        position: absolute;
        top: 58px;
        left: 0;
        width: 100%;
        background-color: var(--primary-color);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .nav-menu.active { display: block; }

    .nav-menu ul { flex-direction: column; }

    .nav-menu ul li a {
        padding: 15px 20px;
        border-bottom: 1px solid var(--hover-color);
    }
}
```

### JavaScript Logic
We simply toggle the `.active` class on both the button and the menu.

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

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
```

## Approach 2: Off-Canvas Side Menu

For a more modern feel, an off-canvas menu slides in from the side of the screen, covering a portion of the content.

### HTML Structure
Similar to the first approach, but we'll use IDs for more direct targeting in JS.

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

### Styling the Off-Canvas Effect
The magic happens with `position: fixed` and `left: 100%`. When the `.active` class is added, we move it to `left: 0`.

```css
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

.hamburger {
    display: none;
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

/* Hamburger Animation */
.hamburger.active .bar:nth-child(2) { opacity: 0; }
.hamburger.active .bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.hamburger.active .bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

@media screen and (max-width: 768px) {
    .hamburger { display: block; }

    .nav-menu {
        position: fixed;
        top: 60px;
        left: 100%;
        width: 100%;
        height: 100%;
        background-color: #222;
        display: flex;
        flex-direction: column;
        text-align: center;
        transition: left 0.3s ease-in-out;
        padding: 20px 0;
    }

    .nav-menu.active { left: 0; }

    .nav-menu a {
        display: block;
        padding: 15px 0;
        border-bottom: 1px solid #444;
    }
}
```

### JavaScript Logic
The JS remains straightforward: toggle classes and update accessibility attributes.

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

## Best Practices & Accessibility

While these examples cover the layout mechanics, keep these points in mind for production:

1. **Focus Management**: When the menu closes, return the keyboard focus to the hamburger button.
2. **Keyboard Navigation**: Ensure that users cannot "tab" into links that are hidden off-screen. You can use `visibility: hidden` or `display: none` when the menu is closed.
3. **Aria Attributes**: Always update `aria-expanded` to let screen readers know if the menu is open or closed.
4. **Body Lock**: Consider adding `overflow: hidden` to the `body` tag when the off-canvas menu is open to prevent the background from scrolling.
