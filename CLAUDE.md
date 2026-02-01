# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for [tregou.app](https://tregou.app), built with Astro 5. Outputs a static site to `./dist/`.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Build static site to ./dist/
npm run preview    # Preview production build locally
npm run astro check # Type-check and validate Astro files
```

## Architecture

- **Astro 5** static site generator with TypeScript (strict mode)
- **Vanilla CSS** with CSS custom properties defined in `BaseLayout.astro`
- **Inter font** loaded from Google Fonts

### Key Files

- `src/layouts/BaseLayout.astro` - Base HTML template with meta tags, OG tags, CSS reset, and CSS variables
- `src/pages/index.astro` - Homepage (currently placeholder)
- `src/styles/global.css` - Global styles (note: currently duplicated in BaseLayout)
- `astro.config.mjs` - Site config with `site: 'https://tregou.app'`, static output, HTML compression

### CSS Variables

Defined in `:root` within `BaseLayout.astro`:
- `--color-primary: #2563eb` / `--color-primary-hover: #1d4ed8`
- `--color-text: #1a1a1a` / `--color-text-muted: #6b7280`
- `--max-width: 1200px`
- `--font-family: 'Inter', system-ui, -apple-system, sans-serif`

### Language

Content is in Brazilian Portuguese (`lang="pt-BR"`).
