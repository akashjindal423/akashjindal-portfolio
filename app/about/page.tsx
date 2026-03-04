import Link from 'next/link'
import { Briefcase } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import SectionWrapper from '@/components/shared/SectionWrapper'

const stats = [
  { value: '8+', label: 'Years in product and banking' },
  { value: '20+', label: 'Products and features shipped' },
  { value: '4', label: 'Agile certifications held' },
]

export default function AboutPage() {
  return (
    <main>
      <SectionWrapper>
        <PageHeader
          eyebrow="ABOUT"
          title="Product thinking meets technical fluency"
        />
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: prose */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-3">My Background</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                I have spent 8 years building digital products at the intersection of banking,
                fintech, and technology. I started my career as a Business Analyst at Lloyds Banking
                Group, where I quickly learned that the best product decisions come from deeply
                understanding both user needs and organisational constraints.
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                From Lloyds I moved into a Product Owner role at Barclays, leading digital
                transformation across retail banking — shipping Open Banking compliance features,
                redesigning the mobile app experience, and managing multi-workstream backlogs. That
                experience shaped how I think about delivery in highly regulated environments.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Today I am a Senior Product Owner at Monzo Bank, owning the lending product area
                across 8M+ customers. I have grown from individual contributor to leading
                cross-functional teams of 12, partnering with engineering, design, data, compliance,
                and executive stakeholders to ship products that drive measurable outcomes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-3">How I Work</h2>
              <p className="text-text-secondary leading-relaxed">
                I run discovery before every roadmap item, write acceptance criteria engineers
                actually want to build against, and track impact obsessively post-launch. I am
                comfortable integrating ML models into product flows, navigating FCA regulatory
                constraints, and running structured prioritisation frameworks under ambiguity. I
                speak the language of engineers without pretending to be one.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-3">Outside Work</h2>
              <p className="text-text-secondary leading-relaxed">
                When I am not writing PRDs, I enjoy long walks across London, exploring independent
                coffee shops, and reading about behavioural economics. I am a serial note-taker and
                occasional amateur cook.
              </p>
            </div>
          </div>

          {/* Right: sticky photo + stats */}
          <div className="md:sticky md:top-8 md:self-start flex flex-col gap-6">
            <div className="w-full aspect-square bg-[#13132A] border border-[#2A2A50] rounded-2xl flex items-center justify-center text-[#4F4D70] text-sm">
              Photo coming soon
            </div>
            {stats.map(({ value, label }) => (
              <div
                key={value}
                className="bg-[#13132A] border border-[#2A2A50] rounded-xl p-6 flex items-center gap-4"
              >
                <span className="font-display text-4xl font-extrabold text-violet-400 leading-none">
                  {value}
                </span>
                <span className="text-text-secondary text-sm leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Currently Open To */}
        <div className="mt-16 bg-violet-600/10 border border-violet-500/20 rounded-xl p-6 flex items-start gap-4">
          <Briefcase className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-text-primary font-semibold mb-1">Currently Open To</p>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              Open to Senior PO / Lead PO roles in fintech, banking, or growth-stage tech.
              London-based, open to hybrid.
            </p>
            <Link
              href="/contact"
              className="text-violet-400 text-sm hover:text-violet-300 transition-colors duration-200"
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
