/**
 * Centralized runtime configuration.
 *
 * Every externally-configurable value lives here and is sourced from Vite
 * environment variables. This lets a single build artifact be promoted across
 * environments (local → staging → production) by swapping env vars, instead of
 * hardcoding URLs throughout the codebase.
 *
 * Defaults target a developer's local backend so the app runs out of the box.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'
const GITHUB_APP_SLUG = import.meta.env.VITE_GITHUB_APP_SLUG ?? 'sean-ai-code-reviewer'

export const config = {
  /** Root URL every API request is made against. */
  apiBaseUrl: API_BASE_URL,

  /**
   * OAuth2 entry point. Hitting this redirects the browser into GitHub's
   * login flow, which the Spring Security backend completes.
   */
  githubLoginUrl: `${API_BASE_URL}/oauth2/authorization/github`,

  /** Spring Security's default logout endpoint; clears the server session. */
  logoutUrl: `${API_BASE_URL}/logout`,

  /**
   * GitHub App installation flow. This is hosted by GitHub (not our backend),
   * so it is an absolute github.com URL rather than an API path.
   */
  githubInstallUrl: `https://github.com/apps/${GITHUB_APP_SLUG}/installations/new`,
} as const
