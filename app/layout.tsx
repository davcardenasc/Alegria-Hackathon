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
        url: 'https://alegria-hackathon.com/images/New Alegria Logo.png?v=2',
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
    images: ['https://alegria-hackathon.com/images/New Alegria Logo.png?v=2'],
  },
  icons: {
    icon: [
      { url: '/images/New Alegria Logo.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/images/New Alegria Logo.png',
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
        {/* Priority favicon for search engines */}
        <link rel="icon" href="/images/New Alegria Logo.png" />
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
        {/* Additional meta tags for search engines */}
        <meta name="theme-color" content="#4A5EE7" />
        <meta name="msapplication-TileColor" content="#4A5EE7" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#4A5EE7" />
        <link rel="shortcut icon" href="/images/New Alegria Logo.png" type="image/png" />
        <link rel="icon" href="/images/New Alegria Logo.png" type="image/png" />
        {/* Structured Data for better Google Search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "AlegrIA - Hackatón de Emprendimiento",
              "description": "48 horas. Un hackatón. Tu futuro. Compite por $50,000+ en premios y lanza tu startup",
              "url": "https://alegria-hackathon.com",
              "image": "https://alegria-hackathon.com/images/New Alegria Logo.png",
              "logo": "https://alegria-hackathon.com/images/New Alegria Logo.png",
              "startDate": "2025-10-17T11:00:00-04:00",
              "endDate": "2025-10-19T18:00:00-04:00",
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "location": {
                "@type": "Place",
                "name": "Escuela Campo Alegre",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Final Calle La Cinta",
                  "addressLocality": "Las Mercedes",
                  "addressRegion": "Caracas",
                  "postalCode": "1060",
                  "addressCountry": "VE"
                }
              },
              "organizer": {
                "@type": "Organization",
                "name": "AlegrIA",
                "url": "https://alegria-hackathon.com",
                "logo": "https://alegria-hackathon.com/images/New Alegria Logo.png"
              },
              "offers": {
                "@type": "Offer",
                "price": "20",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://alegria-hackathon.com/formulario-participantes"
              }
            }),
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
