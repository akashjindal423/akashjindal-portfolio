import ProjectsIndex from '@/components/projects/ProjectsIndex'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Projects',
  description:
    'Selected work by Akash Jindal: Gen BI at Lloyds Banking Group, Dyson CleanTrace AR, the PlayStation 5 platform launch, PromptLab and a Google Maps product teardown.',
  path: '/projects',
})

export default function ProjectsPage() {
  return <ProjectsIndex />
}
