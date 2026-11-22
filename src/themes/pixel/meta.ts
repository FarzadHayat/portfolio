import type { ThemeMeta } from "../types";

export default {
  id: "pixel",
  order: 8,
  name: "Pixel Art",
  tagline: "An 8-bit night with menu cursors and dialog boxes",
  scheme: "dark",
  fonts:
    "https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;600&family=Silkscreen:wght@400;700&display=swap",
  preview: { bg: "#12162e", surface: "#1f2750", accent: "#ffcc3d", text: "#f3ecd9" },
} satisfies ThemeMeta;
