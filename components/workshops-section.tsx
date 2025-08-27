"use client"

import { CheckCircle, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { WORKSHOPS } from '@/lib/data'

export default function WorkshopsSection() {
  const { t } = useLanguage()

  const workshops = WORKSHOPS

  return (
    <section id="workshops" className="py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-[#F7F9FF] text-center mb-16">{t("workshops.title")}</h2>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {workshops.map((workshop, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-[#00162D] border border-[#4A5EE7]/20 rounded-lg hover:border-[#4A5EE7]/40 transition-all duration-300"
              >
                {workshop.completed ? (
                  <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                ) : (
                  <Clock className="text-[#4A5EE7] flex-shrink-0" size={20} />
                )}
                <span className={`${workshop.completed ? "text-[#F7F9FF]" : "text-[#BFC9DB]"}`}>{workshop.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
