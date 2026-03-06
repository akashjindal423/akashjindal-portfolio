'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimatedEntry from '@/components/shared/AnimatedEntry'
import AboutStats from '@/components/shared/AboutStats'

export default function AboutSnippet() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left column */}
          <AnimatedEntry>
            <span className="block text-violet-400 text-xs uppercase tracking-widest mb-4">
              About
            </span>
            <h2 className="text-3xl font-bold text-text-primary mb-6">
              Product thinking meets technical fluency
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Currently a Team Product Owner in the AI Centre of Excellence at Lloyds Banking Group,
              driving Generative AI and Gen BI transformation. Previously shipped AR at Dyson and
              contributed to the PS5 launch at Sony. 8+ years across banking, energy, and consumer tech.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 mt-6 transition-colors duration-200"
            >
              Read my full story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedEntry>

          {/* Right column */}
          <AnimatedEntry delay={0.2}>
            <AboutStats />
          </AnimatedEntry>
        </div>
      </div>
    </section>
  )
}
