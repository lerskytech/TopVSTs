import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import CookieBanner from '@/components/layout/cookie-banner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TopVSTs - Best Music Production Plugins, Samples & Tools',
  description: 'Discover top-rated VST plugins, sample packs, and music production tools for producers, beatmakers, and DJs. Expert reviews and exclusive deals.',
  keywords: 'VST plugins, music production, sample packs, Unison, ADSR, Loopmasters, Waves, Plugin Boutique, music production tools',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://topvsts.com',
    title: 'TopVSTs - Best Music Production Plugins, Samples & Tools',
    description: 'Discover top-rated VST plugins, sample packs, and music production tools for producers, beatmakers, and DJs.',
    siteName: 'TopVSTs',
    images: [
      {
        url: '/img/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TopVSTs - Best Music Production Plugins'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TopVSTs - Best Music Production Plugins, Samples & Tools',
    description: 'Discover top-rated VST plugins, sample packs, and music production tools for producers, beatmakers, and DJs.',
    images: ['/img/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <CookieBanner />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
