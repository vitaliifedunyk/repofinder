# RepoFinder

RepoFinder is a small Vanilla JS + Vite app for finding public GitHub repositories by username.

## What It Does

- Fetches repositories from GitHub API: `/users/{username}/repos`.
- Shows repo name, description, stars, updated date, and repo link.
- Handles `loading` and `error` states.
- Maps `404` to `User not found`.
- Maps `403` to `GitHub API rate limit exceeded`.
- Supports `Prev/Next` pagination (10 items per page).

## Screenshots

### Home Screen
![Home screen](docs/screenshots/home-screen.png)

### Search Results
![Search results](docs/screenshots/results-screen.png)

### User Not Found
![User not found](docs/screenshots/error-screen.png)

## Quick Start

```bash
npm install
npm run dev
```

Local URL: `http://localhost:5173/repofinder/`.

## Scripts

- `npm run dev` - start dev server.
- `npm run build` - build production files into `dist/`.
- `npm run preview` - preview production build locally.
- `npm run deploy` - deploy `dist/` to `gh-pages`.

## Project Structure

- `src/main.js` - app bootstrap, form submit, pagination, state-driven flow.
- `src/js/api.js` - GitHub API request logic and HTTP error mapping.
- `src/js/state.js` - shared `state` object and `setState`.
- `src/js/ui.js` - layout/status/repository card rendering.

## Deployment

- GitHub Pages base path is set in `vite.config.js`: `base: "/repofinder/"`.
- Auto-deploy runs via GitHub Actions: `.github/workflows/deploy.yml` (push to `main`/`master`).

## Possible Improvements

- Add input debounce.
- Read `Link` headers and show total pages.
- Add tests for `api.js` and `ui.js`.

## Author

Vitalii Fedunyk - [@vitaliifedunyk](https://github.com/vitaliifedunyk)
