"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, MapPin, ShoppingCart, Users, Utensils, AlertTriangle, Shield, GraduationCap, ArrowLeft, Calendar } from 'lucide-react'
import { useLanguage } from "@/contexts/LanguageContext"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function IdeasPage() {
  const [expandedIdea, setExpandedIdea] = useState<number | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const ideas = [
    {
      title: t("ideas.idea4.title"),
      description: t("ideas.idea4.description"),
      icon: Utensils,
      color: "text-orange-400",
      bgColor: "from-orange-400/20 to-orange-600/20",
      borderColor: "border-orange-400/40",
    },
    {
      title: t("ideas.idea5.title"),
      description: t("ideas.idea5.description"),
      icon: Calendar,
      color: "text-teal-400",
      bgColor: "from-teal-400/20 to-teal-600/20",
      borderColor: "border-teal-400/40",
    },
    {
      title: t("ideas.idea1.title"),
      description: t("ideas.idea1.description"),
      icon: MapPin,
      color: "text-blue-400",
      bgColor: "from-blue-400/20 to-blue-600/20",
      borderColor: "border-blue-400/40",
    },
    {
      title: t("ideas.idea2.title"),
      description: t("ideas.idea2.description"),
      icon: ShoppingCart,
      color: "text-green-400",
      bgColor: "from-green-400/20 to-green-600/20",
      borderColor: "border-green-400/40",
    },
    {
      title: t("ideas.idea3.title"),
      description: t("ideas.idea3.description"),
      icon: Users,
      color: "text-purple-400",
      bgColor: "from-purple-400/20 to-purple-600/20",
      borderColor: "border-purple-400/40",
    },
    {
      title: t("ideas.idea6.title"),
      description: t("ideas.idea6.description"),
      icon: AlertTriangle,
      color: "text-yellow-400",
      bgColor: "from-yellow-400/20 to-yellow-600/20",
      borderColor: "border-yellow-400/40",
    },
    {
      title: t("ideas.idea7.title"),
      description: t("ideas.idea7.description"),
      icon: Shield,
      color: "text-red-400",
      bgColor: "from-red-400/20 to-red-600/20",
      borderColor: "border-red-400/40",
    },
    {
      title: t("ideas.idea8.title"),
      description: t("ideas.idea8.description"),
      icon: GraduationCap,
      color: "text-indigo-400",
      bgColor: "from-indigo-400/20 to-indigo-600/20",
      borderColor: "border-indigo-400/40",
    },
  ]

  const toggleIdea = (index: number) => {
    setExpandedIdea(expandedIdea === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-[#00162D] text-white">
      <Header />
      <main className="pt-20">
        <section id="ideas" className="py-20 bg-[#00162D]">
          <div className="container mx-auto px-6 sm:px-8 lg:px-4">
            <Link
              href="/#aplicaciones"
              className="inline-flex items-center gap-2 text-[#4A5EE7] hover:text-[#F7F9FF] mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              {t("ideas.back_to_applications")}
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold text-[#F7F9FF] mb-8">{t("ideas.title")}</h1>
              <p className="text-[#BFC9DB] text-lg max-w-3xl mx-auto">{t("ideas.description")}</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {ideas.map((idea, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${idea.bgColor} border-2 ${idea.borderColor} rounded-xl overflow-hidden`}
                >
                  <button
                    className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none"
                    onClick={() => toggleIdea(index)}
                  >
                    <div className="flex items-center gap-4">
                      <idea.icon className={`${idea.color}`} size={28} />
                      <h3 className="text-xl font-bold text-[#F7F9FF]">{idea.title}</h3>
                    </div>
                    {expandedIdea === index ? (
                      <ChevronUp className="text-[#4A5EE7]" size={24} />
                    ) : (
                      <ChevronDown className="text-[#4A5EE7]" size={24} />
                    )}
                  </button>

                  {expandedIdea === index && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-white/10 pt-4">
                        <p className="text-[#BFC9DB] leading-relaxed">{idea.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Call to action */}
            <a
              href="https://tally.so/r/mByGRR"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4A5EE7] to-[#BFC9DB] hover:from-[#4A5EE7]/80 hover:to-[#BFC9DB]/80 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-[0_0_20px_#4A5EE7] hover:scale-105 block mx-auto mt-12 text-center"
            >
              <span>{t("ideas.apply_now")}</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
