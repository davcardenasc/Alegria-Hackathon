"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Calendar, Sparkles } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import GlobalBackground from "@/components/global-background"

// Set this to true when actual results are ready to be announced
const RESULTS_ANNOUNCED = false

export default function ResultadosPage() {
  const { t } = useLanguage()

  return (
    <>
      <GlobalBackground />
      <div className="min-h-screen text-white py-20 relative z-10">
        <div className="container mx-auto px-6 sm:px-8 lg:px-4 max-w-4xl">
          <div className="text-center">
            <div className="bg-[#4A5EE7]/10 border border-[#4A5EE7]/30 rounded-lg p-12 mb-8">
              <Sparkles className="mx-auto mb-6 text-[#4A5EE7]" size={64} />
              <h2 className="text-3xl font-bold text-[#F7F9FF] mb-6">
                {t && typeof t === 'function' ? t("results.coming_soon") : "¡Los resultados se anunciarán pronto!"}
              </h2>
              <p className="text-xl text-[#BFC9DB] mb-6">
                {t && typeof t === 'function' ? 
                  t("results.check_back_date") : 
                  "Regresa el 28 de septiembre de 2025 para ver los equipos aceptados"}
              </p>
              <div className="bg-[#00162D] border border-[#4A5EE7]/20 rounded-lg p-6 inline-block">
                <div className="flex items-center gap-3">
                  <Calendar className="text-[#4A5EE7]" size={24} />
                  <p className="text-[#F7F9FF] font-semibold">
                    {t && typeof t === 'function' ? 
                      t("results.announcement_date") : 
                      "Fecha de anuncio: 28 de septiembre, 2025"}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="inline-block bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 text-lg"
            >
              {t && typeof t === 'function' ? t("common.back_home") : "Volver al Inicio"}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}