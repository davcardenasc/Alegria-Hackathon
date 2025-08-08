// Email template utilities and generation
import { FormData, EmailTemplate } from '@/types'
import config from '@/lib/config'

export function generateParticipantEmailHTML(data: FormData): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nueva Aplicación - Hackathon Alegría</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          background-color: #f4f4f4; 
          margin: 0; 
          padding: 20px; 
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: white; 
          border-radius: 10px; 
          box-shadow: 0 0 20px rgba(0,0,0,0.1); 
          overflow: hidden; 
        }
        .header { 
          background: linear-gradient(135deg, #4A5EE7, #6366F1); 
          color: white; 
          text-align: center; 
          padding: 30px 20px; 
        }
        .content { 
          padding: 30px; 
        }
        .field-group { 
          margin-bottom: 20px; 
          padding: 15px; 
          background: #f8f9ff; 
          border-radius: 8px; 
          border-left: 4px solid #4A5EE7; 
        }
        .label { 
          font-weight: bold; 
          color: #4A5EE7; 
          margin-bottom: 5px; 
        }
        .value { 
          color: #333; 
          font-size: 16px; 
        }
        .participants-list { 
          list-style: none; 
          padding: 0; 
        }
        .participants-list li { 
          padding: 8px 0; 
          border-bottom: 1px solid #eee; 
        }
        .footer { 
          background: #f8f9ff; 
          text-align: center; 
          padding: 20px; 
          color: #666; 
          font-size: 14px; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Nueva Aplicación Recibida</h1>
          <p>Hackathon de Alegría 2024</p>
        </div>
        
        <div class="content">
          <div class="field-group">
            <div class="label">Tipo de Aplicación:</div>
            <div class="value">${data.tipo === 'participantes' ? '👥 Participantes' : '🏫 Colegio'}</div>
          </div>
          
          ${data.numero_participantes ? `
            <div class="field-group">
              <div class="label">Número de Participantes:</div>
              <div class="value">${data.numero_participantes}</div>
            </div>
          ` : ''}
          
          ${data.participantes && data.participantes.length > 0 ? `
            <div class="field-group">
              <div class="label">Lista de Participantes:</div>
              <ul class="participants-list">
                ${data.participantes.map(p => `<li>👤 ${p}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${data.nombre_colegio ? `
            <div class="field-group">
              <div class="label">Nombre del Colegio:</div>
              <div class="value">${data.nombre_colegio}</div>
            </div>
          ` : ''}
          
          ${data.nombre_contacto ? `
            <div class="field-group">
              <div class="label">Nombre de Contacto:</div>
              <div class="value">${data.nombre_contacto}</div>
            </div>
          ` : ''}
          
          ${data.email_contacto ? `
            <div class="field-group">
              <div class="label">Email de Contacto:</div>
              <div class="value">📧 ${data.email_contacto}</div>
            </div>
          ` : ''}
          
          ${data.telefono_contacto ? `
            <div class="field-group">
              <div class="label">Teléfono de Contacto:</div>
              <div class="value">📱 ${data.telefono_contacto}</div>
            </div>
          ` : ''}
          
          ${data.mensaje ? `
            <div class="field-group">
              <div class="label">Mensaje Adicional:</div>
              <div class="value">${data.mensaje}</div>
            </div>
          ` : ''}
        </div>
        
        <div class="footer">
          <p><strong>Hackathon de Alegría 2024</strong></p>
          <p>¡Construyendo el futuro con innovación y alegría!</p>
          <p style="font-size: 12px; margin-top: 15px;">
            📅 Recibido el ${new Date().toLocaleString('es-ES', { 
              timeZone: 'America/Caracas',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function generateSchoolEmailHTML(data: FormData): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Solicitud de Workshop - Hackathon Alegría</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          background-color: #f4f4f4; 
          margin: 0; 
          padding: 20px; 
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: white; 
          border-radius: 10px; 
          box-shadow: 0 0 20px rgba(0,0,0,0.1); 
          overflow: hidden; 
        }
        .header { 
          background: linear-gradient(135deg, #4A5EE7, #6366F1); 
          color: white; 
          text-align: center; 
          padding: 30px 20px; 
        }
        .content { 
          padding: 30px; 
        }
        .field-group { 
          margin-bottom: 20px; 
          padding: 15px; 
          background: #f8f9ff; 
          border-radius: 8px; 
          border-left: 4px solid #4A5EE7; 
        }
        .label { 
          font-weight: bold; 
          color: #4A5EE7; 
          margin-bottom: 5px; 
        }
        .value { 
          color: #333; 
          font-size: 16px; 
        }
        .footer { 
          background: #f8f9ff; 
          text-align: center; 
          padding: 20px; 
          color: #666; 
          font-size: 14px; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏫 Solicitud de Workshop</h1>
          <p>Hackathon de Alegría 2024</p>
        </div>
        
        <div class="content">
          <div class="field-group">
            <div class="label">Colegio:</div>
            <div class="value">${data.nombre_colegio}</div>
          </div>
          
          <div class="field-group">
            <div class="label">Contacto:</div>
            <div class="value">${data.nombre_contacto}</div>
          </div>
          
          <div class="field-group">
            <div class="label">Email:</div>
            <div class="value">📧 ${data.email_contacto}</div>
          </div>
          
          <div class="field-group">
            <div class="label">Teléfono:</div>
            <div class="value">📱 ${data.telefono_contacto}</div>
          </div>
          
          ${data.mensaje ? `
            <div class="field-group">
              <div class="label">Mensaje:</div>
              <div class="value">${data.mensaje}</div>
            </div>
          ` : ''}
        </div>
        
        <div class="footer">
          <p><strong>Hackathon de Alegría 2024</strong></p>
          <p>¡Llevando la innovación a las aulas!</p>
          <p style="font-size: 12px; margin-top: 15px;">
            📅 Solicitud recibida el ${new Date().toLocaleString('es-ES', { 
              timeZone: 'America/Caracas',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function createEmailTemplate(data: FormData): EmailTemplate {
  const isParticipant = data.tipo === 'participantes'
  const isSchool = data.tipo === 'colegios'
  
  const subject = isParticipant 
    ? `Nueva aplicación de participantes - ${data.numero_participantes} participante${(parseInt(data.numero_participantes || '1') > 1) ? 's' : ''}`
    : `Solicitud de workshop - ${data.nombre_colegio}`
  
  const html = isParticipant 
    ? generateParticipantEmailHTML(data)
    : generateSchoolEmailHTML(data)
  
  return {
    subject,
    html,
    to: config.email.toEmail,
    from: config.email.fromEmail,
  }
}

export function validateFormData(data: FormData): string[] {
  const errors: string[] = []
  
  if (!data.tipo) {
    errors.push('Tipo de aplicación es requerido')
  }
  
  if (data.tipo === 'participantes') {
    if (!data.numero_participantes) {
      errors.push('Número de participantes es requerido')
    }
    if (!data.participantes || data.participantes.length === 0) {
      errors.push('Lista de participantes es requerida')
    }
  }
  
  if (data.tipo === 'colegios') {
    if (!data.nombre_colegio) {
      errors.push('Nombre del colegio es requerido')
    }
    if (!data.nombre_contacto) {
      errors.push('Nombre de contacto es requerido')
    }
    if (!data.email_contacto) {
      errors.push('Email de contacto es requerido')
    }
    if (!data.telefono_contacto) {
      errors.push('Teléfono de contacto es requerido')
    }
  }
  
  return errors
}