import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend("re_jo94ZKQX_2aFDDKvNwSNYYQC3qBnsJsn5")

function createSchoolApplicationEmailHtml(data: any): string {
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

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const htmlContent = createSchoolApplicationEmailHtml(data)

    const { data: emailData, error } = await resend.emails.send({
      from: "AlegrIA Aplicaciones <onboarding@resend.dev>",
      to: ["cursos.alegria.labs@gmail.com"],
      subject: `Nueva Solicitud de Workshop - ${data.nombre_colegio}`,
      html: htmlContent,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ success: false, message: "Error al enviar el correo" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Aplicación de colegio enviada exitosamente",
    })
  } catch (error) {
    console.error("Error processing school application:", error)
    return NextResponse.json(
      { success: false, message: "Error al procesar la aplicación del colegio" },
      { status: 500 },
    )
  }
}
