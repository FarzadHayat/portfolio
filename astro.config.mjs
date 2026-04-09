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

  vite: {
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 3000,
    },
    optimizeDeps: {
      include: ["@keystatic/core"],
      exclude: ["@keystatic/astro"],
    },
  },

  output: "server",

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
  }),
});
