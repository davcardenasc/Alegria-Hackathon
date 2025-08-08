"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, X, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { CustomPopup } from "@/components/CustomPopup"
import { useLanguage } from "@/contexts/LanguageContext"

export default function FormularioColegios() {
  const { t } = useLanguage()
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false)

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" })

    // Check if deadline has passed
    const checkDeadline = () => {
      // September 20, 2025 00:00 EST (UTC-5)
      const deadline = new Date("2025-09-20T05:00:00.000Z") // 00:00 EST = 05:00 UTC
      const now = new Date()
      setIsDeadlinePassed(now >= deadline)
    }

    checkDeadline()
    // Check every minute in case user leaves page open
    const interval = setInterval(checkDeadline, 60000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check deadline before submission
    const deadline = new Date("2025-09-20T05:00:00.000Z") // 00:00 EST = 05:00 UTC
    const now = new Date()

    if (now >= deadline) {
      alert(
        "Lo sentimos, el período de aplicaciones ha cerrado. La fecha límite era el 19 de septiembre de 2025 a las 11:59 PM EST.",
      )
      return
    }

    setIsSubmitting(true)

    try {
      const formElement = e.target as HTMLFormElement
      const formData = new FormData(formElement)

      // Create a proper JSON object for the email
      const applicationData = {
        tipo: "colegio",
        nombre_colegio: formData.get("nombre-colegio"),
        coordinador: formData.get("coordinador"),
        correo_coordinador: formData.get("correo-coordinador"),
        telefono: formData.get("telefono"),
        num_alumnos: formData.get("num-alumnos"),
        fechas_seleccionadas: selectedDates.map((date) =>
          date.toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        ),
        comentarios: formData.get("comentarios"),
        fecha_aplicacion: new Date().toLocaleString("es-ES", { timeZone: "America/Bogota" }),
      }

      // Send to email endpoint
      const response = await fetch("/api/send-school-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      })

      if (response.ok) {
        setShowPopup(true)
        // Reset form
        setSelectedDates([])
        formElement.reset()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al enviar la aplicación")
      }
    } catch (error) {
      console.error("Error:", error)
      alert(
        "Hubo un error al enviar tu aplicación. Por favor, intenta nuevamente o contacta a cursos.alegria.labs@gmail.com",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const isDateSelected = (date: Date) => {
    return selectedDates.some((selectedDate) => selectedDate.toDateString() === date.toDateString())
  }

  const toggleDate = (date: Date) => {
    if (isDateSelected(date)) {
      setSelectedDates(selectedDates.filter((selectedDate) => selectedDate.toDateString() !== date.toDateString()))
    } else {
      setSelectedDates([...selectedDates, date])
    }
  }

  const removeDate = (dateToRemove: Date) => {
    setSelectedDates(selectedDates.filter((date) => date.toDateString() !== dateToRemove.toDateString()))
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth)
    if (direction === "prev") {
      newMonth.setMonth(currentMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(currentMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isDeadlinePassed) {
    return (
      <div className="min-h-screen bg-[#00162D] text-white py-20">
        <div className="container mx-auto px-6 sm:px-8 lg:px-4 max-w-2xl">
          <Link
            href="/#aplicaciones"
            className="inline-flex items-center gap-2 text-[#4A5EE7] hover:text-[#F7F9FF] mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Volver a aplicaciones
          </Link>

          <div className="text-center">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 mb-8">
              <AlertTriangle className="mx-auto mb-4 text-red-400" size={64} />
              <h1 className="text-3xl md:text-4xl font-bold text-[#F7F9FF] mb-4">Período de Aplicaciones Cerrado</h1>
              <p className="text-[#BFC9DB] text-lg mb-4">
                Lo sentimos, el período de aplicaciones para workshops de AlegrIA ha cerrado.
              </p>
              <p className="text-[#BFC9DB]">
                La fecha límite era el <strong>19 de septiembre de 2025 a las 11:59 PM EST</strong>.
              </p>
            </div>

            <div className="bg-[#4A5EE7]/10 border border-[#4A5EE7]/30 rounded-lg p-6">
              <h2 className="text-xl font-bold text-[#F7F9FF] mb-2">¿Tienes preguntas?</h2>
              <p className="text-[#BFC9DB] mb-4">Si tienes alguna consulta, no dudes en contactarnos.</p>
              <a
                href="mailto:cursos.alegria.labs@gmail.com"
                className="inline-block bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Contactar Organizadores
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  return (
    <div className="min-h-screen bg-[#00162D] text-white py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-4 max-w-2xl">
        <Link
          href="/#aplicaciones"
          className="inline-flex items-center gap-2 text-[#4A5EE7] hover:text-[#F7F9FF] mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver a aplicaciones
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-[#F7F9FF] mb-8">{t("forms.school_title")}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="nombre-colegio" className="text-[#F7F9FF] mb-2 block">
              {t("forms.school_name")}
            </Label>
            <Input
              id="nombre-colegio"
              name="nombre-colegio"
              className="bg-[#00162D] border-[#4A5EE7]/20 text-white placeholder:text-[#BFC9DB]/60"
              placeholder="Ej: Escuela Campo Alegre"
              required
            />
          </div>

          <div>
            <Label htmlFor="coordinador" className="text-[#F7F9FF] mb-2 block">
              {t("forms.coordinator_name")}
            </Label>
            <Input
              id="coordinador"
              name="coordinador"
              className="bg-[#00162D] border-[#4A5EE7]/20 text-white placeholder:text-[#BFC9DB]/60"
              placeholder="Nombre completo del coordinador"
              required
            />
          </div>

          <div>
            <Label htmlFor="correo-coordinador" className="text-[#F7F9FF] mb-2 block">
              {t("forms.coordinator_email")}
            </Label>
            <Input
              id="correo-coordinador"
              name="correo-coordinador"
              type="email"
              className="bg-[#00162D] border-[#4A5EE7]/20 text-white placeholder:text-[#BFC9DB]/60"
              placeholder="coordinador@colegio.edu.ve"
              required
            />
          </div>

          <div>
            <Label htmlFor="telefono" className="text-[#F7F9FF] mb-2 block">
              {t("forms.contact_phone")}
            </Label>
            <Input
              id="telefono"
              name="telefono"
              type="tel"
              className="bg-[#00162D] border-[#4A5EE7]/20 text-white placeholder:text-[#BFC9DB]/60"
              placeholder="+58 412 123 4567"
              required
            />
          </div>

          <div>
            <Label htmlFor="num-alumnos" className="text-[#F7F9FF] mb-2 block">
              {t("forms.interested_students")}
            </Label>
            <Input
              id="num-alumnos"
              name="num-alumnos"
              type="number"
              min="1"
              className="bg-[#00162D] border-[#4A5EE7]/20 text-white placeholder:text-[#BFC9DB]/60"
              placeholder="Ej: 25"
              required
            />
          </div>

          <div>
            <Label className="text-[#F7F9FF] mb-2 block">{t("forms.preferred_dates")}</Label>

            {/* Calendar */}
            <div className="bg-[#00162D] border border-[#4A5EE7]/20 rounded-lg p-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => navigateMonth("prev")}
                  className="text-[#4A5EE7] hover:text-[#F7F9FF] transition-colors p-2"
                >
                  ←
                </button>
                <h3 className="text-[#F7F9FF] font-semibold">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button
                  type="button"
                  onClick={() => navigateMonth("next")}
                  className="text-[#4A5EE7] hover:text-[#F7F9FF] transition-colors p-2"
                >
                  →
                </button>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-[#BFC9DB] text-sm font-medium p-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((date, index) => (
                  <div key={index} className="aspect-square">
                    {date ? (
                      <button
                        type="button"
                        onClick={() => toggleDate(date)}
                        disabled={date < new Date(new Date().setHours(0, 0, 0, 0))}
                        className={`w-full h-full text-sm rounded transition-colors ${
                          isDateSelected(date)
                            ? "bg-[#4A5EE7] text-white"
                            : date < new Date(new Date().setHours(0, 0, 0, 0))
                              ? "text-[#BFC9DB]/40 cursor-not-allowed"
                              : "text-[#BFC9DB] hover:bg-[#4A5EE7]/20 hover:text-[#F7F9FF]"
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Dates Preview */}
            {selectedDates.length > 0 && (
              <div className="mt-4">
                <p className="text-[#F7F9FF] font-medium mb-2">{t("forms.selected_dates")}</p>
                <div className="space-y-2">
                  {selectedDates
                    .sort((a, b) => a.getTime() - b.getTime())
                    .map((date, index) => (
                      <div key={index} className="flex items-center justify-between bg-[#4A5EE7]/10 rounded-lg p-2">
                        <span className="text-[#BFC9DB] text-sm">{formatDate(date)}</span>
                        <button
                          type="button"
                          onClick={() => removeDate(date)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="comentarios" className="text-[#F7F9FF] mb-2 block">
              {t("forms.additional_comments")}
            </Label>
            <Textarea
              id="comentarios"
              name="comentarios"
              className="bg-[#00162D] border-[#4A5EE7]/20 text-white placeholder:text-[#BFC9DB]/60"
              rows={4}
              placeholder="Cualquier información adicional que consideres relevante"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white py-3 text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_20px_#4A5EE7] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t("forms.submitting") : t("forms.submit")}
          </Button>
        </form>
      </div>

      <CustomPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title="¡Felicitaciones!"
        message="Tu aplicación ha sido enviada exitosamente. Te contactaremos pronto para coordinar el workshop. ¡Gracias por tu interés en AlegrIA!"
      />
    </div>
  )
}
