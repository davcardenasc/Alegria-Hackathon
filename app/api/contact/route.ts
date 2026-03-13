import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { inquiryType, name, org, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "Faltan campos requeridos." }, { status: 400 })
    }

    const subjectMap: Record<string, string> = {
      aliado: `Interés en ser aliado — ${org || name}`,
      colegio: `Llevar AlegrIA a mi colegio — ${org || name}`,
      general: `Consulta general — ${name}`,
    }

    const subject = subjectMap[inquiryType] ?? `Mensaje de contacto — ${name}`

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f4f4f4;">
        <div style="background: #fff; border-radius: 8px; padding: 24px; border: 1px solid #ddd;">
          <h2 style="color: #00162D; border-bottom: 2px solid #4A5EE7; padding-bottom: 12px; margin-top: 0;">${subject}</h2>
          <p style="color: #333; margin: 8px 0;"><strong>Nombre:</strong> ${name}</p>
          ${org ? `<p style="color: #333; margin: 8px 0;"><strong>Organización:</strong> ${org}</p>` : ""}
          <p style="color: #333; margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 16px 0;" />
          <p style="color: #333; margin: 8px 0;"><strong>Mensaje:</strong></p>
          <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `

    const { error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "AlegrIA <onboarding@resend.dev>",
      to: ["cursos.alegria.labs@gmail.com"],
      replyTo: email,
      subject,
      html,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ success: false, message: "Error al enviar el mensaje." }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact route error:", err)
    return NextResponse.json({ success: false, message: "Error interno del servidor." }, { status: 500 })
  }
}
