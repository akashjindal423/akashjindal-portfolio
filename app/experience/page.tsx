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

      <SectionWrapper>
        <div className="flex items-center gap-3 mt-16 mb-8">
          <span className="text-xs uppercase tracking-widest text-[#4F4D70]">Community &amp; Volunteering</span>
          <div className="flex-1 h-px bg-[#2A2A50]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Toastmasters */}
          <div className="bg-[#13132A] border border-[#2A2A50] rounded-2xl p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-[#4F4D70] mb-1">Apr 2024 – Oct 2024 · London · Remote</p>
                <h3 className="text-base font-bold text-[#F8F8FF]">Vice President of Membership</h3>
                <p className="text-sm text-violet-400 mt-0.5">Toastmasters International · Part-time</p>
              </div>
              <span className="text-xs bg-violet-500/10 border border-violet-500/20 text-violet-400 px-2.5 py-1 rounded-full shrink-0 ml-3">Leadership</span>
            </div>
            <p className="text-sm text-[#A09EC0] mb-4">Empowering individuals through confident communication and leadership within a globally recognised public speaking community.</p>
            <ul className="space-y-2">
              {[
                'Reignited member engagement — spearheaded initiatives improving participation and community bonding',
                'Drove strategic membership growth via digital marketing campaigns and targeted email outreach',
                'Designed structured onboarding journey with mentorship support, improving retention and integration',
                'Built a scalable membership framework ensuring consistent communication and long-term development',
              ].map((bullet, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#A09EC0]">
                  <span className="text-violet-400 mt-0.5 shrink-0">›</span>
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {['Team Leadership', 'Marketing', 'Community Building', 'Onboarding'].map(tag => (
                <span key={tag} className="text-[10px] bg-[#0D0D1F] border border-white/5 text-[#6B69A0] px-2 py-0.5 rounded-md">{tag}</span>
              ))}
            </div>
          </div>

          {/* SOCH NGO */}
          <div className="bg-[#13132A] border border-[#2A2A50] rounded-2xl p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-[#4F4D70] mb-1">Dec 2019 – Jul 2023 · 3 yrs 8 mos</p>
                <h3 className="text-base font-bold text-[#F8F8FF]">Mentor</h3>
                <p className="text-sm text-violet-400 mt-0.5">SOCH (अंत ही आरम्भ) · Part-time</p>
              </div>
              <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full shrink-0 ml-3">Social Impact</span>
            </div>
            <p className="text-sm text-[#A09EC0] mb-4">Supported high-impact social initiatives focused on health, inclusion, and sustainable development for underprivileged communities.</p>
            <ul className="space-y-2">
              {[
                'Led frontline Covid-19 relief — mentored volunteers delivering essentials to 1,000+ families. Recognised as "Covid Frontline Warrior" (Alert Award 2020)',
                'Guided NGO registration under Section 8 of the Companies Act, unlocking public donations and government partnerships',
                'Initiated Project Pride — delivered gender-neutral washrooms with local governments and launched LGBTQIA+ mental health and vocational programmes',
              ].map((bullet, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#A09EC0]">
                  <span className="text-emerald-400 mt-0.5 shrink-0">›</span>
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {['Mentorship', 'Social Impact', 'Community Development', 'LGBTQIA+ Inclusion'].map(tag => (
                <span key={tag} className="text-[10px] bg-[#0D0D1F] border border-white/5 text-[#6B69A0] px-2 py-0.5 rounded-md">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
