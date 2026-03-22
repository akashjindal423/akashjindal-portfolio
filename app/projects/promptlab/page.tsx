'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

// ── Terminal row data ──────────────────────────────────────────────────────────
const terminalRows = [
  { dim: 'Role Definition',       score: '1/5', status: '⚠ CRITICAL', type: 'critical' },
  { dim: 'Task Clarity',          score: '2/5', status: '▲ LOW',       type: 'low' },
  { dim: 'Output Format',         score: '1/5', status: '⚠ CRITICAL', type: 'critical' },
  { dim: 'Input Specification',   score: '1/5', status: '⚠ CRITICAL', type: 'critical' },
  { dim: 'Constraints',           score: '2/5', status: '▲ LOW',       type: 'low' },
  { dim: 'Examples (Few-shot)',    score: '1/5', status: '⚠ CRITICAL', type: 'critical' },
  { dim: 'Tone & Style',          score: '2/5', status: '▲ LOW',       type: 'low' },
  { dim: 'Edge Cases',            score: '1/5', status: '⚠ CRITICAL', type: 'critical' },
  { dim: 'Reasoning Instructions',score: '1/5', status: '⚠ CRITICAL', type: 'critical' },
  { dim: 'Context Management',    score: '2/5', status: '▲ LOW',       type: 'low' },
  { dim: 'Specificity Balance',   score: '3/5', status: '● MEDIUM',    type: 'medium' },
  { dim: 'Token Efficiency',      score: '4/5', status: '✓ GOOD',      type: 'good' },
]

// ── Dimension cards ────────────────────────────────────────────────────────────
const dimensions = [
  { icon: '🎭', name: 'Role Definition',       desc: 'Does the prompt define a clear expert persona?' },
  { icon: '🎯', name: 'Task Clarity',           desc: 'Is the primary task unambiguous and single-focused?' },
  { icon: '📋', name: 'Output Format',          desc: 'Does it specify the desired structure and format?' },
  { icon: '📥', name: 'Input Specification',    desc: 'Does it describe what inputs to expect?' },
  { icon: '🚧', name: 'Constraints',            desc: 'Are restrictions and limits stated explicitly?' },
  { icon: '💡', name: 'Examples',               desc: 'Are few-shot examples provided to guide output style?' },
  { icon: '🗣️', name: 'Tone & Style',          desc: 'Is the desired register and voice specified?' },
  { icon: '⚡', name: 'Edge Cases',             desc: 'Does it handle unexpected or ambiguous inputs?' },
  { icon: '🧠', name: 'Reasoning',              desc: 'Is chain-of-thought or step-by-step thinking instructed?' },
  { icon: '📦', name: 'Context Management',     desc: 'Is the prompt self-contained with all context?' },
  { icon: '⚖️', name: 'Specificity Balance',   desc: 'Specific enough without over-constraining?' },
  { icon: '✂️', name: 'Token Efficiency',      desc: 'Concise and free of redundant instructions?' },
]

// ── Comparison table ───────────────────────────────────────────────────────────
type CompCell = boolean | '✅' | '❌'
interface CompRow { feature: string; promptlab: boolean; dspy: boolean; promptfoo: boolean; braintrust: boolean; chrome: boolean; highlight?: boolean }
const compRows: CompRow[] = [
  { feature: 'No dataset needed',       promptlab: true,  dspy: false, promptfoo: false, braintrust: false, chrome: true  },
  { feature: 'Explains why it\'s weak', promptlab: true,  dspy: false, promptfoo: false, braintrust: false, chrome: false, highlight: true },
  { feature: 'Auto-tests improvements', promptlab: true,  dspy: true,  promptfoo: true,  braintrust: true,  chrome: false },
  { feature: 'Multi-provider support',  promptlab: true,  dspy: true,  promptfoo: true,  braintrust: true,  chrome: false },
  { feature: 'Local-first / offline',   promptlab: true,  dspy: true,  promptfoo: true,  braintrust: false, chrome: false },
  { feature: 'Free & open source',      promptlab: true,  dspy: true,  promptfoo: true,  braintrust: false, chrome: false },
]

const techStack = [
  'Python 3.10+', 'FastAPI', 'React', 'TypeScript', 'Click', 'Rich',
  'Pydantic', 'Anthropic SDK', 'OpenAI SDK', 'Ollama', 'pytest', 'GitHub Actions', 'Ruff',
]

const stats = ['12 Dimensions', '3 Providers', 'MIT Licence', 'Python 3.10+']

function Cell({ val, bold }: { val: boolean; bold?: boolean }) {
  return (
    <td className="px-4 py-3 text-center text-base">
      {val
        ? <span className={bold ? 'text-emerald-400 font-bold' : 'text-emerald-400'}>✅</span>
        : <span className="text-[#4F4D70]">❌</span>
      }
    </td>
  )
}

export default function PromptLabPage() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText('pip install promptlab').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <Link
        href="/projects"
        className="text-violet-400 hover:text-violet-300 text-sm transition-colors duration-200 inline-block mb-10"
      >
        ← Projects
      </Link>

      <section>
        <div className="mb-5">
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-medium">
            OPEN SOURCE · v0.1.0
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold font-sans leading-tight text-text-primary">
          Stop Guessing Why Your Prompt Isn't Working
        </h1>

        <p className="text-lg text-text-secondary mt-5 leading-relaxed max-w-3xl">
          PromptLab diagnoses your prompt across 12 dimensions, generates targeted improvements using
          distinct strategies, and auto-tests all variants to prove which one wins — in one command.
          No dataset required.
        </p>

        <div className="flex flex-wrap gap-3 mt-8">
          <a
            href="https://github.com/akashjindal423/Promptlab"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors duration-200"
          >
            View on GitHub →
          </a>

          <button
            onClick={handleCopy}
            className="relative inline-flex items-center gap-2 border border-[#2A2A50] hover:border-violet-500/40 text-text-secondary hover:text-violet-300 text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-200 font-mono"
          >
            {copied ? (
              <span className="text-emerald-400">Copied!</span>
            ) : (
              'pip install promptlab'
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {stats.map((s) => (
            <span
              key={s}
              className="text-xs px-3 py-1.5 rounded-full bg-[var(--surface)] border border-[#2A2A50] text-[#A09EC0]"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      <div className="border-t border-[var(--border)] mt-12" />

      {/* ── THE PROBLEM ───────────────────────────────────────────────────────── */}
      <section className="mt-16">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">The Problem</p>
        <h2 className="text-2xl font-bold text-text-primary mb-8">Most prompting tools make you guess.</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problems */}
          <div className="bg-red-500/5 border border-red-500/15 rounded-2xl p-6">
            <p className="text-[11px] uppercase tracking-widest text-red-400 font-semibold mb-5">Without PromptLab</p>
            <ul className="space-y-4">
              {[
                'Rewrite tools give you a new prompt with no explanation of what was wrong',
                'Testing frameworks require a labelled dataset you don\'t have',
                'Chrome extensions work per-session with no history or comparison',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
                  <span className="shrink-0 text-base leading-none mt-0.5">❌</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-6">
            <p className="text-[11px] uppercase tracking-widest text-emerald-400 font-semibold mb-5">With PromptLab</p>
            <ul className="space-y-4">
              {[
                'PromptLab scores every dimension and tells you exactly why each one is weak',
                'Auto-generates test cases from your prompt — no dataset needed',
                'CLI-first, local-first — sessions saved, history browsable, works offline',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
                  <span className="shrink-0 text-base leading-none mt-0.5">✅</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── TERMINAL DEMO ─────────────────────────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Live Demo</p>
        <h2 className="text-2xl font-bold text-text-primary mb-2">See It In Action</h2>
        <p className="text-sm text-text-muted mb-6">Real output from <code className="font-mono text-violet-400">promptlab analyse</code> on a weak prompt.</p>

        {/* Terminal window */}
        <div className="rounded-2xl overflow-hidden border border-[#2A2A50] shadow-2xl">
          {/* Title bar */}
          <div className="bg-[#161b22] px-4 py-3 flex items-center gap-2 border-b border-[#2A2A50]">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            <span className="ml-3 text-xs text-[#4F4D70] font-mono">terminal</span>
          </div>

          {/* Body */}
          <div className="bg-[#0d1117] px-6 py-5 font-mono text-sm overflow-x-auto">
            {/* Command */}
            <p className="text-emerald-400">
              <span className="text-[#4F4D70]">$ </span>
              promptlab analyse <span className="text-amber-300">&quot;You are a helpful assistant. Answer questions.&quot;</span>
            </p>

            <p className="text-[#4F4D70] mt-3 text-xs">Analysing prompt across 12 dimensions...</p>

            <div className="mt-4">
              <p className="text-white">
                Overall Score:{' '}
                <span className="text-amber-400 font-bold">2.1 / 5.0</span>
                <span className="text-[#4F4D70]"> ────────────────────</span>
                <span className="text-amber-400 font-semibold"> NEEDS WORK</span>
              </p>
            </div>

            {/* Table */}
            <div className="mt-5 overflow-x-auto">
              {/* Header */}
              <div className="flex text-[11px] text-[#4F4D70] border-b border-[#2A2A50] pb-1.5 mb-0.5">
                <span className="w-52 shrink-0">Dimension</span>
                <span className="w-16 shrink-0">Score</span>
                <span>Status</span>
              </div>

              {terminalRows.map((row) => {
                const isCritical = row.type === 'critical'
                const isGood = row.type === 'good'
                const isMedium = row.type === 'medium'
                return (
                  <div
                    key={row.dim}
                    className={`flex items-center py-1 text-xs border-l-2 pl-2 my-0.5 ${
                      isCritical ? 'border-red-600/60 bg-red-950/20' :
                      isGood     ? 'border-emerald-600/60 bg-emerald-950/20' :
                      isMedium   ? 'border-amber-600/40 bg-amber-950/10' :
                                   'border-transparent'
                    }`}
                  >
                    <span className={`w-52 shrink-0 ${isCritical ? 'text-[#e8b4b8]' : isGood ? 'text-emerald-300' : 'text-[#c9d1d9]'}`}>
                      {row.dim}
                    </span>
                    <span className={`w-16 shrink-0 font-semibold ${isGood ? 'text-emerald-400' : isCritical ? 'text-red-400' : 'text-[#c9d1d9]'}`}>
                      {row.score}
                    </span>
                    <span className={
                      isCritical ? 'text-red-400' :
                      isGood     ? 'text-emerald-400' :
                      isMedium   ? 'text-amber-400' :
                                   'text-[#8b949e]'
                    }>
                      {row.status}
                    </span>
                  </div>
                )
              })}
            </div>

            <p className="mt-4 text-[#8b949e] text-xs">
              <span className="text-red-400">5 critical issues</span>
              {' · '}
              <span className="text-[#8b949e]">4 low</span>
              {' · '}
              <span className="text-amber-400">1 medium</span>
              {' · '}
              <span className="text-emerald-400">1 good</span>
            </p>

            <p className="mt-3 text-violet-400 text-xs">
              → Run: <span className="text-emerald-300">promptlab improve &quot;You are a helpful assistant...&quot; --test</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">How It Works</p>
        <h2 className="text-2xl font-bold text-text-primary mb-8">Three Commands. End to End.</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              num: '01', icon: '🔍', title: 'Analyse',
              cmd: 'promptlab analyse "your prompt"',
              desc: 'Runs a structured diagnostic across 12 dimensions. Each gets a score from 1–5, a rationale for why it\'s weak, and an actionable suggestion. Critical issues are flagged immediately.',
            },
            {
              num: '02', icon: '✨', title: 'Improve',
              cmd: 'promptlab improve "your prompt"',
              desc: 'Generates 3 improved variants using distinct strategies — structured enhancement, role & context expansion, and few-shot augmentation. Not random rewrites. Each change is explained.',
            },
            {
              num: '03', icon: '🏆', title: 'Test & Win',
              cmd: 'promptlab improve "your prompt" --test',
              desc: 'Auto-generates test cases, runs your original and all 3 variants against them, scores every output, and recommends the winner with reasoning. No dataset. No manual grading.',
            },
          ].map((card) => (
            <div key={card.num} className="bg-[var(--surface)] border border-[#2A2A50] hover:border-violet-500/30 hover:shadow-glow hover:-translate-y-[2px] transition-all duration-300 rounded-2xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{card.icon}</span>
                <span className="text-[11px] font-mono font-bold text-violet-500/60 bg-violet-500/10 px-2 py-0.5 rounded">{card.num}</span>
              </div>
              <h3 className="text-base font-bold text-text-primary mb-3">{card.title}</h3>
              <div className="bg-[#0d1117] border border-[#2A2A50] rounded-lg px-3 py-2 mb-4">
                <code className="text-xs text-emerald-400 font-mono break-all">{card.cmd}</code>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed flex-1">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE 12 DIMENSIONS ─────────────────────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Diagnostic Framework</p>
        <h2 className="text-2xl font-bold text-text-primary mb-2">The 12 Dimensions</h2>
        <p className="text-sm text-text-muted mb-8">
          Every prompt is scored 1–5 across these dimensions. Most prompts score under 2.5 on the first pass.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {dimensions.map((d) => (
            <div
              key={d.name}
              className="bg-[var(--surface)] border border-[#2A2A50] hover:border-violet-500/30 hover:-translate-y-[2px] hover:shadow-glow transition-all duration-300 rounded-xl p-4"
            >
              <span className="text-xl mb-2 block">{d.icon}</span>
              <p className="text-sm font-semibold text-text-primary mb-1">{d.name}</p>
              <p className="text-xs text-text-muted leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Competitive Landscape</p>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Why Not Just Use...</h2>
        <p className="text-sm text-text-muted mb-8">
          PromptLab fills a specific gap — no other tool explains <em>why</em> a prompt is weak and proves the fix.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-[#2A2A50]">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="bg-violet-600/10 border-b border-violet-500/20">
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-violet-300 font-semibold">Feature</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-violet-300 font-semibold text-center">PromptLab</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-[#4F4D70] font-semibold text-center">DSPy</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-[#4F4D70] font-semibold text-center">Promptfoo</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-[#4F4D70] font-semibold text-center">Braintrust</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-[#4F4D70] font-semibold text-center">Chrome Ext.</th>
              </tr>
            </thead>
            <tbody>
              {compRows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-[#2A2A50] last:border-0 ${
                    row.highlight
                      ? 'border-l-2 border-l-amber-500/60 bg-amber-500/5'
                      : i % 2 === 0 ? 'bg-[var(--background)]/40' : 'bg-[var(--surface)]/60'
                  }`}
                >
                  <td className={`px-4 py-3 ${row.highlight ? 'font-semibold text-amber-200/80' : 'text-text-secondary'}`}>
                    {row.feature}
                    {row.highlight && <span className="ml-2 text-[10px] text-amber-500 font-mono uppercase tracking-wider">unique</span>}
                  </td>
                  <Cell val={row.promptlab} bold={row.highlight} />
                  <Cell val={row.dspy} />
                  <Cell val={row.promptfoo} />
                  <Cell val={row.braintrust} />
                  <Cell val={row.chrome} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── TECH STACK ────────────────────────────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Stack</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Built With</h2>

        <div className="flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span
              key={t}
              className="text-sm px-3 py-1.5 rounded-full bg-[var(--surface)] border border-[#2A2A50] hover:border-violet-500/30 text-[#A09EC0] transition-colors duration-200"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="mt-20">
        <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 via-[#13132A] to-violet-900/10 p-8 md:p-10">
          {/* Subtle glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3 relative">
            It&apos;s open source. Use it, break it, improve it.
          </h2>
          <p className="text-base text-text-secondary leading-relaxed max-w-2xl mb-8 relative">
            Built in spare time as a genuine tool I use for my own prompts. PRs welcome — especially
            new providers and diagnostic dimensions.
          </p>

          <div className="flex flex-wrap gap-3 relative">
            <a
              href="https://github.com/akashjindal423/Promptlab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors duration-200"
            >
              ⭐ Star on GitHub
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border border-[#2A2A50] hover:border-violet-500/40 text-text-secondary hover:text-violet-300 text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-200"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer nav ────────────────────────────────────────────────────────── */}
      <div className="flex justify-between mt-16 pt-8 border-t border-[var(--border)]">
        <Link
          href="/projects"
          className="text-violet-400 hover:text-violet-300 transition-colors duration-200 text-sm"
        >
          ← Back to Projects
        </Link>
        <span />
      </div>
    </main>
  )
}
