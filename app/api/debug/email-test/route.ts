import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend("re_jo94ZKQX_2aFDDKvNwSNYYQC3qBnsJsn5")

export async function GET() {
  try {
    // Test basic email sending
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "AlegrIA Hackathon <onboarding@resend.dev>",
      to: ["cursos.alegria.labs@gmail.com"], // Send to verified email for testing
      subject: "Test Email from Admin Dashboard",
      html: `
        <h1>Email Test Successful!</h1>
        <p>This is a test email from your AlegrIA admin dashboard.</p>
        <p>If you receive this, the email system is working.</p>
        <p>Time: ${new Date().toISOString()}</p>
      `
    })

    if (emailError) {
      return NextResponse.json({
        success: false,
        error: emailError,
        message: "Email sending failed"
      })
    }

    return NextResponse.json({
      success: true,
      emailData,
      message: "Test email sent successfully to cursos.alegria.labs@gmail.com"
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Email test failed"
    }, { status: 500 })
  }
}