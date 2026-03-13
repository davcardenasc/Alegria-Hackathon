"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, Calendar, Users, ChevronDown, ChevronUp, ArrowRight } from "lucide-react"
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
      image: "/images/speaker-victor-cardenas.jpeg",
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
      image: "/images/speaker-pedro-sosa.jpeg",
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
      image: "/images/speaker-pedro-urdaneta.jpeg",
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

      {/* ─── SPEAKERS GRID ────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">{t("speakers.grid.eyebrow")}</p>
        <h2
          className="font-bold text-white mb-16"
          style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          {t("speakers.grid.title")}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              onClick={() => handleSpeakerClick(speaker)}
              className={`border border-[#4A5EE7]/20 hover:border-[#4A5EE7]/50 rounded-2xl p-8 text-center transition-all duration-300 group ${
                speaker.confirmed ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <div className="relative w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden">
                {speaker.confirmed && speaker.image ? (
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-[#0a1f3d] rounded-full flex items-center justify-center">
                    <span className="text-[#BFC9DB] text-4xl font-bold">?</span>
                  </div>
                )}
              </div>

              <h3
                className="font-bold text-white text-lg mb-1"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {speaker.name}
              </h3>
              <p className="text-[#4A5EE7] text-sm font-semibold mb-3">{speaker.title}</p>
              <p className="text-[#BFC9DB] text-sm leading-relaxed">{speaker.bio}</p>
              {speaker.confirmed && (
                <p className="text-[#4A5EE7]/60 text-xs font-medium mt-4 group-hover:text-[#4A5EE7] transition-colors">
                  {t("speakers.click_details")}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── TALKS ────────────────────────────────────────────── */}
      <section className="py-24 bg-[#04112a]">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">{t("speakers.program.eyebrow")}</p>
          <h2
            className="font-bold text-white mb-16"
            style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            {t("speakers.talks_title")}
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {talks.map((talk, index) => (
              <div
                key={index}
                className="border border-[#4A5EE7]/15 hover:border-[#4A5EE7]/40 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                  onClick={() => toggleTalk(index)}
                >
                  <div className="flex-1">
                    <h3
                      className="font-bold text-white text-lg mb-2"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {talk.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-[#BFC9DB] text-sm">
                      <span className="flex items-center gap-1.5">
                        <Users size={14} className="text-[#4A5EE7]" />
                        {talk.speaker}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} className="text-[#4A5EE7]" />
                        {talk.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-[#4A5EE7]" />
                        {talk.date}
                      </span>
                    </div>
                  </div>
                  {expandedTalk === index ? (
                    <ChevronUp className="text-[#4A5EE7] flex-shrink-0 ml-4" size={20} />
                  ) : (
                    <ChevronDown className="text-[#4A5EE7] flex-shrink-0 ml-4" size={20} />
                  )}
                </button>

                {expandedTalk === index && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-[#4A5EE7]/10 pt-4">
                      <p className="text-[#BFC9DB] leading-relaxed">{talk.description}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPANIES ────────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">{t("speakers.companies.eyebrow")}</p>
        <h2
          className="font-bold text-white mb-12"
          style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          {t("speakers.companies_title")}
        </h2>

        <div className="flex flex-wrap items-center gap-10 md:gap-16">
          {companies.map((company, index) => (
            <a
              key={index}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform duration-300"
            >
              {company.confirmed && company.logo ? (
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={130}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <div className="w-24 h-12 bg-[#0a1f3d] rounded-lg flex items-center justify-center">
                  <span className="text-[#BFC9DB] text-lg font-bold">?</span>
                </div>
              )}
            </a>
          ))}
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
