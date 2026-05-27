import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import type { User } from '../types'
import { GITHUB_INSTALL_URL } from '../api/client'

interface Props {
  user: User
}

export default function Install({ user }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar user={user} />
      <main className="mx-auto max-w-2xl px-4 sm:px-6 pt-20 pb-32">
        <div className="animate-fade-in text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 ring-1 ring-purple-500/20">
            <svg className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">Add ReviewAI to your repos</h1>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Install the GitHub App to start getting AI-powered code reviews on your pull requests.
            Takes less than a minute to set up.
          </p>

          <a
            href={GITHUB_INSTALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            Install GitHub App
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          {/* Steps */}
          <div className="mt-16 text-left space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider text-center mb-6">
              How it works
            </h2>
            {[
              {
                step: '01',
                title: 'Install the GitHub App',
                desc: 'Click the button above and select which repositories you want ReviewAI to monitor.',
              },
              {
                step: '02',
                title: 'Open a pull request',
                desc: 'Create or update any PR in your connected repos. ReviewAI is triggered automatically.',
              },
              {
                step: '03',
                title: 'Get instant AI feedback',
                desc: 'Claude reviews the diff and posts inline comments with errors, warnings, and suggestions.',
              },
            ].map((item) => (
              <div key={item.step} className="glass rounded-xl p-5 flex items-start gap-4 border border-white/[0.06]">
                <span className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 text-xs font-bold text-purple-300 font-mono">
                  {item.step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-0.5 text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link to="/dashboard" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              ← Back to dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
