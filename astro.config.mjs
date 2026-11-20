import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.peptidelabtest.org',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('licensed-peptides'),
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date('2026-11-20'),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', de: 'de', es: 'es', fr: 'fr', it: 'it' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
