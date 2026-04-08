// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://farzadhayat.dev",
  integrations: [react(), mdx(), markdoc(), keystatic()],

  redirects: {
    "/resume": "/resume.pdf",
  },

  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["@keystatic/core", "@keystatic/astro"],
    },
  },

  output: "server",

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
