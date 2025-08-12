import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Roboto } from 'next/font/google'
import "./globals.css"
import ConditionalBackground from "@/components/conditional-background"
import { Providers } from "@/components/providers"

// Font for headings
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  variable: "--font-montserrat",
})

// Font for body text
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "AlegrIA - Hackathon de Emprendimiento",
  description: "48 horas. Un hackathon. Tu futuro. Compite por $25,000+ en premios y lanza tu startup",
  keywords: ["hackathon", "emprendimiento", "venezuela", "startup", "estudiantes", "competencia", "premios", "educación"],
  authors: [{ name: "AlegrIA Team" }],
  creator: "AlegrIA",
  publisher: "AlegrIA",
  robots: "index, follow",
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: 'https://alegria-hackathon.com',
    title: 'AlegrIA - Hackathon de Emprendimiento',
    description: '48 horas. Un hackathon. Tu futuro. Compite por $25,000+ en premios y lanza tu startup',
    siteName: 'AlegrIA',
    images: [
      {
        url: '/images/full-alegria-logo.png',
        width: 1200,
        height: 630,
        alt: 'AlegrIA Hackathon Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlegrIA - Hackathon de Emprendimiento',
    description: '48 horas. Un hackathon. Tu futuro. Compite por $25,000+ en premios',
    images: ['/images/full-alegria-logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  verification: {
    google: 'your-google-verification-code-here',
    other: {
      'msvalidate.01': 'CD23DE527FEC2213CFF4831EE7E94A47',
    },
  },
  generator: 'Next.js',
  category: 'education',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${roboto.className} ${montserrat.variable} ${roboto.variable}`}>
        <Providers>
          <ConditionalBackground />
          {children}
        </Providers>
      </body>
    </html>
  )
}
