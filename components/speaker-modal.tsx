"use client"
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[101] text-white hover:text-[#4A5EE7] transition-colors p-2 bg-black/50 rounded-full backdrop-blur-sm"
      >
        <X size={24} />
      </button>

      {/* Modal content */}
      <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-[#00162D]/95 backdrop-blur-xl border border-[#4A5EE7]/30 rounded-xl p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Speaker image */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 mx-auto md:mx-0 rounded-full overflow-hidden">
              <Image
                src={speaker.image || "/placeholder.svg"}
                alt={speaker.name}
                fill
                className="object-cover"
                sizes="192px"
                priority
              />
            </div>
          </div>

          {/* Speaker info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-[#F7F9FF] mb-2">{speaker.name}</h2>
            <p className="text-[#4A5EE7] font-semibold text-lg mb-4">{speaker.title}</p>

            {/* Full bio */}
            <div className="space-y-4">
              <p className="text-[#BFC9DB] leading-relaxed">{speaker.fullBio}</p>

              {/* Achievements */}
              <div>
                <h3 className="text-[#F7F9FF] font-semibold mb-2">{t("speakers.curious_facts")}</h3>
                <ul className="space-y-1">
                  {(Array.isArray(speaker.achievements) ? speaker.achievements : [speaker.achievements]).map((achievement, index) => (
                    <li key={index} className="text-[#BFC9DB] text-sm flex items-start gap-2">
                      <span className="text-[#4A5EE7] mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* LinkedIn link if available */}
              {speaker.linkedin && (
                <div className="pt-4">
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#4A5EE7] hover:text-[#BFC9DB] transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>{t("speakers.linkedin")}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  )
}
