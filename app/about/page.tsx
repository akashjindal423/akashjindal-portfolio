import Image from 'next/image'
import Link from 'next/link'
import { Briefcase } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import SectionWrapper from '@/components/shared/SectionWrapper'
import AboutStats from '@/components/shared/AboutStats'

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
              <p className="text-text-secondary leading-relaxed">
                I am currently a Team Product Owner in the AI Centre of Excellence at Lloyds Banking
                Group, working on Generative AI and Gen BI initiatives to transform banking for both
                colleagues and customers. Before that, I pioneered Dyson&apos;s first Augmented Reality
                product (CleanTrace) and contributed to the PlayStation 5 platform launch at Sony
                Interactive Entertainment — giving me a rare blend of enterprise data, consumer tech,
                and innovation experience.
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
            <Image
              src="/profile.jpg"
              alt="Akash Jindal"
              width={500}
              height={500}
              className="w-full aspect-square object-cover rounded-2xl border border-[var(--border)]"
              priority
            />
            <AboutStats />
          </div>
        </div>

        {/* Currently Open To */}
        <div className="mt-16 bg-violet-600/10 border border-violet-500/20 rounded-xl p-6 flex items-start gap-4">
          <Briefcase className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-text-primary font-semibold mb-1">Currently Open To</p>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              Open to Senior / Lead Product Owner roles in fintech, banking, AI, or cloud-native tech.
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
