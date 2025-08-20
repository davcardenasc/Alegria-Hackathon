import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export async function createAdminUser() {
  // Get admin credentials from environment variables
  const adminUsers = [
    {
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      password: process.env.ADMIN_PASSWORD || (() => {
        throw new Error("ADMIN_PASSWORD environment variable is required")
      })(),
      name: "Administrator"
    },
    {
      email: process.env.ADMIN_EMAIL_2 || process.env.ADMIN_EMAIL || "admin@example.com",
      password: process.env.ADMIN_PASSWORD_2 || process.env.ADMIN_PASSWORD || (() => {
        throw new Error("ADMIN_PASSWORD environment variable is required")
      })(),
      name: process.env.ADMIN_NAME_2 || "Administrator"
    }
  ].filter(admin => admin.email !== "admin@example.com") // Only create admins with real emails
  
  const createdAdmins = []
  
  for (const adminData of adminUsers) {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminData.email }
    })
    
    if (existingAdmin) {
      // Admin user already exists
      createdAdmins.push(existingAdmin)
      continue
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 12)
    
    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: adminData.email,
        name: adminData.name,
        passwordHash: hashedPassword,
        role: "ADMINISTRATOR"
      }
    })
    
    // Admin user created successfully
    
    createdAdmins.push(admin)
  }
  
  return createdAdmins
}