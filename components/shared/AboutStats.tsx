import { getTraining } from '@/lib/content'

const STATS = [
  { value: '9+', label: 'years in tech' },
  { value: '6+', label: 'years as a Product Owner' },
  { value: '4', label: 'industries: banking, energy, gaming, consumer tech' },
  { value: String(getTraining().length), label: 'certifications' },
]

export default function AboutStats() {
  return (
    <div className="grid grid-cols-2 gap-3">

      {STATS.map(({ value, label }) => (
        <div
          key={label}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 flex items-center gap-3"
        >
          <span className="text-3xl font-bold text-highlight shrink-0">{value}</span>
          <span className="text-sm text-text-secondary leading-snug">{label}</span>
        </div>
      ))}

      {/* Box 5 — GCP */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border)] flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 5L9 8H15L12 5Z" fill="#EA4335"/>
            <path d="M17 9.5L14.5 7H19L17 9.5Z" fill="#4285F4"/>
            <path d="M7 9.5L5 7H9.5L7 9.5Z" fill="#FBBC05"/>
            <path d="M12 19L9 16.5L6.5 18.5L8 20.5H16L17.5 18.5L15 16.5L12 19Z" fill="#34A853"/>
            <path d="M17 9.5L15 16.5L12 19L18.5 14L17 9.5Z" fill="#4285F4"/>
            <path d="M7 9.5L9 16.5L12 19L5.5 14L7 9.5Z" fill="#EA4335"/>
            <circle cx="12" cy="13" r="3" fill="white"/>
            <circle cx="12" cy="13" r="2" fill="#4285F4"/>
            <circle cx="12" cy="13" r="1" fill="white"/>
          </svg>
        </div>
        <div>
          <p className="text-[10px] text-text-subtle uppercase tracking-wider font-normal leading-none mb-1">Google Cloud</p>
          <p className="text-sm text-text-secondary font-normal leading-snug">Assoc. Cloud Engineer</p>
        </div>
      </div>

      {/* Box 6 — PSPO */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border)] flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="12" cy="12" r="11" fill="#D9232D"/>
            <text x="12" y="10.5" textAnchor="middle" fill="white" fontSize="4.5" fontWeight="bold" fontFamily="Arial,sans-serif">SCRUM</text>
            <text x="12" y="14.5" textAnchor="middle" fill="white" fontSize="3.5" fontFamily="Arial,sans-serif">.ORG</text>
            <text x="12" y="18.5" textAnchor="middle" fill="white" fontSize="3" fontFamily="Arial,sans-serif">PSPO II</text>
          </svg>
        </div>
        <div>
          <p className="text-[10px] text-text-subtle uppercase tracking-wider font-normal leading-none mb-1">Scrum.org</p>
          <p className="text-sm text-text-secondary font-normal leading-snug">PSPO II Certified</p>
        </div>
      </div>

    </div>
  )
}
