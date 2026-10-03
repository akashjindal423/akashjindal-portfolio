import type { Metadata } from 'next'
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/features/theme'

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

const TITLE = 'Akash Jindal — AI Product Owner | GenAI and Gen BI'
const DESCRIPTION =
  "AI Product Owner at Lloyds Banking Group's AI Centre of Excellence, building Generative AI and Gen BI products. Previously Dyson and Sony PlayStation. Bristol, UK."

export const metadata: Metadata = {
  metadataBase: new URL('https://akashjindal.com'),
  title: { default: TITLE, template: '%s | Akash Jindal' },
  description: DESCRIPTION,
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
    url: 'https://akashjindal.com',
    siteName: 'Akash Jindal',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
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
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning className="bg-[var(--background)] text-[var(--text-primary)] font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
