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

    let whereClause = {}
    if (status && ['PENDING', 'ACCEPTED', 'REJECTED'].includes(status)) {
      whereClause = { status: status }
    }

    const schoolApplications = await prisma.schoolApplication.findMany({
      where: whereClause,
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
        status: true,
        starred: true,
        submittedAt: true,
        reviewedAt: true,
        reviewedBy: true,
      }
    })

    return NextResponse.json(schoolApplications)
  } catch (error) {
    console.error("Error fetching school applications:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}