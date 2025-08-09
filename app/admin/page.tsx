"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  FileText, 
  Star, 
  Check, 
  X, 
  Search, 
  Filter, 
  Download, 
  LogOut, 
  Calendar,
  Users,
  ChartBar,
  School,
  Trophy,
  Trash2
} from "lucide-react"

interface Application {
  id: string
  teamName: string
  school: string
  gradeOrYear: string
  submittedAt: string
  status: "PENDING" | "ACCEPTED" | "REJECTED"
  starred: boolean
  participantsCount: number
  contactEmail: string
}

export default function AdminDashboard() {
  const { data: session } = useSession()
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [loading, setLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [deleting, setDeleting] = useState(false)
  const [bulkUpdating, setBulkUpdating] = useState<null | "ACCEPTED" | "PENDING">(null)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
    starred: 0
  })

  useEffect(() => {
    fetchApplications()
  }, [])

  useEffect(() => {
    filterApplications()
  }, [applications, searchTerm, statusFilter])

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/admin/applications")
      const data = await response.json()
      setApplications(data)
      
      // Calculate stats
      const stats = {
        total: data.length,
        pending: data.filter((app: Application) => app.status === "PENDING").length,
        accepted: data.filter((app: Application) => app.status === "ACCEPTED").length,
        rejected: data.filter((app: Application) => app.status === "REJECTED").length,
        starred: data.filter((app: Application) => app.starred).length,
      }
      setStats(stats)
    } catch (error) {
      console.error("Error fetching applications:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterApplications = () => {
    let filtered = applications

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.school.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== "ALL") {
      if (statusFilter === "STARRED") {
        filtered = filtered.filter(app => app.starred)
      } else {
        filtered = filtered.filter(app => app.status === statusFilter)
      }
    }

    setFilteredApplications(filtered)
  }

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectAllVisible = () => {
    setSelectedIds(new Set(filteredApplications.map(a => a.id)))
  }

  const clearSelection = () => {
    setSelectedIds(new Set())
  }

  const deleteSelected = async () => {
    if (selectedIds.size === 0) return
    const confirmed = confirm(`Delete ${selectedIds.size} selected application(s)? This cannot be undone.`)
    if (!confirmed) return
    setDeleting(true)
    try {
      for (const id of selectedIds) {
        await fetch(`/api/admin/applications/${id}`, { method: 'DELETE' })
      }
      await fetchApplications()
      clearSelection()
      alert('Selected applications deleted')
    } catch (e) {
      console.error(e)
      alert('Error deleting selected applications')
    } finally {
      setDeleting(false)
    }
  }

  const updateSelectedStatus = async (status: "ACCEPTED" | "PENDING") => {
    if (selectedIds.size === 0) return
    const label = status === "ACCEPTED" ? "accept" : "mark as pending"
    const confirmed = confirm(`${label.charAt(0).toUpperCase() + label.slice(1)} ${selectedIds.size} selected application(s)?`)
    if (!confirmed) return
    setBulkUpdating(status)
    try {
      for (const id of selectedIds) {
        await fetch(`/api/admin/applications/${id}/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        })
      }
      await fetchApplications()
      clearSelection()
      alert(`Selected applications ${label}ed`)
    } catch (e) {
      console.error(e)
      alert('Error updating selected applications')
    } finally {
      setBulkUpdating(null)
    }
  }

  const toggleStar = async (applicationId: string) => {
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}/star`, {
        method: "POST",
      })
      
      if (response.ok) {
        fetchApplications() // Refresh data
      }
    } catch (error) {
      console.error("Error toggling star:", error)
    }
  }

  const exportToCSV = async () => {
    try {
      const response = await fetch("/api/admin/export")
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = `hackathon-applications-${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error("Error exporting CSV:", error)
    }
  }

  const handleStatsCardClick = (filter: string) => {
    setStatusFilter(filter)
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      PENDING: "secondary",
      ACCEPTED: "default", 
      REJECTED: "destructive"
    } as const
    
    const colors = {
      PENDING: "bg-yellow-500/20 text-yellow-300 border-yellow-500/20",
      ACCEPTED: "bg-green-500/20 text-green-300 border-green-500/20",
      REJECTED: "bg-red-500/20 text-red-300 border-red-500/20"
    } as const

    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {status.toLowerCase()}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#00162D] text-white flex items-center justify-center">
        <div>Loading applications...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#00162D] text-white">
      {/* Header */}
      <header className="border-b border-[#4A5EE7]/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#F7F9FF]">AlegrIA Hackathon Admin</h1>
            <p className="text-[#BFC9DB]">Welcome, {session?.user?.name}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card 
            className="bg-[#00162D] border-[#4A5EE7]/20 cursor-pointer hover:border-[#4A5EE7]/40 transition-colors" 
            onClick={() => handleStatsCardClick("ALL")}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-[#4A5EE7]" />
                <div>
                  <p className="text-2xl font-bold text-[#F7F9FF]">{stats.total}</p>
                  <p className="text-sm text-[#BFC9DB]">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#00162D] border-[#4A5EE7]/20 cursor-pointer hover:border-[#4A5EE7]/40 transition-colors" 
            onClick={() => handleStatsCardClick("PENDING")}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-[#F7F9FF]">{stats.pending}</p>
                  <p className="text-sm text-[#BFC9DB]">Pending</p>
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

          <Card 
            className="bg-[#00162D] border-[#4A5EE7]/20 cursor-pointer hover:border-[#4A5EE7]/40 transition-colors" 
            onClick={() => handleStatsCardClick("ACCEPTED")}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Check size={20} className="text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-[#F7F9FF]">{stats.accepted}</p>
                  <p className="text-sm text-[#BFC9DB]">Accepted</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-[#00162D] border-[#4A5EE7]/20 cursor-pointer hover:border-[#4A5EE7]/40 transition-colors" 
            onClick={() => handleStatsCardClick("REJECTED")}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <X size={20} className="text-red-400" />
                <div>
                  <p className="text-2xl font-bold text-[#F7F9FF]">{stats.rejected}</p>
                  <p className="text-sm text-[#BFC9DB]">Rejected</p>
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
                    placeholder="Search teams or schools..."
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
                  <SelectItem value="PENDING" className="text-white hover:bg-[#4A5EE7]/20 focus:bg-[#4A5EE7]/20">Pending</SelectItem>
                  <SelectItem value="STARRED" className="text-white hover:bg-[#4A5EE7]/20 focus:bg-[#4A5EE7]/20">Starred</SelectItem>
                  <SelectItem value="ACCEPTED" className="text-white hover:bg-[#4A5EE7]/20 focus:bg-[#4A5EE7]/20">Accepted</SelectItem>
                  <SelectItem value="REJECTED" className="text-white hover:bg-[#4A5EE7]/20 focus:bg-[#4A5EE7]/20">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={() => window.location.href = '/admin/review'}
                className="bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white"
              >
                <Users size={16} className="mr-2" />
                Review Pending
              </Button>
              <Button 
                onClick={() => window.location.href = '/admin/schools'}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <School size={16} className="mr-2" />
                School Applications
              </Button>
              <Button 
                onClick={exportToCSV}
                variant="outline" 
                className="border-[#4A5EE7]/20 text-[#BFC9DB] hover:bg-[#4A5EE7]/10"
              >
                <Download size={16} className="mr-2" />
                Export CSV
              </Button>
              <Button 
                onClick={() => { window.location.href = '/admin/preview-results' }}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                <Trophy size={16} className="mr-2" />
                Preview Results
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card className="bg-[#00162D] border-[#4A5EE7]/20">
          <CardHeader>
            <CardTitle className="text-[#F7F9FF]">
              Applications ({filteredApplications.length})
            </CardTitle>
            {filteredApplications.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                <Button
                  variant="outline"
                  onClick={selectAllVisible}
                  className="border-[#4A5EE7]/20 text-[#BFC9DB] hover:bg-[#4A5EE7]/10"
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  onClick={clearSelection}
                  className="border-[#4A5EE7]/20 text-[#BFC9DB] hover:bg-[#4A5EE7]/10"
                >
                  Clear Selection
                </Button>
                <Button
                  onClick={() => updateSelectedStatus("PENDING")}
                  disabled={selectedIds.size === 0 || !!bulkUpdating}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  {bulkUpdating === 'PENDING' ? 'Marking...' : `Mark Pending (${selectedIds.size})`}
                </Button>
                <Button
                  onClick={() => updateSelectedStatus("ACCEPTED")}
                  disabled={selectedIds.size === 0 || !!bulkUpdating}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {bulkUpdating === 'ACCEPTED' ? 'Accepting...' : `Accept Selected (${selectedIds.size})`}
                </Button>
                <Button
                  onClick={deleteSelected}
                  disabled={selectedIds.size === 0 || deleting}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 size={16} className="mr-2" />
                  {deleting ? 'Deleting...' : `Delete Selected (${selectedIds.size})`}
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredApplications.length === 0 ? (
                <p className="text-[#BFC9DB] text-center py-8">No applications found</p>
              ) : (
                filteredApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center gap-4 p-4 border border-[#4A5EE7]/10 rounded-lg hover:border-[#4A5EE7]/30 transition-colors cursor-pointer"
                    onClick={() => { window.location.href = `/admin/applications/${app.id}` }}
                  >
                    <div
                      onClick={(e) => { e.stopPropagation(); toggleSelect(app.id) }}
                      className={`shrink-0 w-8 h-8 min-w-8 mr-1 md:mr-2 flex items-center justify-center rounded-md border ${selectedIds.has(app.id) ? 'border-[#4A5EE7] bg-[#4A5EE7]/20' : 'border-[#4A5EE7]/30 bg-transparent'} cursor-pointer`}
                      aria-label={`Select ${app.teamName}`}
                      role="checkbox"
                      aria-checked={selectedIds.has(app.id)}
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); toggleSelect(app.id) } }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedIds.has(app.id)}
                        readOnly
                        className="pointer-events-none accent-[#4A5EE7] w-4 h-4"
                      />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleStar(app.id)
                      }}
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      <Star size={20} fill={app.starred ? "currentColor" : "none"} />
                    </button>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="font-medium text-[#F7F9FF]">{app.teamName}</p>
                        <p className="text-sm text-[#BFC9DB]">{app.participantsCount} members</p>
                      </div>
                      <div>
                        <p className="text-[#F7F9FF]">{app.school}</p>
                        <p className="text-sm text-[#BFC9DB]">{app.gradeOrYear}</p>
                      </div>
                      <div>
                        <p className="text-[#F7F9FF]">
                          {new Date(app.submittedAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-[#BFC9DB]">{app.contactEmail}</p>
                      </div>
                      <div className="flex items-center justify-end">
                        {getStatusBadge(app.status)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}