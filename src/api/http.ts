import axios, { AxiosError } from 'axios'
import { config } from '../config/env'

/**
 * Shared HTTP client for the backend API.
 *
 * `withCredentials: true` is essential here: authentication is session-cookie
 * based (set by the Spring Security backend during the GitHub OAuth flow), so
 * the browser must send that cookie on every cross-origin request.
 */
export const http = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * A normalized error shape the UI can rely on, regardless of whether a failure
 * originated from the network, a non-2xx response, or unexpected runtime state.
 */
export class ApiError extends Error {
  /** HTTP status code, or `undefined` if the request never reached the server. */
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

/**
 * Translate raw Axios rejections into {@link ApiError} so callers (and the React
 * components above them) never have to reason about Axios internals. Successful
 * responses pass through untouched.
 */
http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status
    const message =
      error.response?.data?.message ?? error.message ?? 'Unexpected network error'
    return Promise.reject(new ApiError(message, status))
  },
)
