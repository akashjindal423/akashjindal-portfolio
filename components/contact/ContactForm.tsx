'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Enquiry',
    message: '',
  })
  const [status, setStatus] = useState<Status>('idle')

  const inputClass =
    'w-full bg-[#13132A] border border-[#2A2A50] rounded-lg px-4 py-3 text-[#F8F8FF] placeholder-[#4F4D70] focus:outline-none focus:border-violet-500 transition'

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Replace FORM_ID with your Formspree endpoint (https://formspree.io)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle className="w-12 h-12 text-emerald-400" />
        <p className="text-text-primary font-semibold text-lg">Message sent!</p>
        <p className="text-text-secondary text-sm">I&apos;ll be in touch soon.</p>
      </div>
    )
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
      <input
        type="email"
        name="email"
        placeholder="Your email"
        required
        value={formData.email}
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
      {status === 'error' && (
        <p className="text-red-400 text-sm">Something went wrong. Please email directly.</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white rounded-lg py-3 font-semibold transition"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
