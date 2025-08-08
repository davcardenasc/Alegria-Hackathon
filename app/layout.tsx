import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Roboto } from 'next/font/google'
import "./globals.css"
import GlobalBackground from "@/components/global-background"
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
    generator: 'v0.dev'
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
          <GlobalBackground />
          {children}
        </Providers>
      </body>
    </html>
  )
}
