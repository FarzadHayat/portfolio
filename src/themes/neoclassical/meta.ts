import type { ThemeMeta } from "../types";

export default {
  id: "neoclassical",
  order: 7,
  name: "Neoclassical",
  tagline: "Marble, gilt and Roman capitals",
  scheme: "light",
  fonts:
    "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap",
  preview: { bg: "#ebeae6", surface: "#f8f7f4", accent: "#7a5a16", text: "#23252a" },
} satisfies ThemeMeta;
