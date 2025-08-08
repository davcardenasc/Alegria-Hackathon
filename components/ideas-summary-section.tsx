"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function IdeasSummarySection() {
  const { t } = useLanguage()

  const exampleIdeas = [t("ideas.idea1.title"), t("ideas.idea2.title"), t("ideas.idea3.title")]

  return (
    <section id="ideas" className="py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#F7F9FF] mb-8">{t("ideas.title")}</h2>
          <p className="text-[#BFC9DB] text-lg max-w-3xl mx-auto">
            {t("ideas.description")} Algunos ejemplos: {exampleIdeas.join(", ")}...
          </p>
        </div>

        <div className="text-center">
          {/* Ver todas las ideas button */}
          <Link
            href="/ideas"
            className="inline-flex items-center gap-2 bg-[#00162D] border border-[#4A5EE7]/30 hover:border-[#4A5EE7]/60 text-[#F7F9FF] px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-[0_0_20px_#4A5EE7/30] hover:scale-105"
          >
            <span>{t("ideas.view_all_ideas")}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
