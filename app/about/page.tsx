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
                I started my career at Infosys, delivering cross-industry transformation projects
                for Fortune 500 clients across financial services, manufacturing, and agri-tech —
                including GDPR-compliant cloud migrations and AI-led agriculture pilots. That
                foundation gave me a strong grounding in enterprise delivery and technical thinking.
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                From there I moved into product roles at Sony Interactive Entertainment (PlayStation
                5 launch), SSE plc, and Dyson — where I pioneered the company&apos;s first Augmented
                Reality experience and led New Product Innovation for the WashG1, Dyson&apos;s first
                dedicated wet floor cleaner, collaborating across UK, Singapore, Malaysia, and China.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Today I am a Data Product Owner at Lloyds Banking Group, leading regulatory data
                initiatives, contributing to the AI Centre of Excellence, and driving cloud
                transformation onto Google Cloud Platform. I partner with data engineers, compliance
                teams, and executive stakeholders to deliver products that are both technically
                sound and commercially impactful.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-3">How I Work</h2>
              <p className="text-text-secondary leading-relaxed">
                I run discovery before every roadmap item, write acceptance criteria that engineers
                want to build against, and track impact obsessively post-launch. I am comfortable
                working across data engineering, ML, cloud infrastructure, and UX — speaking the
                language of each discipline without pretending to be a specialist in all of them.
                SAFe at scale, Scrum at speed — I adapt to what the team needs.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-3">Outside Work</h2>
              <p className="text-text-secondary leading-relaxed">
                Based in Bristol, I enjoy hiking, exploring independent coffee shops, and reading
                about AI, behavioural economics, and the future of finance. I am a serial
                note-taker and occasional amateur cook.
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
              Open to Senior / Lead Data Product Owner roles in fintech, banking, AI, or cloud-native tech.
              Bristol / London, open to hybrid.
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
