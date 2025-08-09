import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const schoolApplication = await prisma.schoolApplication.findUnique({
      where: { id: params.id },
      include: {
        reviewer: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    if (!schoolApplication) {
      return NextResponse.json({ error: "School application not found" }, { status: 404 })
    }

    // Parse preferred dates JSON
    const preferredDates = JSON.parse(schoolApplication.preferredDates)

    return NextResponse.json({
      ...schoolApplication,
      preferredDates
    })
  } catch (error) {
    console.error("Error fetching school application:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if school application exists
    const schoolApplication = await prisma.schoolApplication.findUnique({
      where: { id: params.id },
    })

    if (!schoolApplication) {
      return NextResponse.json({ error: "School application not found" }, { status: 404 })
    }

    // Delete the school application
    await prisma.schoolApplication.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ 
      success: true,
      message: "School application deleted successfully" 
    })
  } catch (error) {
    console.error("Error deleting school application:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
