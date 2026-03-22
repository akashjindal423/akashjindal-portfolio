'use client'

import { useState } from 'react'
import Link from 'next/link'

const tools = [
  { id: 1, name: "PRD Template", category: "Discovery", emoji: "📄", desc: "The product requirements document I use for every feature I ship. Forces problem-first thinking with built-in scope controls.", tagline: "Problem first. Solution second.", downloads: "2.4K", linkedinHook: "I've open-sourced the PRD template I use for every feature I ship." },
  { id: 2, name: "RICE Calculator", category: "Prioritisation", emoji: "🧮", desc: "Scoring framework with guardrails that prevent the 3 most common inflation mistakes POs make when prioritising backlogs.", tagline: "Objective prioritisation, honest scoring.", downloads: "1.8K", linkedinHook: "RICE scoring is the most popular prioritisation framework — and the most misused." },
  { id: 3, name: "Stakeholder Canvas", category: "Stakeholders", emoji: "🗺️", desc: "Power × Interest mapping with communication plan and influence map. Know who to convince first to unblock decisions.", tagline: "Manage people, not just products.", downloads: "1.5K", linkedinHook: "The stakeholder map that changed how I manage products." },
  { id: 4, name: "Retro Board", category: "Delivery", emoji: "🔄", desc: "Sprint retrospective with a max-3-actions constraint, previous sprint accountability check, and team health pulse.", tagline: "Max 3 actions. Zero excuses.", downloads: "2.1K", linkedinHook: "Your sprint retros are broken if you leave with more than 3 action items." },
  { id: 5, name: "OKR Tracker", category: "Strategy", emoji: "🎯", desc: "Objective and Key Result tracker with scoring guide, common mistakes section, and the golden rule: KRs measure outcomes, not outputs.", tagline: "Outcomes, not outputs.", downloads: "1.9K", linkedinHook: "'Launch feature X' is NOT a Key Result. It's a task." },
  { id: 6, name: "User Story Kit", category: "Discovery", emoji: "✍️", desc: "Complete workshop kit: story format, Given/When/Then acceptance criteria, INVEST checklist, story mapping board, DoR and DoD.", tagline: "Stories worth reading.", downloads: "1.7K", linkedinHook: "The 'So that' clause is the most important part of a user story." },
  { id: 7, name: "Vision Board", category: "Strategy", emoji: "🌟", desc: "One-page product vision canvas: Target Group, Needs, Product, Business Goals — anchored by a single inspiring vision statement.", tagline: "One page. Total clarity.", downloads: "1.3K", linkedinHook: "A product vision should fit on one page." },
  { id: 8, name: "Opportunity Solution Tree", category: "Discovery", emoji: "🌳", desc: "Teresa Torres-inspired framework: Outcome → Opportunities → Solutions → Experiments. Prevents jumping to pet solutions.", tagline: "Explore before you commit.", downloads: "1.6K", linkedinHook: "The Opportunity Solution Tree is the most underused framework in PM." },
  { id: 9, name: "MoSCoW Matrix", category: "Prioritisation", emoji: "🚦", desc: "Must/Should/Could/Won't prioritisation with validation rules. The Won't Have list prevents scope creep conversations.", tagline: "Explicit trade-offs. No surprises.", downloads: "1.4K", linkedinHook: "MoSCoW prioritisation in 30 seconds." },
  { id: 10, name: "JTBD Canvas", category: "Research", emoji: "💡", desc: "Jobs To Be Done canvas breaking every job into functional, emotional, and social layers. With switching triggers and hiring criteria.", tagline: "People hire products for a job.", downloads: "1.2K", linkedinHook: "People don't buy products. They hire them to do a job." },
  { id: 11, name: "Metrics Dashboard", category: "Measurement", emoji: "📊", desc: "North Star + AARRR pirate metrics framework. Acquisition, Activation, Retention, Revenue, Referral — with the right KPIs for each.", tagline: "Track what matters.", downloads: "2.0K", linkedinHook: "Every product team tracks metrics. Very few track the RIGHT metrics." },
  { id: 12, name: "Competitive Analysis", category: "Strategy", emoji: "🔍", desc: "Market overview, feature comparison matrix, 2×2 positioning map, and strategic implications. Analysis that leads to action.", tagline: "Find the white space.", downloads: "1.1K", linkedinHook: "A competitive analysis that's just a feature table is useless." },
  { id: 13, name: "GTM Checklist", category: "Delivery", emoji: "🚀", desc: "20-item go-to-market checklist across 4 phases: Pre-Launch, Launch Week, Launch Day, Post-Launch. Never miss a launch step again.", tagline: "Launch without chaos.", downloads: "1.8K", linkedinHook: "Launching a feature without a GTM checklist is like deploying without tests." },
  { id: 14, name: "A/B Test Hypothesis", category: "Measurement", emoji: "🧪", desc: "Structured hypothesis template: Change → Segment → Outcome → Rationale. With decision framework for ship/revert/stop.", tagline: "Test with intention.", downloads: "950", linkedinHook: "Most A/B tests fail because the hypothesis is weak." },
  { id: 15, name: "1-Page Brief", category: "Discovery", emoji: "📝", desc: "Problem (3 sentences), Evidence (3 data points), Proposal (3 sentences), Metrics (2), Risks (2). For when a full PRD is overkill.", tagline: "Pitch any idea in one page.", downloads: "2.3K", linkedinHook: "Not every idea needs a 10-page PRD." },
  { id: 16, name: "Sprint Planning Guide", category: "Delivery", emoji: "📋", desc: "Facilitator guide with strict 60-minute time-box, capacity formula, and 5 anti-patterns to watch for during planning.", tagline: "60 minutes. No more.", downloads: "1.3K", linkedinHook: "Sprint planning should take 60 minutes." },
  { id: 17, name: "Comms Plan", category: "Stakeholders", emoji: "📣", desc: "Stakeholder × Channel × Frequency matrix with escalation protocol. Different stakeholders need different things.", tagline: "Right message, right person, right time.", downloads: "1.0K", linkedinHook: "Different stakeholders need different things at different frequencies." },
  { id: 18, name: "Roadmap (Now/Next/Later)", category: "Strategy", emoji: "🗺️", desc: "Priority-based roadmap replacing Gantt charts. Now = committed, Next = planned, Later = exploring. Honest about confidence.", tagline: "Priority, not false precision.", downloads: "2.5K", linkedinHook: "Stop using Gantt charts for product roadmaps." },
  { id: 19, name: "Decision Log", category: "Delivery", emoji: "📒", desc: "Track every product decision with context, options considered, rationale, and review triggers. Institutional memory for your team.", tagline: "Never lose context again.", downloads: "880", linkedinHook: "The most underrated PM document: a decision log." },
  { id: 20, name: "Interview Prep Kit", category: "Career", emoji: "🎯", desc: "STAR story bank (10 competencies × 2 stories), CIRCLES framework for product cases, estimation framework, and interviewer questions.", tagline: "20 stories. Zero blanks.", downloads: "3.1K", linkedinHook: "I interviewed at 4 companies and got offers at all of them." },
]

const categories = ["All", "Discovery", "Prioritisation", "Strategy", "Delivery", "Measurement", "Stakeholders", "Research", "Career"]

const categoryBadge: Record<string, string> = {
  Discovery: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Prioritisation: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Strategy: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Delivery: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  Measurement: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  Stakeholders: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  Research: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Career: "text-teal-400 bg-teal-400/10 border-teal-400/20",
}

export default function ToolkitPage() {
  const [filter, setFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const filtered = tools.filter(t => {
    const matchCategory = filter === "All" || t.category === filter
    const matchSearch =
      searchQuery === "" ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* ── HERO ── */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <span className="inline-block text-violet-400 text-xs font-semibold uppercase tracking-widest mb-6 px-3 py-1 border border-violet-500/30 rounded-full">
          FREE RESOURCE
        </span>

        <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] leading-tight mb-6">
          The PM Toolkit
        </h1>

        <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed mb-8">
          20 battle-tested templates, frameworks, and tools for Product Managers.
          Built from 8+ years of shipping products at Lloyds, Dyson, Sony, and Infosys.
          Download. Use. Ship better products.
        </p>

        {/* Stat pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["20 Tools", "Free Forever", "Used by 10K+ PMs"].map(s => (
            <span
              key={s}
              className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-full text-sm text-[var(--text-muted)]"
            >
              {s}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a
            href="https://github.com/akash-jindal/pm-toolkit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-violet-500 text-violet-400 text-sm font-semibold hover:bg-violet-500/10 transition-all duration-200"
          >
            ⭐ Star on GitHub
          </a>
          <a
            href="#tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-200"
          >
            Download All 20 Tools
          </a>
        </div>

        <p className="text-sm text-[var(--text-muted)] max-w-xl mx-auto">
          Built by Akash Jindal — Technical Product Owner at Lloyds Banking Group's AI Centre of Excellence.
          Previously shipped AR at Dyson and contributed to the PS5 launch at Sony.
        </p>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "🧰", value: "20", label: "Templates" },
            { icon: "🆓", value: "Free Forever", label: "" },
            { icon: "⏱️", value: "8+ Years", label: "of PM Experience Distilled" },
            { icon: "🏢", value: "Lloyds, Dyson & Sony", label: "Built at" },
          ].map(s => (
            <div key={s.label}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="text-[var(--text-primary)] font-bold">{s.value}</div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SEARCH + FILTER ── */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="flex justify-center mb-4">
          <div className="relative w-full max-w-md">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx={11} cy={11} r={8} />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl pl-10 pr-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-violet-500/50 outline-none text-sm transition-colors duration-200"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                filter === cat
                  ? "bg-violet-600 border-violet-600 text-white"
                  : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)] hover:border-violet-500/30 hover:text-[var(--text-primary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── TOOLS GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filtered.length === 0 ? (
          <p className="text-center text-[var(--text-muted)] py-16">No tools match your search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(tool => {
              const badgeClass = categoryBadge[tool.category] ?? "text-violet-400 bg-violet-400/10 border-violet-400/20"
              const isMostPopular = tool.id === 18 || tool.id === 20

              return (
                <div key={tool.id} className="flex flex-col">
                  <div className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 hover:-translate-y-0.5 transition-all duration-200">
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-3xl">{tool.emoji}</span>
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        {isMostPopular && (
                          <span className="text-xs px-2 py-0.5 rounded-full border bg-amber-500/10 text-amber-400 border-amber-500/20">
                            ⭐ Most Popular
                          </span>
                        )}
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeClass}`}>
                          {tool.category}
                        </span>
                      </div>
                    </div>

                    {/* Title + tagline */}
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mt-4">{tool.name}</h3>
                    <p className="text-sm text-violet-400 italic mt-1">{tool.tagline}</p>

                    {/* Description */}
                    <p className="text-sm text-[var(--text-muted)] mt-3 leading-relaxed">{tool.desc}</p>

                    {/* Footer */}
                    <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-end">
                      <a
                        href="https://github.com/akash-jindal/pm-toolkit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 transition-colors duration-200"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ── PM PRACTICE SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[var(--border)]">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
            Built for How PMs Actually Work
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            These aren't textbook frameworks. They're the tools I reach for when facing real decisions — in sprint planning, stakeholder reviews, product discovery, and launch weeks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: "🎯",
              title: "Prioritise Without Politics",
              body: "RICE, MoSCoW, and the Opportunity Solution Tree give you a defensible, data-backed answer when everyone has an opinion on what to build next.",
            },
            {
              icon: "🤝",
              title: "Manage Up, Down, and Sideways",
              body: "The Stakeholder Canvas and Comms Plan template cover the meetings, escalations, and relationships that don't appear on any roadmap.",
            },
            {
              icon: "🔍",
              title: "Discover Before You Define",
              body: "User Story Kit, JTBD Canvas, and Product Vision Board force the discipline of understanding the problem before designing the solution.",
            },
            {
              icon: "📦",
              title: "Ship With Confidence",
              body: "The GTM Checklist, Sprint Planning Guide, and Decision Log cover the execution layer — launch prep, team ceremonies, and audit trails.",
            },
            {
              icon: "📊",
              title: "Measure What Matters",
              body: "North Star metrics, AARRR pirate metrics, and A/B test hypothesis templates help you define success before you start building.",
            },
            {
              icon: "🚀",
              title: "Communicate With Clarity",
              body: "The 1-Page Brief and Now/Next/Later Roadmap replace 30-slide decks with one page of honest, confidence-weighted thinking.",
            },
          ].map(card => (
            <div
              key={card.title}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6"
            >
              <div className="text-2xl mb-3">{card.icon}</div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{card.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-violet-600/10 to-violet-900/20 border border-violet-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
            Everything you need to ship better products
          </h2>
          <p className="text-[var(--text-muted)] mb-8">20 templates. Completely free. No email required.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/akash-jindal/pm-toolkit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-violet-500 text-violet-400 text-sm font-semibold hover:bg-violet-500/10 transition-all duration-200"
            >
              ⭐ Star on GitHub
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-200"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
