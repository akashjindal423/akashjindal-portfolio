'use client'
import { motion } from 'framer-motion'

const sections = [
  {
    heading: '// WHO',
    lines: [
      { key: 'name', value: '"Akash Jindal"' },
      { key: 'title', value: 'Product Owner' },
      { key: 'location', value: 'Bristol · London, UK' },
    ],
  },
  {
    heading: '// STATUS',
    lines: [
      { key: 'open_to', value: 'PM · Product · Apps · Dashboards', highlight: true },
      { key: 'current', value: 'Team PO · AI CoE @ Lloyds' },
      { key: 'availability', value: 'Open to new roles', highlight: true },
    ],
  },
  {
    heading: '// TRACK RECORD',
    lines: [
      { key: 'lloyds', value: 'Gen AI · Gen BI · AI CoE' },
      { key: 'dyson', value: 'CleanTrace AR · WashG1 NPI' },
      { key: 'sony', value: 'PS5 platform launch' },
      { key: 'infosys', value: 'Fortune 500 · IoT · Azure' },
    ],
  },
  {
    heading: '// INTERESTS',
    lines: [
      { key: 'building', value: 'Products · AI tools · Insights' },
      { key: 'stack', value: 'GCP · SAFe · SQL · Gen AI' },
    ],
  },
]

export default function ProductBriefCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative w-full max-w-md rounded-2xl border border-[var(--border)] bg-[#0A0A1B]/95 backdrop-blur-md shadow-2xl overflow-hidden"
    >
      {/* Mac-style title bar */}
      <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--background)] px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <div className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <div className="h-3 w-3 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-xs text-[#4F4D70] font-mono tracking-wide">product_brief.md</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-green-400 font-mono">live</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 font-mono text-sm space-y-4">
        {sections.map((section, si) => (
          <div key={section.heading}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + si * 0.15 }}
              className="text-[#3D3B60] text-xs mb-1.5 tracking-widest"
            >
              {section.heading}
            </motion.p>
            <div className="space-y-1.5">
              {section.lines.map((line, li) => (
                <motion.div
                  key={line.key}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + si * 0.15 + li * 0.07 }}
                  className="flex gap-3 items-baseline"
                >
                  <span className="text-violet-400 min-w-[110px] shrink-0 text-xs">{line.key}:</span>
                  <span className={`${line.highlight ? 'text-green-400' : 'text-[#A09EC0]'} text-xs leading-relaxed`}>
                    {line.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom glow line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      {/* Subtle inner glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ boxShadow: 'inset 0 0 40px rgba(124,58,237,0.04)' }} />
    </motion.div>
  )
}
