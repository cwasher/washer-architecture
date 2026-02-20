# Washer Architecture — Portfolio Website

## Overview
A static marketing/portfolio website for "Washer Architecture", an architectural firm in Northwest Arkansas. Built with Astro + Tailwind CSS, using Content Collections for project management.

## Tech Stack
- **Framework**: Astro v5 (static output)
- **Styling**: Tailwind CSS v3 + @tailwindcss/typography
- **Content**: Astro Content Collections (Markdown with frontmatter schema)
- **Deployment**: Static site (no server required)

## Project Structure
```
src/
  components/       # Reusable UI components (Header, Footer, Button, Badge, Section, ProjectCard, ProjectGrid, Gallery)
  content/
    projects/       # Markdown files for each project (content collection)
  layouts/
    BaseLayout.astro  # Main HTML shell with SEO, JSON-LD, meta tags
  pages/
    index.astro       # Home page
    about.astro       # About page
    contact.astro     # Contact page with intake form
    projects/
      index.astro     # Projects listing grid
      [...slug].astro # Dynamic project detail pages
  styles/
    global.css        # Global styles, Tailwind directives, font imports
public/
  images/projects/    # Project images organized by project slug
  favicon.svg
  robots.txt
```

## Content Model (Projects)
Each project is a Markdown file in `src/content/projects/` with this frontmatter schema:
- **title** (string, required)
- **year** (number, required)
- **location** (string, required)
- **projectType** (enum: "Custom Home" | "Renovation" | "Multi-Family" | "Light Commercial")
- **services** (string[], e.g. ["Schematic Design", "Construction Documents"])
- **tags** (string[])
- **featured** (boolean) — shown on home page
- **summary** (string) — used on cards and meta description
- **coverImage** (string path, required)
- **gallery** (string[] paths, optional)
- **ogImage** (string path, optional)
- **credits** (string, optional)

## How to Add a New Project
1. Create a new `.md` file in `src/content/projects/` (filename becomes the slug)
2. Add frontmatter matching the schema above
3. Write project description in Markdown body
4. Add images to `public/images/projects/<slug>/`
5. Reference images as `/images/projects/<slug>/cover.svg` (or .jpg/.png)

## Running Locally
```bash
npm install
npm run dev       # Starts dev server on port 5000
npm run build     # Static build to dist/
npm run preview   # Preview production build
```

## Design System
- **Fonts**: Inter (Google Fonts) with system fallbacks
- **Colors**: Stone palette (neutral warm grays)
- **Layout**: Max-width 7xl (80rem) container with responsive padding

## Recent Changes
- 2026-02-20: Initial build — all pages, content collections, SEO, sitemap, contact form

## User Preferences
- Clean, minimal, modern architecture-firm aesthetic
- Performance-focused: minimal JS
- Static site output, no external CMS or database
