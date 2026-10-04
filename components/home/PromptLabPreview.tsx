import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { STATUS, counts, overallScore, terminalRows } from '@/lib/projects/promptlab-example'

const PROMPTLAB_REPO = 'https://github.com/akashjindal423/Promptlab'

const TONE = {
  critical: 'text-red-300',
  low: 'text-text-secondary',
  medium: 'text-amber-300',
  good: 'text-emerald-300',
} as const

/**
 * Hero preview of a public artefact: the recorded PromptLab example, built from the
 * same data as the PromptLab page so the two always agree. Static, no JavaScript needed.
 */
export default function PromptLabPreview() {
  const rows = terminalRows.slice(0, 5)
  return (
    <figure className="m-0 w-full max-w-md overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-card">
      <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" aria-hidden="true" />
        <span className="ml-2 font-mono text-xs text-text-subtle">PromptLab · recorded example</span>
      </div>

      <div className="px-4 py-4 font-mono text-xs leading-relaxed sm:px-5">
        <p className="text-text-primary break-words">
          <span className="text-text-subtle" aria-hidden="true">$ </span>
          promptlab analyse &quot;You are a helpful assistant. Answer questions.&quot;
        </p>
        <p className="mt-3 text-text-primary">
          Overall <span className="font-semibold text-amber-300">{overallScore.toFixed(2)} / 5.0</span>
          <span className="text-text-subtle"> · mean of 12 dimensions</span>
        </p>
        <table className="mt-3 w-full text-left">
          <caption className="sr-only">First five of twelve dimension scores</caption>
          <tbody>
            {rows.map((row) => (
              <tr key={row.dim}>
                <th scope="row" className="py-0.5 pr-3 font-normal text-text-secondary">{row.dim}</th>
                <td className="py-0.5 pr-3 tabular-nums text-text-primary">{row.score}/5</td>
                <td className={`py-0.5 ${TONE[row.type]}`}>{STATUS[row.type]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-text-subtle">+ {terminalRows.length - rows.length} more dimensions</p>
        <p className="mt-3 text-text-secondary">
          {counts.critical} critical · {counts.low} low · {counts.medium} medium · {counts.good} good
        </p>
      </div>

      <figcaption className="border-t border-[var(--border)] px-4 py-3 text-sm sm:px-5">
        <p className="text-text-secondary">
          PromptLab is my open-source CLI that scores prompts and compares improved variants.
        </p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
          <Link href="/projects/promptlab" className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300">
            Read the write-up <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <a
            href={PROMPTLAB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300"
          >
            Source on GitHub <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </figcaption>
    </figure>
  )
}
