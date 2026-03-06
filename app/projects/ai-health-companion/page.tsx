import type { Metadata } from 'next'
import Link from 'next/link'
import Badge from '@/components/shared/Badge'
import PersonaCard from '@/components/projects/PersonaCard'
import MetricCard from '@/components/projects/MetricCard'
import RoadmapPhase from '@/components/projects/RoadmapPhase'

export const metadata: Metadata = {
  title: 'AI Health Companion | Akash Jindal',
  description:
    'A passion project exploring AI-powered personalised wellness — posture-aware exercise guidance, culturally relevant nutrition, and preventive health coaching.',
}

const personas = [
  {
    name: 'Priya', age: '32', role: 'Financial Analyst',
    goals: ['Lose weight without abandoning Indian food', 'Build a sustainable routine around a desk job'],
    frustrations: ['Apps recommend food she does not eat', 'Generic advice triggers guilt not action'],
    needs: ['South Asian meal suggestions', 'Short desk-break routines', 'No shame-based tone'],
  },
  {
    name: 'Marcus', age: '26', role: 'Warehouse Operative',
    goals: ['Improve energy on shift patterns', 'Eat better on a budget'],
    frustrations: ['Wellness content targets flexible-schedule professionals', 'No shift-worker acknowledgement'],
    needs: ['Affordable simple meals', 'Nudges that fit irregular hours', 'Non-judgmental tone'],
  },
  {
    name: 'Helen', age: '47', role: 'Marketing Manager',
    goals: ['Stay mobile and energetic', 'Avoid conditions her parents had'],
    frustrations: ['Apps target 20-somethings', 'Hormonal and age-related changes are invisible'],
    needs: ['Age-appropriate exercise guidance', 'Preventive lifestyle nudges', 'No overwhelming dashboards'],
  },
]

const features = [
  { feature: 'Cultural Onboarding Engine', what: 'Captures background, religion, dietary requirements, location, and food habits', user: 'Advice feels relevant from day one', product: 'Drives activation and trust; core differentiator' },
  { feature: 'AI Posture & Form Feedback', what: 'Uses camera to detect body position during exercises; flags issues in real time', user: 'Reduces injury risk; builds confidence', product: 'Increases session completion; reduces dropout' },
  { feature: 'Culturally Relevant Nutrition', what: 'Generates meal suggestions based on cultural food profile, not calorie templates', user: 'Suggestions use ingredients the user knows', product: 'Primary retention driver; tackles #1 abandonment reason' },
  { feature: 'Work-Pattern Wellness Nudges', what: 'Desk stretches, posture resets, and hydration reminders based on work schedule', user: 'Passive health improvement without disruption', product: 'High-frequency engagement; daily active user driver' },
  { feature: 'Apple Health Integration', what: 'Reads activity, sleep, and heart rate data', user: 'Unified view without manual logging', product: 'Reduces friction; positions app as intelligence layer' },
  { feature: 'Weekly Preventive Digest', what: 'Summarises patterns with one key insight', user: 'Awareness of trends before they become problems', product: 'Retention and perceived value driver' },
  { feature: 'Adaptive AI Profile', what: 'Refines recommendations as behaviour is captured', user: 'Guidance improves the longer you use it', product: 'Core product moat; builds switching cost' },
]

const moscowCols = [
  { label: 'Must', headingColor: 'text-violet-400', borderColor: 'border-violet-500/30', bg: 'bg-violet-500/5', items: ['Cultural onboarding', 'Culturally aware nutrition engine', 'Basic posture tracking', 'Wellness nudges', 'Apple Health integration'] },
  { label: 'Should', headingColor: 'text-amber-400', borderColor: 'border-amber-500/30', bg: 'bg-amber-500/5', items: ['Personalised meal planning', 'Progress dashboard', 'Form correction library', 'Adaptive difficulty'] },
  { label: 'Could', headingColor: 'text-emerald-400', borderColor: 'border-emerald-500/30', bg: 'bg-emerald-500/5', items: ['AI coach chat interface', 'Social accountability features', 'Gamification layer'] },
  { label: "Won't (v1)", headingColor: 'text-text-muted', borderColor: 'border-[#2A2A50]', bg: 'bg-[#13132A]', items: ['Medical diagnosis', 'Guaranteed outcome claims', 'Live consultation'] },
]

const journeySteps = [
  { step: '1', label: 'Onboarding', desc: 'User answers 8–10 questions: location, background, religion, dietary requirements, lifestyle, work pattern, health goal, experience level.' },
  { step: '2', label: 'Profile Built', desc: 'AI generates initial profile: suggested meal style, exercise approach, nudge schedule.' },
  { step: '3', label: 'First Workout', desc: 'User films via camera; AI gives real-time posture feedback during a guided session.' },
  { step: '4', label: 'Nutrition Feed', desc: 'Personalised meal suggestions based on cultural profile — suggestions, not a rigid plan.' },
  { step: '5', label: 'Daily Nudges', desc: 'Desk stretch reminders, hydration prompts, and mobility flows timed to work pattern.' },
  { step: '6', label: 'Weekly Digest', desc: 'Activity, sleep (via Apple Health), and one preventive insight based on patterns.' },
  { step: '7', label: 'Adaptive Loop', desc: 'AI refines suggestions as user feedback and behaviour is tracked over time.' },
]

const sampleStories = [
  {
    epic: 'EP-01',
    story: 'As a new user, I want to answer questions about my cultural background and dietary requirements during setup, so the app understands my food habits from the start.',
    ac: [
      'Onboarding captures country of origin, current location, religion (optional), dietary type, and 3 commonly eaten foods.',
      'Profile generates first nutrition suggestions within the onboarding session.',
    ],
  },
  {
    epic: 'EP-03',
    story: 'As a beginner, I want real-time feedback on my squat form using the camera, so I do not injure myself while learning.',
    ac: [
      'Camera activates during flagged exercises.',
      'AI detects at least 3 key form issues (knee cave, back rounding, insufficient depth).',
      'Feedback appears as on-screen text within 2 seconds.',
      'Session ends with a form summary.',
    ],
  },
]

const metrics = [
  { type: 'North Star', name: 'Weekly Active Health Actions', desc: 'Users completing 3+ meaningful interactions per week' },
  { type: 'Activation', name: 'Onboarding Completion Rate', desc: '% completing full cultural profile in first session' },
  { type: 'Engagement', name: 'Daily Nudge Response Rate', desc: '% of delivered nudges resulting in a user action' },
  { type: 'Retention', name: '30-Day Return Rate', desc: '% returning and completing a health action 30 days after signup' },
  { type: 'Adherence Proxy', name: 'Meal Suggestion Acceptance Rate', desc: '% of suggestions saved or marked helpful within 7 days' },
]

const risks = [
  { risk: 'Camera permission and lighting dependency', impact: 'High', impactColor: 'text-red-400', mitigation: 'Clear onboarding permission flow; graceful degradation to static tips if camera unavailable' },
  { risk: 'Cultural nutrition data gaps at launch', impact: 'Medium', impactColor: 'text-amber-400', mitigation: 'Launch with high-prevalence dietary cultures (South Asian, Middle Eastern, East African); expand iteratively' },
  { risk: 'Medical liability from health recommendations', impact: 'High', impactColor: 'text-red-400', mitigation: 'Legal review of all copy; no diagnostic language anywhere; clear disclaimer on every guidance screen' },
  { risk: 'Apple Health API changes', impact: 'Low', impactColor: 'text-emerald-400', mitigation: 'Abstraction layer; Apple Health is optional not core' },
  { risk: 'User privacy concerns around camera usage', impact: 'High', impactColor: 'text-red-400', mitigation: 'On-device ML processing; no footage stored or transmitted; explicit consent screen' },
]

const roadmapPhases = [
  { phase: 'Phase 1', period: 'M1–3', label: 'Foundation', items: ['Core onboarding', 'Cultural nutrition engine', 'Basic wellness nudges', 'Apple Health read'] },
  { phase: 'Phase 2', period: 'M4–6', label: 'Movement', items: ['Camera-based posture feedback', 'Bodyweight exercise library', 'Form correction alerts', 'Progress tracking'] },
  { phase: 'Phase 3', period: 'M7–9', label: 'Personalisation', items: ['Adaptive AI model', 'Meal planning depth', 'Weekly digest', 'User feedback loop'] },
  { phase: 'Phase 4', period: 'M10–12', label: 'Expansion', items: ['Wearable integration', 'Community layer', 'Expanded exercise library', 'Coach interface'] },
]

export default function AIHealthCompanionPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">

      <Link
        href="/projects"
        className="text-violet-400 hover:text-violet-300 text-sm transition-colors duration-200 inline-block mb-10"
      >
        ← Back to Projects
      </Link>

      {/* HERO */}
      <section>
        <div className="flex flex-wrap gap-2 mb-5">
          {['Passion Project', 'Health Tech', 'AI/ML', 'Concept Stage'].map((pill) => (
            <Badge key={pill} variant="accent">{pill}</Badge>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-sans leading-tight text-text-primary">
          AI Health Companion
        </h1>
        <p className="text-lg text-text-muted mt-3">
          Wellness that actually fits your life — not a generic plan
        </p>
        <p className="text-lg text-text-secondary mt-4 leading-relaxed max-w-3xl">
          A product concept exploring how AI can make preventive health personal, culturally aware,
          and genuinely usable for everyday people.
        </p>
      </section>

      <div className="border-t border-[#2A2A50] mt-12" />

      {/* OVERVIEW */}
      <section className="mt-16">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Overview</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">The Premise</h2>
        <p className="text-base text-text-secondary leading-relaxed max-w-3xl">
          Most wellness apps tell you to eat chicken and broccoli and do a 5am run. They ignore that
          you might eat dal and roti, work a 9-hour desk shift, follow intermittent fasting for
          religious reasons, or simply have never exercised before. AI Health Companion is a product
          concept built around a different premise: that health guidance only works when it reflects
          how someone actually lives. This case study documents the product thinking, discovery
          approach, feature set, and delivery structure behind that idea.
        </p>
      </section>

      {/* PROBLEM SPACE */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Problem Space</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">What is broken today</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'One-size-fits-all health apps', body: '90% of health apps use the same templates regardless of cultural background, dietary norms, religion, or lifestyle. Users disengage when advice feels irrelevant or unachievable.' },
            { title: 'No real-time physical feedback', body: 'Most apps give static exercise instructions with no live feedback. Poor form leads to injury, discouragement, and dropout — especially for beginners.' },
            { title: 'Reactive, not preventive', body: 'Existing tools log activity but do not connect lifestyle patterns to longer-term health trends. There is no guidance layer that says "you have been sedentary 5 days — here is what that means."' },
          ].map((card) => (
            <div key={card.title} className="bg-[#13132A] border border-[#2A2A50] rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-text-primary mb-3 leading-snug">{card.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT VISION */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Product Vision</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">The guiding statement</h2>
        <div className="border-l-4 border-violet-500 pl-6 py-2">
          <p className="text-xl md:text-2xl text-text-primary leading-relaxed italic">
            "An AI health companion that learns your culture, lifestyle, and goals — then gives you
            guidance that is realistic, relevant, and respectful of how you actually live."
          </p>
        </div>
      </section>

      {/* TARGET USERS */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Target Users</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Who this is for</h2>
        <ul className="space-y-3 max-w-2xl">
          {[
            'Desk-based professionals (25–45) with limited time and high sedentary risk',
            'First-generation immigrants and diaspora communities whose food culture is ignored by mainstream apps',
            'Health beginners who need encouragement, not intimidation',
            'Prevention-conscious adults who want to avoid chronic illness without drastic lifestyle change',
            'People with religious or cultural dietary requirements (halal, jain, kosher, religious fasting)',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
              <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* PERSONAS */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Personas</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Representative users</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {personas.map((p) => <PersonaCard key={p.name} {...p} />)}
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Core Features</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">What the product does</h2>
        <div className="overflow-x-auto rounded-2xl border border-[#2A2A50]">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="bg-violet-600/20 border-b border-violet-500/30">
                {['Feature', 'What it does', 'Why it matters to user', 'Why it matters for product'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-violet-300 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((row, i) => (
                <tr key={row.feature} className={`border-b border-[#2A2A50] ${i % 2 === 0 ? 'bg-[#0D0D1F]/50' : 'bg-[#13132A]/70'}`}>
                  <td className="px-4 py-3 font-medium text-text-primary align-top whitespace-nowrap">{row.feature}</td>
                  <td className="px-4 py-3 text-text-secondary align-top">{row.what}</td>
                  <td className="px-4 py-3 text-text-secondary align-top">{row.user}</td>
                  <td className="px-4 py-3 text-text-secondary align-top">{row.product}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DISCOVERY */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Discovery</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">How the thinking was structured</h2>
        <ul className="space-y-3 max-w-3xl">
          {[
            'Desk research into cultural health disparities and health app dropout rates',
            'Hypothetical user interviews mapped to 3 persona archetypes representing underserved segments',
            'Jobs-to-be-done mapping: "When I [situation], I want to [motivation], so I can [outcome]"',
            'Assumption mapping: highest-risk assumptions identified and tested through low-fidelity concept validation',
            'RICE scoring applied across feature candidates to define MVP boundaries',
            'Ethical guardrails defined early: no medical diagnosis language, no prescriptive outcome claims',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
              <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* MVP SCOPE */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">MVP Scope</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">What ships first</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
            <p className="text-[11px] uppercase tracking-widest text-emerald-400 font-semibold mb-4">In Scope</p>
            <ul className="space-y-2.5">
              {['Cultural onboarding flow', 'Culturally aware meal suggestions', 'AI posture feedback on selected bodyweight exercises', 'Work-pattern wellness nudges', 'Apple Health read integration'].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary leading-snug">
                  <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#13132A] border border-[#2A2A50] rounded-2xl p-6">
            <p className="text-[11px] uppercase tracking-widest text-text-muted font-semibold mb-4">Out of Scope</p>
            <ul className="space-y-2.5">
              {['Full wearable biometric analysis', 'Mental health layer', 'Community features', 'Live nutritionist consultation', 'Advanced diagnostics'].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary leading-snug">
                  <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[#3D3B60] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* MOSCOW */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">MoSCoW</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Prioritisation framework</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {moscowCols.map((col) => (
            <div key={col.label} className={`rounded-2xl border ${col.borderColor} ${col.bg} p-5`}>
              <p className={`text-[11px] uppercase tracking-widest font-bold mb-4 ${col.headingColor}`}>{col.label}</p>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item} className="text-sm text-text-secondary leading-snug">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* USER JOURNEY */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">User Journey</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">End-to-end flow</h2>
        <div>
          {journeySteps.map((item, i) => (
            <div key={item.step} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0 z-10">
                  {item.step}
                </div>
                {i < journeySteps.length - 1 && (
                  <div className="w-px flex-1 bg-[#2A2A50] my-1" style={{ minHeight: '1.5rem' }} />
                )}
              </div>
              <div className={`${i < journeySteps.length - 1 ? 'pb-6' : 'pb-0'} pt-1`}>
                <p className="text-sm font-bold text-text-primary mb-1">{item.label}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DELIVERY STRUCTURE */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Delivery Structure</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Epics and stories</h2>
        <div className="flex flex-wrap gap-2 mb-8">
          {['EP-01 Onboarding & Profile', 'EP-02 Cultural Nutrition Engine', 'EP-03 Movement & Posture', 'EP-04 Wellness Nudges', 'EP-05 Apple Health Integration', 'EP-06 Weekly Digest'].map((epic) => (
            <span key={epic} className="text-xs bg-[#13132A] border border-[#2A2A50] text-[#6B69A0] px-3 py-1.5 rounded-lg font-mono">
              {epic}
            </span>
          ))}
        </div>
        <div className="space-y-4">
          {sampleStories.map((s) => (
            <div key={s.epic} className="border border-[#2A2A50] rounded-2xl overflow-hidden">
              <div className="bg-[#13132A] px-5 py-3 border-b border-[#2A2A50]">
                <span className="text-[11px] uppercase tracking-widest text-violet-500 font-semibold">
                  Sample Story — {s.epic}
                </span>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-text-primary leading-relaxed italic mb-4">"{s.story}"</p>
                <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold mb-2">
                  Acceptance Criteria
                </p>
                <div className="bg-[#0D0D1A] rounded-lg px-4 py-3 space-y-2">
                  {s.ac.map((c) => (
                    <p key={c} className="text-sm text-[#A09EC0] font-mono leading-relaxed">
                      <span className="text-violet-500 mr-2">✓</span>{c}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* METRICS */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Metrics</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">How success is measured</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {metrics.map((m) => <MetricCard key={m.name} {...m} />)}
        </div>
      </section>

      {/* RISKS */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Risks</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Known risks and mitigations</h2>
        <div className="overflow-x-auto rounded-2xl border border-[#2A2A50]">
          <table className="w-full text-sm min-w-[540px]">
            <thead>
              <tr className="bg-[#13132A] border-b border-[#2A2A50]">
                {['Risk', 'Impact', 'Mitigation'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-[#4F4D70] font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {risks.map((row, i) => (
                <tr key={row.risk} className={`border-b border-[#2A2A50] last:border-0 ${i % 2 === 0 ? 'bg-[#0D0D1F]/50' : 'bg-[#13132A]/70'}`}>
                  <td className="px-4 py-3 text-text-primary align-top">{row.risk}</td>
                  <td className={`px-4 py-3 font-semibold align-top whitespace-nowrap ${row.impactColor}`}>{row.impact}</td>
                  <td className="px-4 py-3 text-text-secondary align-top">{row.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ETHICAL DISCLAIMER */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Ethical Disclaimer</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Scope of guidance</h2>
        <div className="border-l-4 border-amber-500/60 bg-amber-500/5 rounded-r-2xl px-6 py-5">
          <p className="text-sm text-amber-200/75 leading-relaxed">
            This product does not provide medical diagnosis, clinical advice, or guaranteed health
            outcomes. All guidance is informational and based on general wellness research. Users with
            existing medical conditions should consult a qualified healthcare professional. Posture
            feedback is provided as general movement guidance only — not physiotherapy or clinical
            assessment.
          </p>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Roadmap</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Phased delivery plan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {roadmapPhases.map((p) => <RoadmapPhase key={p.phase} {...p} />)}
        </div>
      </section>

      {/* PO REFLECTION */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">PO Reflection</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">What I learned building this</h2>
        <div className="space-y-4 max-w-3xl text-text-muted leading-relaxed text-base">
          <p>
            The most interesting constraint in this concept is the ethical boundary. The product must
            feel genuinely helpful without ever overstepping into medical advice. Defining that line —
            in copy, onboarding, and feature design — was as important as the features themselves.
          </p>
          <p>
            Culturally aware personalisation is a rarely explored space in health tech. Most products
            default to western dietary models because it is simpler. This concept challenges that
            default, and I believe there is a real underserved market here.
          </p>
          <p>
            The technical complexity of real-time posture tracking is genuine, but the harder problem
            is trust — getting users to grant camera access and believe the guidance is for them. That
            is a discovery and design challenge long before it is an engineering one.
          </p>
        </div>
      </section>

      {/* Footer nav */}
      <div className="flex justify-between mt-20 pt-8 border-t border-[#2A2A50]">
        <Link
          href="/projects"
          className="text-violet-400 hover:text-violet-300 transition-colors duration-200 text-sm"
        >
          ← Back to Projects
        </Link>
        <span />
      </div>
    </main>
  )
}
