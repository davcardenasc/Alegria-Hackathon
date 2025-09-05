"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import { SPONSORS } from '@/lib/data'

export default function PatrocinadoresSection() {
  const { t } = useLanguage()

  const sponsors = SPONSORS.map(sponsor => ({
    ...sponsor,
    name: sponsor.name === 'TBD' ? t("sponsors.sponsor") : sponsor.name,
    description: t(sponsor.description)
  }))

  const handleSponsorClick = (sponsor: any) => {
    if (sponsor.confirmed && sponsor.url !== "#") {
      window.open(sponsor.url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <section id="patrocinadores" className="py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-[#F7F9FF] text-center mb-16">{t("sponsors.title")}</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              onClick={() => handleSponsorClick(sponsor)}
              className={`bg-[#00162D] border border-[#4A5EE7]/20 rounded-lg p-4 md:p-6 lg:p-8 text-center hover:border-[#4A5EE7]/40 hover:scale-105 transition-all duration-300 group relative ${
                sponsor.confirmed && sponsor.url !== "#" ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <div className="h-16 md:h-20 flex items-center justify-center mb-4">
                {sponsor.confirmed && sponsor.logo ? (
                  <Image
                    src={sponsor.logo || "/placeholder.svg"}
                    alt={`${sponsor.name} logo`}
                    width={150}
                    height={100}
                    className="max-h-16 md:max-h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-16 h-16 bg-[#BFC9DB]/10 rounded-lg flex items-center justify-center">
                    <span className="text-[#BFC9DB] text-2xl font-bold">?</span>
                  </div>
                )}
              </div>
              <h4 className="text-[#F7F9FF] font-bold text-sm md:text-lg mb-2">{sponsor.name}</h4>
              <p className="text-[#BFC9DB] text-xs md:text-sm leading-tight">{sponsor.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
