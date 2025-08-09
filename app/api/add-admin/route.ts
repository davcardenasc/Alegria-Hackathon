import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

/**
 * Endpoint to add Ugo Di Martino as permanent admin user to production database
 * Ugo will have the same ADMINISTRATOR privileges as davidcardecodri@gmail.com
 */
export async function POST(request: NextRequest) {
  try {
    // Security check - only allow this in development or with specific secret
    const { secret, email, password, name } = await request.json()
    
    // Add a simple secret check to prevent unauthorized access
    if (secret !== "add-ugodi-admin-2024") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: email }
    })
    
    if (existingAdmin) {
      return NextResponse.json({
        success: true,
        message: `Admin user ${email} already exists`,
        admin: { email: existingAdmin.email, name: existingAdmin.name }
      })
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: email,
        name: name || "Administrator",
        passwordHash: hashedPassword,
        role: "ADMINISTRATOR"
      }
    })
    
    // New admin user created successfully
    
    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      admin: { email: admin.email, name: admin.name }
    })

  } catch (error) {
    console.error("Error creating admin user:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}