'use client'

import Link from 'next/link'
import SectionWrapper from '@/components/shared/SectionWrapper'
import AnimatedEntry from '@/components/shared/AnimatedEntry'
import TimelineItem from '@/components/experience/TimelineItem'
import { getExperience } from '@/lib/content'

const items = getExperience().slice(0, 3)

export default function ExperienceHighlights() {
  return (
    <SectionWrapper id="experience">
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="block text-violet-400 text-xs uppercase tracking-widest mb-2">
            Experience
          </span>
          <h2 className="text-3xl font-bold text-text-primary">Where I've Worked</h2>
        </div>
        <Link
          href="/experience"
          className="text-violet-400 text-sm hover:text-violet-300 transition-colors duration-200 whitespace-nowrap"
        >
          Full history →
        </Link>
      </div>

      {/* Timeline */}
      <div>
        {items.map((exp, i) => (
          <AnimatedEntry key={exp.slug} delay={i * 0.1}>
            <TimelineItem experience={exp} isLast={i === items.length - 1} />
          </AnimatedEntry>
        ))}
      </div>
    </SectionWrapper>
  )
}
