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
        school: true,
        gradeOrYear: true,
        submittedAt: true,
        status: true,
        starred: true,
        participantsCount: true,
        contactEmail: true,
      }
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}