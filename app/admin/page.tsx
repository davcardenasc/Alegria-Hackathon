"use client"

// School Workshop Applications Admin Interface - Main Dashboard

import { useSession, signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  School, 
  Star, 
  Search, 
  LogOut,
  Users,
  Phone,
  Mail,
  Calendar,
  MessageCircle,
  Trash2
} from "lucide-react"

interface SchoolApplication {
  id: string
  schoolName: string
  coordinatorName: string
  coordinatorEmail: string
  phone: string
  numStudents: number
  preferredDates: string[] // Changed from string to string[] since it's parsed as JSON array
  comments?: string
  starred: boolean
  submittedAt: string
}

export default function AdminDashboard() {
  const { data: session } = useSession()
  const [applications, setApplications] = useState<SchoolApplication[]>([])
  const [filteredApplications, setFilteredApplications] = useState<SchoolApplication[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    starred: 0
  })

  useEffect(() => {
    fetchSchoolApplications()
  }, [])

  useEffect(() => {
    filterApplications()
  }, [applications, searchTerm, statusFilter])

  const fetchSchoolApplications = async () => {
    try {
      const response = await fetch("/api/admin/school-applications")
      const result = await response.json()
      
      // Handle both old and new API response formats
      const data = result.success ? result.data?.data || result.data || [] : (Array.isArray(result) ? result : [])
      
      // Parse preferred dates for each application
      const parsedData = data.map((app: any) => ({
        ...app,
        preferredDates: JSON.parse(app.preferredDates)
      }))
      
      setApplications(parsedData)
      
      // Calculate stats (optimize to only what we need)
      const stats = {
        total: parsedData.length,
        starred: parsedData.filter((app: SchoolApplication) => app.starred).length,
      }
      setStats(stats)
    } catch (error) {
      console.error("Error fetching school applications:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterApplications = () => {
    let filtered = applications

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.coordinatorName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply filter (only STARRED supported)
    if (statusFilter === "STARRED") {
      filtered = filtered.filter(app => app.starred)
    }

    setFilteredApplications(filtered)
  }

  const toggleStar = async (applicationId: string) => {
    try {
      const response = await fetch(`/api/admin/school-applications/${applicationId}/star`, {
        method: "POST",
      })
      
      if (response.ok) {
        fetchSchoolApplications() // Refresh data
      }
    } catch (error) {
      console.error("Error toggling star:", error)
    }
  }

  const handleStatsCardClick = (filter: string) => {
    setStatusFilter(filter)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#00162D] text-white flex items-center justify-center">
        <div>Loading school applications...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#00162D] text-white">
      {/* Header */}
      <header className="border-b border-[#4A5EE7]/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#F7F9FF] flex items-center gap-2">
              <School size={24} className="text-[#4A5EE7]" />
              AlegrIA Hackathon - School Applications
            </h1>
            <p className="text-[#BFC9DB]">Welcome, {session?.user?.name} - Manage workshop requests from schools</p>
          </div>
          <Button 
            onClick={() => signOut()} 
            variant="outline" 
            className="border-[#4A5EE7]/20 text-[#BFC9DB] hover:bg-[#4A5EE7]/10"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card 
            className="bg-[#00162D] border-[#4A5EE7]/20 cursor-pointer hover:border-[#4A5EE7]/40 transition-colors" 
            onClick={() => handleStatsCardClick("ALL")}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <School size={20} className="text-[#4A5EE7]" />
                <div>
                  <p className="text-2xl font-bold text-[#F7F9FF]">{stats.total}</p>
                  <p className="text-sm text-[#BFC9DB]">Total Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#00162D] border-[#4A5EE7]/20 cursor-pointer hover:border-[#4A5EE7]/40 transition-colors" 
            onClick={() => handleStatsCardClick("STARRED")}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star size={20} className="text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-[#F7F9FF]">{stats.starred}</p>
                  <p className="text-sm text-[#BFC9DB]">Starred</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-[#00162D] border-[#4A5EE7]/20">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#BFC9DB]" />
                  <Input
                    placeholder="Search schools or coordinators..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-[#00162D] border-[#4A5EE7]/20 text-white"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px] bg-[#00162D] border-[#4A5EE7]/20 text-white">
                  <SelectValue />
                </SelectTrigger>
              <SelectContent className="bg-[#00162D] border-[#4A5EE7]/20 text-white">
                  <SelectItem value="ALL" className="text-white hover:bg-[#4A5EE7]/20 focus:bg-[#4A5EE7]/20">All Applications</SelectItem>
                  <SelectItem value="STARRED" className="text-white hover:bg-[#4A5EE7]/20 focus:bg-[#4A5EE7]/20">Starred</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <Card className="bg-[#00162D] border-[#4A5EE7]/20">
              <CardContent className="p-8 text-center">
                <p className="text-[#BFC9DB]">No school applications found</p>
              </CardContent>
            </Card>
          ) : (
            filteredApplications.map((app) => (
              <Card key={app.id} className="bg-[#00162D] border-[#4A5EE7]/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-4">
                      {/* Header */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleStar(app.id)}
                          className="text-yellow-400 hover:text-yellow-300"
                        >
                          <Star size={20} fill={app.starred ? "currentColor" : "none"} />
                        </button>
                        <div>
                          <h3 className="text-lg font-semibold text-[#F7F9FF] flex items-center gap-2">
                            <School size={20} className="text-[#4A5EE7]" />
                            {app.schoolName}
                          </h3>
                          <p className="text-[#BFC9DB] text-sm">
                            Submitted on {new Date(app.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-[#4A5EE7]" />
                          <div>
                            <p className="text-[#F7F9FF] font-medium">{app.coordinatorName}</p>
                            <p className="text-[#BFC9DB] text-sm">Coordinator</p>
                          </div>
                        </div>
                        
                          <div className="flex items-center gap-2">
                            <Mail size={16} className="text-[#4A5EE7]" />
                            <div>
                              <button
                                onClick={() => { navigator.clipboard.writeText(app.coordinatorEmail); alert('Email copied to clipboard') }}
                                className="text-[#F7F9FF] hover:text-[#4A5EE7] underline"
                              >
                                {app.coordinatorEmail}
                              </button>
                              <p className="text-[#BFC9DB] text-sm">Click to copy email</p>
                            </div>
                          </div>

                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-[#4A5EE7]" />
                          <div>
                            <a 
                              href={`https://wa.me/${app.phone.replace(/\D/g, '')}?text=Hello! I'm contacting you regarding your workshop request for ${app.schoolName}.`}
                              className="text-[#F7F9FF] hover:text-green-400 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {app.phone}
                            </a>
                            <p className="text-[#BFC9DB] text-sm">Phone (click to open WhatsApp)</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-[#4A5EE7]" />
                          <div>
                            <p className="text-[#F7F9FF] font-medium">{app.numStudents}</p>
                            <p className="text-[#BFC9DB] text-sm">Students</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-[#4A5EE7]" />
                          <div>
                            <p className="text-[#F7F9FF]">{app.preferredDates.length} dates</p>
                            <p className="text-[#BFC9DB] text-sm">Preferred Dates</p>
                          </div>
                        </div>

                        {app.comments && (
                          <div className="flex items-start gap-2">
                            <MessageCircle size={16} className="text-[#4A5EE7] mt-1" />
                            <div>
                              <p className="text-[#F7F9FF] text-sm">{app.comments}</p>
                              <p className="text-[#BFC9DB] text-sm">Comments</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Preferred Dates */}
                      {app.preferredDates && app.preferredDates.length > 0 && (
                        <div>
                          <p className="text-[#BFC9DB] text-sm mb-2">Preferred Workshop Dates:</p>
                          <div className="flex flex-wrap gap-2">
                            {app.preferredDates.map((date: string, index: number) => (
                              <Badge key={index} className="bg-[#4A5EE7]/20 text-[#4A5EE7] border-[#4A5EE7]/20">
                                {date}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quick Contact Actions */}
                      <div className="flex gap-2 pt-4">
                        <Button 
                          onClick={() => { navigator.clipboard.writeText(app.coordinatorEmail); alert('Email copied to clipboard') }}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Mail size={16} className="mr-2" />
                          Copy Email
                        </Button>
                        <Button 
                          onClick={() => window.open(`https://wa.me/${app.phone.replace(/\D/g, '')}?text=Hello! I'm contacting you regarding your workshop request for ${app.schoolName}.`, '_blank')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Phone size={16} className="mr-2" />
                          WhatsApp
                        </Button>
                        <Button
                          onClick={async () => {
                            const ok = confirm(`Delete workshop request from ${app.schoolName}? This action cannot be undone.`)
                            if (!ok) return
                            try {
                              const res = await fetch(`/api/admin/school-applications/${app.id}`, { method: 'DELETE' })
                              if (!res.ok) {
                                const errorData = await res.json()
                                throw new Error(errorData.error || 'Failed to delete')
                              }
                              await fetchSchoolApplications()
                              alert('School application deleted successfully!')
                            } catch (e) {
                              console.error('Error deleting school application:', e)
                              alert(`Error deleting school application: ${e instanceof Error ? e.message : 'Unknown error'}`)
                            }
                          }}
                          variant="outline"
                          className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <Trash2 size={16} className="mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}