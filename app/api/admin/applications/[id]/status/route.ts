import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

/**
 * Valid application status values
 */
type ApplicationStatus = 'ACCEPTED' | 'REJECTED' | 'PENDING'

/**
 * Request body interface for status update
 */
interface StatusUpdateRequest {
  status: ApplicationStatus
}

/**
 * Updates the status of a hackathon application
 * 
 * This endpoint allows administrators to:
 * - Accept, reject, or reset applications to pending
 * - Track who reviewed the application and when
 * - Maintain audit trail of status changes
 * 
 * Security: Requires authentication and ADMINISTRATOR role
 * 
 * @param request - Next.js request containing new status
 * @param params - URL parameters containing application ID
 * @returns JSON response with updated application status
 * 
 * @example
 * POST /api/admin/applications/abc123/status
 * Content-Type: application/json
 * Authorization: Bearer <admin-session-token>
 * 
 * {
 *   "status": "ACCEPTED"
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
    
    // Check authorization - only administrators can update status
    if (!user || user.role !== 'ADMINISTRATOR') {
      return NextResponse.json(
        { error: "Administrator access required" }, 
        { status: 403 }
      )
    }

    // Parse and validate request body
    const { status }: StatusUpdateRequest = await request.json()
    const applicationId = params.id

    // Validate application ID format
    if (!applicationId || typeof applicationId !== 'string') {
      return NextResponse.json(
        { error: "Valid application ID required" }, 
        { status: 400 }
      )
    }

    // Validate status value
    const validStatuses: ApplicationStatus[] = ['ACCEPTED', 'REJECTED', 'PENDING']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` }, 
        { status: 400 }
      )
    }

    // Get application details
    const application = await prisma.application.findUnique({
      where: { id: applicationId }
    })

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Update application status with audit information
    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status,
        reviewedAt: new Date(),
        reviewedBy: user.id, // Reference to the admin who made the change
      }
    })

    return NextResponse.json({
      success: true,
      status: updatedApplication.status,
      reviewedAt: updatedApplication.reviewedAt,
      message: `Application status updated to ${status.toLowerCase()}`
    })

  } catch (error) {
    // Log detailed error in development only
    if (process.env.NODE_ENV === 'development') {
      console.error("Error updating application status:", error)
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