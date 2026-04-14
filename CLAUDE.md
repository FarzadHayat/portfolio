# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **Framework:** Astro 5.x (server output, Vercel adapter)
- **Styling:** Tailwind CSS 4.x + DaisyUI 5.x
- **CMS:** Keystatic (Git-based headless CMS)
- **Content:** Markdown, MDX, Markdoc
- **Icons:** Lucide Astro
- **Language:** TypeScript (strict mode)

## Commands

| Command | Action |
| :--- | :--- |
| `pnpm dev` | Start dev server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm astro check` | TypeScript and Astro type checks |

CMS admin (dev only): `http://localhost:4321/keystatic`

## Project Architecture

```
src/
├── assets/          # Images, SVGs (organized by section)
├── components/      # Astro + React components
├── content/         # Content collections (Markdown/YAML files)
├── layouts/         # Page templates (Layout.astro, BlogLayout.astro, ProjectLayout.astro)
├── pages/           # File-based routes
├── styles/          # global.css (Tailwind 4 + DaisyUI imports)
└── utils/           # iconMapper.ts for social icon resolution
```

**Key config files:**

- `keystatic.config.ts` — all CMS schemas (~600 lines)
- `src/content.config.ts` — Zod schemas mirroring Keystatic (used by Astro Collections)
- `markdoc.config.mjs` — custom Markdoc tags: `{% Spotify %}`, `{% YouTube %}`, `{% Twitter %}`
- `astro.config.mjs` — Vercel adapter, React/MDX/Markdoc/Keystatic integrations

## Content Collections

**Singletons** (one entry per site):

- `hero/` — name, avatar, headline, social links
- `about/` — bio, photo
- `general/` — theme, section visibility toggles
- `contact/` — contact CTA
- `quiz/` — interactive quiz questions

**Collections** (multi-entry):

- `work/`, `education/`, `hackathons/`, `certifications/`
- `projects/` — portfolio projects (`.md`)
- `blog/` — blog posts (`.md` or `.mdoc` for Markdoc embeds)

## Content Management

1. Keystatic Admin (`/keystatic`) writes to `src/content/` as `.yaml`, `.md`, or `.mdoc`.
2. `src/content.config.ts` Zod schemas must stay in sync with `keystatic.config.ts`.
3. Markdoc embed tags (`{% Spotify %}`, etc.) only work in `.mdoc` files in the `blog` collection.

**Adding a new section:** (1) define schema in `keystatic.config.ts`, (2) mirror in `src/content.config.ts`, (3) create directory in `src/content/`, (4) build component in `src/components/`.

## Styling

- Tailwind utilities > DaisyUI components > scoped `<style>` tags.
- DaisyUI themes: light (default), dark, synthwave, retro, valentine, dim.
- Only import `global.css` once (in `Layout.astro`).

## Resume Workflow

Source is `resume.tex` at repo root. Do not edit `public/resume.pdf` directly.

```bash
pdflatex resume.tex
mv resume.pdf public/resume.pdf
```

## Development Notes

- All pages must be wrapped in `Layout.astro`.
- Store images in `src/assets/` or next to content files; use relative paths; prefer `.webp`.
- Keystatic GitHub OAuth mode requires env vars from `.env.example` (`KEYSTATIC_GITHUB_*`, `KEYSTATIC_SECRET`, `PUBLIC_KEYSTATIC_*`).
