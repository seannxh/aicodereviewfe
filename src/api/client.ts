import axios from 'axios'
import type { User, Review } from '../types'

const BASE_URL = 'http://localhost:8080'

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/api/auth/me')
  return data
}

export const getReviews = async (): Promise<Review[]> => {
  const { data } = await api.get<Review[]>('/api/reviews')
  return data
}

export const getReview = async (id: string): Promise<Review> => {
  const { data } = await api.get<Review>(`/api/reviews/${id}`)
  return data
}

export const GITHUB_LOGIN_URL = `${BASE_URL}/oauth2/authorization/github`
export const GITHUB_INSTALL_URL = 'https://github.com/apps/sean-ai-code-reviewer/installations/new'

export default api
