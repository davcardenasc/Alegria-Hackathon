"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Calendar, Sparkles, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import GlobalBackground from "@/components/global-background"

interface AcceptedTeam {
  id: string
  teamName: string
  school: string
  participantsCount: number
  acceptedAt: string
}

export default function AdminPreviewResultsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [acceptedTeams, setAcceptedTeams] = useState<AcceptedTeam[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/admin/login")
      return
    }
  }, [session, status, router])

  useEffect(() => {
    if (session) {
      fetchAcceptedTeams()
    }
  }, [session])

  const fetchAcceptedTeams = async () => {
    try {
      const response = await fetch("/api/admin/applications")
      const applications = await response.json()
      
      // Filter only accepted applications and format for results display
      const accepted = applications
        ?.filter((app: any) => app.status === "ACCEPTED")
        ?.map((app: any) => ({
          id: app.id,
          teamName: app.teamName,
          school: app.school,
          participantsCount: app.participantsCount,
          acceptedAt: app.reviewedAt || new Date().toISOString()
        })) || []
      
      setAcceptedTeams(accepted)
    } catch (error) {
      console.error("Error fetching accepted teams:", error)
      setAcceptedTeams([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchAcceptedTeams()
  }

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen bg-[#00162D] text-white flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="mx-auto mb-4 text-[#4A5EE7] animate-pulse" size={48} />
          <p className="text-[#F7F9FF]">Loading...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <>
        <GlobalBackground />
        <div className="min-h-screen text-white py-20 relative z-10">
          <div className="container mx-auto px-6 sm:px-8 lg:px-4 max-w-6xl">
            <div className="text-center">
              <Sparkles className="mx-auto mb-4 text-[#4A5EE7] animate-pulse" size={48} />
              <p className="text-[#F7F9FF]">Loading preview...</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <GlobalBackground />
      <div className="min-h-screen text-white py-20 relative z-10">
        <div className="container mx-auto px-6 sm:px-8 lg:px-4 max-w-6xl">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-[#4A5EE7] hover:text-[#F7F9FF] transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Admin
              </Link>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#F7F9FF]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Results Preview
                </h1>
                <p className="text-[#BFC9DB]">Real-time preview of what will be shown on September 28th, 2025</p>
              </div>
            </div>
            <Button 
              onClick={handleRefresh}
              disabled={refreshing}
              variant="outline" 
              className="border-[#4A5EE7]/20 text-[#BFC9DB] hover:bg-[#4A5EE7]/10"
            >
              <RefreshCw size={16} className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
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
                  No teams accepted yet
                </h2>
                <p className="text-[#BFC9DB] mb-6">
                  When you accept applications, they will appear here as a preview <br />
                  of what will be shown on the public results page.
                </p>
                <Link
                  href="/admin"
                  className="inline-block bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Back to Admin Dashboard
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="text-[#4A5EE7]" size={24} />
                <h2 className="text-2xl font-bold text-[#F7F9FF]">Accepted Teams Preview</h2>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/20">
                  Live Preview
                </Badge>
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
                    📋 Admin Preview
                  </h3>
                  <p className="text-[#BFC9DB] mb-4">
                    This is exactly how the results will appear on the public page after September 28th, 2025. 
                    Accept or reject applications from the admin dashboard to see real-time updates here.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Link
                      href="/admin"
                      className="bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                    >
                      Manage Applications
                    </Link>
                    <Button 
                      onClick={handleRefresh}
                      variant="outline" 
                      className="border-[#4A5EE7]/20 text-[#BFC9DB] hover:bg-[#4A5EE7]/10"
                    >
                      <RefreshCw size={16} className="mr-2" />
                      Refresh Preview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}