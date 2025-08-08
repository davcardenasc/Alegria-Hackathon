"use client"

import { Phone } from 'lucide-react'
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"

export default function EmbajadoresSection() {
  const { t } = useLanguage()

  const organizadores = [
    {
      name: "David Cárdenas",
      role: t("ambassadors.david.role"),
      institution: "Escuela Campo Alegre",
      whatsapp: "+58 412 2226901",
      whatsappMessage: "Hola David, estoy interesado en el hackathon de AlegrIA! Me gustaría obtener más información.",
      image: "/images/embajador-david-cardenas.jpeg",
    },
    {
      name: "Ugo Di Martino",
      role: t("ambassadors.ugo.role"),
      institution: "Escuela Campo Alegre",
      whatsapp: "+58 424 2572999",
      whatsappMessage: "Hola Ugo, estoy interesado en el hackathon de AlegrIA! Me gustaría obtener más información.",
      image: "/images/embajador-ugo-di-martino.jpg",
    },
  ]

  const embajadores = [
    {
      name: "José Núñez",
      institution: "San Ignacio",
      whatsapp: "+58 412 2378192",
      whatsappMessage: "Hola José, estoy interesado en el hackathon de AlegrIA! Me gustaría obtener más información.",
      image: "/images/embajador-jose-nunez.jpeg",
    },
    {
      name: "Nicolás Lapadula",
      institution: "Colegio Ávila",
      whatsapp: "+58 412 2719711",
      whatsappMessage: "Hola Nicolás, estoy interesado en el hackathon de AlegrIA! Me gustaría obtener más información.",
      image: "/images/embajador-nicolas-lapadula-new.png",
    },
    {
      name: "Augusto Mini",
      institution: "British School of Caracas",
      whatsapp: "+58 424 1368923",
      whatsappMessage: "Hola Augusto, estoy interesado en el hackathon de AlegrIA! Me gustaría obtener más información.",
      image: "/images/embajador-augusto-mini.png",
    },
    {
      name: "Manuel Marín",
      institution: "Academia Washington",
      whatsapp: "+58 412 2407168",
      whatsappMessage: "Hola Manuel, estoy interesado en el hackathon de AlegrIA! Me gustaría obtener más información.",
      image: "/images/embajador-manuel-marin.png",
    },
    {
      name: "Mariana Banchs",
      institution: "Cristo Rey",
      whatsapp: "+58 424 1248997",
      whatsappMessage: "Hola Mariana, estoy interesada en el hackathon de AlegrIA! Me gustaría obtener más información.",
      image: "/images/embajador-mariana-banchs.png",
    },
    {
      name: "Bernardo Pérez",
      institution: "Escuela Campo Alegre",
      whatsapp: "+58 414 3168157",
      whatsappMessage: "Hola Bernardo, estoy interesado en el hackathon de AlegrIA! Me gustaría obtener más información.",
      image: "/images/embajador-bernardo-perez.png",
    },
  ]

  return (
    <section id="embajadores" className="py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-[#F7F9FF] text-center mb-16">{t("ambassadors.title")}</h2>

        {/* Organizadores */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#F7F9FF] text-center mb-8">{t("ambassadors.organizers")}</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {organizadores.map((organizador, index) => (
              <div
                key={index}
                className="bg-[#00162D] border border-[#4A5EE7]/20 rounded-lg p-8 text-center hover:border-[#4A5EE7]/40 hover:shadow-[0_0_20px_#4A5EE7/20] transition-all duration-300"
              >
                <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden p-2">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={organizador.image || "/placeholder.svg"}
                      alt={organizador.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-[#F7F9FF] mb-3">{organizador.name}</h4>
                <p className="text-[#BFC9DB] text-base mb-3">{organizador.role}</p>
                <p className="text-[#BFC9DB] text-base mb-4">{organizador.institution}</p>
                <a
                  href={`https://wa.me/${organizador.whatsapp.replace(/\s+/g, "")}?text=${encodeURIComponent(organizador.whatsappMessage)}`}
                  className="inline-flex items-center gap-2 text-[#4A5EE7] hover:text-[#F7F9FF] transition-colors text-lg"
                >
                  <Phone size={18} />
                  <span className="hidden sm:inline">{organizador.whatsapp}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Embajadores */}
        <div>
          <h3 className="text-2xl font-bold text-[#F7F9FF] text-center mb-8">{t("ambassadors.ambassadors")}</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
            {embajadores.map((embajador, index) => (
              <div
                key={index}
                className="bg-[#00162D] border border-[#4A5EE7]/20 rounded-lg p-6 text-center hover:border-[#4A5EE7]/60 hover:shadow-[0_0_15px_#4A5EE7/30] transition-all duration-300 group"
              >
                <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden p-2">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={embajador.image || "/placeholder.svg"}
                      alt={embajador.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h4 className="text-base font-bold text-[#F7F9FF] mb-2">{embajador.name}</h4>
                <p className="text-[#BFC9DB] text-sm mb-3">{embajador.institution}</p>
                <a
                  href={`https://wa.me/${embajador.whatsapp.replace(/\s+/g, "")}?text=${encodeURIComponent(embajador.whatsappMessage)}`}
                  className="inline-flex items-center gap-1 text-[#4A5EE7] hover:text-[#F7F9FF] transition-colors text-sm"
                >
                  <Phone size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
