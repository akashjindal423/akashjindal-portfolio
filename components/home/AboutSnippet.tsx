import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import AnimatedEntry from '@/components/shared/AnimatedEntry'
import { getTestimonials } from '@/lib/content'

// One recommendation on the homepage; the rest are on /recommendations
const [testimonial] = getTestimonials().filter((t) => t.featured)

export default function AboutSnippet() {
  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <AnimatedEntry>
          <span className="block text-violet-400 text-xs uppercase tracking-widest mb-2">About</span>
          <h2 className="text-3xl font-bold text-text-primary mb-6">Product thinking meets technical fluency</h2>
          <p className="text-text-secondary leading-relaxed">
            Currently a Team Product Owner in the AI Centre of Excellence at Lloyds Banking Group, driving Generative AI
            and Gen BI transformation. Previously shipped AR at Dyson and, via Infosys, worked on ITSM and ServiceNow at
            Sony for the PS5 launch. 9+ years in tech across banking, energy, gaming, and consumer tech.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 mt-6 transition-colors duration-200"
          >
            More about me
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </AnimatedEntry>

        {testimonial && (
          <AnimatedEntry delay={0.15}>
            <figure className="m-0 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
              <blockquote className="text-text-primary leading-relaxed">
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <p className="font-semibold text-text-primary">{testimonial.author}</p>
                <p className="text-text-secondary">
                  {testimonial.role}, {testimonial.company} · {testimonial.relationship}
                </p>
              </figcaption>
            </figure>
            <Link
              href="/recommendations"
              className="mt-4 inline-block text-sm text-violet-400 hover:text-violet-300 transition-colors duration-200"
            >
              All recommendations →
            </Link>
          </AnimatedEntry>
        )}
      </div>
    </SectionWrapper>
  )
}
