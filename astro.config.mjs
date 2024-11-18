// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react()
  ],
  experimental: {
    env: {
      schema: {
        GITHUB_SHA: envField.string({ context: "client", access: "public", optional: true }),
      }
    }
  }
});