import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PM Toolkit — 20 Free Templates | Akash Jindal',
  description: '20 free product management templates, frameworks and tools. PRDs, RICE calculator, OKR tracker, user story kit and more — built from 8+ years shipping products at Lloyds, Dyson, and Sony.',
}

export default function ToolkitLayout({ children }: { children: React.ReactNode }) {
  return children
}
