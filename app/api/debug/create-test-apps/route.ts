import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Create several test applications with davidcardecodri@gmail.com
    const testApps = [
      {
        teamName: "Test Team Alpha",
        participantsCount: 3,
        participants: JSON.stringify(["Alice Smith", "Bob Johnson", "Charlie Brown"]),
        school: "University of Testing",
        gradeOrYear: "3rd Year",
        contactEmail: "davidcardecodri@gmail.com",
        idDocumentUrl: "test_document_1.jpg",
        experienceText: "We have experience in React and Node.js development",
        motivationText: "We want to build innovative solutions that help our community",
        ideasText: "We're thinking about creating an app for sustainable living",
        status: "PENDING"
      },
      {
        teamName: "Debug Squad",
        participantsCount: 2,
        participants: JSON.stringify(["David Test", "Maria Debug"]),
        school: "Code Academy",
        gradeOrYear: "Senior",
        contactEmail: "davidcardecodri@gmail.com",
        idDocumentUrl: "debug_id.png",
        experienceText: "Experienced in full-stack development and testing",
        motivationText: "Passionate about solving real-world problems through code",
        ideasText: "AI-powered educational platform for remote learning",
        status: "PENDING"
      },
      {
        teamName: "Email Test Team",
        participantsCount: 4,
        participants: JSON.stringify(["John Doe", "Jane Smith", "Mike Wilson", "Sarah Davis"]),
        school: "Tech University",
        gradeOrYear: "4th Year",
        contactEmail: "davidcardecodri@gmail.com",
        idDocumentUrl: "email_test.jpg",
        experienceText: "Mobile app development and API design",
        motivationText: "We believe technology can make education more accessible",
        ideasText: "Platform connecting students with mentors globally",
        status: "PENDING"
      }
    ]

    const createdApps = []
    for (const app of testApps) {
      const created = await prisma.application.create({
        data: app
      })
      createdApps.push(created)
    }

    return NextResponse.json({
      success: true,
      message: `Created ${createdApps.length} test applications`,
      applications: createdApps.map(app => ({
        id: app.id,
        teamName: app.teamName,
        contactEmail: app.contactEmail,
        status: app.status
      }))
    })

  } catch (error) {
    console.error("Error creating test applications:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}