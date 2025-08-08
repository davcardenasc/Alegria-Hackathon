import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"

const resend = new Resend("re_jo94ZKQX_2aFDDKvNwSNYYQC3qBnsJsn5")

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("Status update request received for ID:", params.id)
    const session = await getServerSession()
    
    if (!session) {
      console.log("No session found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { status } = await request.json()
    const applicationId = params.id
    console.log("Requested status:", status, "for application:", applicationId)

    if (!["ACCEPTED", "REJECTED"].includes(status)) {
      console.log("Invalid status provided:", status)
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    // Get application details
    const application = await prisma.application.findUnique({
      where: { id: applicationId }
    })

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Get email template
    const templateType = status === "ACCEPTED" ? "ACCEPTANCE" : "REJECTION"
    console.log("Looking for email template type:", templateType)
    
    // Skip email template lookup for now and just update status
    // const template = await prisma.emailTemplate.findFirst({
    //   where: { 
    //     type: templateType,
    //     isActive: true
    //   }
    // })

    // if (!template) {
    //   return NextResponse.json({ error: "Email template not found" }, { status: 500 })
    // }

    // For now, skip email sending and just update the status
    console.log("Skipping email for now - will just update status")

    // TODO: Fix enum casting issues and re-enable email functionality
    // Temporarily disabled to fix accept/reject functionality

    // Update application status
    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
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
    console.error("Error updating application status:", error)
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}