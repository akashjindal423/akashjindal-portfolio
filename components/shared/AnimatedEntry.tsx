'use client'

import { motion } from 'framer-motion'

interface AnimatedEntryProps {
  delay?: number
  className?: string
  children: React.ReactNode
}

export default function AnimatedEntry({ delay = 0, className, children }: AnimatedEntryProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
