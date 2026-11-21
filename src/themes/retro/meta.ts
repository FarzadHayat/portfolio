import type { ThemeMeta } from "../types";

export default {
  id: "retro",
  order: 10,
  name: "Retro 70s",
  tagline: "Sunset stripes and soft, chunky type",
  scheme: "light",
  fonts:
    "https://fonts.googleapis.com/css2?family=Caprasimo&family=Jost:wght@400;500;600&display=swap",
  preview: { bg: "#f5e1b5", surface: "#fdf3dc", accent: "#a3361b", text: "#3b1d0e" },
} satisfies ThemeMeta;
