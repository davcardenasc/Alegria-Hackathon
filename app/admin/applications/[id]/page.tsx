"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  ArrowLeft, 
  Star, 
  Check, 
  X, 
  Mail, 
  Users, 
  School, 
  Calendar, 
  FileText, 
  MessageCircle,
  Lightbulb,
  Award,
  Trash2,
  RotateCcw
} from "lucide-react"
import Link from "next/link"

interface Application {
  id: string
  teamName: string
  participantsCount: number
  participants: string[]
  school: string
  gradeOrYear: string
  contactEmail: string
  idDocumentUrl?: string
  experienceText?: string
  motivationText: string
  ideasText?: string
  status: "PENDING" | "ACCEPTED" | "REJECTED"
  starred: boolean
  submittedAt: string
  reviewedBy?: string
  reviewedAt?: string
}

export default function ApplicationDetail() {
  const params = useParams()
  const router = useRouter()
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchApplication(params.id as string)
    }
  }, [params.id])

  const fetchApplication = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/applications/${id}`)
      if (response.ok) {
        const data = await response.json()
        setApplication(data)
      }
    } catch (error) {
      console.error("Error fetching application:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleStar = async () => {
    if (!application) return
    
    try {
      const response = await fetch(`/api/admin/applications/${application.id}/star`, {
        method: "POST",
      })
      
      if (response.ok) {
        const data = await response.json()
        setApplication({ ...application, starred: data.starred })
      }
    } catch (error) {
      console.error("Error toggling star:", error)
    }
  }

  const updateApplicationStatus = async (status: "ACCEPTED" | "REJECTED" | "PENDING") => {
    if (!application) return
    
    setActionLoading(true)
    try {
      const response = await fetch(`/api/admin/applications/${application.id}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setApplication({ ...application, status: data.status, reviewedAt: data.reviewedAt })
        // Show success message
        alert(`Application ${status.toLowerCase()} successfully! Status updated.`)
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Error updating status:", error)
      alert("Error updating application status")
    } finally {
      setActionLoading(false)
    }
  }

  const deleteApplication = async () => {
    if (!application) return
    
    const confirmed = confirm(`Are you sure you want to delete the application from team "${application.teamName}"? This action cannot be undone.`)
    if (!confirmed) return
    
    setActionLoading(true)
    try {
      const response = await fetch(`/api/admin/applications/${application.id}`, {
        method: "DELETE",
      })
      
      if (response.ok) {
        alert("Application deleted successfully!")
        router.push("/admin")
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Error deleting application:", error)
      alert("Error deleting application")
    } finally {
      setActionLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
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
        <div>Loading application...</div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-[#00162D] text-white flex items-center justify-center">
        <div>Application not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#00162D] text-white">
      {/* Header */}
      <header className="border-b border-[#4A5EE7]/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin"
              className="flex items-center gap-2 text-[#4A5EE7] hover:text-[#F7F9FF] transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </Link>
            <Separator orientation="vertical" className="h-6 bg-[#4A5EE7]/20" />
            <div>
              <h1 className="text-2xl font-bold text-[#F7F9FF]">{application.teamName}</h1>
              <p className="text-[#BFC9DB]">Application Details</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getStatusBadge(application.status)}
            <Button
              onClick={toggleStar}
              variant="ghost"
              size="sm"
              className="text-yellow-400 hover:text-yellow-300"
            >
              <Star size={20} fill={application.starred ? "currentColor" : "none"} />
              {application.starred ? "Starred" : "Star"}
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Team Info */}
            <Card className="bg-[#00162D] border-[#4A5EE7]/20">
              <CardHeader>
                <CardTitle className="text-[#F7F9FF] flex items-center gap-2">
                  <Users size={20} className="text-[#4A5EE7]" />
                  Team Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-[#BFC9DB] mb-1">Team Name</p>
                  <p className="text-[#F7F9FF] font-medium">{application.teamName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-[#BFC9DB] mb-1">Participants ({application.participantsCount})</p>
                  <ul className="text-[#F7F9FF] space-y-1">
                    {application.participants.map((participant, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#4A5EE7] rounded-full" />
                        {participant}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#BFC9DB] mb-1">School/University</p>
                    <p className="text-[#F7F9FF]">{application.school}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#BFC9DB] mb-1">Grade/Year</p>
                    <p className="text-[#F7F9FF]">{application.gradeOrYear}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-[#BFC9DB] mb-1">Contact Email</p>
                  <p className="text-[#F7F9FF]">{application.contactEmail}</p>
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            {application.experienceText && (
              <Card className="bg-[#00162D] border-[#4A5EE7]/20">
                <CardHeader>
                  <CardTitle className="text-[#F7F9FF] flex items-center gap-2">
                    <Award size={20} className="text-[#4A5EE7]" />
                    Previous Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#F7F9FF] leading-relaxed whitespace-pre-wrap">
                    {application.experienceText}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Motivation */}
            <Card className="bg-[#00162D] border-[#4A5EE7]/20">
              <CardHeader>
                <CardTitle className="text-[#F7F9FF] flex items-center gap-2">
                  <MessageCircle size={20} className="text-[#4A5EE7]" />
                  Motivation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#F7F9FF] leading-relaxed whitespace-pre-wrap">
                  {application.motivationText}
                </p>
              </CardContent>
            </Card>

            {/* Ideas */}
            {application.ideasText && (
              <Card className="bg-[#00162D] border-[#4A5EE7]/20">
                <CardHeader>
                  <CardTitle className="text-[#F7F9FF] flex items-center gap-2">
                    <Lightbulb size={20} className="text-[#4A5EE7]" />
                    Preliminary Ideas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#F7F9FF] leading-relaxed whitespace-pre-wrap">
                    {application.ideasText}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card className="bg-[#00162D] border-[#4A5EE7]/20">
              <CardHeader>
                <CardTitle className="text-[#F7F9FF]">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Status Change Buttons */}
                {application.status !== "ACCEPTED" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        disabled={actionLoading}
                      >
                        <Check size={16} className="mr-2" />
                        {application.status === "REJECTED" ? "Change to Accepted" : "Accept Application"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#00162D] border-[#4A5EE7]/20 text-white">
                      <DialogHeader>
                        <DialogTitle>Accept Application</DialogTitle>
                        <DialogDescription className="text-[#BFC9DB]">
                          This will mark the application as accepted and it will appear on the results preview page.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button 
                          onClick={() => updateApplicationStatus("ACCEPTED")}
                          className="bg-green-600 hover:bg-green-700 text-white"
                          disabled={actionLoading}
                        >
                          {actionLoading ? "Processing..." : "Confirm Accept"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}

                {application.status !== "REJECTED" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        disabled={actionLoading}
                      >
                        <X size={16} className="mr-2" />
                        {application.status === "ACCEPTED" ? "Change to Rejected" : "Reject Application"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#00162D] border-[#4A5EE7]/20 text-white">
                      <DialogHeader>
                        <DialogTitle>Reject Application</DialogTitle>
                        <DialogDescription className="text-[#BFC9DB]">
                          This will mark the application as rejected and remove it from the results preview page.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button 
                          onClick={() => updateApplicationStatus("REJECTED")}
                          variant="destructive"
                          disabled={actionLoading}
                        >
                          {actionLoading ? "Processing..." : "Confirm Reject"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}

                {application.status !== "PENDING" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                        disabled={actionLoading}
                      >
                        <RotateCcw size={16} className="mr-2" />
                        Mark as Pending
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#00162D] border-[#4A5EE7]/20 text-white">
                      <DialogHeader>
                        <DialogTitle>Mark as Pending</DialogTitle>
                        <DialogDescription className="text-[#BFC9DB]">
                          This will reset the application status to pending for further review.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button 
                          onClick={() => updateApplicationStatus("PENDING")}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white"
                          disabled={actionLoading}
                        >
                          {actionLoading ? "Processing..." : "Mark as Pending"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}

                <Separator className="bg-[#4A5EE7]/20" />

                {/* Delete Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline"
                      className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                      disabled={actionLoading}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete Application
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#00162D] border-[#4A5EE7]/20 text-white">
                    <DialogHeader>
                      <DialogTitle>Delete Application</DialogTitle>
                      <DialogDescription className="text-[#BFC9DB]">
                        Are you sure you want to permanently delete this application? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button 
                        onClick={deleteApplication}
                        variant="destructive"
                        disabled={actionLoading}
                      >
                        {actionLoading ? "Deleting..." : "Delete Permanently"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Metadata */}
            <Card className="bg-[#00162D] border-[#4A5EE7]/20">
              <CardHeader>
                <CardTitle className="text-[#F7F9FF]">Application Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-[#BFC9DB] mb-1">Submitted</p>
                  <p className="text-[#F7F9FF]">
                    {new Date(application.submittedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#BFC9DB] mb-1">Status</p>
                  <div>{getStatusBadge(application.status)}</div>
                </div>

                {application.reviewedAt && (
                  <div>
                    <p className="text-sm text-[#BFC9DB] mb-1">Reviewed</p>
                    <p className="text-[#F7F9FF] text-sm">
                      {new Date(application.reviewedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>
                  </div>
                )}

                {application.idDocumentUrl && (
                  <div>
                    <p className="text-sm text-[#BFC9DB] mb-1">ID Document</p>
                    <div className="space-y-2">
                      {(application.idDocumentUrl.startsWith('http') || application.idDocumentUrl.startsWith('/uploads/')) ? (
                        <div>
                          <a 
                            href={application.idDocumentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            📄 View Document ↗
                          </a>
                          <p className="text-[#BFC9DB] text-xs mt-1 break-all">
                            {application.idDocumentUrl.includes('blob.vercel-storage.com') ? 
                              '🌐 Stored in Vercel Blob Storage' : 
                              application.idDocumentUrl.startsWith('/uploads/') ? 
                              '📁 Stored locally' : 
                              '🔗 External URL'
                            }
                          </p>
                        </div>
                      ) : (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                          <p className="text-yellow-300 text-xs font-semibold mb-1">📂 Legacy filename:</p>
                          <p className="text-[#F7F9FF] text-xs font-mono mb-2">{application.idDocumentUrl}</p>
                          <p className="text-[#BFC9DB] text-xs">This application was submitted before cloud storage was implemented. The actual file is not available.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}