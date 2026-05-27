import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import ReviewDetail from './pages/ReviewDetail'
import Install from './pages/Install'
import { getMe } from './api/client'
import type { User } from './types'

type AuthState = 'loading' | 'unauthenticated' | 'authenticated'

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/30 animate-pulse">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <p className="text-xs text-gray-600 font-medium tracking-wide">Loading ReviewAI…</p>
      </div>
    </div>
  )
}

export default function App() {
  const [authState, setAuthState] = useState<AuthState>('loading')
  const [user, setUser] = useState<User | null>(null)

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
