import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'PromptLab',
  description:
    'Open-source Python CLI by Akash Jindal that scores prompts across 12 dimensions, suggests improved variants and compares their outputs on generated test cases: a starting point for review, not proof of real-world quality.',
  path: '/projects/promptlab',
  image: '/projects/promptlab/opengraph-image',
})

export default function PromptLabLayout({ children }: { children: React.ReactNode }) {
  return children
}
