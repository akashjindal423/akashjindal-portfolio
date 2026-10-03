'use client'

import { useId, useState } from 'react'
import { CircleHelp, Info, Send } from 'lucide-react'
import { GenBiChart } from '@/components/lab/Charts'
import { DATA_YEAR, RETAILER, RETAILER_BLURB, SUGGESTED_QUESTIONS, ask, type AskOutcome } from '@/lib/lab/genbi'

export const SYNTHETIC_DATA_NOTE = "Demo with synthetic data. Not connected to any employer's data or systems."

export function SyntheticDataNote() {
  return (
    <p className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{SYNTHETIC_DATA_NOTE}</span>
    </p>
  )
}

export default function GenBiDemo() {
  const inputId = useId()
  const [draft, setDraft] = useState('')
  const [outcome, setOutcome] = useState<AskOutcome>(() => ask(SUGGESTED_QUESTIONS[0]))

  function run(question: string) {
    setOutcome(ask(question))
    setDraft(question)
  }

  return (
    <div className="flex flex-col gap-6">
      <SyntheticDataNote />

      <div className="rounded-xl border border-[#2A2A50] bg-[var(--surface)] p-4 sm:p-6">
        <p className="text-sm text-text-secondary mb-4">
          Ask a question about <span className="text-text-primary font-medium">{RETAILER}</span>, {RETAILER_BLURB}.
          Figures cover January to December {DATA_YEAR}.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            run(draft)
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <label htmlFor={inputId} className="sr-only">
            Ask a question in plain English
          </label>
          <input
            id={inputId}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="e.g. Which region sold the most last quarter?"
            autoComplete="off"
            maxLength={200}
            className="flex-1 min-w-0 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-text-primary placeholder:text-text-subtle focus:border-violet-500 focus:outline-none transition"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-500 transition-all duration-200"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            Ask
          </button>
        </form>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-widest text-text-subtle mb-2">Suggested questions</p>
          <ul className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <li key={q}>
                <button
                  type="button"
                  onClick={() => run(q)}
                  aria-pressed={outcome.ok && outcome.result.question === q}
                  className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-left text-sm text-text-secondary hover:border-violet-500/40 hover:text-violet-400 aria-pressed:border-violet-500/60 aria-pressed:text-violet-300 transition-all duration-200"
                >
                  {q}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section aria-label="Answer" className="rounded-xl border border-[#2A2A50] bg-[var(--surface)] p-4 sm:p-6">
        <div aria-live="polite">
          {outcome.ok ? (
            <>
              <p className="text-xs uppercase tracking-widest text-violet-400 mb-1">Answer</p>
              <p className="text-sm text-text-subtle mb-2">&ldquo;{outcome.result.question}&rdquo;</p>
              <p className="text-lg font-semibold text-text-primary leading-snug">{outcome.result.answer}</p>
            </>
          ) : (
            <Fallback reason={outcome.reason} question={outcome.question} onPick={run} />
          )}
        </div>

        {outcome.ok && (
          <>
            <div className="mt-6">
              <GenBiChart key={outcome.result.title} result={outcome.result} />
            </div>
            <details className="mt-4 rounded-lg border border-[#2A2A50] bg-[var(--background)] p-4 text-sm">
              <summary className="cursor-pointer text-text-secondary hover:text-violet-400 transition-colors duration-200">
                How this was answered
              </summary>
              <p className="mt-3 text-text-secondary">
                Matched terms:{' '}
                {outcome.result.matchedTerms.map((t) => (
                  <code key={t} className="mr-1.5 rounded bg-[var(--surface)] px-1.5 py-0.5 font-mono text-xs text-violet-300">
                    {t}
                  </code>
                ))}
              </p>
              <p className="mt-3 text-text-secondary">
                A real Gen BI tool maps the question to governed metrics in a semantic layer, then runs a query like this.
                Here the mapping is keyword rules and the data is a fixed synthetic table:
              </p>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-[#2A2A50] bg-[var(--surface)] p-3 font-mono text-xs leading-relaxed text-text-secondary">
                {outcome.result.query}
              </pre>
            </details>
          </>
        )}
      </section>
    </div>
  )
}

function Fallback({
  reason,
  question,
  onPick,
}: {
  reason: 'empty' | 'unmatched'
  question: string
  onPick: (q: string) => void
}) {
  return (
    <div>
      <p className="flex items-center gap-2 text-lg font-semibold text-text-primary">
        <CircleHelp className="h-5 w-5 text-violet-400" aria-hidden="true" />
        {reason === 'empty' ? 'Type a question to get started.' : "I can't answer that one from this dataset yet."}
      </p>
      {reason === 'unmatched' && (
        <p className="mt-2 text-sm text-text-secondary">
          &ldquo;{question}&rdquo; didn&apos;t match any metric. This demo understands questions about regional revenue,
          monthly trends (optionally for one region), product categories, return rates, online share and average order
          value. Real Gen BI tools handle this with a clarifying question rather than a guess.
        </p>
      )}
      <p className="mt-4 text-xs uppercase tracking-widest text-text-subtle mb-2">Try one of these</p>
      <ul className="flex flex-col gap-1.5">
        {SUGGESTED_QUESTIONS.slice(0, 3).map((q) => (
          <li key={q}>
            <button
              type="button"
              onClick={() => onPick(q)}
              className="text-left text-sm text-violet-400 hover:text-violet-300 transition-colors duration-200"
            >
              {q} →
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
