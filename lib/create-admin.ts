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
      email: "ugodimartino.27@gmail.com",
      password: "Ugodi01*",
      name: "Ugo Di Martino"
    }
  ]
  
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