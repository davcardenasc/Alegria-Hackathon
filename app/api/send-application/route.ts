import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend("re_jo94ZKQX_2aFDDKvNwSNYYQC3qBnsJsn5")

// Function to create the HTML content for the email
function createApplicationEmailHtml(data: any): string {
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
          ${data.cedula_filename ? '<p class="field" style="font-size: 12px; color: #666;">Nota: El archivo fue enviado junto con esta aplicación.</p>' : ""}
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

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const htmlContent = createApplicationEmailHtml(data)

    const { data: emailData, error } = await resend.emails.send({
      from: "AlegrIA Aplicaciones <onboarding@resend.dev>",
      to: ["cursos.alegria.labs@gmail.com"],
      subject: `Nueva Aplicación AlegrIA - Equipo: ${data.nombre_equipo}`,
      html: htmlContent,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ success: false, message: "Error al enviar el correo" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Aplicación enviada exitosamente",
    })
  } catch (error) {
    console.error("Error processing application:", error)
    return NextResponse.json({ success: false, message: "Error al procesar la aplicación" }, { status: 500 })
  }
}
