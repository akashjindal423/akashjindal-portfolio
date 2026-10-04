import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

export const alt = 'Akash Jindal — AI Product Owner, Generative AI and Gen BI'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderOgImage({
    eyebrow: 'AI Product Owner',
    title: 'Akash Jindal',
    subtitle: "Generative AI and Gen BI in Lloyds Banking Group's AI Centre of Excellence. Previously Dyson, and Sony PlayStation via Infosys.",
  })
}
