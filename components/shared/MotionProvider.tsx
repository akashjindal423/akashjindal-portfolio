'use client'

import { MotionConfig } from 'framer-motion'

/**
 * Honours the OS "reduce motion" setting for every framer-motion component:
 * transform and layout animations are skipped, opacity fades still run.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
