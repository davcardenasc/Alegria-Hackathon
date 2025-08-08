import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend("re_jo94ZKQX_2aFDDKvNwSNYYQC3qBnsJsn5")

export async function GET() {
  console.log("=== DIRECT EMAIL TEST STARTING ===")
  
  try {
    // Test 1: Send to verified email (cursos.alegria.labs@gmail.com)
    console.log("Test 1: Sending to verified email...")
    const { data: verifiedEmailData, error: verifiedEmailError } = await resend.emails.send({
      from: "AlegrIA Hackathon <onboarding@resend.dev>",
      to: ["cursos.alegria.labs@gmail.com"],
      subject: "Direct Email Test #1 - Verified Address",
      html: `<h1>Test 1 Success!</h1><p>This email was sent to the verified address at ${new Date().toISOString()}</p>`
    })

    console.log("Test 1 result:", { data: verifiedEmailData, error: verifiedEmailError })

    // Test 2: Send to davidcardecodri@gmail.com (might fail due to domain verification)
    console.log("Test 2: Sending to davidcardecodri@gmail.com...")
    const { data: testEmailData, error: testEmailError } = await resend.emails.send({
      from: "AlegrIA Hackathon <onboarding@resend.dev>",
      to: ["davidcardecodri@gmail.com"],
      subject: "Direct Email Test #2 - Test Address",
      html: `<h1>Test 2 Success!</h1><p>This email was sent to davidcardecodri@gmail.com at ${new Date().toISOString()}</p>`
    })

    console.log("Test 2 result:", { data: testEmailData, error: testEmailError })

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      tests: [
        {
          test: "Verified Email (cursos.alegria.labs@gmail.com)",
          success: !verifiedEmailError,
          data: verifiedEmailData,
          error: verifiedEmailError
        },
        {
          test: "Test Email (davidcardecodri@gmail.com)",
          success: !testEmailError,
          data: testEmailData,
          error: testEmailError
        }
      ]
    })

  } catch (error) {
    console.error("Direct email test failed:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}