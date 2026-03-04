'use client'

import Link from 'next/link'
import SectionWrapper from '@/components/shared/SectionWrapper'
import AnimatedEntry from '@/components/shared/AnimatedEntry'
import { getSkillGroups } from '@/lib/content'

const groups = getSkillGroups()

const levelMap = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 }

export default function SkillsSnapshot() {
  return (
    <SectionWrapper id="skills">
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="block text-violet-400 text-xs uppercase tracking-widest mb-2">
            Skills
          </span>
          <h2 className="text-3xl font-bold text-text-primary">Core Competencies</h2>
        </div>
        <Link
          href="/skills"
          className="text-violet-400 text-sm hover:text-violet-300 transition-colors duration-200 whitespace-nowrap"
        >
          Full skills matrix →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {groups.map((group, i) => (
          <AnimatedEntry key={group.category} delay={i * 0.1}>
            <div className="bg-[#13132A] border border-[#2A2A50] rounded-xl p-6">
              <p className="text-violet-400 text-xs uppercase tracking-widest font-semibold mb-4">
                {group.category}
              </p>
              <ul className="space-y-3">
                {group.skills.map((skill) => {
                  const filled = levelMap[skill.level]
                  return (
                    <li key={skill.name} className="flex items-center justify-between gap-2">
                      <span className="text-sm text-text-primary">{skill.name}</span>
                      <span className="flex gap-1 flex-shrink-0">
                        {Array.from({ length: 4 }).map((_, d) => (
                          <span
                            key={d}
                            className={`w-2 h-2 rounded-full ${d < filled ? 'bg-violet-600' : 'bg-[#2A2A50]'}`}
                          />
                        ))}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </AnimatedEntry>
        ))}
      </div>
    </SectionWrapper>
  )
}
