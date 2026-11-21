import type { ThemeMeta } from "../types";

export default {
  id: "terminal",
  order: 6,
  name: "Terminal",
  tagline: "Tiled windows, mono type, a blinking cursor",
  scheme: "dark",
  fonts:
    "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Martian+Mono:wdth,wght@87.5,700&display=swap",
  preview: { bg: "#10131a", surface: "#1f2431", accent: "#8fd6a2", text: "#d8dce6" },
} satisfies ThemeMeta;
