export type ReviewStatus = 'pending' | 'processing' | 'complete' | 'failed'
export type Severity = 'error' | 'warning' | 'suggestion'

// Matches exactly what GET /api/auth/me returns from AuthController.java
export interface User {
  id: number
  githubId: string
  githubUsername: string   
  email: string            
  avatarUrl: string       
  createdAt: string
}

export interface ReviewComment {
  id: number
  filePath: string
  lineNumber: number | null
  severity: Severity
  comment: string
  suggestion: string | null
}

export interface Review {
  id: string              // UUID string from backend
  repoFullName: string    // e.g. "sean/my-repo" — backend field name is repoFullName
  prNumber: number
  prTitle: string
  prUrl?: string          // not returned by backend currently, optional
  status: ReviewStatus
  createdAt: string
  comments?: ReviewComment[]
}
