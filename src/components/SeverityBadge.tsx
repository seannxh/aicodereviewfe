import type { Severity } from '../types'

interface Props {
  severity: Severity
}

const config: Record<Severity, { emoji: string; label: string; classes: string }> = {
  error: {
    emoji: '🔴',
    label: 'ERROR',
    classes: 'bg-red-500/10 text-red-400 ring-red-500/20',
  },
  warning: {
    emoji: '🟡',
    label: 'WARNING',
    classes: 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/20',
  },
  suggestion: {
    emoji: '🔵',
    label: 'SUGGESTION',
    classes: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
  },
}

export default function SeverityBadge({ severity }: Props) {
  const { emoji, label, classes } = config[severity] ?? config.suggestion
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide ring-1 ring-inset ${classes}`}>
      <span>{emoji}</span>
      {label}
    </span>
  )
}
