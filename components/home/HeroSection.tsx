'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download, ChevronDown } from 'lucide-react'

const fadeUp = (delay: number) => ({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
})

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 60%), #0D0D1A',
      }}
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Eyebrow */}
        <motion.span
          {...fadeUp(0)}
          className="block text-violet-400 text-sm uppercase tracking-[0.2em] font-medium mb-6"
        >
          Data Product Owner
        </motion.span>

        {/* H1 */}
        <motion.h1
          {...fadeUp(0.15)}
          className="font-display text-6xl md:text-7xl lg:text-8xl font-extrabold text-text-primary leading-tight mb-6"
        >
          Akash Jindal
        </motion.h1>

        {/* Tagline */}
        <motion.p
          {...fadeUp(0.3)}
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Bridging data, AI, and cloud to deliver compliant, high-impact products.
          From AR at Dyson to regulatory data at Lloyds — I turn complex requirements into products teams are proud of.
        </motion.p>

        {/* CTA row */}
        <motion.div
          {...fadeUp(0.45)}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link
            href="/projects"
            className="bg-violet-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-violet-500 hover:scale-[1.02] transition-all duration-200"
          >
            View Projects →
          </Link>
          <Link
            href="/cv/akash-jindal-cv.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 border border-[#2A2A50] text-[#A09EC0] px-8 py-4 rounded-lg hover:border-violet-500/60 hover:text-violet-400 transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            Download CV
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="w-6 h-6 text-text-muted animate-bounce" />
      </div>
    </section>
  )
}
