"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ArrowRight, ChevronDown, Lightbulb } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function IdeasPage() {
  const [expandedIdea, setExpandedIdea] = useState<number | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const ideas = [
    { title: t("ideas.idea4.title"), description: t("ideas.idea4.description"), accentColor: "#fb923c" },
    { title: t("ideas.idea5.title"), description: t("ideas.idea5.description"), accentColor: "#2dd4bf" },
    { title: t("ideas.idea1.title"), description: t("ideas.idea1.description"), accentColor: "#60a5fa" },
    { title: t("ideas.idea2.title"), description: t("ideas.idea2.description"), accentColor: "#4ade80" },
    { title: t("ideas.idea3.title"), description: t("ideas.idea3.description"), accentColor: "#c084fc" },
    { title: t("ideas.idea6.title"), description: t("ideas.idea6.description"), accentColor: "#facc15" },
    { title: t("ideas.idea7.title"), description: t("ideas.idea7.description"), accentColor: "#f87171" },
    { title: t("ideas.idea8.title"), description: t("ideas.idea8.description"), accentColor: "#818cf8" },
  ]

  return (
    <div className="min-h-screen bg-[#00162D] text-white">
      <Header />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse at 65% 25%, rgba(74, 94, 231, 0.2) 0%, transparent 50%)'}} />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00162D] to-transparent" />

        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-20 pt-40">
          <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">
            {t("ideas.hero.eyebrow")}
          </p>
          <h1
            className="font-bold leading-none mb-6"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {t("ideas.title")}
          </h1>
          <p className="text-[#BFC9DB] text-xl max-w-xl leading-relaxed">
            {t("ideas.description")}
          </p>
        </div>
      </section>

      {/* ─── PHOTO STRIP ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 h-56 sm:h-64 md:h-80">
        <div className="relative overflow-hidden">
          <Image src="/images/8vo-1.jpg" alt="Taller AlegrIA" fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" quality={75} priority />
        </div>
        <div className="relative overflow-hidden hidden sm:block">
          <Image src="/images/7mo-1-copy.jpeg" alt="Taller AlegrIA" fill className="object-cover" sizes="33vw" quality={75} priority />
        </div>
        <div className="relative overflow-hidden hidden sm:block">
          <Image src="/images/6to-1-copy.jpg" alt="Taller AlegrIA" fill className="object-cover" sizes="33vw" quality={75} priority />
        </div>
      </div>

      {/* ─── IDEAS — TIMELINE ─────────────────────────────────── */}
      <section className="py-24 bg-[#04112a]">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">{t("ideas.grid.eyebrow")}</p>
          <h2
            className="font-bold text-white mb-16"
            style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            {t("ideas.grid.title")}
          </h2>

          <div className="max-w-4xl">
            {ideas.map((idea, index) => (
              <div key={index} className={`flex gap-4 md:gap-8 ${index < ideas.length - 1 ? "pb-10" : ""}`}>
                {/* Number + dot column */}
                <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-24">
                  <span
                    className="font-bold text-xs whitespace-nowrap mb-2"
                    style={{ fontFamily: "var(--font-montserrat)", color: idea.accentColor }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="w-3 h-3 rounded-full ring-4 ring-[#04112a] flex-shrink-0"
                    style={{ backgroundColor: idea.accentColor }}
                  />
                  {index < ideas.length - 1 && (
                    <div className="w-px flex-1 bg-[#4A5EE7]/20 mt-2" />
                  )}
                </div>

                {/* Idea content */}
                <div className="flex-1 min-w-0">
                  <button
                    className="w-full text-left focus:outline-none group"
                    onClick={() => setExpandedIdea(expandedIdea === index ? null : index)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3
                        className="font-bold text-white text-lg group-hover:text-[#4A5EE7] transition-colors"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                      >
                        {idea.title}
                      </h3>
                      <ChevronDown
                        size={18}
                        className={`flex-shrink-0 mt-1 transition-all duration-300 ${
                          expandedIdea === index ? "rotate-180 text-[#4A5EE7]" : "text-white/30 group-hover:text-[#4A5EE7]"
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      expandedIdea === index ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-[#BFC9DB] leading-relaxed text-sm max-w-2xl">{idea.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INSPIRATION NOTE ─────────────────────────────────── */}
      <section className="py-24 bg-[#04112a]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl">
            <div>
              <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">{t("ideas.note.eyebrow")}</p>
              <h2
                className="font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em" }}
              >
                {t("ideas.note.title")}
              </h2>
              <p className="text-[#BFC9DB] text-lg leading-relaxed mb-4">
                {t("ideas.note.p1")}
              </p>
              <p className="text-[#BFC9DB] text-lg leading-relaxed">
                {t("ideas.note.p2")}
              </p>
            </div>
            <div className="border border-[#4A5EE7]/20 rounded-2xl p-8">
              <Lightbulb className="text-[#4A5EE7] mb-4" size={32} />
              <h3
                className="font-bold text-white text-lg mb-3"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {t("ideas.criteria.title")}
              </h3>
              <div className="space-y-3 text-[#BFC9DB] text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-[#4A5EE7] font-bold">1.</span>
                  <span>{t("ideas.criteria.1")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#4A5EE7] font-bold">2.</span>
                  <span>{t("ideas.criteria.2")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#4A5EE7] font-bold">3.</span>
                  <span>{t("ideas.criteria.3")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#4A5EE7] font-bold">4.</span>
                  <span>{t("ideas.criteria.4")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6 lg:px-12 text-center">
        <h2
          className="font-bold text-white mb-6"
          style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          {t("ideas.inspired_cta")}
        </h2>
        <p className="text-[#BFC9DB] text-lg mb-10 max-w-lg mx-auto">
          {t("ideas.cta.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/resultados-2026"
            className="inline-flex items-center gap-2 bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
          >
            {t("ideas.cta.btn_results")} <ArrowRight size={18} />
          </Link>
          <Link
            href="/premios"
            className="inline-flex items-center gap-2 border border-[#4A5EE7]/40 hover:border-[#4A5EE7] text-[#BFC9DB] hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
          >
            {t("ideas.cta.btn_prizes")}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
