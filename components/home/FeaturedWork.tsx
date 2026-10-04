import Link from 'next/link'
import { ArrowRight, Lock } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import AnimatedEntry from '@/components/shared/AnimatedEntry'
import { employerName, getFeaturedPassionProjects, getFeaturedProjects } from '@/lib/content'
import { LAB_ITEMS } from '@/lib/lab/items'

interface WorkCard {
  slug: string
  kind: string
  title: string
  description: string
  tags: string[]
  href: string
  cta: string
}

const KIND: Record<string, string> = {
  promptlab: 'Open-source tool',
  'google-maps-teardown': 'Product teardown',
}

const genBi = LAB_ITEMS.find((item) => item.slug === 'gen-bi')

// Public artefacts first, in the order: PromptLab, Google Maps teardown, Gen BI demo
const cards: WorkCard[] = [
  ...getFeaturedPassionProjects().map((p) => ({
    slug: p.slug,
    kind: KIND[p.slug] ?? p.status,
    title: p.title,
    description: p.description,
    tags: p.tags,
    href: `/projects/${p.slug}`,
    cta: 'Read the write-up',
  })),
  ...(genBi
    ? [
        {
          slug: genBi.slug,
          kind: 'Lab demo',
          title: 'Gen BI demo',
          description: genBi.summary,
          tags: genBi.tags,
          href: genBi.href,
          cta: 'Try the demo',
        },
      ]
    : []),
]

const [lloyds] = getFeaturedProjects()

export default function FeaturedWork() {
  return (
    <SectionWrapper id="work">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-10">
        <div>
          <span className="block text-violet-400 text-xs uppercase tracking-widest mb-2">Work</span>
          <h2 className="text-3xl font-bold text-text-primary">Things you can open and check</h2>
        </div>
        <Link
          href="/projects"
          className="text-violet-400 text-sm hover:text-violet-300 transition-colors duration-200 whitespace-nowrap"
        >
          All projects →
        </Link>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card, i) => (
          <li key={card.slug} className={i === 2 ? 'md:col-span-2 lg:col-span-1' : undefined}>
            <AnimatedEntry delay={i * 0.08} className="h-full">
              <Link
                href={card.href}
                className="group flex h-full flex-col rounded-xl border border-[#2A2A50] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-[2px] hover:border-violet-500/30 hover:shadow-glow"
              >
                <span className="text-xs uppercase tracking-widest text-text-subtle">{card.kind}</span>
                <h3 className="mt-2 text-lg font-semibold text-text-primary leading-snug group-hover:text-violet-400 transition-colors duration-200">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary flex-1">{card.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span key={tag} className="rounded-md border border-white/5 bg-[var(--background)] px-2 py-0.5 text-[11px] text-text-subtle">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm text-violet-400">
                  {card.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </AnimatedEntry>
          </li>
        ))}
      </ul>

      {/* The day job, as context rather than a clickable case study */}
      {lloyds && (
        <AnimatedEntry delay={0.2}>
          <div className="mt-5 rounded-xl border border-[#2A2A50] bg-[var(--surface)] p-6 sm:flex sm:items-start sm:gap-8">
            <div className="sm:w-56 sm:shrink-0">
              <span className="text-xs uppercase tracking-widest text-text-subtle">Context: day job</span>
              <p className="mt-2 text-sm text-text-secondary">{employerName(lloyds)}</p>
              <p className="text-xs text-text-subtle">{lloyds.period}</p>
            </div>
            <div className="mt-3 sm:mt-0">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-text-primary">
                {lloyds.title}
                <Lock size={14} className="text-text-subtle" role="img" aria-label="Confidential: details private" />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{lloyds.description}</p>
              <p className="mt-2 text-xs text-text-subtle">Internal work, so there is no public artefact to link to.</p>
            </div>
          </div>
        </AnimatedEntry>
      )}
    </SectionWrapper>
  )
}
