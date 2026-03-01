# RepoFinder

## Short Description

RepoFinder is a small frontend app that lets you search GitHub repositories by username.  
It is built with a modular JavaScript structure, Vite, and TailwindCSS.  
The project focuses on clean async data fetching, basic state handling, and simple pagination.

## Live Demo

[Live Demo](https://your-username.github.io/repofinder/)

## Features

- Search public repositories by GitHub username.
- Fetch data from the GitHub REST API (`/users/{username}/repos`).
- Render repository cards with name, description, stars, last update date, and link to GitHub.
- Loading and error states in the UI.
- API error handling for `404` (user not found).
- API error handling for `403` (rate limit exceeded).
- Generic non-OK response handling (`Request failed: {status}`).
- Client-side pagination controls (`Prev` / `Next`) with current page indicator.
- Pagination request params using `page` and `per_page`.
- Simple favicon and utility-based UI styling with TailwindCSS.

## Tech Stack

- JavaScript (ES Modules)
- Vite (bundler / dev server)
- TailwindCSS (`@tailwindcss/vite`)
- GitHub REST API
- GitHub Pages (deployment)

## Architecture Overview

The app uses a small modular architecture:

- `src/main.js`: App entry point, DOM event wiring, async loading flow, and pagination behavior.
- `src/js/api.js`: `fetchRepos` API layer with `fetch` + `async/await` and HTTP error mapping.
- `src/js/state.js`: Shared mutable `state` object and `setState(patch)` helper via `Object.assign`.
- `src/js/ui.js`: Rendering functions for layout, status, and repository cards.
- `src/css/style.css`: TailwindCSS import.

## How It Works

### State Management

The app keeps a single in-memory `state` object with:

- `username`
- `page`
- `perPage`
- `repos`
- `status`
- `errorMessage`

`setState()` applies partial updates, and `main.js` re-renders affected UI sections.

### API Calls

`loadRepos()` in `main.js` calls `fetchRepos()` from `api.js` using `async/await`.

`fetchRepos()` builds URL params:

- `page`
- `per_page`

Then it sends a request to:

- `https://api.github.com/users/{username}/repos`

### Pagination Logic

- On search submit, `page` resets to `1`.
- `Prev` decreases `page` (disabled on page `1`).
- `Next` increases `page`.
- `Next` is disabled when returned repo count is smaller than `perPage`.
- Pagination block is shown only when there are repositories.

## Installation & Run Instructions (Vite)

```bash
# 1) Install dependencies
npm install

# 2) Run dev server
npm run dev

# 3) Build for production
npm run build

# 4) Preview production build locally
npm run preview
```

## Deployment (GitHub Pages)

This project is configured for GitHub Pages with Vite base path:

- `vite.config.js` → `base: "/repofinder/"`

Available deployment options in this repo:

- Automatic deploy via GitHub Actions on push to `main` or `master` (`.github/workflows/deploy.yml`).
- Manual deploy command:

```bash
npm run build
npm run deploy
```

## Future Improvements

- Add debounce to the username input before request.
- Show total pages using GitHub `Link` headers.
- Add repository sorting/filtering in UI.
- Add unit tests for API and rendering modules.
- Improve accessibility (focus states, ARIA feedback for loading/errors).

## Author

- Name: Vitalii Fedunyk
- GitHub: [@vitaliifedunyk](https://github.com/vitaliifedunyk)
