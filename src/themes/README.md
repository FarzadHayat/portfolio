# Themes

The first page of a visit (and the shuffle button) advances a shuffle bag so every theme shows before a repeat. The theme then stays the same across pages and refreshes until the browser session ends. The theme dock (bottom right) opens a picker. `?theme=<id>` on any URL shows that theme.

## How it works

- `src/middleware.ts` picks the theme on server-rendered pages and sets `html[data-design]` and `html[data-scheme]` before first paint. Prerendered pages (project and blog detail) do the same in the inline boot script in `Layout.astro`.
- `src/scripts/theme.ts` switches themes on the client, swaps the font stylesheet, and mounts each theme's optional script.
- Markup is shared by all themes. It uses semantic classes (below) and Tailwind only for a few utilities such as `sr-only`.

## A theme folder

`src/themes/<id>/`:

| File | Required | Purpose |
| --- | --- | --- |
| `meta.ts` | yes | Name, tagline, light or dark, picker order, Google Fonts URL, preview colors. Picked up automatically. |
| `theme.css` | yes | All styles. Every selector starts with `html[data-design="<id>"]`. Imported from `src/themes/index.css`. |
| `Decor.astro` | no | Fixed, full-page background layer behind the content. Shown only for this theme. |
| `HeroDecor.astro` | no | Layer behind the hero section only. |
| `script.ts` | no | `export function mount(): void \| (() => void)`. Runs when the theme becomes active; return a cleanup function. Loaded only for the active theme. |

Raster assets go in `public/themes/<id>/` and are referenced as `/themes/<id>/file.webp`.

## Tokens

Set on `:root` in `src/styles/global.css`. Override them first; restyle classes after.

- Color: `--bg --bg-alt --surface --surface-2 --text --text-muted --border --accent --accent-ink --accent-2 --link --focus --selection`
- Type: `--font-body --font-display --font-mono --body-size --body-leading --display-weight --display-tracking --display-leading --display-case --heading-weight`
- Shape: `--border-width --radius-lg --radius --radius-sm --radius-pill --shadow --shadow-lg`
- Components: `--card-bg --card-border --card-radius --card-shadow --btn-bg --btn-ink --btn-border --btn-radius --btn-shadow --btn-primary-bg --btn-primary-ink --chip-bg --chip-ink --chip-border --chip-radius`
- Layout: `--page-max --text-max --gutter --section-space --ease`

## Class hooks

- Frame: `.page .page__main .container .theme-decor .hero-decor .skip-link`
- Header: `.site-header .site-header__inner .site-header__brand .site-nav .site-nav__list .site-nav__link`
- Hero: `.hero .hero__inner .hero__text .hero__greeting .hero__name .hero__title .hero__role .hero__location .hero__bio .hero__actions .hero__links .hero__portrait .hero__photo .social-links`
- Sections: `.section .section--alt .section--projects .section--experience .section--hackathons .section--education .section--playlist .section__head .section__title .section__intro .section__more`
- Projects: `.project-grid .project-grid__lead .project-card .project-card--lead .project-card__media .project-card__body .project-card__title .project-card__meta .project-card__desc .project-card__links`
- Experience: `.timeline .timeline__item .timeline__marker .timeline__details .timeline__summary .timeline__role .timeline__org .timeline__date .timeline__toggle .timeline__body`
- Education: `.entry-list .entry .entry__kind .entry__title .entry__subtitle .entry__date .entry__body`
- Hackathons: `.hackathon-list .hackathon .hackathon__media .hackathon__body .hackathon__title .hackathon__meta .hackathon__desc .hackathon__links`
- Playlist: `.embed-frame`
- Footer: `.site-footer .site-footer__inner .site-footer__title .site-footer__email .site-footer__links .site-footer__meta`
- Shared: `.btn .btn--primary .btn--ghost .btn--sm .icon-btn .chip-list .chip .badge .card .panel .field .prose`
- Subpages: `.page-head .page-head__title .page-head__intro .page-head__meta .page-head__actions .back-link .cover-image .article .article__body .stack-panel .error-page .error-page__code`
- Quiz: `.quiz .quiz__card .quiz__screen .quiz__title .quiz__question .quiz__option .quiz__verdict[data-result] .quiz__answer`
- Referrals: `.referrals .referrals__controls .referral .referral__name .referral__actions`
- Theme UI: `.theme-dock .theme-dock__open .theme-dock__shuffle .theme-picker .theme-option`

## Rules

- Text contrast meets WCAG AA (4.5:1 body, 3:1 large text and UI parts). Focus stays visible.
- Motion respects `prefers-reduced-motion`. Decoration is `aria-hidden` and never blocks clicks.
- No horizontal scroll at 360px. Touch targets stay at least 44px.
- Keep the theme dock and picker usable and readable in every theme.
