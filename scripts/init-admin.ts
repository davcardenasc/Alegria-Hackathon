import { createAdminUser } from "../lib/create-admin"
import { prisma } from "../lib/prisma"

async function main() {
  try {
    console.log("Creating admin user...")
    await createAdminUser()
    
    console.log("Creating email templates...")
    
    // Create acceptance email template
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
    
    // Create rejection email template
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
    
    console.log("✅ Setup completed successfully!")
    
  } catch (error) {
    console.error("❌ Setup failed:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()