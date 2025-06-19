"use server"

import { buscarInvitado } from "@/lib/invitados"
import { enviarWhatsApp, formatearNumeroWhatsApp, crearMensajeInvitado, crearMensajeAnfitriona } from "@/lib/whatsapp"

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

    // Enviar mensajes de WhatsApp
    await enviarMensajesWhatsApp(formData, invitadoInfo)

    const mensajeExito = invitadoInfo.encontrado
      ? `¡Gracias ${invitadoInfo.nombre}! Tu confirmación para ${formData.guests} personas ha sido registrada exitosamente. Recibirás un mensaje de WhatsApp con los detalles.`
      : `¡Gracias ${formData.name}! Tu confirmación para ${formData.guests} personas ha sido registrada exitosamente. Recibirás un mensaje de WhatsApp con los detalles.`

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

async function enviarMensajesWhatsApp(formData: RsvpFormData, invitadoInfo: any) {
  try {
    // Número de la anfitriona (número oficial correcto)
    const numeroAnfitriona = "+5217711279436"

    // Crear mensajes
    const mensajeInvitado = crearMensajeInvitado(formData, invitadoInfo)
    const mensajeAnfitriona = crearMensajeAnfitriona(formData, invitadoInfo)

    // Enviar mensaje al invitado (si proporcionó teléfono)
    if (formData.phone) {
      try {
        const numeroInvitado = formatearNumeroWhatsApp(formData.phone)
        const resultadoInvitado = await enviarWhatsApp(numeroInvitado, mensajeInvitado)

        if (resultadoInvitado.success) {
          console.log("✅ Mensaje enviado al invitado:", formData.phone)
        } else {
          console.log("❌ Error enviando mensaje al invitado:", resultadoInvitado.error)
        }
      } catch (error) {
        console.log("❌ Error procesando número del invitado:", error)
      }
    }

    // Enviar mensaje a la anfitriona (siempre)
    try {
      const numeroAnfitrianaLimpio = formatearNumeroWhatsApp(numeroAnfitriona)
      const resultadoAnfitriona = await enviarWhatsApp(numeroAnfitrianaLimpio, mensajeAnfitriona)

      if (resultadoAnfitriona.success) {
        console.log("✅ Notificación enviada a la anfitriona")
      } else {
        console.log("❌ Error enviando notificación a la anfitriona:", resultadoAnfitriona.error)
      }
    } catch (error) {
      console.log("❌ Error procesando número de la anfitriona:", error)
    }

    return true
  } catch (error) {
    console.error("Error enviando mensajes de WhatsApp:", error)
    return false
  }
}
