import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import ReviewDetail from './pages/ReviewDetail'
import Install from './pages/Install'
import { getMe } from './api/auth'
import { BoltIcon } from './components/icons'
import type { User } from './types'

/**
 * Tri-state authentication status:
 * - `loading`         — the initial `getMe()` call is still in flight
 * - `unauthenticated` — no valid session; visitor sees the public landing page
 * - `authenticated`   — session valid; `user` is populated and routes unlock
 */
type AuthState = 'loading' | 'unauthenticated' | 'authenticated'

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/30 animate-pulse">
          <BoltIcon className="h-6 w-6 text-white" />
        </div>
        <p className="text-xs text-gray-600 font-medium tracking-wide">Loading ReviewAI…</p>
      </div>
    </div>
  )
}

export default function App() {
  const [authState, setAuthState] = useState<AuthState>('loading')
  const [user, setUser] = useState<User | null>(null)

  // On mount, ask the backend who we are. A successful response means a valid
  // session cookie exists; any rejection (typically 401) is treated as logged-out.
  useEffect(() => {
    getMe()
      .then((u) => {
        setUser(u)
        setAuthState('authenticated')
      })
      .catch(() => {
        setAuthState('unauthenticated')
      })
  }, [])

  if (authState === 'loading') {
    return <LoadingScreen />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            authState === 'authenticated'
              ? <Navigate to="/dashboard" replace />
              : <Landing />
          }
        />
        <Route
          path="/dashboard"
          element={
            authState === 'authenticated' && user
              ? <Dashboard user={user} />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/reviews/:id"
          element={
            authState === 'authenticated' && user
              ? <ReviewDetail user={user} />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/install"
          element={
            authState === 'authenticated' && user
              ? <Install user={user} />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="*"
          element={<Navigate to={authState === 'authenticated' ? '/dashboard' : '/'} replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}
