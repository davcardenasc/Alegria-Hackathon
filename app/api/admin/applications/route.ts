import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    console.log("API: Requested status filter:", status)

    let whereClause = {}
    if (status && ['PENDING', 'ACCEPTED', 'REJECTED'].includes(status)) {
      whereClause = { status: status }
    }
    
    console.log("API: Where clause:", whereClause)

    const applications = await prisma.application.findMany({
      where: whereClause,
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
        participants: true,
        experienceText: true,
        motivationText: true,
        ideasText: true,
        idDocumentUrl: true,
      }
    })

    console.log("API: Found applications:", applications.length)
    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}