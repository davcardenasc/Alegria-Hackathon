"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, Users, ChevronDown, ChevronUp } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SpeakerModal from "@/components/speaker-modal"
import { useLanguage } from "@/contexts/LanguageContext"

export default function SpeakersPage() {
  const [expandedTalk, setExpandedTalk] = useState<number | null>(null)
  const [selectedSpeaker, setSelectedSpeaker] = useState<any>(null)
  const { t } = useLanguage()

  // Scroll to top on mount
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
      achievements: t("speakers.victor.achievements"),
      linkedin: "https://www.linkedin.com/in/victor-d-cardenas/",
      confirmed: true,
    },
    {
      name: "Speaker",
      title: t("speakers.confirmed"),
      company: t("speakers.confirmed"),
      image: null,
      bio: t("speakers.confirmed"),
      fullBio: t("speakers.confirmed"),
      achievements: [t("speakers.confirmed")],
      linkedin: "#",
      confirmed: false,
    },
    {
      name: "Speaker",
      title: t("speakers.confirmed"),
      company: t("speakers.confirmed"),
      image: null,
      bio: t("speakers.confirmed"),
      fullBio: t("speakers.confirmed"),
      achievements: [t("speakers.confirmed")],
      linkedin: "#",
      confirmed: false,
    },
  ]

  const talks = [
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
      title: "Charla por confirmar",
      speaker: "Speaker por confirmar",
      company: t("speakers.confirmed"),
      time: "2:00 PM",
      date: t("speakers.talk1.date"),
      description: t("speakers.confirmed"),
      audience: t("speakers.confirmed"),
      confirmed: false,
    },
    {
      title: "Charla por confirmar",
      speaker: "Speaker por confirmar",
      company: t("speakers.confirmed"),
      time: "3:30 PM",
      date: t("speakers.talk1.date"),
      description: t("speakers.confirmed"),
      audience: t("speakers.confirmed"),
      confirmed: false,
    },
  ]

  const companies = [
    { name: "Slash", logo: "/images/slash-logo.png", url: "https://slash.com", confirmed: true },
    { name: "Empresa", logo: null, url: "#", confirmed: false },
    { name: "Empresa", logo: null, url: "#", confirmed: false },
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

      <main className="pt-20">
        {/* Speakers Grid - Moved to top */}
        <section id="speakers-grid" className="py-20 bg-[#00162D]">
          <div className="container mx-auto px-6 sm:px-8 lg:px-4">
            <Link
              href="/#cronograma"
              className="inline-flex items-center gap-2 text-[#4A5EE7] hover:text-[#F7F9FF] mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              {t("speakers.back_to_schedule")}
            </Link>

            <h2 className="text-3xl md:text-5xl font-bold text-[#F7F9FF] text-center mb-16">{t("speakers.title")}</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {speakers.map((speaker, index) => (
                <div
                  key={index}
                  onClick={() => handleSpeakerClick(speaker)}
                  className={`bg-[#00162D] border border-[#4A5EE7]/20 rounded-xl p-6 text-center hover:border-[#4A5EE7]/60 hover:shadow-[0_0_30px_#4A5EE7/20] hover:scale-105 transition-all duration-300 group relative ${
                    speaker.confirmed ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  {!speaker.confirmed && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-[#BFC9DB]/20 rounded-full flex items-center justify-center">
                      <span className="text-[#BFC9DB] text-lg font-bold">?</span>
                    </div>
                  )}
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                    {speaker.confirmed && speaker.image ? (
                      <Image
                        src={speaker.image || "/placeholder.svg"}
                        alt={speaker.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#BFC9DB]/10 rounded-full flex items-center justify-center">
                        <span className="text-[#BFC9DB] text-4xl font-bold">?</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#F7F9FF] mb-2">{speaker.name}</h3>
                  <p className="text-[#4A5EE7] font-semibold mb-3">{speaker.title}</p>
                  <p className="text-[#BFC9DB] text-sm leading-relaxed mb-4">{speaker.bio}</p>
                  {speaker.confirmed && (
                    <p className="text-[#4A5EE7] text-xs font-medium">{t("speakers.click_details")}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Talks Section */}
        <section className="py-20 bg-[#00162D]">
          <div className="container mx-auto px-6 sm:px-8 lg:px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-[#F7F9FF] text-center mb-16">
              {t("speakers.talks_title")}
            </h2>

            <div className="max-w-4xl mx-auto space-y-4 mb-20">
              {talks.map((talk, index) => (
                <div
                  key={index}
                  className={`bg-[#00162D] border border-[#4A5EE7]/20 rounded-lg overflow-hidden hover:border-[#4A5EE7]/40 transition-all duration-300 relative ${
                    !talk.confirmed ? "opacity-75" : ""
                  }`}
                >
                  {!talk.confirmed && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-[#BFC9DB]/20 rounded-full flex items-center justify-center">
                      <span className="text-[#BFC9DB] text-lg font-bold">?</span>
                    </div>
                  )}
                  <button
                    className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none"
                    onClick={() => toggleTalk(index)}
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#F7F9FF] mb-2">{talk.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-[#BFC9DB]">
                        <span className="flex items-center gap-1">
                          <Users size={16} className="text-[#4A5EE7]" />
                          {talk.speaker}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} className="text-[#4A5EE7]" />
                          {talk.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={16} className="text-[#4A5EE7]" />
                          {talk.date}
                        </span>
                      </div>
                    </div>
                    {expandedTalk === index ? (
                      <ChevronUp className="text-[#4A5EE7]" size={24} />
                    ) : (
                      <ChevronDown className="text-[#4A5EE7]" size={24} />
                    )}
                  </button>

                  {expandedTalk === index && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-[#4A5EE7]/20 pt-4">
                        <p className="text-[#BFC9DB] mb-4 leading-relaxed">{talk.description}</p>
                        <div className="bg-[#4A5EE7]/10 rounded-lg p-4">
                          <p className="text-[#F7F9FF] font-semibold mb-1">{t("speakers.for_whom")}</p>
                          <p className="text-[#BFC9DB] text-sm">{talk.audience}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Companies Section - Full color, with links */}
        <section className="py-20 bg-[#00162D]">
          <div className="container mx-auto px-6 sm:px-8 lg:px-4">
            <h3 className="text-2xl font-bold text-[#F7F9FF] text-center mb-8">{t("speakers.companies_title")}</h3>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {companies.map((company, index) => (
                <div key={index} className="hover:scale-110 transition-all duration-300 group relative">
                  {!company.confirmed && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#BFC9DB]/20 rounded-full flex items-center justify-center">
                      <span className="text-[#BFC9DB] text-sm font-bold">?</span>
                    </div>
                  )}
                  {company.confirmed && company.logo ? (
                    <Image
                      src={company.logo || "/placeholder.svg"}
                      alt={`${company.name} logo`}
                      width={120}
                      height={60}
                      className="max-h-12 w-auto object-contain"
                    />
                  ) : (
                    <div className="w-24 h-12 bg-[#BFC9DB]/10 rounded-lg flex items-center justify-center">
                      <span className="text-[#BFC9DB] text-lg font-bold">?</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Speaker Modal */}
      {selectedSpeaker && (
        <SpeakerModal speaker={selectedSpeaker} isOpen={!!selectedSpeaker} onClose={closeSpeakerModal} />
      )}

      <Footer />
    </div>
  )
}
