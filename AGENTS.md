# 🤖 Bloomfolio AI Agent Instructions

Bloomfolio is a modern, customizable developer portfolio template built with **Astro 5** and **DaisyUI 5**. It features a Git-based CMS (Keystatic) for easy content management and uses Astro's Content Collections for type-safe data handling.

## 🛠 Tech Stack
- **Framework:** [Astro 5.x](https://astro.build) (Static Site Generator)
- **Styling:** [Tailwind CSS 4.x](https://tailwindcss.com) + [DaisyUI 5.x](https://daisyui.com)
- **CMS:** [Keystatic](https://keystatic.com) (Git-based headless CMS)
- **Content:** Markdown, MDX, and [Markdoc](https://markdoc.dev/)
- **Icons:** [Lucide Astro](https://lucide.dev/)
- **Language:** TypeScript (Strict mode)

## 🚀 Quick Start & Key Commands
| Command | Action |
| :--- | :--- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start development server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm astro check` | Run TypeScript and Astro checks |
| `pnpm astro ...` | Run any Astro CLI command |

**Development URL:** `http://localhost:4321`
**CMS Admin URL:** `http://localhost:4321/keystatic`

## 📂 Project Architecture
```
src/
├── assets/          # Static assets (images, SVGs)
├── components/      # Reusable Astro components (Hero, About, Timeline, etc.)
├── content/         # Content collections (Markdown/YAML files)
│   ├── about/       # Personal bio (Singleton)
│   ├── hero/        # Name, avatar, and headline (Singleton)
│   ├── blog/        # Blog posts (.md or .mdoc)
│   ├── education/   # Academic history
│   ├── hackathons/  # Hackathon entries
│   ├── projects/    # Portfolio projects
│   └── work/        # Employment history
├── layouts/         # Page templates (Layout.astro, BlogLayout.astro)
├── pages/           # File-based routes (index.astro, blog/, projects/)
└── styles/          # Global CSS (Tailwind 4 + DaisyUI imports)
```

## 📝 Content Management Architecture

Bloomfolio uses **Keystatic** for visual content editing while keeping content as files in the repository.

### Architecture Overview
1.  **Keystatic Admin:** Visit `/keystatic` in dev mode to edit content via forms.
2.  **Configuration:** `keystatic.config.ts` defines all schemas, singletons, and collection paths.
3.  **Filesystem:** Content is saved to `src/content/` as `.yaml`, `.md`, or `.mdoc`.
4.  **Astro Validation:** `src/content.config.ts` uses Zod to mirror Keystatic schemas for type-safe queries.
5.  **Markdoc Layer:** `markdoc.config.mjs` registers custom tags (like Spotify, YouTube) for rendering.

### Storage Strategy
- **.yaml**: Singletons without Markdown content (e.g., `hero/index.yaml`).
- **.md**: Standard Markdown content (e.g., `projects/project-1.md`).
- **.mdoc**: Markdoc content with component support (e.g., `blog/post-1.mdoc`).

### GitHub Mode (Optional)
To enable remote editing via GitHub, configure these in `.env`:
- `KEYSTATIC_GITHUB_CLIENT_ID` / `KEYSTATIC_GITHUB_CLIENT_SECRET` (OAuth App)
- `KEYSTATIC_SECRET` (Random secret for cookie signing)
- `PUBLIC_KEYSTATIC_REPO_OWNER` / `PUBLIC_KEYSTATIC_REPO_NAME`
- `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` (Enables GitHub mode)

## 🎨 Styling & Theming
-   **Tailwind 4:** Uses CSS-first configuration. Main entry is `src/styles/global.css`.
-   **DaisyUI:** Loaded as a plugin in `global.css`. Supports multiple themes (Light, Dark, Synthwave, etc.).
-   **Theme Selector:** Configurable in Keystatic General Settings.
-   **Priority:** Tailwind utilities first > DaisyUI components > Component-scoped `<style>` tags.

## 📄 Resume Workflow
The resume source is maintained in LaTeX and compiled to a PDF served from the public directory.
1.  Edit **`resume.tex`** (LaTeX source at root).
2.  Compile to PDF: `pdflatex resume.tex`.
3.  Move to public: `mv resume.pdf public/resume.pdf`.
*Note: Do not edit `public/resume.pdf` directly.*

## 🛠 Development Guidelines
-   **Documentation:** Use `mcp__astro-docs__search_astro_docs` for Astro and `mcp__context7__get-library-docs` for DaisyUI help.
-   **Type Safety:** Astro's strict TypeScript is enabled. Always follow Zod schemas in `src/content.config.ts`.
-   **Layouts:** Wrap all pages in `Layout.astro`. Only import `global.css` once in the main layout.
-   **Images:** Store in `src/assets/` or next to content files. Use relative paths for Astro's image optimization. Prefer `.webp` format.
-   **Markdoc Components:** Media embeds (Spotify, YouTube, Twitter) are **only** supported in the blog collection and require the **`.mdoc`** extension.
-   **Adding Sections:** 
    1. Define in `keystatic.config.ts`.
    2. Mirror in `src/content.config.ts`.
    3. Create the directory in `src/content/`.
    4. Build the component in `src/components/`.
