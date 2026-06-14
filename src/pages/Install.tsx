import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { GitHubIcon, PlusCircleIcon, ExternalLinkIcon } from '../components/icons'
import { config } from '../config/env'
import type { User } from '../types'

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
            <PlusCircleIcon className="h-10 w-10 text-purple-400" />
          </div>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">Add ReviewAI to your repos</h1>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Install the GitHub App to start getting AI-powered code reviews on your pull requests.
            Takes less than a minute to set up.
          </p>

          <a
            href={config.githubInstallUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <GitHubIcon className="h-5 w-5" />
            Install GitHub App
            <ExternalLinkIcon className="h-4 w-4" />
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
