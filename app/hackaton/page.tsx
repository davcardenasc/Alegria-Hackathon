"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, MapPin, Users, Code2, Lightbulb, Trophy, ChevronDown, ChevronUp } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

const stepIcons = [
  <Users size={28} key="0" />,
  <Lightbulb size={28} key="1" />,
  <Code2 size={28} key="2" />,
  <Trophy size={28} key="3" />,
]

export default function HackatonPage() {
  const { t, tArray } = useLanguage()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const steps = [
    { number: "01", icon: stepIcons[0], title: t("hackaton.steps.0.title"), description: t("hackaton.steps.0.description"), photo: "/images/1_openingceremony.JPG" },
    { number: "02", icon: stepIcons[1], title: t("hackaton.steps.1.title"), description: t("hackaton.steps.1.description"), photo: "/images/1Team_Wide_Shot_2.JPG" },
    { number: "03", icon: stepIcons[2], title: t("hackaton.steps.2.title"), description: t("hackaton.steps.2.description"), photo: "/images/1_workingteam.JPG" },
    { number: "04", icon: stepIcons[3], title: t("hackaton.steps.3.title"), description: t("hackaton.steps.3.description"), photo: "/images/1_judging.JPG" },
  ]

  const whoItems = tArray("hackaton.who.items")

  return (
    <div className="min-h-screen bg-[#00162D] text-white">
      <Header />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse at 70% 80%, rgba(74, 94, 231, 0.18) 0%, transparent 50%)'}} />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00162D] to-transparent" />

        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-20 pt-40">
          <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">
            {t("hackaton.hero.eyebrow")}
          </p>
          <h1
            className="font-bold leading-none mb-6"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {t("hackaton.hero.title_main")}
          </h1>
          <p className="text-[#BFC9DB] text-lg md:text-xl max-w-xl leading-relaxed">
            {t("hackaton.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ─── PHOTO STRIP ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 h-56 sm:h-64 md:h-80">
        <div className="relative overflow-hidden">
          <Image src="/images/1-equipofoto.JPG" alt="Equipos AlegrIA" fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" priority />
        </div>
        <div className="relative overflow-hidden hidden sm:block">
          <Image src="/images/1-workingteam1.JPG" alt="Equipos trabajando" fill className="object-cover" sizes="33vw" priority />
        </div>
        <div className="relative overflow-hidden hidden sm:block">
          <Image src="/images/1-workingteam2.JPG" alt="Equipos trabajando" fill className="object-cover" sizes="33vw" priority />
        </div>
      </div>

      {/* ─── WHAT IS ALEGRIA ─────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">{t("hackaton.what.eyebrow")}</p>
            <h2
              className="font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
            >
              {t("hackaton.what.title")}
            </h2>
            <div className="space-y-5 text-[#BFC9DB] text-lg leading-relaxed">
              <p>{t("hackaton.what.p1")}</p>
              <p>{t("hackaton.what.p2")}</p>
              <p>{t("hackaton.what.p3")}</p>
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image src="/images/1Team_Wide_Shot1.JPG" alt="Equipos en AlegrIA" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────── */}
      <section className="py-24 bg-[#04112a]">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">{t("hackaton.how.eyebrow")}</p>
          <h2
            className="font-bold text-white mb-16"
            style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            {t("hackaton.how.title")}
          </h2>

          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={i} className="grid lg:grid-cols-2 gap-0">
                <div
                  className={`p-10 lg:p-16 flex flex-col justify-center ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      className="font-bold text-[#4A5EE7]/30"
                      style={{ fontFamily: "var(--font-montserrat)", fontSize: "4rem", lineHeight: 1 }}
                    >
                      {step.number}
                    </span>
                    <div className="text-[#4A5EE7]">{step.icon}</div>
                  </div>
                  <h3
                    className="font-bold text-white mb-4"
                    style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#BFC9DB] leading-relaxed">{step.description}</p>
                </div>
                <div
                  className={`relative min-h-[320px] overflow-hidden ${
                    i % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <Image src={step.photo} alt={step.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO CAN PARTICIPATE ─────────────────────────────── */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">{t("hackaton.who.eyebrow")}</p>
            <h2
              className="font-bold text-white mb-8"
              style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
            >
              {t("hackaton.who.title")}
            </h2>
            <div className="space-y-4">
              {whoItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="text-[#4A5EE7] flex-shrink-0" size={20} />
                  <span className="text-[#BFC9DB]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="border border-[#4A5EE7]/20 rounded-xl p-6">
              <h3 className="font-bold text-white mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>
                {t("hackaton.venue.title")}
              </h3>
              <div className="flex items-start gap-3">
                <MapPin className="text-[#4A5EE7] mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-[#F7F9FF]">{t("hackaton.venue.address1")}</p>
                  <p className="text-[#BFC9DB] text-sm">{t("hackaton.venue.address2")}</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image src="/images/1_cubo negro.jpg" alt="Centro Banaven Cubo Negro" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── PREVIOUS WORKSHOPS ──────────────────────────────── */}
      <section className="py-24 bg-[#04112a]">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">{t("hackaton.community.eyebrow")}</p>
          <h2
            className="font-bold text-white mb-12"
            style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            {t("hackaton.community.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-[#BFC9DB] text-lg leading-relaxed mb-8">
                {t("hackaton.community.description")}
              </p>
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image src="/images/9san-ignacio-alegria.jpg" alt="Workshop en colegio" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </div>
            <div className="space-y-3">
              {[
                "ECA – 6to grado",
                "ECA – 7mo grado",
                "ECA – 8vo grado",
                "San Ignacio – CESI",
                "Cristo Rey",
                "Academia Washington",
                "CIC Caracas",
                "Colegio Integral El Ávila",
                "British School",
              ].map((school, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-[#4A5EE7]/10">
                  <CheckCircle className="text-[#4A5EE7] flex-shrink-0" size={16} />
                  <span className="text-[#BFC9DB]">{school}</span>
                </div>
              ))}
              <div className="pt-4">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 text-[#4A5EE7] hover:text-white font-semibold transition-colors"
                >
                  {t("hackaton.community.cta")} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ORGANIZERS ──────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">{t("hackaton.organizers.eyebrow")}</p>
        <h2
          className="font-bold text-white mb-12"
          style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          {t("hackaton.organizers.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
          {[
            { name: "David Cárdenas", role: t("ambassadors.david.role"), image: "/images/embajador-david-cardenas.jpeg" },
            { name: "Ugo Di Martino", role: t("ambassadors.ugo.role"), image: "/images/embajador-ugo-di-martino.jpg" },
          ].map((org, i) => (
            <div key={i} className="flex gap-5 items-start">
              <div className="w-20 h-20 rounded-xl bg-[#0a1f3d] flex-shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={org.image} alt={org.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1" style={{ fontFamily: "var(--font-montserrat)" }}>
                  {org.name}
                </h3>
                <p className="text-[#BFC9DB] text-sm">{org.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────── */}
      <section className="py-24 bg-[#04112a]">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">{t("hackaton.faq.eyebrow")}</p>
          <h2
            className="font-bold text-white mb-12"
            style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            {t("hackaton.faq.title")}
          </h2>
          <div className="space-y-3">
            {[1,2,3,4,5,6].map((n) => {
              const isOpen = openFaq === n
              return (
                <div key={n} className="border border-[#4A5EE7]/15 hover:border-[#4A5EE7]/40 rounded-xl overflow-hidden transition-all duration-300">
                  <button
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    onClick={() => setOpenFaq(isOpen ? null : n)}
                  >
                    <span className="font-semibold text-white text-base" style={{ fontFamily: "var(--font-montserrat)" }}>
                      {t(`hackaton.faq.q${n}`)}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="text-[#4A5EE7] flex-shrink-0" size={18} />
                    ) : (
                      <ChevronDown className="text-[#4A5EE7] flex-shrink-0" size={18} />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 border-t border-[#4A5EE7]/10">
                      <p className="text-[#BFC9DB] leading-relaxed pt-4">{t(`hackaton.faq.a${n}`)}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6 lg:px-12 text-center">
        <h2
          className="font-bold text-white mb-6"
          style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          {t("hackaton.cta.title")}
        </h2>
        <p className="text-[#BFC9DB] text-lg mb-10">
          {t("hackaton.cta.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/resultados-2026"
            className="inline-flex items-center gap-2 bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
          >
            {t("hackaton.cta.btn_results")} <ArrowRight size={18} />
          </Link>
          <Link
            href="/premios"
            className="inline-flex items-center gap-2 border border-[#4A5EE7]/40 hover:border-[#4A5EE7] text-[#BFC9DB] hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
          >
            {t("hackaton.cta.btn_prizes")}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
