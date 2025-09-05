"use client"

import { Calendar, MapPin, Clock, ExternalLink, ArrowRight } from 'lucide-react'
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export default function CronogramaSection() {
  const { t } = useLanguage()

  const handleMapClick = () => {
    window.open(t("schedule.open_maps"), "_blank")
  }

  return (
    <section id="cronograma" className="py-28">
      <div className="container mx-auto px-6 sm:px-8 lg:px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-[#F7F9FF] text-center mb-16 font-heading">
          {t("schedule.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            {/* Día 1 */}
            <div className="bg-[#00162D] border border-[#4A5EE7]/20 rounded-lg p-6 hover:border-[#4A5EE7]/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="text-[#4A5EE7]" size={24} />
                <h3 className="text-xl font-bold text-[#F7F9FF]">{t("schedule.day1")}</h3>
              </div>

              <div className="space-y-3 text-[#BFC9DB]">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#4A5EE7]" />
                  <span>{t("schedule.day1_location")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#4A5EE7]" />
                  <span>{t("schedule.day1_time")}</span>
                </div>

                <div className="mt-6 p-4 bg-[#4A5EE7]/10 rounded-lg border border-[#4A5EE7]/20">
                  <p className="text-[#F7F9FF] font-medium mb-3">{t("schedule.day1_description")}</p>
                  
                  {/* Speakers Preview */}
                  <div className="mb-4 p-3 bg-[#00162D]/50 rounded-lg border border-[#4A5EE7]/10">
                    <p className="text-[#BFC9DB] text-sm mb-2">{t("schedule.speakers_include")}</p>
                    <p className="text-[#F7F9FF] text-sm font-medium">
                      {t("schedule.speakers_preview")}
                    </p>
                  </div>
                  
                  <Link
                    href="/speakers"
                    className="inline-flex items-center gap-2 bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <span>{t("schedule.view_all_speakers")}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <ul className="space-y-2 mt-4">
                  <li>{t("schedule.day1_networking")}</li>
                </ul>
              </div>
            </div>

            {/* Días 2-3 */}
            <div className="bg-[#00162D] border border-[#4A5EE7]/20 rounded-lg p-6 hover:border-[#4A5EE7]/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="text-[#4A5EE7]" size={24} />
                <h3 className="text-xl font-bold text-[#F7F9FF]">{t("schedule.days23")}</h3>
              </div>

              <div className="space-y-3 text-[#BFC9DB]">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#4A5EE7]" />
                  <span>{t("schedule.days23_location")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#4A5EE7]" />
                  <span>{t("schedule.days23_time")}</span>
                </div>

                <ul className="space-y-2 mt-4">
                  {t("schedule.days23_activities")
                    .split("\n")
                    .map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#00162D] border border-[#4A5EE7]/20 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-[#F7F9FF] mb-4">{t("schedule.location_title")}</h4>

            {/* Google Maps Iframe */}
            <div className="relative aspect-video bg-[#BFC9DB]/10 rounded-lg overflow-hidden border border-[#4A5EE7]/20">
              <iframe
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=Escuela%20Campo%20Alegre,%20Calle%20La%20Cinta,%20Las%20Mercedes,%20Caracas,%20Venezuela&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                width="100%"
                height="100%"
                style={{border: 0}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Escuela Campo Alegre Location"
              />
              
              {/* Overlay for click to open in Google Maps */}
              <div 
                onClick={handleMapClick}
                className="absolute inset-0 bg-transparent hover:bg-[#4A5EE7]/10 transition-all duration-300 cursor-pointer flex items-end justify-end p-4 group"
              >
                <div className="bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-3 py-2 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 group-hover:scale-105">
                  <ExternalLink size={16} />
                  <span className="text-sm font-medium">{t("schedule.open_maps_text")}</span>
                </div>
              </div>
            </div>

            {/* Address info below map */}
            <div className="mt-4 text-[#BFC9DB] text-sm space-y-1">
              <p>{t("schedule.address1")}</p>
              {t("schedule.address2") && <p>{t("schedule.address2")}</p>}
              <p className="text-[#4A5EE7] text-xs mt-2 italic">{t("schedule.directions")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
