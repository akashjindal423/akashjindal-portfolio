import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

export const alt = 'AI Health Companion — product concept by Akash Jindal'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderOgImage({
    eyebrow: 'Project · Concept',
    title: 'AI Health Companion',
    subtitle: 'AI-guided exercise, posture feedback and culturally relevant nutrition.',
  })
}
