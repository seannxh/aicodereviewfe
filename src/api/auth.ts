import { http } from './http'
import type { User } from '../types'

/**
 * Fetches the currently authenticated user.
 *
 * Resolves with the user when a valid session cookie is present, and rejects
 * (typically with a 401) when the visitor is not logged in — the app treats
 * that rejection as the "unauthenticated" state.
 */
export async function getMe(): Promise<User> {
  const { data } = await http.get<User>('/api/auth/me')
  return data
}
