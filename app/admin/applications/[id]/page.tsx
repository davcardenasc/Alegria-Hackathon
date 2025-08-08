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
  Award
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

  const updateApplicationStatus = async (status: "ACCEPTED" | "REJECTED") => {
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
        alert(`Application ${status.toLowerCase()} successfully! Email sent to team.`)
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
            {application.status === "PENDING" && (
              <Card className="bg-[#00162D] border-[#4A5EE7]/20">
                <CardHeader>
                  <CardTitle className="text-[#F7F9FF]">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        disabled={actionLoading}
                      >
                        <Check size={16} className="mr-2" />
                        Accept Application
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#00162D] border-[#4A5EE7]/20 text-white">
                      <DialogHeader>
                        <DialogTitle>Accept Application</DialogTitle>
                        <DialogDescription className="text-[#BFC9DB]">
                          This will send an acceptance email to {application.contactEmail} and mark the application as accepted.
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

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        disabled={actionLoading}
                      >
                        <X size={16} className="mr-2" />
                        Reject Application
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#00162D] border-[#4A5EE7]/20 text-white">
                      <DialogHeader>
                        <DialogTitle>Reject Application</DialogTitle>
                        <DialogDescription className="text-[#BFC9DB]">
                          This will send a rejection email to {application.contactEmail} and mark the application as rejected.
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
                </CardContent>
              </Card>
            )}

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
                    <div className="space-y-1">
                      <p className="text-[#F7F9FF] text-xs font-mono break-all">{application.idDocumentUrl}</p>
                      {application.idDocumentUrl.startsWith('http') ? (
                        <a 
                          href={application.idDocumentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#4A5EE7] text-sm hover:text-[#F7F9FF] underline inline-block"
                        >
                          View Document ↗
                        </a>
                      ) : (
                        <p className="text-yellow-300 text-xs">Invalid document URL</p>
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