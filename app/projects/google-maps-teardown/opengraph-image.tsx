import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

export const alt = 'Google Maps: A Product Teardown by Akash Jindal'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderOgImage({
    eyebrow: 'Product teardown',
    title: 'Google Maps: A Product Teardown',
    subtitle: 'Competitive moat, monetisation flywheel, Gemini features and three RICE-scored proposals.',
  })
}
