"use client"

import Link from "next/link"
import { Info, PlayCircle, Users, Calendar, DollarSign, Trophy, ArrowRight } from 'lucide-react'
import { useLanguage } from "@/contexts/LanguageContext"

export default function OverviewSection() {
  const { t } = useLanguage()

  const items = [
    {
      icon: Info,
      title: t("overview.what_is.title"),
      lines: t("overview.what_is.body").split("\n"),
      color: "from-[#4A5EE7]/20 to-[#6366f1]/20",
      border: "border-[#4A5EE7]/40",
      iconColor: "text-[#4A5EE7]",
    },
    {
      icon: PlayCircle,
      title: t("overview.flow.title"),
      lines: t("overview.flow.body").split("\n"),
      color: "from-[#BFC9DB]/20 to-white/10",
      border: "border-[#BFC9DB]/40",
      iconColor: "text-[#BFC9DB]",
    },
    {
      icon: Users,
      title: t("overview.eligibility.title"),
      lines: t("overview.eligibility.body").split("\n"),
      color: "from-green-400/20 to-emerald-600/20",
      border: "border-emerald-400/40",
      iconColor: "text-emerald-400",
    },
    {
      icon: Calendar,
      title: t("overview.dates.title"),
      lines: t("overview.dates.body").split("\n"),
      color: "from-orange-400/20 to-amber-600/20",
      border: "border-amber-400/40",
      iconColor: "text-amber-400",
    },
    {
      icon: DollarSign,
      title: t("overview.cost.title"),
      lines: t("overview.cost.body").split("\n"),
      color: "from-sky-400/20 to-cyan-600/20",
      border: "border-sky-400/40",
      iconColor: "text-sky-400",
    },
    {
      icon: Trophy,
      title: t("overview.prizes.title"),
      lines: t("overview.prizes.body").split("\n"),
      color: "from-yellow-400/20 to-yellow-600/20",
      border: "border-yellow-400/40",
      iconColor: "text-yellow-400",
    },
  ]

  return (
    <section id="overview" className="py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#F7F9FF] mb-4">{t("overview.title")}</h2>
          <p className="text-[#BFC9DB] text-lg max-w-3xl mx-auto">{t("overview.description")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`relative bg-gradient-to-br ${item.color} border-3 ${item.border} rounded-2xl p-8 overflow-hidden shadow-xl backdrop-blur-sm min-h-[320px] flex flex-col`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/8 to-transparent rounded-full -translate-y-12 translate-x-12" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-10 -translate-x-10" />
              
              <div className="relative z-10 flex-grow flex flex-col h-full">
                <item.icon className={`${item.iconColor} mb-6 drop-shadow-lg`} size={48} />
                <h3 className="text-2xl md:text-3xl font-bold text-[#F7F9FF] mb-4 tracking-wide leading-tight">{item.title}</h3>
                <ul className="space-y-3 flex-grow">
                  {item.lines.map((line, i) => (
                    <li key={i} className="text-[#BFC9DB] text-base md:text-lg leading-relaxed font-medium">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Link
            href="/#aplicaciones"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4A5EE7] to-[#BFC9DB] hover:from-[#4A5EE7]/80 hover:to-[#BFC9DB]/80 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-300"
          >
            {t("overview.cta_primary")}
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/#cronograma"
            className="inline-flex items-center gap-2 bg-[#00162D] border border-[#4A5EE7]/30 hover:border-[#4A5EE7]/60 text-[#F7F9FF] px-8 py-4 rounded-xl font-semibold transition-colors duration-300"
          >
            {t("overview.cta_secondary")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}