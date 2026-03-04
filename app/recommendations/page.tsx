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
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-text-primary font-semibold text-sm">{t.author}</p>
                    {t.linkedinUrl && (
                      <a
                        href={t.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t.author} on LinkedIn`}
                        className="text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                  </div>
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
