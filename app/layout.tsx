import type { Metadata } from 'next'
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/features/theme'
import MotionProvider from '@/components/shared/MotionProvider'
import CleanTraceProvider from '@/components/cleantrace/CleanTraceProvider'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/site'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: '%s | Akash Jindal' },
  description: SITE_DESCRIPTION,
  keywords: [
    'Akash Jindal',
    'AI Product Owner',
    'Product Owner',
    'Generative AI',
    'Gen BI',
    'AI Centre of Excellence',
    'Lloyds Banking Group',
    'Banking',
    'Bristol',
  ],
  authors: [{ name: 'Akash Jindal' }],
  creator: 'Akash Jindal',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: 'Akash Jindal',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // The site is dark-only (theme toggle is hidden). Rendering the class on the server means
      // the dark palette applies before, or without, the next-themes script.
      className={`dark ${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Without JavaScript, framer-motion entrances never run; show their end state instead. */}
        <noscript>
          <style>{'[style*="opacity:0"]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
      </head>
      <body suppressHydrationWarning className="bg-[var(--background)] text-[var(--text-primary)] font-sans antialiased">
        {/* First focusable element on every page */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-3 focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <MotionProvider>
            <CleanTraceProvider>
              <Navbar />
              <div id="main-content" tabIndex={-1} className="outline-none">
                {children}
              </div>
              <Footer />
            </CleanTraceProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
