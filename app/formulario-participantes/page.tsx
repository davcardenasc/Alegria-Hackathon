"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, X, Calendar, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { CustomPopup } from "@/components/CustomPopup"
import { useLanguage } from "@/contexts/LanguageContext"

export default function FormularioParticipantes() {
  const [numParticipantes, setNumParticipantes] = useState("")
  const [participantes, setParticipantes] = useState<string[]>([])
  const [experienciaText, setExperienciaText] = useState("")
  const [motivacionText, setMotivacionText] = useState("")
  const [ideasText, setIdeasText] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { t } = useLanguage()

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

  const handleNumParticipantesChange = (value: string) => {
    setNumParticipantes(value)
    const num = Number.parseInt(value)
    setParticipantes(new Array(num).fill(""))
  }

  const handleParticipanteChange = (index: number, value: string) => {
    const newParticipantes = [...participantes]
    newParticipantes[index] = value
    setParticipantes(newParticipantes)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("El archivo es demasiado grande. El tamaño máximo es 5MB.")
        return
      }
      setUploadedFile(file)
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    // Reset the file input to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getWordCount = (text: string) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length
  }

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
        tipo: "participantes",
        numero_participantes: numParticipantes,
        participantes: participantes,
        nombre_equipo: formData.get("nombre-equipo"),
        colegio: formData.get("colegio"),
        ano_escolar: formData.get("ano-escolar"),
        correo: formData.get("correo"),
        experiencia: experienciaText,
        motivacion: motivacionText,
        ideas: ideasText,
        cedula_filename: uploadedFile?.name || null,
        cedula_file: uploadedFile,
        fecha_aplicacion: new Date().toLocaleString("es-ES", { timeZone: "America/Bogota" }),
      }

      // Send to email endpoint
      const response = await fetch("/api/send-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      })

      if (response.ok) {
        setShowPopup(true)
        // Reset form
        setNumParticipantes("")
        setParticipantes([])
        setExperienciaText("")
        setMotivacionText("")
        setIdeasText("")
        setUploadedFile(null)
        formElement.reset()
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
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

  if (isDeadlinePassed) {
    return (
      <div className="min-h-screen bg-[#00162D] text-white py-20">
        <div className="container mx-auto px-6 sm:px-8 lg:px-4 max-w-2xl">
          <Link
            href="/#aplicaciones"
            className="inline-flex items-center gap-2 text-[#4A5EE7] hover:text-[#F7F9FF] mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            {t("forms.back_to_applications")}
          </Link>

          <div className="text-center">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 mb-8">
              <AlertTriangle className="mx-auto mb-4 text-red-400" size={64} />
              <h1 className="text-3xl md:text-4xl font-bold text-[#F7F9FF] mb-4">{t("forms.deadline_passed")}</h1>
              <p className="text-[#BFC9DB] text-lg mb-4">{t("forms.deadline_message")}</p>
              <p className="text-[#BFC9DB]">{t("forms.deadline_date_message")}</p>
            </div>

            <div className="bg-[#4A5EE7]/10 border border-[#4A5EE7]/30 rounded-lg p-6">
              <h2 className="text-xl font-bold text-[#F7F9FF] mb-2">{t("forms.questions")}</h2>
              <p className="text-[#BFC9DB] mb-4">{t("forms.contact_message")}</p>
              <a
                href="mailto:cursos.alegria.labs@gmail.com"
                className="inline-block bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                {t("forms.contact_organizers")}
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#00162D] text-white py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-4 max-w-2xl">
        <Link
          href="/#aplicaciones"
          className="inline-flex items-center gap-2 text-[#4A5EE7] hover:text-[#F7F9FF] mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          {t("forms.back_to_applications")}
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-[#F7F9FF] mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
          {t("forms.student_title")}
        </h1>

        {/* Due Date Notice */}
        <div className="bg-[#4A5EE7]/10 border border-[#4A5EE7]/30 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-3">
            <Calendar className="text-[#4A5EE7]" size={20} />
            <div>
              <p className="text-[#F7F9FF] font-semibold">{t("forms.deadline_notice")}</p>
              <p className="text-[#BFC9DB] text-sm">{t("forms.deadline_date")}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="num-participantes" className="text-[#F7F9FF] mb-2 block">
              {t("forms.participants_count")}
            </Label>
            <Select onValueChange={handleNumParticipantesChange} required>
              <SelectTrigger className="bg-[#00162D] border-[#4A5EE7]/20 text-white hover:border-[#4A5EE7]/40 hover:shadow-[0_0_10px_#4A5EE7/30] transition-all duration-300">
                <SelectValue placeholder={t("forms.select_participants")} className="text-[#BFC9DB]" />
              </SelectTrigger>
              <SelectContent className="bg-[#00162D] border-[#4A5EE7]/20">
                <SelectItem value="2" className="text-white hover:bg-[#4A5EE7]/20">
                  2 participantes
                </SelectItem>
                <SelectItem value="3" className="text-white hover:bg-[#4A5EE7]/20">
                  3 participantes
                </SelectItem>
                <SelectItem value="4" className="text-white hover:bg-[#4A5EE7]/20">
                  4 participantes
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {participantes.map((_, index) => (
            <div key={index}>
              <Label htmlFor={`participante-${index}`} className="text-[#F7F9FF] mb-2 block">
                {t("forms.participant_name")} {index + 1} *
              </Label>
              <Input
                id={`participante-${index}`}
                name={`participante-${index}`}
                value={participantes[index]}
                onChange={(e) => handleParticipanteChange(index, e.target.value)}
                className="bg-[#00162D] border-[#4A5EE7]/20 text-white placeholder:text-[#BFC9DB]/60"
                placeholder="Ingresa el nombre completo"
                required
              />
            </div>
          ))}

          <div>
            <Label htmlFor="nombre-equipo" className="text-[#F7F9FF] mb-2 block">
              {t("forms.team_name")}
            </Label>
            <Input
              id="nombre-equipo"
              name="nombre-equipo"
              className="bg-[#00162D] border-[#4A5EE7]/20 text-white placeholder:text-[#BFC9DB]/60"
              placeholder="Ej: Los Innovadores"
              required
            />
          </div>

          <div>
            <Label htmlFor="colegio" className="text-[#F7F9FF] mb-2 block">
              {t("forms.school_university")}
            </Label>
            <Input
              id="colegio"
              name="colegio"
              className="bg-[#00162D] border-[#4A5EE7]/20 text-white placeholder:text-[#BFC9DB]/60"
              placeholder="Ej: Escuela Campo Alegre"
              required
            />
          </div>

          <div>
            <Label htmlFor="ano-escolar" className="text-[#F7F9FF] mb-2 block">
              {t("forms.school_year")}
            </Label>
            <Input
              id="ano-escolar"
              name="ano-escolar"
              className="bg-[#00162D] border-[#4A5EE7]/20 text-white placeholder:text-[#BFC9DB]/60"
              placeholder="Ej: 5to año, 1er semestre universidad"
              required
            />
          </div>

          <div>
            <Label htmlFor="correo" className="text-[#F7F9FF] mb-2 block">
              {t("forms.contact_email")}
            </Label>
            <Input
              id="correo"
              name="correo"
              type="email"
              className="bg-[#00162D] border-[#4A5EE7]/20 text-white placeholder:text-[#BFC9DB]/60"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="cedula" className="text-[#F7F9FF] mb-2 block">
              {t("forms.id_photo")}
            </Label>
            <div className="border-2 border-dashed border-[#4A5EE7]/20 rounded-lg p-6 text-center hover:border-[#4A5EE7]/40 transition-colors">
              <input
                type="file"
                id="cedula"
                name="cedula"
                ref={fileInputRef}
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                required={!uploadedFile}
              />

              {uploadedFile ? (
                <div className="flex items-center justify-between bg-[#4A5EE7]/10 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Upload className="text-[#4A5EE7]" size={20} />
                    <span className="text-[#F7F9FF] text-sm">{uploadedFile.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label htmlFor="cedula" className="cursor-pointer">
                  <Upload className="mx-auto mb-2 text-[#4A5EE7]" size={24} />
                  <p className="text-[#BFC9DB]">{t("forms.upload_file")}</p>
                  <p className="text-[#BFC9DB]/70 text-xs mt-1">{t("forms.file_formats")}</p>
                </label>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="experiencia" className="text-[#F7F9FF] mb-2 block">
              {t("forms.previous_experience")}
            </Label>
            <div className="relative">
              <Textarea
                id="experiencia"
                name="experiencia"
                value={experienciaText}
                onChange={(e) => setExperienciaText(e.target.value)}
                className="bg-[#00162D] border-[#4A5EE7]/20 text-white pr-16 placeholder:text-[#BFC9DB]/60"
                rows={3}
                maxLength={500}
                placeholder="Describe la experiencia previa en programación, emprendimiento, o proyectos relevantes de cada miembro del equipo..."
              />
              <div className="absolute bottom-2 right-2 text-xs text-[#BFC9DB]">
                {getWordCount(experienciaText)}/100 palabras
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="motivacion" className="text-[#F7F9FF] mb-2 block">
              {t("forms.motivation")}
            </Label>
            <div className="relative">
              <Textarea
                id="motivacion"
                name="motivacion"
                value={motivacionText}
                onChange={(e) => setMotivacionText(e.target.value)}
                className="bg-[#00162D] border-[#4A5EE7]/20 text-white pr-16 placeholder:text-[#BFC9DB]/60"
                rows={4}
                maxLength={1000}
                required
                placeholder="Explica qué los motiva a participar en AlegrIA y qué esperan lograr..."
              />
              <div className="absolute bottom-2 right-2 text-xs text-[#BFC9DB]">
                {getWordCount(motivacionText)}/200 palabras
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="ideas" className="text-[#F7F9FF] mb-2 block">
              {t("forms.preliminary_ideas")}
            </Label>
            <div className="relative">
              <Textarea
                id="ideas"
                name="ideas"
                value={ideasText}
                onChange={(e) => setIdeasText(e.target.value)}
                className="bg-[#00162D] border-[#4A5EE7]/20 text-white pr-16 placeholder:text-[#BFC9DB]/60"
                rows={4}
                maxLength={750}
                placeholder="Comparte cualquier idea preliminar que tengan para desarrollar durante el hackathon. No es obligatorio, pero nos ayuda a conocer mejor sus intereses..."
              />
              <div className="absolute bottom-2 right-2 text-xs text-[#BFC9DB]">
                {getWordCount(ideasText)}/150 palabras
              </div>
            </div>
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
        title={t("forms.success_title")}
        message={t("forms.success_message")}
      />
    </div>
  )
}
