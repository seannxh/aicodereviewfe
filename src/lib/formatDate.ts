/**
 * Date formatting helpers shared across pages so the UI renders timestamps
 * consistently. All inputs are ISO-8601 strings as returned by the backend.
 */

/**
 * Formats a date for compact display, e.g. `Jun 13, 2026`.
 * Used in list/card contexts where space is tight.
 */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Formats a date with the time of day, e.g. `June 13, 2026, 02:30 PM`.
 * Used on detail views where the exact moment matters.
 */
export function formatDateTime(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
