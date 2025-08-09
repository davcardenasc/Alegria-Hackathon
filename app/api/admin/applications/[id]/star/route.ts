import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

/**
 * Toggles the starred status of a hackathon application
 * 
 * This endpoint allows administrators to:
 * - Mark applications as starred for priority review
 * - Remove starred status from applications
 * - Help organize applications by importance
 * 
 * Security: Requires authentication and ADMINISTRATOR role
 * 
 * @param request - Next.js request object
 * @param params - URL parameters containing application ID
 * @returns JSON response with new starred status
 * 
 * @example
 * POST /api/admin/applications/abc123/star
 * Authorization: Bearer <admin-session-token>
 * 
 * Response:
 * {
 *   "starred": true
 * }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    
    // Check authentication
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required" }, 
        { status: 401 }
      )
    }
    
    // Get user from database to check role
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! }
    })
    
    // Check authorization - only administrators can star applications
    if (!user || user.role !== 'ADMINISTRATOR') {
      return NextResponse.json(
        { error: "Administrator access required" }, 
        { status: 403 }
      )
    }

    const applicationId = params.id
    
    // Validate application ID format
    if (!applicationId || typeof applicationId !== 'string') {
      return NextResponse.json(
        { error: "Valid application ID required" }, 
        { status: 400 }
      )
    }

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
    // Log detailed error in development only
    if (process.env.NODE_ENV === 'development') {
      console.error("Error toggling application star status:", error)
    }
    
    // Check if it's a Prisma error (application not found)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}