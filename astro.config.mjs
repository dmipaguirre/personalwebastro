// @ts-check
import { defineConfig } from 'astro/config';

const publicSiteUrl = process.env.PUBLIC_SITE_URL;
let site;

if (publicSiteUrl) {
  const parsedSite = new URL(publicSiteUrl);

  if (!['http:', 'https:'].includes(parsedSite.protocol)) {
    throw new Error('PUBLIC_SITE_URL must use the http or https protocol.');
  }

  if (parsedSite.username || parsedSite.password || parsedSite.search || parsedSite.hash) {
    throw new Error('PUBLIC_SITE_URL cannot include credentials, a query string, or a fragment.');
  }

  site = parsedSite.href;
}

// https://astro.build/config
export default defineConfig({
  site,
  redirects: {
    '/post/post-1': '/post/basic-linux-commands',
    '/post/post-2': '/post/responsive-web-design',
    '/post/post-3': '/post/hamburger-menu',
    '/post/post-4': '/post/scroll-infinito',
    '/post/post-5': '/post/css-inset-property',
  },
});
