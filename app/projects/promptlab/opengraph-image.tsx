import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

export const alt = 'PromptLab — open-source prompt diagnosis CLI by Akash Jindal'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderOgImage({
    eyebrow: 'Project · Open source',
    title: 'PromptLab',
    subtitle: 'A Python CLI that diagnoses prompts across 12 dimensions and auto-tests improved variants.',
  })
}
