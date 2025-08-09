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
      console.log("Database connection test failed, will create schema during user creation")
    }

    // Check if both admins already exist
    try {
      const existingAdmins = await prisma.user.findMany({
        where: {
          role: 'ADMINISTRATOR'
        }
      })
      
      // Check if we already have both admins
      const hasOriginalAdmin = existingAdmins.some(admin => admin.email === 'davidcardecodri@gmail.com')
      const hasNewAdmin = existingAdmins.some(admin => admin.email === 'Ugodimartino.27@gmail.com')
      
      if (hasOriginalAdmin && hasNewAdmin) {
        return NextResponse.json({ 
          success: true, 
          message: "Setup already completed - both admins exist", 
          admins: existingAdmins.map(admin => ({ email: admin.email, name: admin.name }))
        })
      }
      
      // If we have the original admin but not the new one, create the new one
      if (hasOriginalAdmin && !hasNewAdmin) {
        console.log("Original admin exists, adding new admin...")
        // Just create the new admin directly
        const hashedPassword = await bcrypt.hash("Ugodi01*", 12)
        const newAdmin = await prisma.user.create({
          data: {
            email: "Ugodimartino.27@gmail.com",
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
      console.log("User table check failed, proceeding with full setup")
    }

    // Create admin users (this will create both)
    const admins = await createAdminUser()
    
    // Create email templates
    await prisma.emailTemplate.upsert({
      where: { id: "acceptance-template" },
      update: {},
      create: {
        id: "acceptance-template",
        type: "ACCEPTANCE",
        subject: "🎉 ¡Felicidades, {{teamName}}! Tu aplicación ha sido aceptada",
        body: `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #4A5EE7; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎉 ¡Felicitaciones!</h1>
                </div>
                <div class="content">
                  <p>Hola equipo <strong>{{teamName}}</strong>,</p>
                  
                  <p>¡Nos alegra informarte que tu equipo ha sido aceptado en el Hackathon AlegrIA (17–19 Oct)!</p>
                  
                  <p><strong>Próximos pasos:</strong></p>
                  <ol>
                    <li>Asistir al workshop de lanzamiento el 17 de octubre a las 11 AM en ECA</li>
                    <li>Confirmar la asistencia de todos los miembros del equipo</li>
                    <li>Revisar las bases y condiciones del hackathon</li>
                  </ol>
                  
                  <p>Si tienes dudas, contesta a este correo.</p>
                  
                  <p>¡Nos vemos pronto!</p>
                  
                  <p><strong>Equipo AlegrIA</strong></p>
                </div>
                <div class="footer">
                  <p>Hackathon AlegrIA • Escuela Campo Alegre</p>
                </div>
              </div>
            </body>
          </html>
        `,
        isActive: true
      }
    })
    
    await prisma.emailTemplate.upsert({
      where: { id: "rejection-template" },
      update: {},
      create: {
        id: "rejection-template",
        type: "REJECTION",
        subject: "Tu aplicación al Hackathon AlegrIA",
        body: `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #00162D; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Gracias por tu interés</h1>
                </div>
                <div class="content">
                  <p>Hola equipo <strong>{{teamName}}</strong>,</p>
                  
                  <p>Gracias por tu interés en el Hackathon AlegrIA.</p>
                  
                  <p>Lamentablemente en esta ocasión no podemos avanzar con tu aplicación debido al alto número de participantes que hemos recibido.</p>
                  
                  <p>Te animamos a seguir explorando y desarrollando tus ideas, y esperamos verte en futuros eventos.</p>
                  
                  <p>¡Ánimo y éxito en tus proyectos!</p>
                  
                  <p><strong>Equipo AlegrIA</strong></p>
                </div>
                <div class="footer">
                  <p>Hackathon AlegrIA • Escuela Campo Alegre</p>
                </div>
              </div>
            </body>
          </html>
        `,
        isActive: true
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: "Admin users and templates created successfully",
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