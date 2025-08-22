"use client"

import { Star, Sparkles, Crown, Gem } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { PRIZES, YUMMY_PRIZES } from '@/lib/data'

export default function PremiosSection() {
  const { t } = useLanguage()
  const prizes = PRIZES.map(prize => ({
    ...prize,
    place: t(prize.place),
    prize: t(prize.prize),
    description: prize.description ? t(prize.description) : undefined,
    bonus: t(prize.bonus)
  }))

  const yummyPrizes = YUMMY_PRIZES.map(prize => ({
    ...prize,
    place: t(prize.place),
    prize: t(prize.prize),
    description: prize.description ? t(prize.description) : undefined,
    bonus: t(prize.bonus)
  }))

  return (
    <section id="premios" className="py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#F7F9FF] mb-4">{t("prizes.title")}</h2>
          <p className="text-[#BFC9DB] text-lg">{t("prizes.description")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${prize.bgGradient} border-3 ${prize.borderColor} rounded-2xl p-8 text-center hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-out group overflow-hidden shadow-2xl backdrop-blur-md min-h-[400px] flex flex-col justify-between`}
            >
              {/* Enhanced background decorations */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-12 -translate-x-12" />
              
              {/* Hover brightness overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/5 rounded-2xl transition-all duration-500" />
              
              <div className="relative z-10 flex-grow flex flex-col">
                {/* Icon */}
                <div className="mb-6">
                  <prize.icon
                    className={`mx-auto ${prize.color} group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 drop-shadow-lg`}
                    size={80}
                  />
                </div>

                {/* Place */}
                <h4 className="text-2xl md:text-3xl font-bold text-[#F7F9FF] mb-4 tracking-wide">{prize.place}</h4>

                {/* Main prize */}
                <div className={`${index === 3 ? 'text-xl md:text-2xl lg:text-3xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-bold ${prize.color} mb-2 leading-tight`}>{prize.prize}</div>
                
                {/* Prize description - only for first 3 places */}
                {prize.description && (
                  <div className="text-[#BFC9DB] text-sm md:text-base mb-4 italic opacity-80">{prize.description}</div>
                )}

                {/* Bonus - Enhanced */}
                <div className="text-[#F7F9FF] text-lg md:text-xl font-bold bg-gradient-to-r from-[#4A5EE7]/40 to-[#BFC9DB]/40 border-2 border-[#4A5EE7]/60 rounded-2xl px-6 py-4 backdrop-blur-sm mt-auto shadow-xl hover:scale-105 hover:shadow-2xl hover:from-[#4A5EE7]/50 hover:to-[#BFC9DB]/50 transition-all duration-300 ease-out relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-300%] hover:translate-x-[300%] transition-transform duration-800" />
                  <span className="relative z-10">{prize.bonus}</span>
                </div>
              </div>

              {/* Enhanced shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1200" />
              
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${prize.bgGradient} blur-xl -z-10`} />
            </div>
          ))}
        </div>

        {/* Yummy Sub-Category */}
        <div id="premios-yummy" className="mt-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-[#F7F9FF] mb-2">{t("prizes.yummy_category_title")}</h3>
            <p className="text-[#BFC9DB] text-base">{t("prizes.yummy_category_description")}</p>
          </div>

          <div className="flex justify-center max-w-2xl mx-auto">
            {yummyPrizes.map((prize, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br ${prize.bgGradient} border-2 ${prize.borderColor} rounded-xl p-6 text-center hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-out group overflow-hidden shadow-xl backdrop-blur-md min-h-[300px] flex flex-col justify-between`}
              >
                {/* Enhanced background decorations */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-10 -translate-x-10" />
                
                {/* Hover brightness overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/5 rounded-xl transition-all duration-500" />
                
                <div className="relative z-10 flex-grow flex flex-col">
                  {/* Icon */}
                  <div className="mb-4">
                    <prize.icon
                      className={`mx-auto ${prize.color} group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 drop-shadow-lg`}
                      size={60}
                    />
                  </div>

                  {/* Place */}
                  <h4 className="text-xl md:text-2xl font-bold text-[#F7F9FF] mb-3 tracking-wide">{prize.place}</h4>

                  {/* Main prize */}
                  <div className={`text-2xl md:text-3xl font-bold ${prize.color} mb-2 leading-tight`}>{prize.prize}</div>
                  
                  {/* Prize description */}
                  {prize.description && (
                    <div className="text-[#BFC9DB] text-sm md:text-base mb-4 italic opacity-80">{prize.description}</div>
                  )}

                  {/* Bonus - Enhanced */}
                  <div className="text-[#F7F9FF] text-base md:text-lg font-bold bg-gradient-to-r from-[#4A5EE7]/40 to-[#BFC9DB]/40 border-2 border-[#4A5EE7]/60 rounded-xl px-4 py-3 backdrop-blur-sm mt-auto shadow-xl hover:scale-105 hover:shadow-2xl hover:from-[#4A5EE7]/50 hover:to-[#BFC9DB]/50 transition-all duration-300 ease-out relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-300%] hover:translate-x-[300%] transition-transform duration-800" />
                    <span className="relative z-10">{prize.bonus}</span>
                  </div>
                </div>

                {/* Enhanced shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1200" />
                
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${prize.bgGradient} blur-xl -z-10`} />
              </div>
            ))}
          </div>
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
