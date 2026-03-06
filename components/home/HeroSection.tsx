'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import CursorGlow from '@/components/hero/CursorGlow'
import TypingHeadline from '@/components/hero/TypingHeadline'
import ProductBriefCard from '@/components/hero/ProductBriefCard'

const fadeUp = (delay: number) => ({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
})

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 60%), #0D0D1A',
      }}
    >
      <CursorGlow />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-screen max-w-7xl mx-auto px-6 py-24">

        {/* Left column */}
        <div className="flex flex-col justify-center">
          {/* Eyebrow */}
          <motion.span
            {...fadeUp(0)}
            className="block text-violet-400 text-sm uppercase tracking-[0.2em] font-medium mb-6"
          >
            Product Owner
          </motion.span>

          {/* H1 */}
          <motion.h1
            {...fadeUp(0.15)}
            className="font-display text-6xl md:text-7xl lg:text-8xl font-extrabold text-text-primary leading-tight mb-6"
          >
            Akash Jindal
          </motion.h1>

          {/* Typing headline */}
          <div className="mt-3 text-xl md:text-2xl text-[#A09EC0] mb-6">
            <TypingHeadline />
          </div>

          {/* Tagline */}
          <motion.p
            {...fadeUp(0.3)}
            className="text-text-secondary text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
          >
            Team Product Owner in the AI Centre of Excellence at Lloyds. Previously AR at Dyson, PS5 at Sony.
            Building products that matter across banking, tech, and innovation.
          </motion.p>

          {/* CTA row */}
          <motion.div
            {...fadeUp(0.45)}
            className="flex gap-4 flex-wrap"
          >
            <Link
              href="/projects"
              className="bg-violet-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-violet-500 hover:scale-[1.02] transition-all duration-200"
            >
              View Projects →
            </Link>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="flex justify-center md:justify-end">
          <ProductBriefCard />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="w-6 h-6 text-text-muted animate-bounce" />
      </div>
    </section>
  )
}
