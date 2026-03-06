'use client'
import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return
      glowRef.current.style.left = `${e.clientX}px`
      glowRef.current.style.top = `${e.clientY}px`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-0 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)',
        transition: 'left 0.15s ease, top 0.15s ease',
      }}
    />
  )
}
