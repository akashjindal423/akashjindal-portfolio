import type { Metadata } from 'next'
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

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
  metadataBase: new URL('https://akashjindal.dev'),
  title: { default: 'Akash Jindal — Technical Product Owner', template: '%s | Akash Jindal' },
  description: 'Senior Product Owner specialising in banking and fintech. 8+ years shipping digital products at Monzo, Barclays, and Lloyds. Based in London.',
  keywords: ['Product Owner', 'Technical PO', 'Fintech', 'Banking', 'London', 'Monzo', 'Barclays'],
  authors: [{ name: 'Akash Jindal' }],
  creator: 'Akash Jindal',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://akashjindal.dev',
    siteName: 'Akash Jindal',
    title: 'Akash Jindal — Technical Product Owner',
    description: 'Senior Product Owner in banking and fintech. London.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Akash Jindal — Technical Product Owner' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akash Jindal — Technical Product Owner',
    description: 'Senior Product Owner in banking and fintech. London.',
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
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning className="bg-[#0D0D1A] text-[#F8F8FF] font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
