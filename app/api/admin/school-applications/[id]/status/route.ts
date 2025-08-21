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

    const { status } = await request.json()
    const schoolApplicationId = params.id

    if (!["ACCEPTED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    // Update school application status
    const updatedApplication = await prisma.application.update({
      where: { id: schoolApplicationId },
      data: {
        status: status,
        reviewedAt: new Date(),
        reviewedBy: session.user?.id || null
      }
    })

    return NextResponse.json({
      status: updatedApplication.status,
      reviewedAt: updatedApplication.reviewedAt
    })

  } catch (error) {
    console.error("Error updating school application status:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}