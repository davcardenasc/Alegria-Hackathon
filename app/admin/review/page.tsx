"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  ArrowLeft, 
  Star, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  School, 
  Mail,
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
}

export default function ReviewPendingApplications() {
  const [applications, setApplications] = useState<Application[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchPendingApplications()
  }, [])

  const fetchPendingApplications = async () => {
    try {
      // Fetch all applications and filter client-side to avoid database enum issues
      const response = await fetch("/api/admin/applications")
      if (response.ok) {
        const data = await response.json()
        // Filter pending applications client-side
        const pendingApps = data.filter((app: any) => app.status === "PENDING")
        // Parse participants for each application
        const parsedData = pendingApps.map((app: any) => ({
          ...app,
          participants: JSON.parse(app.participants)
        }))
        setApplications(parsedData)
      }
    } catch (error) {
      console.error("Error fetching pending applications:", error)
    } finally {
      setLoading(false)
    }
  }

  const currentApplication = applications[currentIndex]

  const nextApplication = () => {
    if (currentIndex < applications.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const previousApplication = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const toggleStar = async () => {
    if (!currentApplication) return
    
    try {
      const response = await fetch(`/api/admin/applications/${currentApplication.id}/star`, {
        method: "POST",
      })
      
      if (response.ok) {
        const data = await response.json()
        const updatedApplications = [...applications]
        updatedApplications[currentIndex] = { ...currentApplication, starred: data.starred }
        setApplications(updatedApplications)
      }
    } catch (error) {
      console.error("Error toggling star:", error)
    }
  }

  const updateApplicationStatus = async (status: "ACCEPTED" | "REJECTED") => {
    if (!currentApplication) return
    
    setActionLoading(true)
    try {
      const response = await fetch(`/api/admin/applications/${currentApplication.id}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })
      
      if (response.ok) {
        // Remove this application from the pending list
        const updatedApplications = applications.filter((_, index) => index !== currentIndex)
        setApplications(updatedApplications)
        
        // Adjust current index if needed
        if (currentIndex >= updatedApplications.length && updatedApplications.length > 0) {
          setCurrentIndex(updatedApplications.length - 1)
        }
        
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#00162D] text-white flex items-center justify-center">
        <div>Loading pending applications...</div>
      </div>
    )
  }

  if (applications.length === 0) {
    return (
      <div className="min-h-screen bg-[#00162D] text-white py-20">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-[#4A5EE7] hover:text-[#F7F9FF] mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>

          <div className="bg-[#4A5EE7]/10 border border-[#4A5EE7]/30 rounded-lg p-8">
            <FileText className="mx-auto mb-4 text-[#4A5EE7]" size={64} />
            <h1 className="text-3xl font-bold text-[#F7F9FF] mb-4">No Pending Applications</h1>
            <p className="text-[#BFC9DB] text-lg">
              Great job! All applications have been reviewed.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#00162D] text-white py-8">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-[#4A5EE7] hover:text-[#F7F9FF] transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#F7F9FF]">Review Pending Applications</h1>
              <p className="text-[#BFC9DB]">
                {currentIndex + 1} of {applications.length} pending applications
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={previousApplication}
              disabled={currentIndex === 0}
              variant="outline"
              className="border-[#4A5EE7]/20 text-[#BFC9DB] hover:bg-[#4A5EE7]/10"
            >
              <ChevronLeft size={16} className="mr-2" />
              Previous
            </Button>
            <Button
              onClick={nextApplication}
              disabled={currentIndex === applications.length - 1}
              variant="outline" 
              className="border-[#4A5EE7]/20 text-[#BFC9DB] hover:bg-[#4A5EE7]/10"
            >
              Next
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>

        {currentApplication && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Team Info */}
              <Card className="bg-[#00162D] border-[#4A5EE7]/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#F7F9FF] flex items-center gap-2">
                      <Users size={20} className="text-[#4A5EE7]" />
                      {currentApplication.teamName}
                    </CardTitle>
                    <Button
                      onClick={toggleStar}
                      variant="ghost"
                      size="sm"
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      <Star size={20} fill={currentApplication.starred ? "currentColor" : "none"} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-[#BFC9DB] mb-1">Participants ({currentApplication.participantsCount})</p>
                    <ul className="text-[#F7F9FF] space-y-1">
                      {currentApplication.participants.map((participant, index) => (
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
                      <p className="text-[#F7F9FF]">{currentApplication.school}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#BFC9DB] mb-1">Grade/Year</p>
                      <p className="text-[#F7F9FF]">{currentApplication.gradeOrYear}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-[#BFC9DB] mb-1">Contact Email</p>
                    <p className="text-[#F7F9FF]">{currentApplication.contactEmail}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Experience */}
              {currentApplication.experienceText && (
                <Card className="bg-[#00162D] border-[#4A5EE7]/20">
                  <CardHeader>
                    <CardTitle className="text-[#F7F9FF] flex items-center gap-2">
                      <Award size={20} className="text-[#4A5EE7]" />
                      Previous Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#F7F9FF] leading-relaxed whitespace-pre-wrap">
                      {currentApplication.experienceText}
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
                    {currentApplication.motivationText}
                  </p>
                </CardContent>
              </Card>

              {/* Ideas */}
              {currentApplication.ideasText && (
                <Card className="bg-[#00162D] border-[#4A5EE7]/20">
                  <CardHeader>
                    <CardTitle className="text-[#F7F9FF] flex items-center gap-2">
                      <Lightbulb size={20} className="text-[#4A5EE7]" />
                      Preliminary Ideas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#F7F9FF] leading-relaxed whitespace-pre-wrap">
                      {currentApplication.ideasText}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="bg-[#00162D] border-[#4A5EE7]/20">
                <CardHeader>
                  <CardTitle className="text-[#F7F9FF]">Quick Actions</CardTitle>
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
                          This will send an acceptance email to {currentApplication.contactEmail} and remove this application from the pending queue.
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
                          This will send a rejection email to {currentApplication.contactEmail} and remove this application from the pending queue.
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

              {/* Application Details */}
              <Card className="bg-[#00162D] border-[#4A5EE7]/20">
                <CardHeader>
                  <CardTitle className="text-[#F7F9FF]">Application Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-[#BFC9DB] mb-1">Submitted</p>
                    <p className="text-[#F7F9FF] text-sm">
                      {new Date(currentApplication.submittedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long", 
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>
                  </div>

                  {currentApplication.idDocumentUrl && (
                    <div>
                      <p className="text-sm text-[#BFC9DB] mb-1">ID Document</p>
                      <div className="space-y-1">
                        <p className="text-[#F7F9FF] text-xs font-mono break-all">{currentApplication.idDocumentUrl}</p>
                        {(() => {
                          const url = currentApplication.idDocumentUrl
                          // Handle different URL formats
                          if (url.startsWith('http://') || url.startsWith('https://')) {
                            return (
                              <a 
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#4A5EE7] text-sm hover:text-[#F7F9FF] underline inline-block"
                              >
                                View Document ↗
                              </a>
                            )
                          } else if (url.startsWith('/') || url.includes('.')) {
                            // Likely a relative path or filename - try to construct full URL
                            const fullUrl = url.startsWith('/') ? `https://alegria-hackathon.com${url}` : url
                            return (
                              <div className="space-y-1">
                                <a 
                                  href={fullUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#4A5EE7] text-sm hover:text-[#F7F9FF] underline inline-block"
                                >
                                  View Document (constructed URL) ↗
                                </a>
                                <p className="text-yellow-300 text-xs">Constructed URL: {fullUrl}</p>
                              </div>
                            )
                          } else {
                            return <p className="text-red-300 text-xs">Invalid document URL format</p>
                          }
                        })()}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-[#BFC9DB] mb-1">Progress</p>
                    <div className="bg-[#4A5EE7]/20 rounded-full h-2 mb-2">
                      <div 
                        className="bg-[#4A5EE7] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentIndex + 1) / applications.length) * 100}%` }}
                      />
                    </div>
                    <p className="text-[#BFC9DB] text-xs">
                      {currentIndex + 1} of {applications.length} reviewed
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}