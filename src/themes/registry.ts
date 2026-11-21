import type { ThemeMeta } from "./types";

const modules = import.meta.glob<{ default: ThemeMeta }>("./*/meta.ts", {
  eager: true,
});

export const themes: ThemeMeta[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.order - b.order);

export const themeIds = themes.map((t) => t.id);

export function getTheme(id: string | undefined | null): ThemeMeta | undefined {
  return themes.find((t) => t.id === id);
}

export function randomThemeId(): string {
  return themeIds[Math.floor(Math.random() * themeIds.length)];
}

/** Cookie that stores the visitor's theme. */
export const THEME_COOKIE = "design";
