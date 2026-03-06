'use client'

export default function AboutStats() {
  return (
    <div className="grid grid-cols-2 gap-3">

      {/* Box 1 */}
      <div className="bg-[#13132A] border border-[#2A2A50] rounded-xl p-4 flex items-center gap-3">
        <span className="text-3xl font-bold text-violet-400">8+</span>
        <span className="text-sm text-[#A09EC0] leading-snug">Years in product and banking</span>
      </div>

      {/* Box 2 */}
      <div className="bg-[#13132A] border border-[#2A2A50] rounded-xl p-4 flex items-center gap-3">
        <span className="text-3xl font-bold text-violet-400">20+</span>
        <span className="text-sm text-[#A09EC0] leading-snug">Products and features shipped</span>
      </div>

      {/* Box 3 */}
      <div className="bg-[#13132A] border border-[#2A2A50] rounded-xl p-4 flex items-center gap-3">
        <span className="text-3xl font-bold text-violet-400">4</span>
        <span className="text-sm text-[#A09EC0] leading-snug">Agile certifications held</span>
      </div>

      {/* Box 4 — GCP */}
      <div className="bg-[#13132A] border border-[#2A2A50] rounded-xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#1a1a3a] border border-[#2A2A50] flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <p className="text-[10px] text-[#4F4D70] uppercase tracking-wider font-normal leading-none mb-1">Google Cloud</p>
          <p className="text-sm text-[#A09EC0] font-normal leading-snug">Assoc. Cloud Engineer</p>
        </div>
      </div>

      {/* Box 5 — PSPO, full width */}
      <div className="col-span-2 bg-[#13132A] border border-[#2A2A50] rounded-xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#1a1a3a] border border-[#2A2A50] flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" fill="#D9232D"/>
            <text x="12" y="10.5" textAnchor="middle" fill="white" fontSize="4.5" fontWeight="bold" fontFamily="Arial,sans-serif">SCRUM</text>
            <text x="12" y="14.5" textAnchor="middle" fill="white" fontSize="3.5" fontFamily="Arial,sans-serif">.ORG</text>
            <text x="12" y="18.5" textAnchor="middle" fill="white" fontSize="3" fontFamily="Arial,sans-serif">PSPO II</text>
          </svg>
        </div>
        <div>
          <p className="text-[10px] text-[#4F4D70] uppercase tracking-wider font-normal leading-none mb-1">Scrum.org</p>
          <p className="text-sm text-[#A09EC0] font-normal leading-snug">PSPO II Certified</p>
        </div>
      </div>

    </div>
  )
}
