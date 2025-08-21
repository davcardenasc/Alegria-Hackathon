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
        schoolName: true,
        coordinatorName: true,
        coordinatorEmail: true,
        phone: true,
        numStudents: true,
        preferredDates: true,
        comments: true,
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
      "School Name", 
      "Coordinator Name",
      "Coordinator Email",
      "Phone",
      "Number of Students",
      "Preferred Dates",
      "Comments",
      "Starred",
      "Submitted At",
      "Reviewed At",
      "Reviewed By"
    ]

    const csvRows = applications.map(app => {
      const preferredDates = JSON.parse(app.preferredDates).join("; ")
      
      return [
        app.id,
        `"${app.schoolName}"`,
        `"${app.coordinatorName}"`,
        app.coordinatorEmail,
        `"${app.phone}"`,
        app.numStudents,
        `"${preferredDates}"`,
        `"${(app.comments || "").replace(/"/g, '""')}"`,
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
        "Content-Disposition": `attachment; filename="school-applications-${new Date().toISOString().split('T')[0]}.csv"`
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