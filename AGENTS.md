# Portfolio AI Agent Instructions

## Project Overview

Personal portfolio website built with the **Hugo** static site generator using the **PaperMod** theme. Showcases software engineering projects, experience, and resume.

**Tech Stack:** Hugo, PaperMod theme (git submodule), YAML, Markdown, HTML, CSS

**Key Links:**

- [Hugo Documentation](https://gohugo.io/)
- [PaperMod Theme](https://github.com/adityatelange/hugo-PaperMod)

## Build & Run Commands

### Local Development

```bash
hugo server -D
```

Starts local dev server with live reload and includes draft content at <http://localhost:1313>

### Production Build

```bash
hugo --gc --minify
```

Generates optimized static site in `public/` directory

**Note:** CI/CD uses Hugo extended v0.117.0 (see `.github/workflows/hugo.yaml`)

### Testing

- Validation is primarily visual through the local development server
- The build process is automatically tested and deployed via GitHub Actions on pushes to the `main` branch

## Architecture

### Content Flow

1. **Source:** Markdown files in `content/posts/` with YAML frontmatter
2. **Templates:** Hugo processes files using PaperMod theme + custom overrides in `layouts/`
3. **Output:** Static HTML/CSS/JS in `public/` directory

### Theme Customization

- **PaperMod theme:** Located in `themes/PaperMod/` as git submodule - **DO NOT modify directly**
- **Custom overrides:** Place in top-level `layouts/` directory to override theme defaults
- **Global config:** `config.yaml` controls site settings, social links, author info, theme parameters

### Asset Pipeline

- **Post images:** Store in `static/images/` (prefer `.webp` format for performance)
- **Static assets:** Served directly from `static/` directory
- **Resume:** Source is `resume.tex`, compiled to `static/resume.pdf`

## Development Conventions

### Content Structure

**Posts:** New projects should be added to `content/posts/` as Markdown files.

**Required YAML frontmatter:**

```yaml
title: "Project Title"
tags: ['Tag1', 'Tag2']
date: YYYY-MM-DD
draft: false
cover:
    image: "/images/image-name.webp"
    hidden: false  # true hides image from post, false shows it
```

### Custom Shortcodes

- **`inTextImg`**: Embeds centered images with custom height

  ```markdown
  {{< inTextImg url="/images/example.webp" height="50%">}}
  ```

  Defined in `layouts/shortcodes/inTextImg.html`

### Resume Workflow

1. Edit `resume.tex` (LaTeX source)
2. Compile to PDF:
   ```bash
   pdflatex resume.tex
   ```
3. Move compiled PDF to static directory:
   ```bash
   mv resume.pdf static/resume.pdf
   ```

### Theme Submodule

The PaperMod theme is a git submodule. When cloning or pulling:

```bash
git submodule update --init --recursive
```

## File Organization

- `content/posts/*.md` - Portfolio project posts
- `static/images/` - Post images and visual assets
- `static/resume.pdf` - Compiled resume (don't edit directly)
- `resume.tex` - LaTeX source for resume
- `layouts/` - Custom template overrides
- `layouts/shortcodes/` - Custom Hugo shortcodes
- `config.yaml` - Site configuration
- `themes/PaperMod/` - Theme submodule (read-only)

## Usage Guidelines

When helping with this project:

1. **Adding Posts:** Use the `content/posts/` directory and follow existing frontmatter patterns
2. **Updating Config:** Modify `config.yaml` for global site changes
3. **UI Adjustments:** Check `layouts/` for custom templates or `config.yaml` for theme parameters
4. **Theme Changes:** Never modify `themes/PaperMod/` directly - use `layouts/` overrides instead
5. **Images:** Store all images in `static/images/` using `.webp` format when possible
