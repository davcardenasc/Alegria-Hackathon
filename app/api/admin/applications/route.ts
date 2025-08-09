import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { ApplicationStatus } from "@prisma/client"
import { createErrorResponse, createSuccessResponse, withErrorHandler, AuthenticationError, AuthorizationError, DatabaseError } from "@/lib/error-handling"

/**
 * GET /api/admin/applications - Fetch hackathon applications with filtering and pagination
 * 
 * Query Parameters:
 * - status: Filter by application status (PENDING, ACCEPTED, REJECTED)
 * - page: Page number for pagination (default: 1)
 * - limit: Number of results per page (default: 20, max: 100)
 * - starred: Filter by starred status (true/false)
 * 
 * Performance Optimizations:
 * - Pagination to limit result sets
 * - Selective field querying to reduce data transfer
 * - Database indexes on frequently queried fields
 * - Proper error handling with development vs production logging
 * 
 * Security:
 * - Requires authentication and ADMINISTRATOR role
 * - Input validation on all query parameters
 * 
 * @param request - Next.js request object with query parameters
 * @returns JSON array of applications with metadata
 */
const applicationsHandler = async (request: NextRequest) => {
  const session = await getServerSession()
  
  // Check authentication
  if (!session || !session.user) {
    throw new AuthenticationError()
  }

  // Get user from database to check role
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: { role: true }
  })

  // Check authorization - only administrators can access applications
  if (!user || user.role !== 'ADMINISTRATOR') {
    throw new AuthorizationError("Administrator access required")
  }

  const { searchParams } = new URL(request.url)
  
  // Parse and validate query parameters
  const status = searchParams.get('status')
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')))
  const starred = searchParams.get('starred')
    
  // Build optimized where clause
  const whereClause: any = {}
  
  if (status && ['PENDING', 'ACCEPTED', 'REJECTED'].includes(status)) {
    whereClause.status = status as ApplicationStatus
  }
  
  if (starred !== null && (starred === 'true' || starred === 'false')) {
    whereClause.starred = starred === 'true'
  }

  // Calculate pagination offset
  const skip = (page - 1) * limit

  // Optimized query with pagination and selective fields
  let applications, totalCount
  try {
    [applications, totalCount] = await Promise.all([
      prisma.application.findMany({
        where: whereClause,
        orderBy: [
          { starred: 'desc' }, // Starred first
          { submittedAt: 'desc' }
        ],
        skip,
        take: limit,
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
          reviewedAt: true,
          reviewedBy: true,
          reviewer: {
            select: {
              name: true,
              email: true
            }
          }
        }
      }),
      prisma.application.count({ where: whereClause })
    ])
  } catch (dbError) {
    throw new DatabaseError(
      "Error al obtener las aplicaciones de la base de datos",
      dbError as Error
    )
  }

  // Process participants JSON safely
  const processedApplications = applications.map(app => {
    try {
      return {
        ...app,
        participants: JSON.parse(app.participants)
      }
    } catch (parseError) {
      // Handle malformed JSON gracefully - don't throw error, just log
      console.warn(`Failed to parse participants for application ${app.id}:`, parseError)
      return {
        ...app,
        participants: []
      }
    }
  })

  // Calculate pagination metadata
  const totalPages = Math.ceil(totalCount / limit)
  const hasNext = page < totalPages
  const hasPrev = page > 1

  return createSuccessResponse({
    data: processedApplications,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages,
      hasNext,
      hasPrev
    }
  })
}

export const GET = withErrorHandler(applicationsHandler)