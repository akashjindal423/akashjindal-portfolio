import ProjectsIndex from '@/components/projects/ProjectsIndex'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Projects',
  description:
    'Selected work by Akash Jindal: Gen BI at Lloyds Banking Group, Dyson CleanTrace AR, ITSM and ServiceNow at Sony for the PS5 launch (via Infosys), PromptLab and a Google Maps product teardown.',
  path: '/projects',
})

export default function ProjectsPage() {
  return <ProjectsIndex />
}
