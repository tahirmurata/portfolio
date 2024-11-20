// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: "https://muratahir.com",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react()
  ],
  experimental: {
    env: {
      schema: {
        CF_PAGES_COMMIT_SHA: envField.string({ context: "client", access: "public", optional: true }),
      }
    }
  }
});