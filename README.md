# Aditya Sharma’s portfolio

My personal website about backend systems, data engineering, and what I’m learning as a Data Engineering Intern at ShyftLabs. [Visit the portfolio](https://jirugenpeak.github.io/)

## The site

The portfolio is a single page built with React, TypeScript, Tailwind CSS, and Vite. Each project entry pairs a short architectural trade-off with its technology stack. The layout uses Gruvbox Hard light and dark palettes, with a single reading column on mobile and section headings in the left margin on desktop.

The bio, project entries, and writing index live in small TypeScript files. [Portfolio content](src/data/)

## How the activity feed works

The song beneath my bio comes from Spotify’s recently played tracks. The repository alongside it comes from my latest indexed commit on a default branch in one of my public GitHub repositories.

GitHub Actions refreshes both on pushes to `main` and once an hour, then publishes a static build to GitHub Pages. Visitors receive that snapshot with the page. Their browser updates the commit age and IST clock locally. [Activity fetcher](scripts/refresh-activity.mjs) · [Deployment workflow](.github/workflows/deploy.yml)

## Local development

With Node.js 24 and npm:

```sh
npm ci
npm run dev
```

Local development uses the checked-in activity snapshot and requires no API credentials. `npm run lint` runs ESLint. `npm run build` checks TypeScript and creates the production site in `dist/`.
