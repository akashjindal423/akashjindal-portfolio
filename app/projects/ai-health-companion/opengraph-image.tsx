import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

export const alt = 'AI Health Companion — concept study by Akash Jindal'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderOgImage({
    eyebrow: 'Concept study',
    title: 'AI Health Companion',
    subtitle: 'AI-guided exercise, posture feedback and culturally relevant nutrition.',
  })
}
