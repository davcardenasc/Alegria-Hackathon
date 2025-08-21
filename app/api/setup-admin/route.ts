import { NextRequest, NextResponse } from "next/server"
import { createAdminUser } from "@/lib/create-admin"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    // First, ensure database schema exists
    try {
      await prisma.$executeRaw`SELECT 1`
    } catch (error) {
      // Database might not exist yet, this is expected on first setup
      // Database connection test failed, will create schema during user creation
    }

    // Check if both admins already exist
    try {
      const existingAdmins = await prisma.user.findMany({
        where: {
          role: 'ADMINISTRATOR'
        }
      })
      
      // Check if we already have both admins
      const hasOriginalAdmin = existingAdmins.some(admin => admin.email.toLowerCase() === 'davidcardecodri@gmail.com')
      const hasNewAdmin = existingAdmins.some(admin => admin.email.toLowerCase() === 'ugodimartino.27@gmail.com')
      
      if (hasOriginalAdmin && hasNewAdmin) {
        return NextResponse.json({ 
          success: true, 
          message: "Setup already completed - both admins exist", 
          admins: existingAdmins.map(admin => ({ email: admin.email, name: admin.name }))
        })
      }
      
      // If we have the original admin but not the new one, create the new one
      if (hasOriginalAdmin && !hasNewAdmin) {
        // Original admin exists, adding new admin
        // Just create the new admin directly
        const hashedPassword = await bcrypt.hash("Ugodi01*", 12)
        const newAdmin = await prisma.user.create({
          data: {
            email: "ugodimartino.27@gmail.com",
            name: "Ugo Di Martino",
            passwordHash: hashedPassword,
            role: "ADMINISTRATOR"
          }
        })
        
        const allAdmins = await prisma.user.findMany({
          where: { role: 'ADMINISTRATOR' }
        })
        
        return NextResponse.json({ 
          success: true, 
          message: "New admin added successfully",
          admins: allAdmins.map(admin => ({ email: admin.email, name: admin.name }))
        })
      }
      
    } catch (error) {
      // Table might not exist yet, continue with full setup
      // User table check failed, proceeding with full setup
    }

    // Create admin users (this will create both)
    const admins = await createAdminUser()

    return NextResponse.json({ 
      success: true, 
      message: "Admin users created successfully",
      admins: admins.map(admin => ({ email: admin.email, name: admin.name }))
    })

  } catch (error) {
    console.error("Setup error:", error)
    return NextResponse.json(
      { error: "Setup failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

// Also allow GET for easy browser testing
export async function GET(request: NextRequest) {
  return POST(request)
}