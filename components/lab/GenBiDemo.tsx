'use client'

import { useId, useState } from 'react'
import { CircleHelp, Info, Send } from 'lucide-react'
import { GenBiChart, type ChartView } from '@/components/lab/Charts'
import {
  CAPABILITIES,
  DATA_YEAR,
  RETAILER,
  RETAILER_BLURB,
  SUGGESTED_QUESTIONS,
  ask,
  type AskOutcome,
  type GenBiResult,
} from '@/lib/lab/genbi'

export const SYNTHETIC_DATA_NOTE = `Rule-based prototype over fictional ${DATA_YEAR} data, with no AI model. Not connected to any employer's data or systems.`

export function SyntheticDataNote() {
  return (
    <p className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{SYNTHETIC_DATA_NOTE}</span>
    </p>
  )
}

function SuggestedQuestions({ asked, onPick }: { asked: string | null; onPick: (q: string) => void }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {SUGGESTED_QUESTIONS.map((q) => (
        <li key={q}>
          <button
            type="button"
            onClick={() => onPick(q)}
            aria-pressed={asked === q}
            className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-left text-sm text-text-secondary hover:border-[var(--border-strong)] hover:text-text-primary aria-pressed:border-highlight aria-pressed:text-highlight transition-all duration-200"
          >
            {q}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default function GenBiDemo() {
  const inputId = useId()
  const [draft, setDraft] = useState('')
  // Starts empty: nothing is answered until the visitor asks
  const [outcome, setOutcome] = useState<AskOutcome>({ kind: 'empty' })
  // Chart or table, kept across answers
  const [view, setView] = useState<ChartView>('chart')

  function run(question: string) {
    setOutcome(ask(question))
    setDraft(question)
  }

  const asked = outcome.kind === 'empty' ? null : outcome.question

  return (
    <div className="flex flex-col gap-6">
      <SyntheticDataNote />

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
        <p className="text-sm text-text-secondary mb-4">
          Ask a question about <span className="text-text-primary font-medium">{RETAILER}</span>, {RETAILER_BLURB}.
          The data covers January to December {DATA_YEAR}.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            run(draft)
          }}
        >
          <label htmlFor={inputId} className="block text-sm font-medium text-text-secondary mb-1.5">
            Ask a question in plain English
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id={inputId}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`e.g. Which region sold the most in Q2 ${DATA_YEAR}?`}
              autoComplete="off"
              maxLength={200}
              className="flex-1 min-w-0 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-text-primary placeholder:text-text-subtle focus:border-violet-500 focus:outline-none transition"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700 transition-all duration-200"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Ask
            </button>
          </div>
        </form>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-widest text-text-subtle mb-2">Suggested questions</p>
          <SuggestedQuestions asked={asked} onPick={run} />
        </div>
      </div>

      <section aria-label="Answer" className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
        <div aria-live="polite">
          {outcome.kind === 'empty' && (
            <p className="text-sm text-text-secondary">
              No question yet. Pick a suggested question above, or type your own.
            </p>
          )}
          {outcome.kind === 'clarify' && <Clarification question={outcome.question} issues={outcome.issues} onPick={run} />}
          {outcome.kind === 'answer' && <AnswerSummary result={outcome.result} />}
        </div>

        {outcome.kind === 'answer' && (
          <>
            <div className="mt-6">
              <GenBiChart key={outcome.result.title} result={outcome.result} view={view} onViewChange={setView} />
            </div>
            <details className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 text-sm">
              <summary className="cursor-pointer text-text-secondary hover:text-text-primary transition-colors duration-200">
                How this was answered
              </summary>
              <p className="mt-3 text-text-secondary">
                The rules turned the question into the query above. This is the equivalent SQL; the demo runs the same
                aggregation in your browser over a 240-row table (12 months × 4 regions × 5 categories).
              </p>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 font-mono text-xs leading-relaxed text-text-secondary">
                {outcome.result.sql}
              </pre>
            </details>
          </>
        )}
      </section>
    </div>
  )
}

function AnswerSummary({ result }: { result: GenBiResult }) {
  return (
    <>
      <p className="text-xs uppercase tracking-widest text-highlight mb-1">Answer</p>
      <p className="text-sm text-text-subtle mb-2">&ldquo;{result.question}&rdquo;</p>
      <p className="text-lg font-semibold text-text-primary leading-snug">{result.answer}</p>
      <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
        <p className="text-xs uppercase tracking-widest text-text-subtle mb-2">Interpreted as</p>
        <dl className="grid gap-x-4 gap-y-1.5 text-sm sm:grid-cols-[auto_1fr]">
          {result.scope.map((item) => (
            <div key={item.label} className="contents">
              <dt className="text-text-subtle">{item.label}</dt>
              <dd className="text-text-primary">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  )
}

function Clarification({ question, issues, onPick }: { question: string; issues: string[]; onPick: (q: string) => void }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-lg font-semibold text-text-primary">
        <CircleHelp className="h-5 w-5 text-highlight" aria-hidden="true" />
        This question needs clarifying
      </p>
      <p className="mt-1 text-sm text-text-subtle">&ldquo;{question}&rdquo;</p>
      <ul className="mt-3 space-y-1.5 text-sm text-text-secondary">
        {issues.map((issue) => (
          <li key={issue} className="flex gap-2">
            <span aria-hidden="true">›</span>
            <span>{issue}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs uppercase tracking-widest text-text-subtle mb-2">What this demo can answer</p>
      <dl className="grid gap-x-4 gap-y-1.5 text-sm sm:grid-cols-[auto_1fr]">
        {CAPABILITIES.map((item) => (
          <div key={item.label} className="contents">
            <dt className="text-text-subtle">{item.label}</dt>
            <dd className="text-text-secondary">{item.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-xs uppercase tracking-widest text-text-subtle mb-2">Or try one of these</p>
      <SuggestedQuestions asked={null} onPick={onPick} />
    </div>
  )
}
