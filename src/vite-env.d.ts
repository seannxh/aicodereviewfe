/// <reference types="vite/client" />

/**
 * Strongly-typed contract for the environment variables this app reads at
 * build time. Vite only exposes variables prefixed with `VITE_` to client
 * code, so every key here must use that prefix.
 *
 * @see {@link ./config/env.ts} for where these are consumed.
 */
interface ImportMetaEnv {
  /** Base URL of the backend API, e.g. `https://api.reviewai.dev`. */
  readonly VITE_API_BASE_URL?: string
  /** Slug of the GitHub App used for the installation flow. */
  readonly VITE_GITHUB_APP_SLUG?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
