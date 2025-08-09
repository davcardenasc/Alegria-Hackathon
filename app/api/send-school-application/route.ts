import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { prisma } from "@/lib/prisma"

/**
 * Interface for school application form data
 */
interface SchoolApplicationFormData {
  nombre_colegio: string
  coordinador: string
  correo_coordinador: string
  telefono: string
  num_alumnos: number
  fechas_seleccionadas?: string[]
  comentarios?: string
  fecha_aplicacion: string
}

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY)

// Validate required environment variables
if (!process.env.RESEND_API_KEY) {
  console.error("RESEND_API_KEY environment variable is required")
}

if (!process.env.FROM_EMAIL) {
  console.error("FROM_EMAIL environment variable is required")
}

/**
 * Creates HTML email content for school workshop application notifications
 * 
 * @param data - School application form data
 * @param data.nombre_colegio - School name
 * @param data.coordinador - Coordinator/teacher name
 * @param data.correo_coordinador - Coordinator email
 * @param data.telefono - Phone number
 * @param data.num_alumnos - Number of interested students
 * @param data.fechas_seleccionadas - Array of preferred dates (optional)
 * @param data.comentarios - Additional comments (optional)
 * @param data.fecha_aplicacion - Application submission date
 * 
 * @returns HTML string formatted for email notification
 */
function createSchoolApplicationEmailHtml(data: SchoolApplicationFormData): string {
  const datesList =
    data.fechas_seleccionadas && data.fechas_seleccionadas.length > 0
      ? `<ul>${data.fechas_seleccionadas.map((fecha: string) => `<li>${fecha}</li>`).join("")}</ul>`
      : "<p>No se seleccionaron fechas específicas.</p>"

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 5px; }
        .header { color: #00162D; font-size: 24px; text-align: center; padding-bottom: 10px; border-bottom: 2px solid #4A5EE7; }
        .subheading { color: #4A5EE7; font-size: 18px; margin-top: 20px; margin-bottom: 10px; }
        .field { margin-bottom: 10px; font-size: 16px; line-height: 1.6; color: #333; }
        .field strong { color: #00162D; }
        ul { padding-left: 20px; margin: 0; }
        hr { border: 0; border-top: 1px solid #cccccc; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="header">Nueva Solicitud de Workshop - AlegrIA</h1>
        <p class="field"><strong>Fecha de solicitud:</strong> ${data.fecha_aplicacion}</p>
        <hr />
        <h2 class="subheading">Información del Colegio</h2>
        <p class="field"><strong>Nombre del colegio:</strong> ${data.nombre_colegio}</p>
        <p class="field"><strong>Coordinador/Docente:</strong> ${data.coordinador}</p>
        <p class="field"><strong>Correo del coordinador:</strong> ${data.correo_coordinador}</p>
        <p class="field"><strong>Teléfono:</strong> ${data.telefono}</p>
        <p class="field"><strong># de alumnos interesados:</strong> ${data.num_alumnos}</p>
        <hr />
        <h2 class="subheading">Fechas Preferidas</h2>
        ${datesList}
        <hr />
        <h2 class="subheading">Comentarios Adicionales</h2>
        <p class="field">${data.comentarios || "No se proporcionaron comentarios."}</p>
      </div>
    </body>
    </html>
  `
}

/**
 * Handles school workshop application submissions
 * 
 * This API endpoint:
 * 1. Validates and sanitizes school application data
 * 2. Saves application to PostgreSQL database via Prisma
 * 3. Sends notification email to administrators via Resend
 * 4. Returns success/error response to client
 * 
 * @param request - Next.js request object containing school application data
 * @returns JSON response with success status and application ID
 * 
 * @example
 * POST /api/send-school-application
 * Content-Type: application/json
 * 
 * {
 *   "nombre_colegio": "Colegio San José",
 *   "coordinador": "María González",
 *   "correo_coordinador": "maria@colegio.edu",
 *   "telefono": "+58 212-1234567",
 *   "num_alumnos": 25,
 *   "fechas_seleccionadas": ["2024-11-15", "2024-11-22"],
 *   "comentarios": "Interesados en workshop de emprendimiento",
 *   "fecha_aplicacion": "2024-10-15"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const data: SchoolApplicationFormData = await request.json()
    
    // Validate required fields
    if (!data.nombre_colegio || !data.coordinador || !data.correo_coordinador) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Los campos nombre_colegio, coordinador y correo_coordinador son obligatorios" 
        }, 
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.correo_coordinador)) {
      return NextResponse.json(
        { 
          success: false, 
          message: "El formato del correo electrónico no es válido" 
        }, 
        { status: 400 }
      )
    }
    
    // Save school application to database
    const schoolApplication = await prisma.schoolApplication.create({
      data: {
        schoolName: data.nombre_colegio,
        coordinatorName: data.coordinador,
        coordinatorEmail: data.correo_coordinador,
        phone: data.telefono,
        numStudents: Number(data.num_alumnos),
        preferredDates: JSON.stringify(data.fechas_seleccionadas || []),
        comments: data.comentarios || null,
        submittedAt: new Date(),
      }
    })
    
    // Create HTML content for notification email
    const htmlContent = createSchoolApplicationEmailHtml(data)

    // Send notification email
    const { data: emailData, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "AlegrIA Aplicaciones <onboarding@resend.dev>",
      to: [process.env.TO_EMAIL || "cursos.alegria.labs@gmail.com"],
      subject: `Nueva Solicitud de Workshop - ${data.nombre_colegio}`,
      html: htmlContent,
    })

    if (error) {
      // Log email error but don't fail the request since application was saved
      console.error("Failed to send school application notification email:", error)
    }

    return NextResponse.json({
      success: true,
      message: "Aplicación de colegio enviada exitosamente",
      applicationId: schoolApplication.id,
      emailSent: !error // Indicate if notification email was successful
    })
  } catch (error) {
    // Log the full error for debugging (in development only)
    if (process.env.NODE_ENV === 'development') {
      console.error("Error processing school application:", error)
    }
    
    // Return generic error message to prevent information leakage
    return NextResponse.json(
      { 
        success: false, 
        message: "Error interno del servidor. Por favor intente nuevamente." 
      },
      { status: 500 }
    )
  }
}
