// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true
  },
  site: "https://muratahir.com",
  trailingSlash: 'always',
  integrations: [
    sitemap({
      changefreq: "weekly",
      lastmod: new Date(),
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    react()
  ],
  env: {
    schema: {
      CF_PAGES_COMMIT_SHA: envField.string({ context: "client", access: "public", optional: true, default: "development" }),
    }
  }
});