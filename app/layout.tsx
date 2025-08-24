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
  metadataBase: new URL('https://alegria-hackathon.com'),
  title: "AlegrIA - Hackatón de Emprendimiento",
  description: "48 horas. Un hackatón. Tu futuro. Compite por $50,000+ en premios y lanza tu startup",
  keywords: ["hackatón", "emprendimiento", "venezuela", "startup", "estudiantes", "competencia", "premios", "educación"],
  authors: [{ name: "AlegrIA Team" }],
  creator: "AlegrIA",
  publisher: "AlegrIA",
  robots: "index, follow",
  alternates: {
    canonical: 'https://alegria-hackathon.com',
  },
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: 'https://alegria-hackathon.com',
    title: 'AlegrIA - Hackatón de Emprendimiento',
    description: '48 horas. Un hackatón. Tu futuro. Compite por $50,000+ en premios y lanza tu startup',
    siteName: 'AlegrIA',
    images: [
      {
        url: '/images/New Alegria Logo.png?v=2',
        width: 1200,
        height: 630,
        alt: 'AlegrIA Hackatón Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlegrIA - Hackatón de Emprendimiento',
    description: '48 horas. Un hackatón. Tu futuro. Compite por $50,000+ en premios',
    images: ['/images/New Alegria Logo.png?v=2'],
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
  manifest: '/manifest.json',
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
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-T2R12J2EBW"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-T2R12J2EBW');
            `,
          }}
        />
      </head>
      <body className={`${roboto.className} ${montserrat.variable} ${roboto.variable}`}>
        <Providers>
          <ConditionalBackground />
          {children}
        </Providers>
      </body>
    </html>
  )
}
