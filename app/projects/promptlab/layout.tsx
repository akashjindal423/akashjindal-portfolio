import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'PromptLab',
  description:
    'Open-source Python CLI that diagnoses prompts across 12 dimensions, generates targeted improvements using distinct strategies, and auto-tests all variants to find the winner — no dataset required.',
  path: '/projects/promptlab',
})

export default function PromptLabLayout({ children }: { children: React.ReactNode }) {
  return children
}
