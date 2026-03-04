'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimatedEntry from '@/components/shared/AnimatedEntry'

const stats = [
  { value: '8+', label: 'Years in product and banking' },
  { value: '20+', label: 'Products and features shipped' },
  { value: '4', label: 'Agile certifications held' },
]

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
              With 8+ years across fintech, energy, consumer tech, and consultancy,
              I specialise in data products, AI-led innovation, and cloud transformation.
              I have shipped AR products at Dyson, contributed to the PlayStation 5 launch at Sony,
              and currently lead regulatory data product delivery at Lloyds Banking Group.
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
          <AnimatedEntry delay={0.2} className="flex flex-col gap-4">
            {stats.map(({ value, label }) => (
              <div
                key={value}
                className="bg-[#13132A] border border-[#2A2A50] rounded-xl p-6 flex items-center gap-4"
              >
                <span className="font-display text-4xl font-extrabold text-violet-400 leading-none" >
                  {value}
                </span>
                <span className="text-text-secondary text-sm leading-tight">{label}</span>
              </div>
            ))}
          </AnimatedEntry>
        </div>
      </div>
    </section>
  )
}
