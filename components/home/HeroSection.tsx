'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import PromptLabPreview from '@/components/home/PromptLabPreview'

const fadeUp = (delay: number) => ({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
})

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-[var(--border)]"
    >
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-16 md:pb-20">

        {/* Left column */}
        <div className="flex flex-col justify-center">
          <motion.span
            {...fadeUp(0)}
            className="block text-violet-400 text-sm uppercase tracking-[0.2em] font-medium mb-4"
          >
            AI Product Owner
          </motion.span>

          <motion.h1
            {...fadeUp(0.15)}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-text-primary leading-tight mb-4"
          >
            Akash Jindal
          </motion.h1>

          <motion.p
            {...fadeUp(0.22)}
            className="text-xl md:text-2xl text-violet-400 font-semibold mb-4"
          >
            Generative AI and Gen BI in banking
          </motion.p>

          <motion.p
            {...fadeUp(0.3)}
            className="text-text-secondary text-lg max-w-xl leading-relaxed mb-8"
          >
            Team Product Owner in the AI Centre of Excellence at Lloyds. Previously AR at Dyson, and ITSM for the PS5
            launch at Sony via Infosys. I also build small public tools, like PromptLab.
          </motion.p>

          <motion.div {...fadeUp(0.45)} className="flex gap-3 flex-wrap">
            <Link
              href="/projects"
              className="bg-violet-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors duration-200"
            >
              View projects
            </Link>
            <Link
              href="/lab"
              className="border border-[var(--border)] text-text-secondary font-semibold px-6 py-3 rounded-lg hover:border-[var(--border-strong)] hover:text-text-primary transition-colors duration-200"
            >
              Try the Lab
            </Link>
          </motion.div>
        </div>

        {/* Right column: a public artefact */}
        <motion.div {...fadeUp(0.3)} className="flex justify-center lg:justify-end">
          <PromptLabPreview />
        </motion.div>
      </div>
    </section>
  )
}
