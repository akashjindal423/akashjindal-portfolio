import PageHeader from '@/components/shared/PageHeader'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { getTestimonials } from '@/lib/content'

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export default function RecommendationsPage() {
  const testimonials = getTestimonials()

  return (
    <main>
      <SectionWrapper>
        <PageHeader
          eyebrow="RECOMMENDATIONS"
          title="What People Say"
        />
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.slug}
              className="bg-[#13132A] border border-[#2A2A50] rounded-2xl p-8"
            >
              <span className="text-5xl text-violet-600 opacity-30 font-display leading-none">&ldquo;</span>
              <p className="italic text-[#A09EC0] leading-relaxed mt-2">{t.quote}</p>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                  {initials(t.author)}
                </div>
                <div className="min-w-0">
                  <p className="text-text-primary font-semibold text-sm">{t.author}</p>
                  <p className="text-text-muted text-xs truncate">
                    {t.role} · {t.company}
                  </p>
                </div>
                <span className="ml-auto flex-shrink-0 bg-violet-600/20 text-violet-400 text-xs px-2 py-1 rounded-full">
                  {t.relationship}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </main>
  )
}
