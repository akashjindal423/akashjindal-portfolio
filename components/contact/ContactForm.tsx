'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    subject: 'General Enquiry',
    message: '',
  })

  const inputClass =
    'w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3 text-[#F8F8FF] placeholder-[#4F4D70] focus:outline-none focus:border-violet-500 transition'

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const to = 'akashjindal423@gmail.com'
    const subjectLine = encodeURIComponent(`[Portfolio] ${formData.subject} from ${formData.name}`)
    const body = encodeURIComponent(
      `Hi Akash,\n\n${formData.message}\n\nRegards,\n${formData.name}`
    )
    window.location.href = `mailto:${to}?subject=${subjectLine}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        placeholder="Your name"
        required
        value={formData.name}
        onChange={handleChange}
        className={inputClass}
      />
      <select
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        className={inputClass}
      >
        <option>General Enquiry</option>
        <option>Job Opportunity</option>
        <option>Contract Work</option>
        <option>Speaking</option>
        <option>Other</option>
      </select>
      <textarea
        name="message"
        placeholder="Your message"
        required
        rows={6}
        value={formData.message}
        onChange={handleChange}
        className={inputClass}
      />
      <button
        type="submit"
        className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-lg py-3 font-semibold transition"
      >
        Open Email App →
      </button>
    </form>
  )
}
