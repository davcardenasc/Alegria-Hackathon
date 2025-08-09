"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Calendar, Sparkles, Clock } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

interface AcceptedTeam {
  id: string
  teamName: string
  school: string
  participantsCount: number
  acceptedAt: string
}

export default function ResultadosPage() {
  const [acceptedTeams, setAcceptedTeams] = useState<AcceptedTeam[]>([])
  const [loading, setLoading] = useState(true)
  const [isAnnouncementReady, setIsAnnouncementReady] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    checkAnnouncementDate()
    fetchAcceptedTeams()
  }, [])

  const checkAnnouncementDate = () => {
    const announcementDate = new Date("2025-09-28T00:00:00.000Z")
    const now = new Date()
    setIsAnnouncementReady(now >= announcementDate)
  }

  const fetchAcceptedTeams = async () => {
    try {
      const response = await fetch("/api/public/accepted-teams")
      const data = await response.json()
      // Ensure data is always an array
      setAcceptedTeams(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching accepted teams:", error)
      setAcceptedTeams([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#00162D] text-white flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="mx-auto mb-4 text-[#4A5EE7] animate-pulse" size={48} />
          <p className="text-[#F7F9FF]">Cargando resultados...</p>
        </div>
      </div>
    )
  }

  // Show "coming soon" message if announcement date hasn't passed
  if (!isAnnouncementReady) {
    return (
      <div className="min-h-screen bg-[#00162D] text-white py-20">
        <div className="container mx-auto px-6 sm:px-8 lg:px-4 max-w-4xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Clock className="text-[#4A5EE7]" size={48} />
              <h1 className="text-4xl md:text-6xl font-bold text-[#F7F9FF]" style={{ fontFamily: "Inter, sans-serif" }}>
                Resultados AlegrIA
              </h1>
            </div>
            
            <div className="bg-[#4A5EE7]/10 border border-[#4A5EE7]/30 rounded-lg p-12 mb-8">
              <Sparkles className="mx-auto mb-6 text-[#4A5EE7]" size={64} />
              <h2 className="text-3xl font-bold text-[#F7F9FF] mb-6">
                {t && typeof t === 'function' ? t("results.coming_soon") : "¡Los resultados se anunciarán pronto!"}
              </h2>
              <p className="text-xl text-[#BFC9DB] mb-6">
                {t && typeof t === 'function' ? 
                  t("results.check_back_date") : 
                  "Regresa el 28 de septiembre de 2025 para ver los equipos aceptados"}
              </p>
              <div className="bg-[#00162D] border border-[#4A5EE7]/20 rounded-lg p-6 inline-block">
                <div className="flex items-center gap-3">
                  <Calendar className="text-[#4A5EE7]" size={24} />
                  <p className="text-[#F7F9FF] font-semibold">
                    {t && typeof t === 'function' ? 
                      t("results.announcement_date") : 
                      "Fecha de anuncio: 28 de septiembre, 2025"}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="inline-block bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 text-lg"
            >
              {t && typeof t === 'function' ? t("common.back_home") : "Volver al Inicio"}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#00162D] text-white py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Trophy className="text-[#4A5EE7]" size={48} />
            <h1 className="text-4xl md:text-6xl font-bold text-[#F7F9FF]" style={{ fontFamily: "Inter, sans-serif" }}>
              ¡Resultados AlegrIA!
            </h1>
            <Trophy className="text-[#4A5EE7]" size={48} />
          </div>
          <p className="text-xl text-[#BFC9DB] mb-4">
            🎉 ¡Felicitaciones a todos los equipos aceptados para el AlegrIA Hackathon 2025!
          </p>
          <div className="bg-[#4A5EE7]/10 border border-[#4A5EE7]/30 rounded-lg p-4 inline-block">
            <p className="text-[#F7F9FF] font-semibold">
              📅 El hackathon se realizará del 20-22 de septiembre de 2025
            </p>
            <p className="text-[#BFC9DB] text-sm">
              Los equipos aceptados recibirán más información por correo electrónico
            </p>
          </div>
        </div>

        {/* Stats */}
        {acceptedTeams.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <Card className="bg-[#4A5EE7]/10 border-[#4A5EE7]/20 text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="text-[#4A5EE7]" size={24} />
                  <h3 className="text-2xl font-bold text-[#F7F9FF]">{acceptedTeams.length}</h3>
                </div>
                <p className="text-[#BFC9DB]">Equipos Aceptados</p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#4A5EE7]/10 border-[#4A5EE7]/20 text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="text-[#4A5EE7]" size={24} />
                  <h3 className="text-2xl font-bold text-[#F7F9FF]">
                    {acceptedTeams.reduce((total, team) => total + team.participantsCount, 0)}
                  </h3>
                </div>
                <p className="text-[#BFC9DB]">Participantes Totales</p>
              </CardContent>
            </Card>

            <Card className="bg-[#4A5EE7]/10 border-[#4A5EE7]/20 text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className="text-[#4A5EE7]" size={24} />
                  <h3 className="text-2xl font-bold text-[#F7F9FF]">3</h3>
                </div>
                <p className="text-[#BFC9DB]">Días de Hackathon</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Teams List */}
        {acceptedTeams.length === 0 ? (
          <Card className="bg-[#4A5EE7]/5 border-[#4A5EE7]/20 text-center py-12">
            <CardContent>
              <Sparkles className="mx-auto mb-4 text-[#4A5EE7]" size={64} />
              <h2 className="text-2xl font-bold text-[#F7F9FF] mb-4">
                Los resultados aún no han sido publicados
              </h2>
              <p className="text-[#BFC9DB] mb-6">
                Estamos revisando cuidadosamente todas las aplicaciones. <br />
                Los resultados se publicarán pronto. ¡Mantente atento!
              </p>
              <Link
                href="/"
                className="inline-block bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Volver al Inicio
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="text-[#4A5EE7]" size={24} />
              <h2 className="text-2xl font-bold text-[#F7F9FF]">Equipos Aceptados</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {acceptedTeams.map((team, index) => (
                <Card key={team.id} className="bg-[#4A5EE7]/5 border-[#4A5EE7]/20 hover:border-[#4A5EE7]/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#4A5EE7] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <CardTitle className="text-[#F7F9FF] text-lg">
                          {team.teamName}
                        </CardTitle>
                      </div>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/20">
                        Aceptado
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-[#4A5EE7]" />
                        <span className="text-[#BFC9DB] text-sm">
                          {team.participantsCount} participantes
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy size={16} className="text-[#4A5EE7]" />
                        <span className="text-[#BFC9DB] text-sm">
                          {team.school}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-[#4A5EE7]" />
                        <span className="text-[#BFC9DB] text-sm">
                          Aceptado el {new Date(team.acceptedAt).toLocaleDateString("es-ES")}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bottom Message */}
            <div className="mt-12 text-center">
              <div className="bg-[#4A5EE7]/10 border border-[#4A5EE7]/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#F7F9FF] mb-3">
                  🎊 ¡Nos vemos en el hackathon!
                </h3>
                <p className="text-[#BFC9DB] mb-4">
                  Los equipos aceptados recibirán un correo electrónico con los detalles del evento, 
                  incluyendo la ubicación, el horario y los recursos necesarios.
                </p>
                <p className="text-[#BFC9DB] text-sm">
                  ¿Preguntas? Contacta a <a href="mailto:cursos.alegria.labs@gmail.com" className="text-[#4A5EE7] underline">cursos.alegria.labs@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}