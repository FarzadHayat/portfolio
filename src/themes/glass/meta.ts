import type { ThemeMeta } from "../types";

export default {
  id: "glass",
  order: 2,
  name: "Glass",
  tagline: "Frosted panes over a drifting dusk",
  scheme: "dark",
  fonts:
    "https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600&family=Unbounded:wght@500&display=swap",
  preview: { bg: "#0c0a24", surface: "#2a2266", accent: "#7cf2e2", text: "#f6f4ff" },
} satisfies ThemeMeta;
