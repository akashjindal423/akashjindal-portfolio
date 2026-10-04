import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Legacy names kept for existing classes; values match the .dark tokens in globals.css
        background: '#0E0F12',
        surface: '#16181D',
        'surface-raised': '#1D2026',
        'border-subtle': '#2A2E37',
        'border-strong': '#3E4350',
        accent: {
          DEFAULT: '#7C3AED',
          light: '#A78BFA',
        },
        highlight: '#F5B544',
        'text-primary': '#F3F4F6',
        'text-secondary': '#B4BAC4',
        'text-muted': '#A6ADB8',
        // AA tertiary text: 6.21:1 on #0E0F12, 5.75:1 on #16181D, 5.28:1 on #1D2026
        'text-subtle': '#8D939E',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.4)',
        elevated: '0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.3)',
        glow: '0 8px 24px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [typography],
}

export default config
