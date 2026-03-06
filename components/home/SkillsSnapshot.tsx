'use client'

import SectionWrapper from '@/components/shared/SectionWrapper'
import SkillIconGrid from '@/components/sections/SkillIconGrid'

export default function SkillsSnapshot() {
  return (
    <SectionWrapper id="skills">
      <div className="mb-2">
        <span className="block text-violet-400 text-xs uppercase tracking-widest mb-2">
          Skills
        </span>
        <h2 className="text-3xl font-bold text-text-primary">Core Competencies</h2>
      </div>
      <SkillIconGrid />
    </SectionWrapper>
  )
}
