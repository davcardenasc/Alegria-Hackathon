import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Check if announcement date has passed (September 28th, 2025)
    const announcementDate = new Date("2025-09-28T00:00:00.000Z")
    const now = new Date()
    
    if (now < announcementDate) {
      // Return empty array if announcement date hasn't passed
      return NextResponse.json([])
    }

    // Fetch accepted applications
    const acceptedApplications = await prisma.application.findMany({
      where: {
        status: "ACCEPTED"
      },
      select: {
        id: true,
        teamName: true,
        school: true,
        participantsCount: true,
        reviewedAt: true
      },
      orderBy: {
        reviewedAt: "asc"
      }
    })

    // Format the data for the public results page
    const acceptedTeams = acceptedApplications.map(app => ({
      id: app.id,
      teamName: app.teamName,
      school: app.school,
      participantsCount: app.participantsCount,
      acceptedAt: app.reviewedAt || new Date().toISOString()
    }))

    return NextResponse.json(acceptedTeams)
  } catch (error) {
    console.error("Error fetching accepted teams:", error)
    return NextResponse.json([], { status: 200 })
  }
}