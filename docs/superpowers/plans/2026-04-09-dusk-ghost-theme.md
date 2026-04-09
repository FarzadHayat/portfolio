# Dusk Ghost Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the six generic DaisyUI themes with two custom themes — "specter" (dark) and "wisp" (light) — that match the portfolio's ghostly/spectral personality.

**Architecture:** DaisyUI v5 custom themes are defined via `@plugin "daisyui/theme"` blocks in global.css using OKLCH color tokens. The ThemeToggle component uses a sun/moon checkbox that writes `data-theme` to the `<html>` element and persists the choice in `localStorage`. The ThemeSelector dropdown is disabled via a content YAML flag since only two themes exist.

**Tech Stack:** Astro 5, DaisyUI 5, Tailwind CSS 4 (OKLCH colors), Keystatic CMS (YAML content)

---

## File Map

| File | Change |
|---|---|
| `src/styles/global.css` | Replace 6 built-in themes with 2 custom `@plugin "daisyui/theme"` blocks |
| `src/components/ThemeToggle.astro` | Update `lightThemeName`, `darkThemeName` constants + checkbox value |
| `src/components/ThemeSelector.astro` | Update themes array + JS fallback strings |
| `src/content/general/index.yaml` | Set `enableThemeSelector: false` |

---

### Task 1: Define custom themes in global.css

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Replace the daisyui themes list and add custom theme blocks**

Open `src/styles/global.css`. It currently reads:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@plugin "daisyui" {
  themes:
    light --default,
    dark --prefersdark,
    synthwave,
    retro,
    valentine,
    dim;
}
```

Replace the entire file contents with:

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

- [ ] **Step 2: Verify the build succeeds**

```bash
cd /home/farzad/portfolio && npm run build
```

Expected: Build completes with no errors. If DaisyUI reports unknown theme tokens, check that the `@plugin "daisyui/theme"` block syntax matches DaisyUI v5 docs (name as a bare identifier, not quoted).

- [ ] **Step 3: Verify old theme names are gone from global.css**

```bash
grep -n "synthwave\|retro\|valentine\|\bdim\b\|\"light\"\|\"dark\"" src/styles/global.css
```

Expected: No output.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: define specter and wisp custom DaisyUI themes"
```

---

### Task 2: Update ThemeToggle to use new theme names

**Files:**
- Modify: `src/components/ThemeToggle.astro`

- [ ] **Step 1: Update the checkbox value and theme name constants**

In `src/components/ThemeToggle.astro`, make the following three changes:

Change the checkbox `value` attribute (line 6):
```html
<!-- Before -->
<input type="checkbox" class="theme-controller" value="dark" />

<!-- After -->
<input type="checkbox" class="theme-controller" value="specter" />
```

Change the two JS constants (lines 32–33):
```js
// Before
const lightThemeName = "light";
const darkThemeName = "dark";

// After
const lightThemeName = "wisp";
const darkThemeName = "specter";
```

- [ ] **Step 2: Verify the build still succeeds**

```bash
cd /home/farzad/portfolio && npm run build
```

Expected: Clean build, no errors.

- [ ] **Step 3: Verify no stale theme names remain in ThemeToggle**

```bash
grep -n '"light"\|"dark"\|value="dark"' src/components/ThemeToggle.astro
```

Expected: No output.

- [ ] **Step 4: Commit**

```bash
git add src/components/ThemeToggle.astro
git commit -m "feat: update ThemeToggle to use specter/wisp theme names"
```

---

### Task 3: Update ThemeSelector and disable it via config

**Files:**
- Modify: `src/components/ThemeSelector.astro`
- Modify: `src/content/general/index.yaml`

- [ ] **Step 1: Update the ThemeSelector themes array and JS fallbacks**

In `src/components/ThemeSelector.astro`, replace the `themes` array (lines 4–11):

```js
// Before
const themes = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "synthwave", label: "Synthwave" },
  { value: "retro", label: "Retro" },
  { value: "valentine", label: "Valentine" },
  { value: "dim", label: "Dim" },
];

// After
const themes = [
  { value: "wisp", label: "Wisp (Light)" },
  { value: "specter", label: "Specter (Dark)" },
];
```

Also update the JS system-preference fallback inside the `<script is:inline>` block. Find this section:

```js
// If no saved theme, use system preference
if (!theme) {
  theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
```

Replace with:

```js
// If no saved theme, use system preference
if (!theme) {
  theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "specter"
    : "wisp";
}
```

- [ ] **Step 2: Disable the ThemeSelector via content YAML**

In `src/content/general/index.yaml`, change:

```yaml
# Before
enableThemeSelector: true

# After
enableThemeSelector: false
```

- [ ] **Step 3: Verify the build succeeds**

```bash
cd /home/farzad/portfolio && npm run build
```

Expected: Clean build.

- [ ] **Step 4: Verify no old theme names remain anywhere in src/**

```bash
grep -rn "synthwave\|retro\|valentine\|\bvalue=\"dim\"\|\"light\"\|\"dark\"" src/components/ThemeSelector.astro src/components/ThemeToggle.astro src/styles/global.css
```

Expected: No output. (Note: `Twitter.astro` has `data-theme="dark"` for the Twitter embed — that is intentional and should not be changed.)

- [ ] **Step 5: Commit**

```bash
git add src/components/ThemeSelector.astro src/content/general/index.yaml
git commit -m "feat: update ThemeSelector and disable dropdown in favour of toggle"
```

---

### Task 4: Manual verification

- [ ] **Step 1: Start the dev server**

```bash
cd /home/farzad/portfolio && npm run dev
```

Open `http://localhost:4321` in the browser.

- [ ] **Step 2: Verify specter (dark) theme**

Check that the page loads with a dark, near-black background (not pure black — has a subtle blue-indigo tint). Primary buttons should appear violet. Accent elements should appear teal. Text should be a soft lavender/white, not pure white.

If the page loads with a white background instead: open DevTools → Application → Local Storage and delete the `theme` key, then reload. Your OS dark mode preference controls the default.

- [ ] **Step 3: Verify wisp (light) theme**

Click the sun/moon toggle in the top-right corner. The page should switch to a slightly lavender-tinted white background (not pure white). Text should be deep indigo, not black. Primary buttons should appear indigo-blue.

- [ ] **Step 4: Verify persistence**

After toggling to either theme, reload the page. The theme should be preserved (stored in `localStorage` under key `theme`).

- [ ] **Step 5: Verify view transitions preserve theme**

Navigate to a project or blog post page and back. The theme should not flash or reset during the Astro view transition.

- [ ] **Step 6: Final commit if any tweaks were made**

If you adjusted any color values during manual verification:

```bash
git add src/styles/global.css
git commit -m "fix: adjust theme color values after visual review"
```
