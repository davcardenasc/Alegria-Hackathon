import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const applicationId = params.id

    // Get current starred status
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      select: { starred: true }
    })

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Toggle starred status
    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: {
        starred: !application.starred
      }
    })

    return NextResponse.json({ starred: updatedApplication.starred })
  } catch (error) {
    console.error("Error toggling star:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}