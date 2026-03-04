import PageHeader from '@/components/shared/PageHeader'
import SectionWrapper from '@/components/shared/SectionWrapper'
import TimelineItem from '@/components/experience/TimelineItem'
import Badge from '@/components/shared/Badge'
import { getExperience } from '@/lib/content'

export default function ExperiencePage() {
  const experiences = getExperience()
  const allTools = Array.from(new Set(experiences.flatMap((e) => e.tools)))

  return (
    <main>
      <SectionWrapper>
        <PageHeader
          eyebrow="EXPERIENCE"
          title="Where I've Worked"
          subtitle="My full career history in banking, fintech, and tech."
        />
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Timeline */}
          <div className="lg:col-span-2">
            {experiences.map((exp, i) => (
              <TimelineItem
                key={exp.slug}
                experience={exp}
                isLast={i === experiences.length - 1}
              />
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-[#13132A] border border-[#2A2A50] rounded-xl p-6">
              <p className="text-violet-400 text-xs uppercase tracking-widest font-semibold mb-4">
                Skills &amp; Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {allTools.map((tool) => (
                  <Badge key={tool}>{tool}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
