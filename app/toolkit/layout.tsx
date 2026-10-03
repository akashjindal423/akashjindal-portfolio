import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'PM Toolkit — 20 Free Templates',
  description:
    '20 free product management worksheets and starting templates as one-page PDFs: PRD, RICE scoring, OKRs, user stories, roadmaps and more. No email required.',
  path: '/toolkit',
})

export default function ToolkitLayout({ children }: { children: React.ReactNode }) {
  return children
}
