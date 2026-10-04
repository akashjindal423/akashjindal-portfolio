'use client'

import { useState } from 'react'
import { CONTACT_EMAIL } from '@/lib/site'

const labelClass = 'block text-sm font-medium text-text-secondary mb-1.5'
const inputClass =
  'w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3 text-text-primary placeholder:text-text-subtle focus:outline-none focus:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/40 transition'

/** Opens the visitor's email app with the message filled in. Labels stay visible while typing. */
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    subject: 'General Enquiry',
    message: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subjectLine = encodeURIComponent(`[Portfolio] ${formData.subject} from ${formData.name}`)
    const body = encodeURIComponent(`Hi Akash,\n\n${formData.message}\n\nRegards,\n${formData.name}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subjectLine}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Your name
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          autoComplete="name"
          required
          value={formData.name}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <select id="contact-subject" name="subject" value={formData.subject} onChange={handleChange} className={inputClass}>
          <option>General Enquiry</option>
          <option>Job Opportunity</option>
          <option>Contract Work</option>
          <option>Speaking</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Your message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-lg py-3 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Open Email App →
      </button>
      <p className="text-xs text-text-subtle -mt-1">
        This opens your email app with the message filled in. Nothing is sent from this site.
      </p>
    </form>
  )
}
