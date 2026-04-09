# Color Theme Design: Dusk Ghost

**Date:** 2026-04-09  
**Status:** Approved

## Overview

Replace the six generic DaisyUI themes (light, dark, synthwave, retro, valentine, dim) with two custom themes that reflect the portfolio's ghostly/spectral personality. The themes are named **specter** (dark) and **wisp** (light).

The design was inspired by the existing interactive features: the floating GhostPet, SpectralBackground mesh, and CustomCursor — all of which established an ethereal, slightly otherworldly aesthetic. The chosen direction is "Dusk Ghost": violet-to-teal gradient accents on deep ink (dark) and lavender-tinted whites (light).

## Theme Definitions

### specter (dark)

DaisyUI custom theme. Registered as the preferred dark mode theme.

| Token | Hex | OKLCH (approx) | Role |
|---|---|---|---|
| `--color-base-100` | `#090914` | `oklch(8% 0.025 270)` | Page background |
| `--color-base-200` | `#0e0e1c` | `oklch(11% 0.03 272)` | Cards, surfaces |
| `--color-base-300` | `#141428` | `oklch(15% 0.04 270)` | Borders, dividers |
| `--color-base-content` | `#c4b5fd` | `oklch(80% 0.1 285)` | Body text (lavender) |
| `--color-primary` | `#7c3aed` | `oklch(52% 0.22 285)` | Primary buttons, links |
| `--color-primary-content` | `#ede9fe` | `oklch(94% 0.02 285)` | Text on primary |
| `--color-secondary` | `#6366f1` | `oklch(55% 0.19 264)` | Secondary actions |
| `--color-secondary-content` | `#e0e7ff` | `oklch(93% 0.02 264)` | Text on secondary |
| `--color-accent` | `#0d9488` | `oklch(58% 0.12 192)` | Highlights, tags |
| `--color-accent-content` | `#f0fdfa` | `oklch(97% 0.01 192)` | Text on accent |
| `--color-neutral` | `#1c1c38` | `oklch(18% 0.04 270)` | Neutral surfaces |
| `--color-neutral-content` | `#a5b4fc` | `oklch(75% 0.08 270)` | Text on neutral |

Gradient accent (used on CTAs): `linear-gradient(90deg, #7c3aed, #0d9488)`

### wisp (light)

DaisyUI custom theme. Registered as the default (light) theme.

| Token | Hex | OKLCH (approx) | Role |
|---|---|---|---|
| `--color-base-100` | `#f8f7ff` | `oklch(97% 0.01 285)` | Page background (lavender-tinted white) |
| `--color-base-200` | `#eeeaff` | `oklch(93% 0.015 285)` | Cards, surfaces |
| `--color-base-300` | `#ddd6fe` | `oklch(88% 0.025 285)` | Borders, dividers |
| `--color-base-content` | `#1e1b4b` | `oklch(20% 0.07 270)` | Body text (deep indigo) |
| `--color-primary` | `#4f46e5` | `oklch(50% 0.19 264)` | Primary buttons, links |
| `--color-primary-content` | `#ffffff` | `oklch(100% 0 0)` | Text on primary |
| `--color-secondary` | `#7c3aed` | `oklch(52% 0.22 285)` | Secondary actions |
| `--color-secondary-content` | `#ffffff` | `oklch(100% 0 0)` | Text on secondary |
| `--color-accent` | `#0d9488` | `oklch(58% 0.12 192)` | Highlights, tags |
| `--color-accent-content` | `#ffffff` | `oklch(100% 0 0)` | Text on accent |
| `--color-neutral` | `#312e81` | `oklch(28% 0.1 270)` | Neutral surfaces |
| `--color-neutral-content` | `#f8f7ff` | `oklch(97% 0.01 285)` | Text on neutral |

Gradient accent (used on CTAs): `linear-gradient(90deg, #4f46e5, #0d9488)`

## Files to Change

### 1. `src/styles/global.css`

Remove the six built-in DaisyUI themes from the `@plugin "daisyui"` block. Add two `@plugin "daisyui/theme"` blocks defining `specter` and `wisp`.

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@plugin "daisyui" {
  themes: wisp --default, specter --prefersdark;
}

@plugin "daisyui/theme" {
  name: "specter";
  color-scheme: dark;
  --color-base-100: oklch(8% 0.025 270);
  --color-base-200: oklch(11% 0.03 272);
  --color-base-300: oklch(15% 0.04 270);
  --color-base-content: oklch(80% 0.1 285);
  --color-primary: oklch(52% 0.22 285);
  --color-primary-content: oklch(94% 0.02 285);
  --color-secondary: oklch(55% 0.19 264);
  --color-secondary-content: oklch(93% 0.02 264);
  --color-accent: oklch(58% 0.12 192);
  --color-accent-content: oklch(97% 0.01 192);
  --color-neutral: oklch(18% 0.04 270);
  --color-neutral-content: oklch(75% 0.08 270);
}

@plugin "daisyui/theme" {
  name: "wisp";
  color-scheme: light;
  --color-base-100: oklch(97% 0.01 285);
  --color-base-200: oklch(93% 0.015 285);
  --color-base-300: oklch(88% 0.025 285);
  --color-base-content: oklch(20% 0.07 270);
  --color-primary: oklch(50% 0.19 264);
  --color-primary-content: oklch(100% 0 0);
  --color-secondary: oklch(52% 0.22 285);
  --color-secondary-content: oklch(100% 0 0);
  --color-accent: oklch(58% 0.12 192);
  --color-accent-content: oklch(100% 0 0);
  --color-neutral: oklch(28% 0.1 270);
  --color-neutral-content: oklch(97% 0.01 285);
}
```

### 2. `src/components/ThemeToggle.astro`

Update the two theme name constants:

```js
const lightThemeName = "wisp";
const darkThemeName = "specter";
```

### 3. `src/content/general/index.yaml`

Set `enableThemeSelector: false` so the simpler ThemeToggle (sun/moon icon) is shown rather than the dropdown. With only two themes, a dropdown is unnecessary.

### 4. `src/components/ThemeSelector.astro`

Update the themes array to only list `specter` and `wisp` (keeps the component consistent even while disabled):

```js
const themes = [
  { value: "wisp", label: "Wisp (Light)" },
  { value: "specter", label: "Specter (Dark)" },
];
```

## What Is Not Changing

- No component layout changes
- No typography changes
- No new components are added

## Success Criteria

1. Both themes render correctly with no unstyled or default-coloured elements
2. Theme toggle (sun/moon) switches between wisp and specter correctly and persists across page navigations via `localStorage`
3. The SpectralBackground mesh uses the new primary color (violet glow on dark, indigo on light)
4. The site no longer references the old theme names (light, dark, synthwave, retro, valentine, dim) anywhere
