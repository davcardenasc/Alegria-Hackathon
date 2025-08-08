"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function MomentosSection() {
  const [currentTestimonio, setCurrentTestimonio] = useState(0)
  const { t } = useLanguage()

  const testimonios = [
    {
      texto: t("moments.testimonial1"),
      nombre: "Matias Azpurua",
      colegio: "San Ignacio",
    },
    {
      texto: t("moments.testimonial2"),
      nombre: "Jesus Rubinetti",
      colegio: "British School",
    },
    {
      texto: t("moments.testimonial3"),
      nombre: "María González",
      colegio: "Escuela Campo Alegre",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonio((prev) => (prev + 1) % testimonios.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonios.length])

  const nextTestimonio = () => {
    setCurrentTestimonio((prev) => (prev + 1) % testimonios.length)
  }

  const prevTestimonio = () => {
    setCurrentTestimonio((prev) => (prev - 1 + testimonios.length) % testimonios.length)
  }

  return (
    <section id="momentos" className="py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-4">
        {/* Solo Carrusel de Testimonios */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-[#F7F9FF] text-center mb-16">
            {t("moments.testimonials_title")}
          </h2>

          <div className="relative bg-[#00162D] border border-[#4A5EE7]/20 rounded-lg p-8">
            <div className="text-center">
              <blockquote className="text-lg text-[#BFC9DB] mb-4 italic">
                "{testimonios[currentTestimonio].texto}"
              </blockquote>
              <div className="text-[#F7F9FF] font-semibold">{testimonios[currentTestimonio].nombre}</div>
              <div className="text-[#4A5EE7] text-sm">{testimonios[currentTestimonio].colegio}</div>
            </div>

            {/* Controles del carrusel */}
            <button
              onClick={prevTestimonio}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4A5EE7] hover:text-[#F7F9FF] transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextTestimonio}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#4A5EE7] hover:text-[#F7F9FF] transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicadores */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonios.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonio(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonio ? "bg-[#4A5EE7]" : "bg-[#BFC9DB]/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
