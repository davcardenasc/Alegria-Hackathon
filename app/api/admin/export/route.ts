import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const applications = await prisma.application.findMany({
      orderBy: {
        submittedAt: 'desc'
      },
      select: {
        id: true,
        teamName: true,
        participantsCount: true,
        participants: true,
        school: true,
        gradeOrYear: true,
        contactEmail: true,
        experienceText: true,
        motivationText: true,
        ideasText: true,
        status: true,
        starred: true,
        submittedAt: true,
        reviewedAt: true,
        reviewer: {
          select: {
            name: true
          }
        }
      }
    })

    // Convert to CSV format
    const csvHeaders = [
      "ID",
      "Team Name", 
      "Participants Count",
      "Participants",
      "School",
      "Grade/Year",
      "Contact Email",
      "Experience",
      "Motivation",
      "Ideas",
      "Status",
      "Starred",
      "Submitted At",
      "Reviewed At",
      "Reviewed By"
    ]

    const csvRows = applications.map(app => {
      const participants = JSON.parse(app.participants).join("; ")
      
      return [
        app.id,
        `"${app.teamName}"`,
        app.participantsCount,
        `"${participants}"`,
        `"${app.school}"`,
        `"${app.gradeOrYear}"`,
        app.contactEmail,
        `"${(app.experienceText || "").replace(/"/g, '""')}"`,
        `"${app.motivationText.replace(/"/g, '""')}"`,
        `"${(app.ideasText || "").replace(/"/g, '""')}"`,
        app.status,
        app.starred,
        app.submittedAt.toISOString(),
        app.reviewedAt?.toISOString() || "",
        `"${app.reviewer?.name || ""}"`
      ].join(",")
    })

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n")

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="hackathon-applications-${new Date().toISOString().split('T')[0]}.csv"`
      }
    })

  } catch (error) {
    console.error("Error exporting applications:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}