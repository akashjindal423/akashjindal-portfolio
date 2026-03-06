'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { getTestimonials } from '@/lib/content'

const testimonials = getTestimonials()

function initials(name: string) {
  const parts = name.split(' ')
  return (parts[0][0] + (parts[parts.length - 1][0] ?? '')).toUpperCase()
}

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const total = testimonials.length
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const prev = () => setCurrent((i) => (i - 1 + total) % total)
  const next = () => setCurrent((i) => (i + 1) % total)

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => setCurrent((i) => (i + 1) % total), 4500)
  }
  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    startAutoPlay()
    return stopAutoPlay
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const t = testimonials[current]

  return (
    <SectionWrapper id="testimonials">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="block text-violet-400 text-xs uppercase tracking-widest mb-2">
          Recommendations
        </span>
        <h2 className="text-3xl font-bold text-text-primary">What People Say</h2>
      </div>

      {/* Card */}
      <div
        className="relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 md:p-12 max-w-4xl mx-auto overflow-hidden"
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        {/* Decorative quote mark */}
        <span className="font-display absolute top-4 left-8 text-[120px] leading-none text-violet-400 opacity-15 select-none pointer-events-none">
          "
        </span>

        {/* Animated quote */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Quote */}
            <p className="relative z-10 text-lg md:text-xl text-text-primary leading-relaxed italic min-h-[100px]">
              "{t.quote}"
            </p>

            {/* Author row */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <div className="w-12 h-12 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
                {initials(t.author)}
              </div>
              <div>
                <p className="font-semibold text-text-primary">{t.author}</p>
                <p className="text-text-secondary text-sm">{t.role}, {t.company}</p>
              </div>
              <span className="ml-auto text-xs bg-[var(--background)] border border-[var(--border)] px-3 py-1 rounded-full text-text-muted">
                {t.relationship}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-text-secondary hover:border-violet-500/40 hover:text-violet-400 transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-violet-600 w-4' : 'bg-[var(--border)] w-2'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next"
            className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-text-secondary hover:border-violet-500/40 hover:text-violet-400 transition-all duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </SectionWrapper>
  )
}
