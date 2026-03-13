"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, MapPin, ShoppingCart, Users, Utensils, AlertTriangle, Shield, GraduationCap, Calendar, ArrowRight, Lightbulb } from "lucide-react"
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
    {
      title: t("ideas.idea4.title"),
      description: t("ideas.idea4.description"),
      icon: Utensils,
      color: "text-orange-400",
      accentColor: "#fb923c",
    },
    {
      title: t("ideas.idea5.title"),
      description: t("ideas.idea5.description"),
      icon: Calendar,
      color: "text-teal-400",
      accentColor: "#2dd4bf",
    },
    {
      title: t("ideas.idea1.title"),
      description: t("ideas.idea1.description"),
      icon: MapPin,
      color: "text-blue-400",
      accentColor: "#60a5fa",
    },
    {
      title: t("ideas.idea2.title"),
      description: t("ideas.idea2.description"),
      icon: ShoppingCart,
      color: "text-green-400",
      accentColor: "#4ade80",
    },
    {
      title: t("ideas.idea3.title"),
      description: t("ideas.idea3.description"),
      icon: Users,
      color: "text-purple-400",
      accentColor: "#c084fc",
    },
    {
      title: t("ideas.idea6.title"),
      description: t("ideas.idea6.description"),
      icon: AlertTriangle,
      color: "text-yellow-400",
      accentColor: "#facc15",
    },
    {
      title: t("ideas.idea7.title"),
      description: t("ideas.idea7.description"),
      icon: Shield,
      color: "text-red-400",
      accentColor: "#f87171",
    },
    {
      title: t("ideas.idea8.title"),
      description: t("ideas.idea8.description"),
      icon: GraduationCap,
      color: "text-indigo-400",
      accentColor: "#818cf8",
    },
  ]

  const toggleIdea = (index: number) => {
    setExpandedIdea(expandedIdea === index ? null : index)
  }

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

      {/* ─── IDEAS GRID ───────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">{t("ideas.grid.eyebrow")}</p>
        <h2
          className="font-bold text-white mb-16"
          style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          {t("ideas.grid.title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {ideas.map((idea, index) => {
            const isExpanded = expandedIdea === index
            return (
              <div
                key={index}
                className="border border-[#4A5EE7]/15 hover:border-[#4A5EE7]/40 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-start gap-4 focus:outline-none"
                  onClick={() => toggleIdea(index)}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: idea.accentColor + "15" }}
                  >
                    <idea.icon className={idea.color} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-bold text-white text-base mb-1"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {idea.title}
                    </h3>
                    {!isExpanded && (
                      <p className="text-[#BFC9DB] text-sm line-clamp-2">{idea.description}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    {isExpanded ? (
                      <ChevronUp className="text-[#4A5EE7]" size={18} />
                    ) : (
                      <ChevronDown className="text-[#4A5EE7]" size={18} />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-5">
                    <div className="border-t border-[#4A5EE7]/10 pt-4 ml-6 sm:ml-14">
                      <p className="text-[#BFC9DB] text-sm leading-relaxed">{idea.description}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
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
