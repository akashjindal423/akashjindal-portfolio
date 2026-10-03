import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import AnimatedEntry from '@/components/shared/AnimatedEntry'
import { GenBiChart } from '@/components/lab/Charts'
import { SyntheticDataNote } from '@/components/lab/GenBiDemo'
import { SUGGESTED_QUESTIONS, ask } from '@/lib/lab/genbi'

// Pre-computed at build time, so the preview renders without JavaScript
const preview = ask(SUGGESTED_QUESTIONS[0])

export default function LabFeature() {
  if (!preview.ok) return null
  const { result } = preview
  return (
    <SectionWrapper id="lab">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-12">
        <div>
          <span className="block text-violet-400 text-xs uppercase tracking-widest mb-2">From the Lab</span>
          <h2 className="text-3xl font-bold text-text-primary">Try a Gen BI demo</h2>
        </div>
        <Link
          href="/lab"
          className="text-violet-400 text-sm hover:text-violet-300 transition-colors duration-200 whitespace-nowrap"
        >
          All experiments →
        </Link>
      </div>
      <AnimatedEntry>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 rounded-xl border border-[#2A2A50] bg-[var(--surface)] p-5 sm:p-8">
          <div className="lg:col-span-2 flex flex-col">
            <p className="text-text-secondary leading-relaxed">
              Ask a plain-English question about a fictional retailer and get a chart plus a one-line answer. It is the
              experience I work on with Gen BI, rebuilt as a small browser demo.
            </p>
            <p className="mt-6 text-xs uppercase tracking-widest text-text-subtle">Example question</p>
            <p className="mt-1 text-text-primary">&ldquo;{result.question}&rdquo;</p>
            <p className="mt-4 text-lg font-semibold text-text-primary leading-snug">{result.answer}</p>
            <div className="mt-6">
              <SyntheticDataNote />
            </div>
            <Link
              href="/lab/gen-bi"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-500 transition-all duration-200"
            >
              Ask your own question <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-3 min-w-0">
            <GenBiChart result={result} />
          </div>
        </div>
      </AnimatedEntry>
    </SectionWrapper>
  )
}
