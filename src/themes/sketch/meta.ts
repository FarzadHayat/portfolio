import type { ThemeMeta } from "../types";

export default {
  id: "sketch",
  order: 9,
  name: "Sketchbook",
  tagline: "Pencil and marker on paper",
  scheme: "light",
  fonts:
    "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Kalam:wght@400;700&display=swap",
  preview: { bg: "#fafaf6", surface: "#ffffff", accent: "#263aa8", text: "#24272d" },
} satisfies ThemeMeta;
