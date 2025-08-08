"use client"

import { Calendar, MapPin, Clock, ExternalLink, ArrowRight } from 'lucide-react'
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export default function CronogramaSection() {
  const { t } = useLanguage()

  const handleMapClick = () => {
    window.open("https://maps.app.goo.gl/5nESg9ToYqEermNW9", "_blank")
  }

  return (
    <section id="cronograma" className="py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-[#F7F9FF] text-center mb-16">Cronograma y Speakers</h2>

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
                  <p className="text-[#F7F9FF] font-medium mb-2">{t("schedule.day1_description")}</p>
                  <Link
                    href="/speakers"
                    className="text-[#4A5EE7] hover:text-[#BFC9DB] transition-colors duration-300 flex items-center gap-2"
                  >
                    <span>{t("schedule.day1_speakers_link")}</span>
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

            {/* Interactive Map */}
            <div
              onClick={handleMapClick}
              className="relative aspect-video bg-[#BFC9DB]/10 rounded-lg overflow-hidden cursor-pointer group hover:bg-[#BFC9DB]/20 transition-all duration-300"
            >
              {/* Map iframe */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.584789562841!2d-66.86419692399986!3d10.454537665592712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a58de6e2ed0a1%3A0x4e8f4f5c9c9f5e9e!2sEscuela%20Campo%20Alegre!5e0!3m2!1sen!2sve!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="pointer-events-none"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#00162D]/60 to-transparent pointer-events-none" />

              {/* Click indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-[#4A5EE7] text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
                  <ExternalLink size={16} />
                  <span className="text-sm font-medium">{t("schedule.open_maps")}</span>
                </div>
              </div>

              {/* Location info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white pointer-events-none">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-[#4A5EE7]" />
                  <div>
                    <p className="font-semibold">Escuela Campo Alegre</p>
                    <p className="text-sm opacity-90">Caracas, Venezuela</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address info below map */}
            <div className="mt-4 text-[#BFC9DB] text-sm space-y-1">
              <p>{t("schedule.address1")}</p>
              <p>{t("schedule.address2")}</p>
              <button
                onClick={handleMapClick}
                className="text-[#4A5EE7] hover:text-[#BFC9DB] transition-colors duration-300 flex items-center gap-1 mt-2"
              >
                <span>{t("schedule.directions")}</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
