import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import SectionWrapper from '@/components/shared/SectionWrapper'
import AnimatedEntry from '@/components/shared/AnimatedEntry'
import Terminal from '@/components/lab/Terminal'
import { LAB_ITEMS } from '@/lib/lab/items'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Lab',
  description:
    'Small interactive experiments by Akash Jindal: a rule-based Gen BI demo on fictional data, a RICE prioritisation game and a terminal for the CV.',
  path: '/lab',
})

export default function LabPage() {
  return (
    <main>
      <SectionWrapper className="pb-0 sm:pb-0">
        <PageHeader
          eyebrow="LAB"
          title="Try the ideas, not just the CV"
          subtitle="Small, self-contained experiments that show how I think about AI, data and prioritisation. Everything runs in your browser on synthetic data."
        />
      </SectionWrapper>

      <SectionWrapper className="pt-10 sm:pt-12">
        {LAB_ITEMS.length === 0 ? (
          <p className="text-text-secondary">Experiments are on their way.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {LAB_ITEMS.map((item, i) => (
              <li key={item.slug}>
                <AnimatedEntry delay={i * 0.08} className="h-full">
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-[2px] hover:border-violet-500/30 hover:shadow-glow"
                  >
                    <h2 className="text-lg font-semibold text-text-primary group-hover:text-violet-400 transition-colors duration-200">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary flex-1">{item.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/5 bg-[var(--background)] px-2 py-0.5 text-[11px] text-text-subtle"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm text-violet-400">
                      Open <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </AnimatedEntry>
              </li>
            ))}
          </ul>
        )}
      </SectionWrapper>

      <SectionWrapper id="terminal" className="pt-0 sm:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Terminal: the CV as a command line</h2>
            <p className="mt-3 text-text-secondary leading-relaxed">
              The <span className="font-mono text-text-primary">product_brief.md</span> card is a small terminal. Type{' '}
              <span className="font-mono text-text-primary">help</span>, or use the quick commands under the prompt. Every
              answer is built from the same content as the rest of the site.
            </p>
            <p className="mt-3 text-sm text-text-subtle">
              Keyboard: Tab to the prompt, Enter to run, ↑ and ↓ for history, Esc to clear the line.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Terminal />
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
