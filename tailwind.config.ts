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
        background: '#0D0D1A',
        surface: '#13132A',
        'surface-raised': '#1A1A38',
        'border-subtle': '#2A2A50',
        accent: {
          DEFAULT: '#7C3AED',
          light: '#A78BFA',
        },
        'text-primary': '#F8F8FF',
        'text-secondary': '#A09EC0',
        'text-muted': '#4F4D70',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.4)',
        elevated: '0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(124,58,237,0.08)',
        glow: '0 0 32px rgba(124,58,237,0.2)',
      },
    },
  },
  plugins: [typography],
}

export default config
