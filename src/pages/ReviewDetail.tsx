import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import StatusBadge from '../components/StatusBadge'
import SeverityBadge from '../components/SeverityBadge'
import { CommentSkeleton, ReviewDetailHeaderSkeleton } from '../components/LoadingSkeleton'
import { getReview } from '../api/client'
import type { User, Review, ReviewComment } from '../types'

interface Props {
  user: User
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function CommentCard({ comment }: { comment: ReviewComment }) {
  return (
    <div className="glass rounded-xl border border-white/[0.06] overflow-hidden animate-fade-in">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.04] bg-white/[0.02] px-4 py-3">
        <SeverityBadge severity={comment.severity} />
        <code className="text-xs text-gray-400 font-mono bg-white/5 rounded px-2 py-0.5 truncate max-w-xs">
          {comment.filePath}
        </code>
        {comment.lineNumber != null && (
          <span className="text-xs text-gray-600 font-mono">Line {comment.lineNumber}</span>
        )}
      </div>
      <div className="p-5 space-y-4">
        <p className="text-sm text-gray-300 leading-relaxed">{comment.comment}</p>
        {comment.suggestion && (
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="mb-2 flex items-center gap-2">
              <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Suggestion</span>
            </div>
            <p className="text-sm text-emerald-300/90 leading-relaxed">{comment.suggestion}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function NoComments() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center glass rounded-xl border border-white/[0.06]">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10">
        <svg className="h-7 w-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-white">Looks great!</h3>
      <p className="mt-1 text-sm text-gray-500">No issues found in this pull request.</p>
    </div>
  )
}

export default function ReviewDetail({ user }: Props) {
  const { id } = useParams<{ id: string }>()
  const [review, setReview] = useState<Review | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    getReview(id)
      .then(setReview)
      .catch(() => setError('Failed to load review. It may not exist or you may not have access.'))
      .finally(() => setLoading(false))
  }, [id])

  const comments = review?.comments ?? []
  const errorCount = comments.filter((c) => c.severity === 'error').length
  const warningCount = comments.filter((c) => c.severity === 'warning').length
  const suggestionCount = comments.filter((c) => c.severity === 'suggestion').length

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar user={user} />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-8"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          All reviews
        </Link>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400 mb-6">
            {error}
          </div>
        )}

        {/* PR Header */}
        {loading ? (
          <ReviewDetailHeaderSkeleton />
        ) : review ? (
          <div className="mb-10 animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                {review.repoFullName}
              </span>
              <span className="text-gray-700">·</span>
              <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-xs font-mono text-gray-500">#{review.prNumber}</span>
            </div>

            <h1 className="text-2xl font-bold text-white leading-snug mb-4">{review.prTitle}</h1>

            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={review.status} />
              <span className="text-xs text-gray-600">{formatDate(review.createdAt)}</span>
              {review.prUrl && (
                <a
                  href={review.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View on GitHub
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>

            {/* Summary counts */}
            {comments.length > 0 && (
              <div className="mt-6 flex items-center gap-3 flex-wrap">
                {errorCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 ring-1 ring-red-500/20">
                    🔴 {errorCount} error{errorCount !== 1 ? 's' : ''}
                  </span>
                )}
                {warningCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-yellow-500/10 px-3 py-1.5 text-xs font-medium text-yellow-400 ring-1 ring-yellow-500/20">
                    🟡 {warningCount} warning{warningCount !== 1 ? 's' : ''}
                  </span>
                )}
                {suggestionCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400 ring-1 ring-blue-500/20">
                    🔵 {suggestionCount} suggestion{suggestionCount !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            )}
          </div>
        ) : null}

        {/* Comments section header */}
        {!loading && review && (
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-sm font-semibold text-gray-400">
              {comments.length} comment{comments.length !== 1 ? 's' : ''}
            </h2>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
        )}

        {/* Comments list */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => <CommentSkeleton key={i} />)}
          </div>
        ) : review && comments.length === 0 ? (
          <NoComments />
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => <CommentCard key={comment.id} comment={comment} />)}
          </div>
        )}
      </main>
    </div>
  )
}
