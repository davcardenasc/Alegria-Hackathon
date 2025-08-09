import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export async function createAdminUser() {
  // Define admin users to create
  const adminUsers = [
    {
      email: "davidcardecodri@gmail.com",
      password: "KodaCodriansky123!",
      name: "Administrator"
    },
    {
      email: "Ugodimartino.27@gmail.com",
      password: "Ugodi01*",
      name: "Ugodi Administrator"
    }
  ]
  
  const createdAdmins = []
  
  for (const adminData of adminUsers) {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminData.email }
    })
    
    if (existingAdmin) {
      console.log(`Admin user ${adminData.email} already exists`)
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
    
    console.log("Admin user created:", {
      email: adminData.email,
      password: adminData.password
    })
    
    createdAdmins.push(admin)
  }
  
  return createdAdmins
}