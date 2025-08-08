"use client"

import { Star, Sparkles, Crown, Gem } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { PRIZES } from '@/lib/data'

export default function PremiosSection() {
  const { t } = useLanguage()
  const prizes = PRIZES.map(prize => ({
    ...prize,
    place: t(prize.place),
    prize: t(prize.prize),
    bonus: t(prize.bonus)
  }))

  return (
    <section id="premios" className="py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#F7F9FF] mb-4">{t("prizes.title")}</h2>
          <p className="text-[#BFC9DB] text-lg">{t("prizes.description")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${prize.bgGradient} border-2 ${prize.borderColor} rounded-xl p-6 text-center hover:${prize.glowColor} hover:scale-105 transition-all duration-300 group overflow-hidden`}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-10 translate-x-10" />

              {/* Icon */}
              <div className="relative z-10">
                <prize.icon
                  className={`mx-auto mb-4 ${prize.color} group-hover:scale-110 transition-transform duration-300`}
                  size={56}
                />

                {/* Place */}
                <h4 className="text-xl font-bold text-[#F7F9FF] mb-3">{prize.place}</h4>

                {/* Main prize */}
                <div className={`text-lg font-semibold ${prize.color} mb-2`}>{prize.prize}</div>

                {/* Bonus */}
                <div className="text-[#BFC9DB] text-sm font-medium bg-[#00162D]/50 rounded-lg px-3 py-2 backdrop-blur-sm">
                  {prize.bonus}
                </div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4A5EE7]/20 to-[#BFC9DB]/20 border border-[#4A5EE7]/30 rounded-full px-6 py-3 backdrop-blur-sm">
            <span className="text-[#F7F9FF] font-semibold">{t("prizes.cta")}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
