import { http } from './http'
import type { Review } from '../types'

/** Lists all code reviews visible to the authenticated user. */
export async function getReviews(): Promise<Review[]> {
  const { data } = await http.get<Review[]>('/api/reviews')
  return data
}

/**
 * Fetches a single review (including its inline comments) by id.
 *
 * @param id - The review's UUID, as it appears in the dashboard URL.
 */
export async function getReview(id: string): Promise<Review> {
  const { data } = await http.get<Review>(`/api/reviews/${id}`)
  return data
}
