# ReviewAI — Frontend

A React + TypeScript single-page app for an AI-powered GitHub code-review service.
It authenticates users via GitHub OAuth, lists the reviews generated for their pull
requests, and renders the inline AI comments for each review.

## Tech stack

- **React 19** + **TypeScript** (Vite build)
- **React Router 7** for client-side routing
- **Tailwind CSS** for styling
- **Axios** for the API layer

## Getting started

```bash
npm install
cp .env.example .env.local   # adjust values for your environment
npm run dev                  # start the Vite dev server
```

The app expects the backend API to be reachable at `VITE_API_BASE_URL`
(defaults to `http://localhost:8080`).

## Environment variables

Only variables prefixed with `VITE_` are exposed to the client bundle. See
[`.env.example`](.env.example) for the full list.

| Variable                | Description                                            | Default                    |
| ----------------------- | ------------------------------------------------------ | -------------------------- |
| `VITE_API_BASE_URL`     | Base URL of the backend API.                           | `http://localhost:8080`    |
| `VITE_GITHUB_APP_SLUG`  | Slug of the GitHub App used for the install flow.      | `sean-ai-code-reviewer`    |

## Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the local dev server.              |
| `npm run build`   | Type-check and build for production.     |
| `npm run preview` | Preview the production build locally.    |
| `npm run lint`    | Run ESLint over the project.             |

## Project structure

```
src/
├── api/          # HTTP client + per-domain service modules (auth, reviews)
├── components/   # Reusable UI: Navbar, badges, skeletons, shared icons
├── config/       # Centralized, env-driven runtime configuration
├── lib/          # Framework-agnostic helpers (date formatting, …)
├── pages/        # Route-level views (Landing, Dashboard, ReviewDetail, Install)
└── types/        # Shared TypeScript types mirroring the backend API
```

### Conventions

- **Configuration is centralized.** All environment-specific values (API URLs,
  GitHub App slug) live in [`src/config/env.ts`](src/config/env.ts). Nothing
  elsewhere should hardcode a hostname.
- **The API layer is isolated.** Components call typed functions in `src/api/*`;
  they never talk to Axios directly. Failures are normalized to `ApiError`.
- **Icons are shared.** Reused SVGs live in
  [`src/components/icons.tsx`](src/components/icons.tsx) rather than being inlined.
