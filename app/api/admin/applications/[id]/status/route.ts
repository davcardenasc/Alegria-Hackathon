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

    // Get email template using raw SQL to avoid enum casting issues
    const templateType = status === "ACCEPTED" ? "ACCEPTANCE" : "REJECTION"
    console.log("Looking for email template type:", templateType)
    
    const templates = await prisma.$queryRaw`
      SELECT * FROM email_templates 
      WHERE type = ${templateType} AND "isActive" = true 
      LIMIT 1
    ` as any[]
    
    const template = templates.length > 0 ? templates[0] : null
    let emailSubject, emailBody

    if (!template) {
      console.log("No email template found for type:", templateType, "- using basic template")
      // Create a basic template if none exists
      const basicTemplate = {
        subject: `AlegrIA Hackathon - Application ${status === "ACCEPTED" ? "Accepted" : "Rejected"}`,
        body: status === "ACCEPTED" 
          ? `<h1>¡Felicitaciones {{teamName}}!</h1><p>Tu aplicación para el AlegrIA Hackathon ha sido <strong>aceptada</strong>.</p><p>Pronto recibirás más información sobre los próximos pasos.</p><p>¡Te esperamos!</p>`
          : `<h1>Gracias {{teamName}}</h1><p>Agradecemos tu interés en el AlegrIA Hackathon. Lamentablemente, tu aplicación no ha sido seleccionada en esta ocasión.</p><p>Te animamos a seguir participando en futuros eventos.</p>`
      }
      
      emailSubject = basicTemplate.subject.replace(/\{\{teamName\}\}/g, application.teamName)
      emailBody = basicTemplate.body.replace(/\{\{teamName\}\}/g, application.teamName)
                                    .replace(/\{\{contactEmail\}\}/g, application.contactEmail)
                                    .replace(/\{\{school\}\}/g, application.school)
    } else {
      console.log("Found email template:", template.subject)
      emailSubject = template.subject.replace(/\{\{teamName\}\}/g, application.teamName)
      emailBody = template.body.replace(/\{\{teamName\}\}/g, application.teamName)
                                .replace(/\{\{contactEmail\}\}/g, application.contactEmail)
                                .replace(/\{\{school\}\}/g, application.school)
    }

    // Send email
    console.log("Attempting to send email to:", application.contactEmail)
    console.log("Email subject:", emailSubject)
    console.log("Email body preview:", emailBody.substring(0, 200) + "...")
    
    try {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: "AlegrIA Hackathon <onboarding@resend.dev>",
        to: [application.contactEmail],
        subject: emailSubject,
        html: emailBody,
      })

      if (emailError) {
        console.error("Email sending error:", emailError)
        console.error("Error details:", JSON.stringify(emailError, null, 2))
      } else {
        console.log("Email sent successfully to:", application.contactEmail)
        console.log("Email ID:", emailData?.id)
      }

      // Log email attempt using raw SQL to avoid enum issues
      await prisma.$executeRaw`
        INSERT INTO email_logs (id, "applicationId", type, "recipientEmail", subject, "sentAt", status, "errorMessage")
        VALUES (${require('crypto').randomUUID()}, ${application.id}, ${templateType}, ${application.contactEmail}, ${emailSubject}, NOW(), ${emailError ? "FAILED" : "SENT"}, ${emailError?.message || null})
      `

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