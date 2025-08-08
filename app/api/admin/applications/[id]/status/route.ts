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

    // Get email template - using the same enum casting fix as before
    const templateType = status === "ACCEPTED" ? "ACCEPTANCE" : "REJECTION"
    console.log("Looking for email template type:", templateType)
    
    const template = await prisma.emailTemplate.findFirst({
      where: { 
        type: templateType as any, // Cast to any to avoid enum issues
        isActive: true
      }
    })

    if (!template) {
      console.log("No email template found for type:", templateType)
      return NextResponse.json({ error: "Email template not found" }, { status: 500 })
    }

    console.log("Found email template:", template.subject)

    // Replace placeholders in email template
    const emailSubject = template.subject.replace(/\{\{teamName\}\}/g, application.teamName)
    const emailBody = template.body.replace(/\{\{teamName\}\}/g, application.teamName)
                                   .replace(/\{\{contactEmail\}\}/g, application.contactEmail)
                                   .replace(/\{\{school\}\}/g, application.school)

    // Send email
    try {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: "AlegrIA Hackathon <onboarding@resend.dev>",
        to: [application.contactEmail],
        subject: emailSubject,
        html: emailBody,
      })

      if (emailError) {
        console.error("Email sending error:", emailError)
      } else {
        console.log("Email sent successfully:", emailData?.id)
      }

      // Log email attempt
      await prisma.emailLog.create({
        data: {
          applicationId: application.id,
          type: templateType as any, // Cast to avoid enum issues
          recipientEmail: application.contactEmail,
          subject: emailSubject,
          status: emailError ? "FAILED" : "SENT",
          errorMessage: emailError?.message || null
        }
      })

    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      // Continue with status update even if email fails
    }

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