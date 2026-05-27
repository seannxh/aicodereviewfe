import type { ReviewStatus } from '../types'

interface Props {
  status: ReviewStatus
}

const config: Record<ReviewStatus, { label: string; classes: string; dot: string }> = {
  pending: {
    label: 'Pending',
    classes: 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/20',
    dot: 'bg-yellow-400',
  },
  processing: {
    label: 'Processing',
    classes: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
    dot: 'bg-blue-400 animate-pulse',
  },
  complete: {
    label: 'Complete',
    classes: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
    dot: 'bg-emerald-400',
  },
  failed: {
    label: 'Failed',
    classes: 'bg-red-500/10 text-red-400 ring-red-500/20',
    dot: 'bg-red-400',
  },
}

export default function StatusBadge({ status }: Props) {
  const { label, classes, dot } = config[status] ?? config.pending
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${classes}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  )
}
