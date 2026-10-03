import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import SectionWrapper from '@/components/shared/SectionWrapper'
import AnimatedEntry from '@/components/shared/AnimatedEntry'
import { LAB_ITEMS } from '@/lib/lab/items'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Lab',
  description:
    'Small interactive experiments by Akash Jindal: a Gen BI question-answering demo on synthetic data, a RICE prioritisation game and more.',
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
                    className="group flex h-full flex-col rounded-xl border border-[#2A2A50] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-[2px] hover:border-violet-500/30 hover:shadow-glow"
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
        <p className="mt-8 text-sm text-text-secondary">
          One more: the <span className="font-mono text-text-primary">product_brief.md</span> card on the{' '}
          <Link href="/" className="text-violet-400 hover:text-violet-300 transition-colors duration-200">
            homepage
          </Link>{' '}
          is a working terminal. Type <span className="font-mono text-text-primary">help</span> to see what it can do.
        </p>
      </SectionWrapper>
    </main>
  )
}
