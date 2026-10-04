import Link from 'next/link'
import { Star } from 'lucide-react'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import { STATUS, counts, overallScore, recordedScores, scoreTotal, terminalRows } from '@/lib/projects/promptlab-example'

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

const techStack = [
  'Python 3.10+', 'FastAPI', 'React', 'TypeScript', 'Click', 'Rich',
  'Pydantic', 'Anthropic SDK', 'OpenAI SDK', 'Ollama', 'pytest', 'GitHub Actions', 'Ruff',
]

const stats = ['12 Dimensions', '3 Providers', 'MIT Licence', 'Python 3.10+']

export default function PromptLabPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: 'PromptLab', href: '/projects/promptlab' },
        ]}
      />

      <section>
        <div className="mb-5">
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-medium">
            OPEN SOURCE · v0.1.0
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold font-sans leading-tight text-text-primary">
          Stop Guessing Why Your Prompt Isn&apos;t Working
        </h1>

        <p className="text-lg text-text-secondary mt-5 leading-relaxed max-w-3xl">
          PromptLab scores a prompt across 12 dimensions, suggests improved variants using distinct
          strategies, and compares the outputs of the original and the variants on test cases it
          generates from the prompt. The comparison is a starting point for your own review, not proof
          of how a prompt will perform in real use.
        </p>

        <div className="flex flex-wrap gap-3 mt-8">
          <a
            href="https://github.com/akashjindal423/Promptlab"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors duration-200"
          >
            View on GitHub →
          </a>

          <a
            href="https://github.com/akashjindal423/Promptlab#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[var(--border)] hover:border-[var(--border-strong)] text-text-secondary hover:text-text-primary text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-200"
          >
            Install instructions
          </a>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {stats.map((s) => (
            <span
              key={s}
              className="text-xs px-3 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-text-secondary"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      <div className="border-t border-[var(--border)] mt-12" />

      {/* ── THE PROBLEM ───────────────────────────────────────────────────────── */}
      <section className="mt-16">
        <p className="text-xs uppercase tracking-widest text-highlight mb-2">Why I built it</p>
        <h2 className="text-2xl font-bold text-text-primary mb-8">Three problems I kept hitting</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problems */}
          <div className="bg-red-500/5 border border-red-500/15 rounded-2xl p-6">
            <p className="text-[11px] uppercase tracking-widest text-red-400 font-semibold mb-5">The problem</p>
            <ul className="space-y-4">
              {[
                'A rewritten prompt with no explanation of what was wrong with the original',
                'Evaluation set-ups that assume a labelled dataset I didn\'t have',
                'No record of which variants I had tried, or how they compared',
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
            <p className="text-[11px] uppercase tracking-widest text-emerald-400 font-semibold mb-5">What PromptLab does</p>
            <ul className="space-y-4">
              {[
                'Scores each dimension with a rationale for why it is weak and a suggestion',
                'Generates test cases from the prompt, so variants can be compared without a dataset (a first pass, not a substitute for testing on real inputs)',
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
        <p className="text-xs uppercase tracking-widest text-highlight mb-2">Recorded example</p>
        <h2 className="text-2xl font-bold text-text-primary mb-2">What the analysis looks like</h2>
        <p className="text-sm text-text-muted mb-6">
          A recorded example of <code className="font-mono text-text-primary">promptlab analyse</code> on a weak prompt,
          shown as static text. Nothing runs on this page.
        </p>

        {/* Terminal window */}
        <div className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl">
          {/* Title bar */}
          <div className="bg-[#161b22] px-4 py-3 flex items-center gap-2 border-b border-[var(--border)]">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            <span className="ml-3 text-xs text-text-subtle font-mono">terminal</span>
          </div>

          {/* Body */}
          <div className="bg-[#0d1117] px-6 py-5 font-mono text-sm overflow-x-auto">
            {/* Command */}
            <p className="text-emerald-400">
              <span className="text-text-subtle">$ </span>
              promptlab analyse <span className="text-amber-300">&quot;You are a helpful assistant. Answer questions.&quot;</span>
            </p>

            <p className="text-text-subtle mt-3 text-xs">Analysing prompt across 12 dimensions...</p>

            <div className="mt-4">
              <p className="text-white">
                Overall Score:{' '}
                <span className="text-amber-400 font-bold">{overallScore.toFixed(2)} / 5.0</span>
                <span className="text-text-subtle"> ────────────────────</span>
                <span className="text-amber-400 font-semibold"> NEEDS WORK</span>
              </p>
            </div>

            {/* Table */}
            <div className="mt-5 overflow-x-auto">
              {/* Header */}
              <div className="flex text-[11px] text-text-subtle border-b border-[var(--border)] pb-1.5 mb-0.5">
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
                      {row.score}/5
                    </span>
                    <span className={
                      isCritical ? 'text-red-400' :
                      isGood     ? 'text-emerald-400' :
                      isMedium   ? 'text-amber-400' :
                                   'text-[#8b949e]'
                    }>
                      {STATUS[row.type]}
                    </span>
                  </div>
                )
              })}
            </div>

            <p className="mt-4 text-[#8b949e] text-xs">
              <span className="text-red-400">{counts.critical} critical {counts.critical === 1 ? 'issue' : 'issues'}</span>
              {' · '}
              <span className="text-[#8b949e]">{counts.low} low</span>
              {' · '}
              <span className="text-amber-400">{counts.medium} medium</span>
              {' · '}
              <span className="text-emerald-400">{counts.good} good</span>
            </p>

            <p className="mt-3 text-[#8b949e] text-xs">
              → Run: <span className="text-emerald-300">promptlab improve &quot;You are a helpful assistant...&quot; --test</span>
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs text-text-muted">
          On this page the overall score is the unweighted mean of the {recordedScores.length} dimension scores ({scoreTotal} ÷{' '}
          {recordedScores.length} = {overallScore.toFixed(2)}), and a dimension is Critical at 1/5, Low at 2/5, Medium at
          3/5 and Good at 4/5 or above. The counts are taken from the rows above.
        </p>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-highlight mb-2">How It Works</p>
        <h2 className="text-2xl font-bold text-text-primary mb-8">Three Commands. End to End.</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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
              num: '03', icon: '⚖️', title: 'Compare',
              cmd: 'promptlab improve "your prompt" --test',
              desc: 'Generates test cases from your prompt, runs the original and the 3 variants against them, and scores each output with its reasoning. Use the result to decide what to review by hand: generated test cases and model-graded scores are not proof of real-world quality.',
            },
          ].map((card) => (
            <div key={card.num} className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:-translate-y-[2px] transition-all duration-300 rounded-2xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{card.icon}</span>
                <span className="text-[11px] font-mono font-bold text-text-subtle bg-[var(--surface-raised)] px-2 py-0.5 rounded">{card.num}</span>
              </div>
              <h3 className="text-base font-bold text-text-primary mb-3">{card.title}</h3>
              <div className="bg-[#0d1117] border border-[var(--border)] rounded-lg px-3 py-2 mb-4">
                <code className="text-xs text-emerald-400 font-mono break-all">{card.cmd}</code>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed flex-1">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE 12 DIMENSIONS ─────────────────────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-highlight mb-2">Diagnostic Framework</p>
        <h2 className="text-2xl font-bold text-text-primary mb-2">The 12 Dimensions</h2>
        <p className="text-sm text-text-muted mb-8">
          Every prompt is scored 1–5 across these dimensions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dimensions.map((d) => (
            <div
              key={d.name}
              className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:-translate-y-[2px] transition-all duration-300 rounded-xl p-4"
            >
              <span className="text-xl mb-2 block">{d.icon}</span>
              <p className="text-sm font-semibold text-text-primary mb-1">{d.name}</p>
              <p className="text-xs text-text-muted leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECH STACK ────────────────────────────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-highlight mb-2">Stack</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Built With</h2>

        <div className="flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span
              key={t}
              className="text-sm px-3 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] text-text-secondary transition-colors duration-200"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="mt-20">
        <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10">

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
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors duration-200"
            >
              <Star className="h-4 w-4" aria-hidden="true" /> Star on GitHub
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border border-[var(--border)] hover:border-[var(--border-strong)] text-text-secondary hover:text-text-primary text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-200"
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
