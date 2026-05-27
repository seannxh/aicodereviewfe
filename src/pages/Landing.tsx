import { GITHUB_LOGIN_URL } from '../api/client'

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Instant Reviews',
    description: 'Claude AI analyzes your pull request the moment it opens — no waiting, no bottlenecks. Get feedback in seconds, not hours.',
    gradient: 'from-purple-500/20 to-purple-500/5',
    iconColor: 'text-purple-400',
    border: 'hover:border-purple-500/30',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    title: 'Inline Comments',
    description: 'Feedback is pinned to the exact file and line that needs attention — just like a senior engineer reviewing alongside you.',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    iconColor: 'text-cyan-400',
    border: 'hover:border-cyan-500/30',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Severity Levels',
    description: 'Issues are triaged as errors, warnings, or suggestions so your team knows what to fix now versus what to consider later.',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-400',
    border: 'hover:border-emerald-500/30',
  },
]

function GithubIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Navbar */}
      <header className="border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/20">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <span className="text-sm font-semibold">ReviewAI</span>
            </div>
            <a
              href={GITHUB_LOGIN_URL}
              className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all"
            >
              <GithubIcon />
              Sign in
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-24 pb-32 text-center sm:pt-36">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
          <div className="absolute h-[400px] w-[400px] translate-x-32 rounded-full bg-cyan-600/8 blur-[100px]" />
        </div>

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 text-xs font-medium text-purple-300">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
          Powered by Claude AI
        </div>

        {/* Headline */}
        <h1 className="relative mx-auto max-w-3xl text-5xl font-bold tracking-tight sm:text-7xl">
          <span className="gradient-text">AI-powered</span>
          <br />
          <span className="text-white">code reviews</span>
        </h1>

        <p className="relative mt-6 max-w-xl text-lg text-gray-400 leading-relaxed">
          AI-powered code reviews on every pull request.
          <br className="hidden sm:block" />
          Catch bugs, improve quality, ship faster.
        </p>

        {/* CTA */}
        <div className="relative mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href={GITHUB_LOGIN_URL}
            className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <GithubIcon />
            Login with GitHub
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <span className="text-xs text-gray-600">Free to start · No credit card required</span>
        </div>

        {/* Code preview mockup */}
        <div className="relative mt-20 w-full max-w-2xl animate-slide-up">
          <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
              <span className="ml-3 text-xs text-gray-600 font-mono">src/auth/middleware.ts · Line 42</span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed text-left">
              <div className="text-gray-500 text-xs mb-3">ReviewAI found 2 issues</div>
              <div className="mb-4 rounded-lg bg-red-500/5 border border-red-500/20 p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-red-400">🔴 ERROR</span>
                  <span className="text-xs text-gray-600 font-mono">middleware.ts:42</span>
                </div>
                <p className="text-xs text-gray-300">Unhandled promise rejection — <code className="text-red-300">verifyToken()</code> can throw but is not wrapped in a try/catch block.</p>
              </div>
              <div className="rounded-lg bg-yellow-500/5 border border-yellow-500/20 p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-yellow-400">🟡 WARNING</span>
                  <span className="text-xs text-gray-600 font-mono">middleware.ts:55</span>
                </div>
                <p className="text-xs text-gray-300">JWT secret is read from <code className="text-yellow-300">process.env</code> on every request. Cache it outside the handler for performance.</p>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 h-24 w-3/4 rounded-full bg-purple-600/15 blur-2xl" />
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-32">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Everything your team needs</h2>
          <p className="mt-3 text-gray-500">From first commit to production — ReviewAI has you covered.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className={`card-hover glass rounded-2xl p-6 border border-white/[0.06] bg-gradient-to-b ${f.gradient} ${f.border}`}
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ${f.iconColor}`}>
                {f.icon}
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-white/[0.06] py-20 text-center">
        <h2 className="text-2xl font-bold text-white">Ready to ship better code?</h2>
        <p className="mt-3 text-gray-500 text-sm">Join teams already using ReviewAI.</p>
        <a
          href={GITHUB_LOGIN_URL}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
        >
          <GithubIcon />
          Get started free
        </a>
      </section>

      <footer className="border-t border-white/[0.04] py-8 text-center text-xs text-gray-700">
        © {new Date().getFullYear()} ReviewAI · Built with Claude AI
      </footer>
    </div>
  )
}
