"use client"
import { useEffect } from "react"
import Image from "next/image"
import { X, ExternalLink } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface SpeakerModalProps {
  speaker: {
    name: string
    title: string
    company: string
    image: string
    bio: string
    fullBio: string
    achievements: string[] | string
    linkedin?: string
  }
  isOpen: boolean
  onClose: () => void
}

export default function SpeakerModal({ speaker, isOpen, onClose }: SpeakerModalProps) {
  const { t } = useLanguage()

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const achievements = Array.isArray(speaker.achievements) ? speaker.achievements : [speaker.achievements]

  return (
    <div className="fixed inset-0 z-[100] animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#00162D]/95 backdrop-blur-sm" onClick={onClose} />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-[102] border border-white/10 hover:border-white/30 text-white hover:text-[#4A5EE7] transition-all p-2.5 rounded-full backdrop-blur-sm"
      >
        <X size={20} />
      </button>

      {/* Content */}
      <div className="relative z-[101] h-full flex flex-col lg:flex-row overflow-y-auto">
        {/* Photo panel */}
        <div className="relative lg:w-1/2 min-h-[50vh] lg:min-h-full flex-shrink-0">
          <Image
            src={speaker.image || "/placeholder.svg"}
            alt={speaker.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-transparent to-[#00162D]" />

          {/* Mobile name overlay on photo */}
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:hidden">
            <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-xs mb-2">
              {speaker.company}
            </p>
            <h2
              className="font-bold text-white text-3xl mb-1"
              style={{ fontFamily: "var(--font-montserrat)", letterSpacing: "-0.02em" }}
            >
              {speaker.name}
            </h2>
            <p className="text-[#BFC9DB]/70 text-sm font-medium">{speaker.title}</p>
          </div>
        </div>

        {/* Text panel */}
        <div className="lg:w-1/2 flex flex-col justify-center p-8 lg:p-16 lg:overflow-y-auto">
          {/* Desktop name (hidden on mobile, shown on photo there) */}
          <div className="hidden lg:block mb-8">
            <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-xs mb-3">
              {speaker.company}
            </p>
            <h2
              className="font-bold text-white mb-2"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "clamp(2rem, 3vw, 3rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {speaker.name}
            </h2>
            <p className="text-[#BFC9DB]/70 text-sm font-medium">{speaker.title}</p>
          </div>

          {/* Full bio */}
          <p className="text-[#BFC9DB] leading-relaxed mb-8">{speaker.fullBio}</p>

          {/* Achievements as pills */}
          <div className="mb-8">
            <p
              className="text-white/50 font-semibold tracking-widest uppercase text-xs mb-4"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {t("speakers.curious_facts")}
            </p>
            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement, index) => (
                <span
                  key={index}
                  className="inline-block text-[#BFC9DB] text-sm leading-snug bg-[#4A5EE7]/[0.08] border border-[#4A5EE7]/15 rounded-lg px-4 py-2.5"
                >
                  {achievement}
                </span>
              ))}
            </div>
          </div>

          {/* LinkedIn CTA */}
          {speaker.linkedin && (
            <a
              href={speaker.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#4A5EE7] hover:bg-[#3a4ed7] text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 w-fit"
            >
              <ExternalLink size={16} />
              {t("speakers.linkedin")}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
