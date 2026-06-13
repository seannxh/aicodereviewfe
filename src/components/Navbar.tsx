import { Link } from 'react-router-dom'
import { BoltIcon, PlusCircleIcon } from './icons'
import { config } from '../config/env'
import type { User } from '../types'

interface Props {
  user: User
}

export default function Navbar({ user }: Props) {
  // Logout is a full-page navigation (not an XHR) so the browser follows the
  // backend's redirect and the session cookie is cleared server-side.
  const handleLogout = () => {
    window.location.href = config.logoutUrl
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/20 transition-shadow group-hover:shadow-purple-500/40">
              <BoltIcon className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-white">ReviewAI</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden sm:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">
              Reviews
            </Link>
            <Link to="/install" className="text-sm text-gray-400 hover:text-white transition-colors">
              Install
            </Link>
          </nav>

          {/* User menu */}
          <div className="flex items-center gap-3">
            <Link
              to="/install"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all"
            >
              <PlusCircleIcon className="h-3.5 w-3.5" />
              Add Repos
            </Link>
            <div className="flex items-center gap-2.5 pl-3 border-l border-white/10">
              <img src={user.avatarUrl} alt={user.githubUsername} className="h-7 w-7 rounded-full ring-1 ring-white/10" />
              <span className="hidden sm:block text-sm font-medium text-gray-300">
                {user.githubUsername}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:bg-white/5 hover:text-gray-300 transition-all"
                title="Sign out"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
