// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Canonical URL used for SEO tags, sitemap.xml and robots.txt.
// Priority: SITE_URL (set it once you have a custom domain) → Netlify's own URL → fallback.
const site = process.env.SITE_URL || process.env.URL || 'https://lop3z.netlify.app';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'always',
  },
  image: {
    responsiveStyles: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
