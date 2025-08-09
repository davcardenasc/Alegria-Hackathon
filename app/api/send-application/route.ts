import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { prisma } from "@/lib/prisma"

/**
 * Interface for hackathon application form data
 */
interface ApplicationFormData {
  nombre_equipo: string
  numero_participantes: number
  participantes: string[]
  colegio: string
  ano_escolar: string
  correo: string
  cedula_filename?: string
  cedula_url?: string
  experiencia?: string
  motivacion: string
  ideas?: string
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
 * Creates HTML email content for hackathon application notifications
 * 
 * @param data - Application form data submitted by users
 * @param data.nombre_equipo - Team name
 * @param data.numero_participantes - Number of team participants 
 * @param data.participantes - Array of participant names
 * @param data.colegio - School/University name
 * @param data.ano_escolar - Academic year/grade
 * @param data.correo - Contact email
 * @param data.cedula_filename - Uploaded ID document filename
 * @param data.cedula_url - URL to uploaded ID document
 * @param data.experiencia - Previous experience text (optional)
 * @param data.motivacion - Motivation text
 * @param data.ideas - Preliminary ideas text (optional)
 * @param data.fecha_aplicacion - Application submission date
 * 
 * @returns HTML string formatted for email notification
 */
function createApplicationEmailHtml(data: ApplicationFormData): string {
  const participantsList = data.participantes.map((p: string) => `<li>${p}</li>`).join("")

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
        .file-info { background-color: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="header">Nueva Aplicación - AlegrIA Hackathon</h1>
        <p class="field"><strong>Fecha de aplicación:</strong> ${data.fecha_aplicacion}</p>
        <hr />
        <h2 class="subheading">Información del Equipo</h2>
        <p class="field"><strong>Nombre del equipo:</strong> ${data.nombre_equipo}</p>
        <p class="field"><strong># de participantes:</strong> ${data.numero_participantes}</p>
        <div class="field">
          <strong>Participantes:</strong>
          <ul>${participantsList}</ul>
        </div>
        <p class="field"><strong>Colegio/Universidad:</strong> ${data.colegio}</p>
        <p class="field"><strong>Año escolar:</strong> ${data.ano_escolar}</p>
        <p class="field"><strong>Correo de contacto:</strong> ${data.correo}</p>
        <hr />
        <h2 class="subheading">Documentos</h2>
        <div class="file-info">
          <p class="field"><strong>Archivo de cédula:</strong> ${data.cedula_filename || "No se subió archivo"}</p>
          ${data.cedula_url ? `<p class="field"><strong>URL del documento:</strong> <a href="${data.cedula_url}" target="_blank" style="color: #4A5EE7; text-decoration: underline;">Ver Documento 📄</a></p>` : ""}
          ${data.cedula_url ? '<p class="field" style="font-size: 12px; color: #666;">📁 El archivo fue subido a Vercel Blob Storage y está disponible permanentemente.</p>' : ""}
        </div>
        <hr />
        <h2 class="subheading">Experiencia Previa</h2>
        <p class="field">${data.experiencia || "No especificada"}</p>
        <hr />
        <h2 class="subheading">Motivación</h2>
        <p class="field">${data.motivacion}</p>
        <hr />
        <h2 class="subheading">Ideas Preliminares</h2>
        <p class="field">${data.ideas || "No especificadas"}</p>
      </div>
    </body>
    </html>
  `
}

/**
 * Handles hackathon application submissions
 * 
 * This API endpoint:
 * 1. Validates and sanitizes input data
 * 2. Saves application to PostgreSQL database via Prisma
 * 3. Sends notification email to administrators via Resend
 * 4. Returns success/error response to client
 * 
 * @param request - Next.js request object containing form data
 * @returns JSON response with success status and application ID
 * 
 * @example
 * POST /api/send-application
 * Content-Type: application/json
 * 
 * {
 *   "nombre_equipo": "Team Alpha",
 *   "numero_participantes": 3,
 *   "participantes": ["John Doe", "Jane Smith", "Bob Johnson"],
 *   "colegio": "Universidad Ejemplo",
 *   "ano_escolar": "11vo",
 *   "correo": "team@example.com",
 *   "motivacion": "We want to change the world...",
 *   "fecha_aplicacion": "2024-10-15"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const data: ApplicationFormData = await request.json()
    
    // Validate required fields
    if (!data.nombre_equipo || !data.correo || !data.motivacion) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Los campos nombre_equipo, correo y motivacion son obligatorios" 
        }, 
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.correo)) {
      return NextResponse.json(
        { 
          success: false, 
          message: "El formato del correo electrónico no es válido" 
        }, 
        { status: 400 }
      )
    }
    
    // Save application to database first
    const application = await prisma.application.create({
      data: {
        teamName: data.nombre_equipo,
        participantsCount: Number(data.numero_participantes),
        participants: JSON.stringify(data.participantes),
        school: data.colegio,
        gradeOrYear: data.ano_escolar,
        contactEmail: data.correo,
        idDocumentUrl: data.cedula_url || null,
        experienceText: data.experiencia || null,
        motivationText: data.motivacion,
        ideasText: data.ideas || null,
        submittedAt: new Date(),
      }
    })

    // Create HTML content for email
    const htmlContent = createApplicationEmailHtml(data)

    // Send notification email
    const { data: emailData, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "AlegrIA Aplicaciones <onboarding@resend.dev>",
      to: [process.env.TO_EMAIL || "cursos.alegria.labs@gmail.com"],
      subject: `Nueva Aplicación AlegrIA - Equipo: ${data.nombre_equipo}`,
      html: htmlContent,
    })

    if (error) {
      // Log email error but don't fail the request since application was saved
      console.error("Failed to send notification email:", error)
    }

    return NextResponse.json({
      success: true,
      message: "Aplicación enviada exitosamente",
      applicationId: application.id,
      emailSent: !error // Indicate if notification email was successful
    })
  } catch (error) {
    // Log the full error for debugging (in development only)
    if (process.env.NODE_ENV === 'development') {
      console.error("Error processing application:", error)
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
