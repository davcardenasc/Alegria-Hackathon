import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE() {
  try {
    // Delete test applications (ones with test emails or test team names)
    const deletedApplications = await prisma.application.deleteMany({
      where: {
        OR: [
          { contactEmail: "davidcardecodri@gmail.com" },
          { teamName: { contains: "Test" } },
          { teamName: { contains: "Debug" } },
          { teamName: { contains: "Email Test" } },
          { school: "University of Testing" },
          { school: "Code Academy" },
          { school: "Tech University" }
        ]
      }
    })

    // Delete test school applications too if they exist
    const deletedSchoolApps = await prisma.schoolApplication.deleteMany({
      where: {
        OR: [
          { coordinatorEmail: "davidcardecodri@gmail.com" },
          { schoolName: { contains: "Test" } }
        ]
      }
    }).catch(() => ({ count: 0 })) // In case schoolApplication table doesn't exist

    return NextResponse.json({
      success: true,
      message: `Cleanup completed`,
      deleted: {
        applications: deletedApplications.count,
        schoolApplications: deletedSchoolApps.count
      }
    })

  } catch (error) {
    console.error("Error cleaning up test data:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}