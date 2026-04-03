# Portfolio

Personal portfolio website built with Hugo and the PaperMod theme. Showcases software engineering projects, experience, and professional resume.

🌐 **Live Site:** [farzadhayat.dev](https://farzadhayat.dev)

## Tech Stack

- **Static Site Generator:** [Hugo](https://gohugo.io/)
- **Theme:** [PaperMod](https://github.com/adityatelange/hugo-PaperMod) (git submodule)
- **Deployment:** GitHub Pages via GitHub Actions
- **Content:** Markdown with YAML frontmatter
- **Resume:** LaTeX compiled to PDF

## Getting Started

### Prerequisites

- [Hugo Extended v0.117.0+](https://gohugo.io/installation/)
- Git

### Installation

1. Clone the repository:
```bash
git clone git@github.com:FarzadHayat/portfolio.git
cd portfolio
```

2. Initialize the theme submodule:
```bash
git submodule update --init --recursive
```

### Development

Run the local development server:
```bash
hugo server -D
```

The site will be available at [http://localhost:1313](http://localhost:1313) with live reload enabled.

### Build

Generate the production-ready static site:
```bash
hugo --gc --minify
```

Output will be in the `public/` directory.

## Project Structure

```
.
├── content/posts/      # Portfolio project posts (Markdown)
├── layouts/            # Custom template overrides
│   └── shortcodes/     # Custom Hugo shortcodes
├── static/             # Static assets
│   ├── images/         # Post images (prefer .webp)
│   └── resume.pdf      # Compiled resume
├── themes/PaperMod/    # Theme submodule (DO NOT EDIT)
├── config.yaml         # Site configuration
└── resume.tex          # LaTeX resume source
```

## Content Management

### Adding a New Post

Create a Markdown file in `content/posts/` with the following frontmatter:

```yaml
---
title: "Project Title"
tags: ['Tag1', 'Tag2']
date: YYYY-MM-DD
draft: false
cover:
    image: "/images/image-name.webp"
    hidden: false
---

Your content here...
```

### Using Custom Shortcodes

**Centered Image with Custom Height:**
```markdown
{{< inTextImg url="/images/example.webp" height="50%" >}}
```

### Updating the Resume

1. Edit `resume.tex` (LaTeX source)
2. Compile to PDF:
   ```bash
   pdflatex resume.tex
   ```
3. Move to static directory:
   ```bash
   mv resume.pdf static/resume.pdf
   ```

## Theme Customization

- **DO NOT** modify files in `themes/PaperMod/` directly
- Place custom overrides in the top-level `layouts/` directory
- Configure theme parameters in `config.yaml`

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch. See `.github/workflows/hugo.yaml` for configuration.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Farzad Hayat
- Website: [farzadhayat.dev](https://farzadhayat.dev)
- Email: hello@farzadhayat.dev
- LinkedIn: [linkedin.com/in/farzad-hayat](https://linkedin.com/in/farzad-hayat)
