import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import StatusBadge from '../components/StatusBadge'
import { ReviewCardSkeleton } from '../components/LoadingSkeleton'
import { getReviews, GITHUB_INSTALL_URL } from '../api/client'
import type { User, Review } from '../types'

interface Props {
  user: User
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06]">
        <svg className="h-10 w-10 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-white">No reviews yet</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-500 leading-relaxed">
        Install the ReviewAI GitHub App and open a pull request to see AI-powered code reviews appear here.
      </p>
      <a
        href={GITHUB_INSTALL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/35 hover:scale-[1.02]"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Install GitHub App
      </a>
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <Link
      to={`/reviews/${review.id}`}
      className="block card-hover glass rounded-xl border border-white/[0.06] p-5 animate-fade-in"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              {review.repoFullName}
            </span>
            <span className="text-gray-700">·</span>
            <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-xs font-mono text-gray-500">
              #{review.prNumber}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">
            {review.prTitle}
          </h3>
        </div>
        <div className="flex-shrink-0">
          <StatusBadge status={review.status} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs text-gray-600">
        <span className="flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(review.createdAt)}
        </span>
        <span className="flex items-center gap-1 text-gray-700 ml-auto">
          View review
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default function Dashboard({ user }: Props) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getReviews()
      .then(setReviews)
      .catch(() => setError('Failed to load reviews. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar user={user} />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Code Reviews</h1>
            <p className="mt-1 text-sm text-gray-500">
              {loading ? 'Loading your reviews…' : reviews.length === 0 ? 'No reviews yet' : `${reviews.length} review${reviews.length === 1 ? '' : 's'}`}
            </p>
          </div>
          <a
            href={GITHUB_INSTALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-all"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Add repos
          </a>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400 animate-fade-in">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => <ReviewCardSkeleton key={i} />)}
          </div>
        ) : reviews.length === 0 && !error ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
          </div>
        )}
      </main>
    </div>
  )
}
