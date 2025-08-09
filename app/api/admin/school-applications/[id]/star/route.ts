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

    const schoolApplicationId = params.id

    // Get current starred status
    const currentApplication = await prisma.schoolApplication.findUnique({
      where: { id: schoolApplicationId },
      select: { starred: true }
    })

    if (!currentApplication) {
      return NextResponse.json({ error: "School application not found" }, { status: 404 })
    }

    // Toggle starred status
    const updatedApplication = await prisma.schoolApplication.update({
      where: { id: schoolApplicationId },
      data: {
        starred: !currentApplication.starred
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