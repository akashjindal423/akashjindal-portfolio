'use client'

import { useId, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ErrorBoundary from '@/components/shared/ErrorBoundary'
import { COMMANDS, execute, type TermLine, type Tone } from '@/lib/terminal'

const sections = [
  {
    heading: '// WHO',
    lines: [
      { key: 'name', value: '"Akash Jindal"' },
      { key: 'title', value: 'AI Product Owner' },
      { key: 'location', value: 'Bristol, UK' },
    ],
  },
  {
    heading: '// STATUS',
    lines: [
      { key: 'open_to', value: 'AI Product Manager roles', highlight: true },
      { key: 'current', value: 'Team PO · AI CoE @ Lloyds' },
      { key: 'availability', value: 'Open to new roles', highlight: true },
    ],
  },
  {
    heading: '// TRACK RECORD',
    lines: [
      { key: 'lloyds', value: 'Gen AI · Gen BI · AI CoE' },
      { key: 'dyson', value: 'CleanTrace AR · WashG1 NPI' },
      { key: 'sony', value: 'ITSM · ServiceNow (via Infosys)' },
      { key: 'infosys', value: 'Fortune 500 · IoT · Azure' },
    ],
  },
  {
    heading: '// INTERESTS',
    lines: [
      { key: 'building', value: 'Products · AI tools · Insights' },
      { key: 'stack', value: 'GCP · SAFe · SQL · Gen AI' },
    ],
  },
]

const TONE: Record<Tone, string> = {
  default: 'text-text-secondary',
  key: 'text-violet-400',
  muted: 'text-text-subtle',
  ok: 'text-green-400',
  error: 'text-rose-300',
  heading: 'text-text-primary',
}

interface Entry {
  id: number
  command: string
  lines: TermLine[]
}

const noopSubscribe = () => () => {}

function OutputLine({ line }: { line: TermLine }) {
  const { link } = line
  const external = link && /^(https?:|mailto:)/.test(link.href)
  return (
    <p className={`${TONE[line.tone ?? 'default']} text-xs leading-relaxed whitespace-pre-wrap break-words`}>
      {line.text}
      {link && (
        <>
          {line.text ? ' ' : ''}
          {external ? (
            <a
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="text-violet-300 underline underline-offset-2 hover:text-violet-200"
            >
              {link.label}
            </a>
          ) : (
            <Link href={link.href} className="text-violet-300 underline underline-offset-2 hover:text-violet-200">
              {link.label} →
            </Link>
          )}
        </>
      )}
    </p>
  )
}

/** Shown if the terminal throws while rendering: the rest of the page keeps working. */
function TerminalFallback({ reset }: { reset: () => void }) {
  return (
    <div role="alert" className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm">
      <p className="font-semibold text-text-primary">The terminal hit an error.</p>
      <p className="mt-1 text-text-secondary">The rest of the page still works.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-lg border border-[var(--border)] px-4 py-2 text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      >
        Restart the terminal
      </button>
    </div>
  )
}

/** The /lab terminal, isolated in its own error boundary. */
export default function Terminal() {
  return (
    <ErrorBoundary fallback={(reset) => <TerminalFallback reset={reset} />}>
      <TerminalCard />
    </ErrorBoundary>
  )
}

/**
 * "product_brief.md" card. The brief itself is static markup, so it renders
 * without JavaScript. Once hydrated it gains a command line (help, about, projects,
 * experience, skills, contact, why-hire, clear) that works with the keyboard alone.
 */
function TerminalCard() {
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false)
  const [entries, setEntries] = useState<Entry[]>([])
  const [draft, setDraft] = useState('')
  const [recall, setRecall] = useState<number | null>(null)
  const history = useRef<string[]>([])
  const nextId = useRef(0)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()

  function scrollToEnd() {
    requestAnimationFrame(() => {
      const el = bodyRef.current
      if (el) el.scrollTop = el.scrollHeight
    })
  }

  function submit(command: string) {
    const trimmed = command.trim()
    setDraft('')
    setRecall(null)
    if (!trimmed) return
    history.current = [...history.current, trimmed].slice(-20)
    const result = execute(trimmed)
    if (result.kind === 'empty') return
    if (result.kind === 'clear') {
      setEntries([])
      bodyRef.current?.scrollTo({ top: 0 })
      return
    }
    setEntries((prev) => [...prev, { id: nextId.current++, command: trimmed, lines: result.lines }].slice(-12))
    scrollToEnd()
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const past = history.current
    if (e.key === 'ArrowUp' && past.length) {
      e.preventDefault()
      const i = recall === null ? past.length - 1 : Math.max(0, recall - 1)
      setRecall(i)
      setDraft(past[i])
    } else if (e.key === 'ArrowDown' && recall !== null) {
      e.preventDefault()
      const i = recall + 1
      if (i >= past.length) {
        setRecall(null)
        setDraft('')
      } else {
        setRecall(i)
        setDraft(past[i])
      }
    } else if (e.key === 'Escape') {
      setDraft('')
      setRecall(null)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md shadow-2xl overflow-hidden"
    >
      {/* Mac-style title bar */}
      <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--background)] px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-[#FF5F57]" aria-hidden="true" />
        <div className="h-3 w-3 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
        <div className="h-3 w-3 rounded-full bg-[#28C840]" aria-hidden="true" />
        <span className="ml-3 text-xs text-text-subtle font-mono tracking-wide">product_brief.md</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
          <span className="text-[10px] text-green-400 font-mono">live</span>
        </div>
      </div>

      {/* Content: the brief, then any command output */}
      <div
        ref={bodyRef}
        className={`p-5 font-mono text-sm ${entries.length ? 'max-h-[30rem] overflow-y-auto' : ''}`}
        tabIndex={entries.length ? 0 : undefined}
        aria-label={entries.length ? 'Terminal output' : undefined}
      >
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.heading}>
              <p className="text-text-subtle text-xs mb-1.5 tracking-widest">{section.heading}</p>
              <dl className="space-y-1.5">
                {section.lines.map((line) => (
                  <div key={line.key} className="flex gap-3 items-baseline">
                    <dt className="text-violet-400 min-w-[96px] sm:min-w-[110px] shrink-0 text-xs">{line.key}:</dt>
                    <dd className={`${line.highlight ? 'text-green-400' : 'text-text-secondary'} text-xs leading-relaxed`}>
                      {line.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        {hydrated && (
          <div role="log" aria-label="Command output" aria-live="polite" className={entries.length ? "mt-4 space-y-3" : undefined}>
            {entries.map((entry) => (
              <div key={entry.id} className="space-y-0.5">
                <p className="text-xs text-text-primary">
                  <span className="text-green-400" aria-hidden="true">$ </span>
                  {entry.command}
                </p>
                {entry.lines.map((line, i) => (
                  <OutputLine key={i} line={line} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Command line: only rendered once JavaScript is running */}
      {hydrated ? (
        <div className="border-t border-[var(--border)] bg-[var(--background)]/60 px-4 py-3 font-mono">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              submit(draft)
              inputRef.current?.focus()
            }}
            className="flex items-center gap-2"
          >
            <span className="text-green-400 text-sm" aria-hidden="true">$</span>
            <label htmlFor={inputId} className="sr-only">
              Terminal command. Type help for the list of commands.
            </label>
            <input
              id={inputId}
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="type help"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              maxLength={60}
              className="flex-1 min-w-0 bg-transparent text-sm text-text-primary placeholder:text-text-subtle focus:outline-none"
            />
            <button type="submit" className="sr-only focus:not-sr-only text-xs text-violet-300">
              Run
            </button>
          </form>
          <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Quick commands">
            {COMMANDS.filter((c) => c !== 'help').map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => submit(c)}
                className="rounded-md border border-[var(--border)] px-2 py-0.5 text-[11px] text-text-secondary hover:border-[var(--border-strong)] hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 transition-colors duration-200"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      ) : null}

    </motion.div>
  )
}
