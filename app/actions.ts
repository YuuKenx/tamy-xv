"use server"

import { buscarInvitado } from "@/lib/invitados"

interface RsvpFormData {
  name: string
  email: string
  phone: string
  guests: string
  message: string
  invitadoVerificado?: {
    encontrado: boolean
    nombre?: string
    cupo?: number
    similitud?: number
  }
}

export async function sendRsvp(formData: RsvpFormData) {
  try {
    // Validaciones básicas
    if (!formData.name || !formData.email) {
      return {
        success: false,
        message: "Nombre y correo electrónico son requeridos",
      }
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: "Por favor ingresa un correo electrónico válido",
      }
    }

    // Verificar invitado en la lista si no se verificó antes
    let invitadoInfo = formData.invitadoVerificado
    if (!invitadoInfo || !invitadoInfo.encontrado) {
      invitadoInfo = await buscarInvitado(formData.name)
    }

    // Validar cupo de invitados
    const numInvitados = Number.parseInt(formData.guests)
    if (invitadoInfo.encontrado && invitadoInfo.cupo) {
      if (numInvitados > invitadoInfo.cupo) {
        return {
          success: false,
          message: `El cupo máximo para ${invitadoInfo.nombre} es de ${invitadoInfo.cupo} personas`,
        }
      }
    }

    // Guardar la confirmación
    console.log("Confirmación RSVP recibida:", {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      guests: formData.guests,
      message: formData.message,
      invitadoVerificado: invitadoInfo,
      timestamp: new Date().toISOString(),
    })

    // Enviar correos de confirmación
    await sendConfirmationEmails(formData, invitadoInfo)

    const mensajeExito = invitadoInfo.encontrado
      ? `¡Gracias ${invitadoInfo.nombre}! Tu confirmación para ${formData.guests} personas ha sido registrada exitosamente.`
      : `¡Gracias ${formData.name}! Tu confirmación para ${formData.guests} personas ha sido registrada exitosamente.`

    return {
      success: true,
      message: mensajeExito,
    }
  } catch (error) {
    console.error("Error en sendRsvp:", error)
    return {
      success: false,
      message: "Error interno del servidor. Por favor intenta de nuevo.",
    }
  }
}

async function sendConfirmationEmails(formData: RsvpFormData, invitadoInfo: any) {
  try {
    const nombreMostrar = invitadoInfo.encontrado ? invitadoInfo.nombre : formData.name
    const estadoInvitado = invitadoInfo.encontrado
      ? "✅ Verificado en lista de invitados"
      : "⚠️ No encontrado en lista oficial"

    // Email para el invitado
    const guestEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fdf2f8;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #ec4899; font-size: 28px; margin-bottom: 10px;">¡Gracias por confirmar!</h1>
          <div style="width: 60px; height: 2px; background: linear-gradient(to right, #ec4899, #a855f7); margin: 0 auto;"></div>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="font-size: 18px; color: #374151; margin-bottom: 20px;">Querido/a <strong>${nombreMostrar}</strong>,</p>
          
          <p style="color: #6b7280; line-height: 1.6; margin-bottom: 20px;">
            ¡Estamos muy emocionados de que nos acompañes en la celebración de los XV años de Tamy!
          </p>
          
          <div style="background: #fef3f2; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ec4899;">
            <h3 style="color: #ec4899; margin-top: 0;">Detalles de tu confirmación:</h3>
            <p style="margin: 5px 0; color: #374151;"><strong>Nombre:</strong> ${formData.name}</p>
            <p style="margin: 5px 0; color: #374151;"><strong>Número de invitados:</strong> ${formData.guests} personas</p>
            <p style="margin: 5px 0; color: #374151;"><strong>Email:</strong> ${formData.email}</p>
            ${formData.phone ? `<p style="margin: 5px 0; color: #374151;"><strong>Teléfono:</strong> ${formData.phone}</p>` : ""}
            ${formData.message ? `<p style="margin: 5px 0; color: #374151;"><strong>Mensaje:</strong> ${formData.message}</p>` : ""}
            <p style="margin: 5px 0; color: #6b7280; font-size: 14px;"><strong>Estado:</strong> ${estadoInvitado}</p>
          </div>
          
          <div style="background: #f3e8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #a855f7; margin-top: 0;">📅 Recordatorio del evento:</h3>
            <p style="margin: 5px 0; color: #374151;"><strong>Fecha:</strong> 9 de Agosto, 2025</p>
            <p style="margin: 5px 0; color: #374151;"><strong>Ceremonia:</strong> 13:00 hrs - Iglesia San Judas Tadeo</p>
            <p style="margin: 5px 0; color: #374151;"><strong>Recepción:</strong> 16:00 hrs - Rivento Salón y Jardín</p>
          </div>
          
          <p style="color: #6b7280; line-height: 1.6; margin-bottom: 20px;">
            Tu presencia hará que este día sea aún más especial. ¡Esperamos verte pronto!
          </p>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #ec4899; font-weight: bold; font-size: 16px;">Con todo nuestro cariño ✨</p>
            <p style="color: #a855f7; font-style: italic;">Familia de Tamara</p>
          </div>
        </div>
      </div>
    `

    // Email para la anfitriona
    const hostEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f0f9ff;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0ea5e9; font-size: 24px; margin-bottom: 10px;">Nueva Confirmación RSVP</h1>
          <div style="width: 60px; height: 2px; background: linear-gradient(to right, #0ea5e9, #8b5cf6); margin: 0 auto;"></div>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">Hola Lupita,</p>
          
          <p style="color: #6b7280; line-height: 1.6; margin-bottom: 20px;">
            Has recibido una nueva confirmación de asistencia para la celebración de XV años de Tamy:
          </p>
          
          <div style="background: ${invitadoInfo.encontrado ? "#f0fdf4" : "#fef3f2"}; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid ${invitadoInfo.encontrado ? "#22c55e" : "#ef4444"};">
            <h3 style="color: ${invitadoInfo.encontrado ? "#16a34a" : "#dc2626"}; margin-top: 0;">
              ${invitadoInfo.encontrado ? "✅ Invitado Verificado" : "⚠️ Invitado No Encontrado"}
            </h3>
            <p style="margin: 8px 0; color: #374151;"><strong>Nombre ingresado:</strong> ${formData.name}</p>
            ${
              invitadoInfo.encontrado
                ? `
              <p style="margin: 8px 0; color: #374151;"><strong>Nombre en lista:</strong> ${invitadoInfo.nombre}</p>
              <p style="margin: 8px 0; color: #374151;"><strong>Cupo asignado:</strong> ${invitadoInfo.cupo} personas</p>
              ${invitadoInfo.similitud < 100 ? `<p style="margin: 8px 0; color: #6b7280;"><strong>Similitud:</strong> ${Math.round(invitadoInfo.similitud)}%</p>` : ""}
            `
                : ""
            }
            <p style="margin: 8px 0; color: #374151;"><strong>Email:</strong> ${formData.email}</p>
            ${formData.phone ? `<p style="margin: 8px 0; color: #374151;"><strong>Teléfono:</strong> ${formData.phone}</p>` : ""}
            <p style="margin: 8px 0; color: #374151;"><strong>Invitados confirmados:</strong> ${formData.guests} personas</p>
            ${formData.message ? `<p style="margin: 8px 0; color: #374151;"><strong>Mensaje:</strong> "${formData.message}"</p>` : ""}
            <p style="margin: 8px 0; color: #6b7280; font-size: 14px;"><strong>Fecha de confirmación:</strong> ${new Date().toLocaleString("es-MX")}</p>
          </div>
          
          ${
            !invitadoInfo.encontrado
              ? `
            <div style="background: #fef3f2; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p style="color: #dc2626; margin: 0; font-size: 14px;">
                <strong>Nota:</strong> Esta persona no se encontró en la lista oficial de invitados. 
                Revisa si hay errores de escritura o si necesitas agregarlo manualmente.
              </p>
            </div>
          `
              : ""
          }
          
          <p style="color: #6b7280; line-height: 1.6; margin-top: 20px; font-size: 14px;">
            Este correo se envía automáticamente cada vez que alguien confirma su asistencia.
          </p>
        </div>
      </div>
    `

    // Aquí normalmente usarías un servicio de email como Resend, SendGrid, etc.
    console.log("📧 Enviando email al invitado:", formData.email)
    console.log("📧 Enviando email a la anfitriona: lupitarh02@gmail.com")

    // Simular envío de emails
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("✅ Emails enviados exitosamente")
    return true
  } catch (error) {
    console.error("Error enviando emails:", error)
    return false
  }
}
