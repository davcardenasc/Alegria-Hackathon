"use client"

import { Calendar, MapPin, Clock, ExternalLink, ArrowRight, Users } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import { useEffect } from "react"

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
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 items-stretch">
          {/* Speakers Section */}
          <div className="bg-[#00162D] border border-[#4A5EE7]/20 rounded-lg p-6 hover:border-[#4A5EE7]/40 transition-all duration-300 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-[#4A5EE7]" size={24} />
              <h3 className="text-xl font-bold text-[#F7F9FF]">{t("schedule.speakers_section_title")}</h3>
            </div>

            <div className="space-y-4 flex-1 flex flex-col">
              <p className="text-[#F7F9FF] font-medium">{t("schedule.day1_description")}</p>
              
              {/* Speakers Preview */}
              <div className="p-4 bg-[#4A5EE7]/10 rounded-lg border border-[#4A5EE7]/10 flex-1 flex flex-col">
                <p className="text-[#BFC9DB] text-sm mb-2">{t("schedule.speakers_include")}</p>
                <p className="text-[#F7F9FF] text-sm font-medium mb-4">
                  {t("schedule.speakers_preview")}
                </p>
                
                {/* Speaker Face Icons */}
                <div className="flex justify-center gap-3 mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#4A5EE7]/30">
                    <Image
                      src="/images/speaker-victor-cardenas.jpeg"
                      alt="Victor Cardenas"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#4A5EE7]/30">
                    <Image
                      src="/images/speaker-vicente-zavarce.jpeg"
                      alt="Vicente Zavarce"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#4A5EE7]/30">
                    <Image
                      src="/images/speaker-pedro-sosa.jpeg"
                      alt="Pedro Vallenilla"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#4A5EE7]/30">
                    <Image
                      src="/images/speaker-pedro-urdaneta.jpeg"
                      alt="Pedro Urdaneta"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <Link
                  href="/speakers"
                  className="inline-flex items-center gap-2 bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-4 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 w-full justify-center mt-auto"
                >
                  <span>{t("schedule.view_all_speakers")}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="bg-[#00162D] border border-[#4A5EE7]/20 rounded-lg p-6 hover:border-[#4A5EE7]/40 transition-all duration-300 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-[#4A5EE7]" size={24} />
              <h3 className="text-xl font-bold text-[#F7F9FF]">{t("schedule.schedule_section_title")}</h3>
            </div>

            {/* Google Docs Iframe */}
            <div className="relative aspect-video bg-[#BFC9DB]/10 rounded-lg overflow-hidden border border-[#4A5EE7]/20 flex items-center justify-center flex-1">
              <iframe
                src="https://docs.google.com/document/d/1zrVO-V6H_SztnnqxQmY-O74nsr2-xCza-2xRg6WuAV4/edit?usp=sharing"
                width="100%"
                height="100%"
                style={{border: 0}}
                title="Cronograma Completo"
                className="rounded-lg"
                tabIndex={-1}
                loading="lazy"
                aria-hidden="true"
              />
              
              {/* Overlay for click to open in Google Docs */}
              <div 
                onClick={() => window.open("https://docs.google.com/document/d/1zrVO-V6H_SztnnqxQmY-O74nsr2-xCza-2xRg6WuAV4/edit?usp=sharing", "_blank")}
                className="absolute inset-0 bg-transparent hover:bg-[#4A5EE7]/10 transition-all duration-300 cursor-pointer flex items-end justify-end p-4 group"
              >
                <div className="bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-3 py-2 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 group-hover:scale-105">
                  <ExternalLink size={16} />
                  <span className="text-sm font-medium">{t("schedule.view_complete")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="bg-[#00162D] border border-[#4A5EE7]/20 rounded-lg p-6 hover:border-[#4A5EE7]/40 transition-all duration-300 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-[#4A5EE7]" size={24} />
              <h3 className="text-xl font-bold text-[#F7F9FF]">{t("schedule.location_title")}</h3>
            </div>

            {/* Google Maps Iframe */}
            <div className="relative aspect-video bg-[#BFC9DB]/10 rounded-lg overflow-hidden border border-[#4A5EE7]/20 flex-1">
              <iframe
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=Centro%20Banaven%20Cubo%20Negro,%20Av%20La%20Estancia,%20Chuao,%20Caracas,%20Venezuela&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                width="100%"
                height="100%"
                style={{border: 0}}
                tabIndex={-1}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Centro Banaven Cubo Negro Location"
                aria-hidden="true"
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
