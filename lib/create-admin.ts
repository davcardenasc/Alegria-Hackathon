import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export async function createAdminUser() {
  const adminEmail = "davidcardecodri@gmail.com"
  const adminPassword = "KodaCodriansky123!"
  
  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  })
  
  if (existingAdmin) {
    console.log("Admin user already exists")
    return existingAdmin
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(adminPassword, 12)
  
  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      name: "Administrator",
      passwordHash: hashedPassword,
      role: "ADMINISTRATOR"
    }
  })
  
  console.log("Admin user created:", {
    email: adminEmail,
    password: adminPassword
  })
  
  return admin
}