"use client"

import Link from "next/link"
import { Users, GraduationCap, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function AplicacionesSection() {
  const { t } = useLanguage()

  return (
    <section id="aplicaciones" className="py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-[#F7F9FF] text-center mb-8 font-heading">
          {t("applications.title")}
        </h2>

        <p className="text-lg text-[#BFC9DB] text-center mb-12 max-w-3xl mx-auto font-body">
          {t("applications.description")}
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/resultados">
            <div className="relative bg-gradient-to-br from-[#4A5EE7]/10 to-[#6366f1]/10 border-2 border-[#4A5EE7]/30 rounded-xl p-8 hover:border-[#4A5EE7]/60 hover:shadow-[0_0_30px_#4A5EE7/20] hover:scale-105 transition-[border-color,box-shadow,transform] duration-300 cursor-pointer group overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#4A5EE7]/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
              
              {/* Simple glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-br from-[#4A5EE7]/10 to-[#6366f1]/10 pointer-events-none" />

              <div className="text-center relative z-10">
                <Users
                  className="mx-auto mb-6 text-[#4A5EE7] group-hover:scale-110 transition-transform duration-300"
                  size={64}
                />
                <h3 className="text-2xl font-bold text-[#F7F9FF] mb-4 font-heading">
                  {t("applications.student.title")}
                </h3>
                <p className="text-[#BFC9DB] mb-6 font-body">{t("applications.student.description")}</p>

                {/* Button indicator */}
                <div className="inline-flex items-center gap-2 bg-[#4A5EE7] text-white px-6 py-3 rounded-full font-semibold group-hover:bg-[#4A5EE7]/80 transition-colors duration-300 font-body">
                  <span>{t("applications.student.cta")}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          </Link>

          <Link href="/formulario-colegios#top">
            <div className="relative bg-gradient-to-br from-[#BFC9DB]/10 to-[#4A5EE7]/10 border-2 border-[#BFC9DB]/30 rounded-xl p-8 hover:border-[#BFC9DB]/60 hover:shadow-[0_0_30px_#BFC9DB/20] hover:scale-105 transition-[border-color,box-shadow,transform] duration-300 cursor-pointer group overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#BFC9DB]/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
              
              {/* Simple glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-br from-[#BFC9DB]/10 to-[#4A5EE7]/10 pointer-events-none" />

              <div className="text-center relative z-10">
                <GraduationCap
                  className="mx-auto mb-6 text-[#BFC9DB] group-hover:scale-110 transition-transform duration-300"
                  size={64}
                />
                <h3 className="text-2xl font-bold text-[#F7F9FF] mb-4 font-heading">
                  {t("applications.school.title")}
                </h3>
                <p className="text-[#BFC9DB] mb-6 font-body">{t("applications.school.description")}</p>

                {/* Button indicator */}
                <div className="inline-flex items-center gap-2 bg-[#BFC9DB] text-[#00162D] px-6 py-3 rounded-full font-semibold group-hover:bg-[#BFC9DB]/80 transition-colors duration-300 font-body">
                  <span>{t("applications.school.cta")}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
