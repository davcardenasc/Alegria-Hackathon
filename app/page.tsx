"use client"

import { useScrollToHash } from "@/hooks/useScrollToHash"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import PatrocinadoresSection from "@/components/patrocinadores-section"
import OverviewSection from "@/components/overview-section"
import MomentosScrollSection from "@/components/momentos-scroll-section"
import CronogramaSection from "@/components/cronograma-section"
import AplicacionesSection from "@/components/aplicaciones-section"
import IdeasSummarySection from "@/components/ideas-summary-section"
import PremiosSection from "@/components/premios-section"
import WorkshopsSection from "@/components/workshops-section"
import EmbajadoresSection from "@/components/embajadores-section"
import MomentosSection from "@/components/momentos-section"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"

export default function HomePage() {
  // Hook para manejar el scroll automático a hashes
  useScrollToHash()

  return (
    <div className="min-h-screen text-white">
      <Header />
      <main className="relative">
        <HeroSection />
        <div className="relative z-10">
          <OverviewSection />
          <MomentosScrollSection />
          <CronogramaSection />
          <PremiosSection />
          <PatrocinadoresSection />
          <AplicacionesSection />
          <IdeasSummarySection />
          <WorkshopsSection />
          <EmbajadoresSection />
          <MomentosSection />
          <FAQSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
