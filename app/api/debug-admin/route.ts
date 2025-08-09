import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

/**
 * Debug endpoint to check admin users in database
 * This will help us see what's actually stored
 */
export async function GET(request: NextRequest) {
  try {
    // Get all admin users
    const admins = await prisma.user.findMany({
      where: {
        role: 'ADMINISTRATOR'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    })

    // Also try to find the specific user
    const ugodi = await prisma.user.findUnique({
      where: {
        email: "Ugodimartino.27@gmail.com"
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        passwordHash: true
      }
    })

    const ugodiLower = await prisma.user.findUnique({
      where: {
        email: "ugodimartino.27@gmail.com"
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        passwordHash: true
      }
    })

    // Test password hashing
    const testPassword = "Ugodi01*"
    const testHash = await bcrypt.hash(testPassword, 12)
    const testVerify = await bcrypt.compare(testPassword, testHash)

    return NextResponse.json({
      success: true,
      totalAdmins: admins.length,
      admins: admins,
      ugodiUpperCase: ugodi,
      ugodiLowerCase: ugodiLower,
      passwordTest: {
        originalPassword: testPassword,
        hashedPassword: testHash.substring(0, 20) + "...", // Show first 20 chars
        verificationWorks: testVerify
      }
    })

  } catch (error) {
    console.error("Debug admin error:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Database error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}