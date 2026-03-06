'use client'
import { motion } from 'framer-motion'

const skillGroups = [
  {
    category: 'Product & Strategy',
    accent: 'border-violet-500/30 bg-violet-500/5',
    headerColor: 'text-violet-400',
    skills: [
      { name: 'Roadmapping', icon: '🗺️' },
      { name: 'OKR Alignment', icon: '🎯' },
      { name: 'Backlog Mgmt', icon: '📋' },
      { name: 'Sprint Planning', icon: '🔁' },
      { name: 'Go-To-Market', icon: '🚀' },
      { name: 'Stakeholder Mgmt', icon: '🤝' },
      { name: 'Design Thinking', icon: '💡' },
      { name: 'Journey Mapping', icon: '🗂️' },
    ],
  },
  {
    category: 'Cloud & Data',
    accent: 'border-blue-500/30 bg-blue-500/5',
    headerColor: 'text-blue-400',
    skills: [
      { name: 'Google Cloud', icon: '☁️' },
      { name: 'BigQuery', icon: '📊' },
      { name: 'SQL', icon: '🗄️' },
      { name: 'Azure', icon: '💠' },
      { name: 'Data Warehousing', icon: '🏛️' },
      { name: 'Power BI', icon: '📈' },
      { name: 'Tableau', icon: '📉' },
      { name: 'Looker', icon: '👁️' },
    ],
  },
  {
    category: 'AI & Innovation',
    accent: 'border-purple-500/30 bg-purple-500/5',
    headerColor: 'text-purple-400',
    skills: [
      { name: 'Gen AI', icon: '✨' },
      { name: 'Gen BI', icon: '🧠' },
      { name: 'LLM Tools', icon: '⚡' },
      { name: 'Prompt Eng.', icon: '💬' },
      { name: 'AI CoE', icon: '🔬' },
      { name: 'Vertex AI', icon: '🌐' },
      { name: 'Dashboard Design', icon: '🖥️' },
      { name: 'Semantic Layer', icon: '🔗' },
    ],
  },
  {
    category: 'Delivery & Agile',
    accent: 'border-orange-500/30 bg-orange-500/5',
    headerColor: 'text-orange-400',
    skills: [
      { name: 'SAFe', icon: '🏗️' },
      { name: 'Scrum', icon: '🔄' },
      { name: 'Jira', icon: '📌' },
      { name: 'Confluence', icon: '📚' },
      { name: 'SDLC', icon: '⚙️' },
      { name: 'Azure DevOps', icon: '🔧' },
      { name: 'MS Teams', icon: '💻' },
      { name: 'ServiceNow', icon: '🎫' },
    ],
  },
  {
    category: 'Design & UX',
    accent: 'border-pink-500/30 bg-pink-500/5',
    headerColor: 'text-pink-400',
    skills: [
      { name: 'Figma', icon: '🎨' },
      { name: 'Miro', icon: '🗒️' },
      { name: 'Wireframing', icon: '📐' },
      { name: 'Prototyping', icon: '🖌️' },
      { name: 'UX Research', icon: '👥' },
      { name: 'Visio', icon: '📝' },
      { name: 'Draw.io', icon: '✏️' },
      { name: 'Lucidchart', icon: '🔷' },
    ],
  },
  {
    category: 'Technical & APIs',
    accent: 'border-emerald-500/30 bg-emerald-500/5',
    headerColor: 'text-emerald-400',
    skills: [
      { name: 'API Management', icon: '🔌' },
      { name: 'Postman', icon: '📮' },
      { name: 'Git', icon: '🌿' },
      { name: 'SDLC', icon: '🔩' },
      { name: 'NoSQL', icon: '📦' },
      { name: 'Amplitude', icon: '📡' },
      { name: 'GA4', icon: '📊' },
      { name: 'Automation Testing', icon: '🤖' },
    ],
  },
]

export default function SkillIconGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
      {skillGroups.map((group, gi) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: gi * 0.08 }}
          className={`rounded-2xl border ${group.accent} p-5`}
        >
          <p className={`text-sm font-semibold uppercase tracking-widest mb-5 ${group.headerColor}`}>
            {group.category}
          </p>
          <div className="grid grid-cols-4 gap-x-2 gap-y-4">
            {group.skills.map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col items-center gap-2 group cursor-default"
              >
                <div className="w-14 h-14 rounded-xl bg-[#0D0D1F] border border-[#2A2A50] flex items-center justify-center text-3xl group-hover:border-white/20 group-hover:bg-[#13132A] transition-all duration-200">
                  {skill.icon}
                </div>
                <span className="text-[11px] font-medium text-[#A09EC0] text-center leading-tight group-hover:text-[#A09EC0] transition-colors px-0.5">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
