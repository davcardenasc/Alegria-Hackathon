"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SpeakerModal from "@/components/speaker-modal"
import { useLanguage } from "@/contexts/LanguageContext"

export default function SpeakersPage() {
  const [expandedTalk, setExpandedTalk] = useState<number | null>(null)
  const [selectedSpeaker, setSelectedSpeaker] = useState<any>(null)
  const { t, tArray } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const speakers = [
    {
      name: "Victor Cardenas",
      title: t("speakers.victor.title"),
      company: "Slash",
      image: "/images/speaker-victor-cardenas.jpg",
      bio: t("speakers.victor.bio"),
      fullBio: t("speakers.victor.full_bio"),
      achievements: tArray("speakers.victor.achievements"),
      linkedin: "https://www.linkedin.com/in/victor-d-cardenas/",
      confirmed: true,
    },
    {
      name: "Vicente Zavarce",
      title: t("speakers.vicente.title"),
      company: "Yummy",
      image: "/images/speaker-vicente-zavarce.jpeg",
      bio: t("speakers.vicente.bio"),
      fullBio: t("speakers.vicente.full_bio"),
      achievements: tArray("speakers.vicente.achievements"),
      linkedin: "https://www.linkedin.com/in/vzavarce/",
      confirmed: true,
    },
    {
      name: "Pedro Julio Vallenilla Sosa",
      title: t("speakers.pedro.title"),
      company: "Cashea",
      image: "/images/speaker-pedro-sosa.png",
      bio: t("speakers.pedro.bio"),
      fullBio: t("speakers.pedro.full_bio"),
      achievements: tArray("speakers.pedro.achievements"),
      linkedin: "https://www.linkedin.com/in/pedrovallenilla/",
      confirmed: true,
    },
    {
      name: "Pedro Urdaneta",
      title: t("speakers.pedro_urdaneta.title"),
      company: "Venecápital",
      image: "/images/speaker-pedro-urdaneta.jpg",
      bio: t("speakers.pedro_urdaneta.bio"),
      fullBio: t("speakers.pedro_urdaneta.full_bio"),
      achievements: tArray("speakers.pedro_urdaneta.achievements"),
      linkedin: "https://www.linkedin.com/in/pedro-urdaneta/",
      confirmed: true,
    },
  ]

  const talks = [
    {
      title: t("speakers.talk4.title"),
      speaker: t("speakers.talk4.speaker"),
      company: t("speakers.talk4.company"),
      time: t("speakers.talk4.time"),
      date: t("speakers.talk4.date"),
      description: t("speakers.talk4.description"),
      audience: t("speakers.talk4.audience"),
      confirmed: true,
    },
    {
      title: t("speakers.talk1.title"),
      speaker: t("speakers.talk1.speaker"),
      company: t("speakers.talk1.company"),
      time: t("speakers.talk1.time"),
      date: t("speakers.talk1.date"),
      description: t("speakers.talk1.description"),
      audience: t("speakers.talk1.audience"),
      confirmed: true,
    },
    {
      title: t("speakers.talk2.title"),
      speaker: t("speakers.talk2.speaker"),
      company: t("speakers.talk2.company"),
      time: t("speakers.talk2.time"),
      date: t("speakers.talk2.date"),
      description: t("speakers.talk2.description"),
      audience: t("speakers.talk2.audience"),
      confirmed: true,
    },
    {
      title: t("speakers.talk3.title"),
      speaker: t("speakers.talk3.speaker"),
      company: t("speakers.talk3.company"),
      time: t("speakers.talk3.time"),
      date: t("speakers.talk3.date"),
      description: t("speakers.talk3.description"),
      audience: t("speakers.talk3.audience"),
      confirmed: true,
    },
    {
      title: t("speakers.talk5.title"),
      speaker: t("speakers.talk5.speaker"),
      company: t("speakers.talk5.company"),
      time: t("speakers.talk5.time"),
      date: t("speakers.talk5.date"),
      description: t("speakers.talk5.description"),
      audience: t("speakers.talk5.audience"),
      confirmed: true,
    },
  ]

  const companies = [
    { name: "Slash", logo: "/images/slash-logo.png", url: "https://slash.com", confirmed: true },
    { name: "Yummy", logo: "/images/yummy-logo.png", url: "https://www.yummysuperapp.com/", confirmed: true },
    { name: "Cashea", logo: "/images/cashea-logo.jpg", url: "https://cashea.com", confirmed: true },
    { name: "Venecápital", logo: "/images/venecapital-logo.png", url: "https://venecapital.com", confirmed: true },
  ]

  const toggleTalk = (index: number) => {
    setExpandedTalk(expandedTalk === index ? null : index)
  }

  const handleSpeakerClick = (speaker: any) => {
    if (speaker.confirmed) {
      setSelectedSpeaker(speaker)
    }
  }

  const closeSpeakerModal = () => {
    setSelectedSpeaker(null)
  }

  return (
    <div className="min-h-screen bg-[#00162D] text-white">
      <Header />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse at 75% 70%, rgba(74, 94, 231, 0.18) 0%, transparent 50%)'}} />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00162D] to-transparent" />

        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-20 pt-40">
          <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">
            {t("speakers.hero.eyebrow")}
          </p>
          <h1
            className="font-bold leading-none mb-6"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {t("speakers.title")}
          </h1>
          <p className="text-[#BFC9DB] text-lg md:text-xl max-w-xl leading-relaxed">
            {t("speakers.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ─── PHOTO STRIP ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 h-56 sm:h-64 md:h-80">
        <div className="relative overflow-hidden">
          <Image src="/images/1-conferencephoto.JPG" alt="Conferencia AlegrIA" fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" quality={80} priority />
        </div>
        <div className="relative overflow-hidden hidden sm:block">
          <Image src="/images/1-speaker.JPG" alt="Ponente AlegrIA" fill className="object-cover" sizes="33vw" quality={80} priority />
        </div>
        <div className="relative overflow-hidden hidden sm:block">
          <Image src="/images/1-speaker2.JPG" alt="Ponente AlegrIA" fill className="object-cover" sizes="33vw" quality={80} priority />
        </div>
      </div>

      {/* ─── SPEAKERS — EDITORIAL FEATURE ─────────────────────── */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-6 lg:px-12 mb-16">
          <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">{t("speakers.grid.eyebrow")}</p>
          <h2
            className="font-bold text-white"
            style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            {t("speakers.grid.title")}
          </h2>
        </div>

        {/* Speaker 1 — Hero feature (large photo) */}
        {speakers[0] && (
          <div
            onClick={() => handleSpeakerClick(speakers[0])}
            className="grid lg:grid-cols-2 gap-0 min-h-[360px] lg:min-h-[420px] cursor-pointer group"
          >
            <div className="relative min-h-[280px] lg:min-h-0 overflow-hidden">
              <Image
                src={speakers[0].image}
                alt={speakers[0].name}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-transparent to-[#00162D]/80" />
            </div>
            <div className="flex flex-col justify-center p-10 lg:p-16 bg-[#00162D]">
              <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-xs mb-3">
                {speakers[0].company}
              </p>
              <h3
                className="font-bold text-white mb-2"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {speakers[0].name}
              </h3>
              <p className="text-[#BFC9DB]/70 text-sm font-medium mb-4">{speakers[0].title}</p>
              <p className="text-[#BFC9DB] leading-relaxed mb-6">{speakers[0].bio}</p>
              <span className="inline-flex items-center gap-2 text-[#4A5EE7] font-semibold text-sm group-hover:gap-3 transition-all">
                {t("speakers.click_details")} <ArrowRight size={16} />
              </span>
            </div>
          </div>
        )}

        {/* Speakers 2-4 — Alternating rows */}
        {speakers.slice(1).map((speaker, i) => (
          <div
            key={i + 1}
            onClick={() => handleSpeakerClick(speaker)}
            className={`grid lg:grid-cols-2 gap-0 min-h-[360px] lg:min-h-[420px] cursor-pointer group ${
              i % 2 === 0 ? "bg-[#04112a]" : "bg-[#00162D]"
            }`}
          >
            <div className={`relative min-h-[280px] lg:min-h-0 overflow-hidden ${i % 2 === 0 ? "lg:order-2" : ""}`}>
              <Image
                src={speaker.image}
                alt={speaker.name}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className={`absolute inset-0 ${
                i % 2 === 0
                  ? "bg-gradient-to-b lg:bg-gradient-to-l from-transparent via-transparent to-[#04112a]/60"
                  : "bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-transparent to-[#00162D]/60"
              }`} />
            </div>
            <div className={`flex flex-col justify-center p-10 lg:p-16 ${i % 2 === 0 ? "lg:order-1" : ""}`}>
              <div className="border-l-[3px] border-[#4A5EE7] pl-6">
                <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-xs mb-3">
                  {speaker.company}
                </p>
                <h3
                  className="font-bold text-white mb-2"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                  }}
                >
                  {speaker.name}
                </h3>
                <p className="text-[#BFC9DB]/70 text-sm font-medium mb-4">{speaker.title}</p>
                <p className="text-[#BFC9DB] leading-relaxed mb-6">{speaker.bio}</p>
                <span className="inline-flex items-center gap-2 text-[#4A5EE7] font-semibold text-sm group-hover:gap-3 transition-all">
                  {t("speakers.click_details")} <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ─── TALKS — TIMELINE ─────────────────────────────────── */}
      <section className="py-24 bg-[#04112a]">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">{t("speakers.program.eyebrow")}</p>
          <h2
            className="font-bold text-white mb-16"
            style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            {t("speakers.talks_title")}
          </h2>

          <div className="max-w-4xl">
            {talks.map((talk, index) => (
              <div key={index} className={`flex gap-4 md:gap-8 ${index < talks.length - 1 ? "pb-10" : ""}`}>
                {/* Time + dot column */}
                <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-24">
                  <span
                    className="text-[#4A5EE7] font-bold text-xs whitespace-nowrap mb-2"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {talk.time}
                  </span>
                  <div className="w-3 h-3 rounded-full bg-[#4A5EE7] ring-4 ring-[#04112a] flex-shrink-0" />
                  {index < talks.length - 1 && (
                    <div className="w-px flex-1 bg-[#4A5EE7]/20 mt-2" />
                  )}
                </div>

                {/* Talk content */}
                <div className="flex-1 min-w-0">
                  <button
                    className="w-full text-left focus:outline-none group"
                    onClick={() => toggleTalk(index)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-[#BFC9DB]/50 text-xs tracking-wide uppercase mb-2">
                          <span>{talk.speaker} · {talk.company}</span>
                          <span>· {talk.date}</span>
                        </div>
                        <h3
                          className="font-bold text-white text-lg group-hover:text-[#4A5EE7] transition-colors"
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {talk.title}
                        </h3>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`flex-shrink-0 mt-2 transition-all duration-300 ${
                          expandedTalk === index ? "rotate-180 text-[#4A5EE7]" : "text-white/30 group-hover:text-[#4A5EE7]"
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      expandedTalk === index ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-[#BFC9DB] leading-relaxed text-sm max-w-2xl">{talk.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPANIES ────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="text-[#BFC9DB]/50 text-sm tracking-widest uppercase mb-10">{t("speakers.companies.eyebrow")}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {companies.map((company, index) => (
              <a
                key={index}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                {company.confirmed && company.logo ? (
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={120}
                    height={48}
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <div className="w-20 h-10 bg-[#0a1f3d] rounded-lg flex items-center justify-center">
                    <span className="text-[#BFC9DB] text-sm font-bold">?</span>
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[#04112a]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2
            className="font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            {t("speakers.cta.title")}
          </h2>
          <p className="text-[#BFC9DB] text-lg mb-10">
            {t("speakers.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/resultados-2026"
              className="inline-flex items-center gap-2 bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              {t("speakers.cta.btn_results")} <ArrowRight size={18} />
            </Link>
            <Link
              href="/premios"
              className="inline-flex items-center gap-2 border border-[#4A5EE7]/40 hover:border-[#4A5EE7] text-[#BFC9DB] hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              {t("speakers.cta.btn_prizes")}
            </Link>
          </div>
        </div>
      </section>

      {/* Speaker Modal */}
      {selectedSpeaker && (
        <SpeakerModal speaker={selectedSpeaker} isOpen={!!selectedSpeaker} onClose={closeSpeakerModal} />
      )}

      <Footer />
    </div>
  )
}
