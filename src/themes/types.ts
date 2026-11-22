export interface ThemeMeta {
  /** Folder name and value of html[data-design]. */
  id: string;
  /** Short name shown in the theme picker. */
  name: string;
  /** One short line shown under the name in the picker. */
  tagline: string;
  /** Sets browser UI (scrollbars, form controls) and data-scheme. */
  scheme: "light" | "dark";
  /** Position in the picker. */
  order: number;
  /** Google Fonts css2 URL for this theme, or omit for none. */
  fonts?: string;
  /** Colors for the picker thumbnail and <meta name="theme-color">. */
  preview: { bg: string; surface: string; accent: string; text: string };
}
