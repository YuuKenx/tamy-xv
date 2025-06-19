// Función para enviar mensajes de WhatsApp usando la API de WhatsApp Business
// Número oficial de la anfitriona: +52 1 771 127 9436
export async function enviarWhatsApp(numero: string, mensaje: string) {
  try {
    // Para desarrollo, vamos a usar una API simulada
    // En producción, usarías la API oficial de WhatsApp Business

    console.log(`📱 Enviando WhatsApp a: ${numero}`)
    console.log(`💬 Mensaje: ${mensaje}`)

    // Simular envío exitoso
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true, messageId: `wa_${Date.now()}` }
  } catch (error) {
    console.error("Error enviando WhatsApp:", error)
    return { success: false, error: error.message }
  }
}

// Función para formatear número de WhatsApp
export function formatearNumeroWhatsApp(numero: string): string {
  // Remover espacios, guiones y caracteres especiales
  let numeroLimpio = numero.replace(/[\s\-$$$$+]/g, "")

  // Si no empieza con código de país, agregar México (+52)
  if (!numeroLimpio.startsWith("52") && numeroLimpio.length === 10) {
    numeroLimpio = "52" + numeroLimpio
  }

  return numeroLimpio
}

// Función para crear mensaje de confirmación para el invitado
export function crearMensajeInvitado(formData: any, invitadoInfo: any): string {
  const nombreMostrar = invitadoInfo.encontrado ? invitadoInfo.nombre : formData.name
  const estadoInvitado = invitadoInfo.encontrado ? "✅ Verificado en lista" : "⚠️ Registro adicional"

  return `🌸 *¡Gracias por confirmar tu asistencia!* 🌸

Querido/a *${nombreMostrar}*,

¡Estamos muy emocionados de que nos acompañes en la celebración de los XV años de Tamy! 💕

📋 *Detalles de tu confirmación:*
• *Nombre:* ${formData.name}
• *Invitados:* ${formData.guests} personas
• *Email:* ${formData.email}
${formData.phone ? `• *Teléfono:* ${formData.phone}` : ""}
${formData.message ? `• *Mensaje:* "${formData.message}"` : ""}
• *Estado:* ${estadoInvitado}

📅 *Recordatorio del evento:*
• *Fecha:* 9 de Agosto, 2025
• *Ceremonia:* 13:00 hrs - Iglesia San Judas Tadeo
• *Recepción:* 15:30 hrs - Rivento Salón y Jardín

Tu presencia hará que este día sea aún más especial. ¡Esperamos verte pronto! ✨

Con todo nuestro cariño,
*Familia de Tamara* 💖`
}

// Función para crear mensaje de notificación para la anfitriona
export function crearMensajeAnfitriona(formData: any, invitadoInfo: any): string {
  const estadoEmoji = invitadoInfo.encontrado ? "✅" : "⚠️"
  const estadoTexto = invitadoInfo.encontrado ? "VERIFICADO" : "NO ENCONTRADO"

  return `🎉 *Nueva Confirmación RSVP* 🎉

Hola Lupita,

Has recibido una nueva confirmación para los XV años de Tamy:

${estadoEmoji} *${estadoTexto} EN LISTA*

📝 *Detalles del invitado:*
• *Nombre ingresado:* ${formData.name}
${invitadoInfo.encontrado ? `• *Nombre en lista:* ${invitadoInfo.nombre}` : ""}
${invitadoInfo.encontrado ? `• *Cupo asignado:* ${invitadoInfo.cupo} personas` : ""}
${invitadoInfo.encontrado && invitadoInfo.similitud < 100 ? `• *Similitud:* ${Math.round(invitadoInfo.similitud)}%` : ""}
• *Email:* ${formData.email}
${formData.phone ? `• *Teléfono:* ${formData.phone}` : ""}
• *Invitados confirmados:* ${formData.guests} personas
${formData.message ? `• *Mensaje:* "${formData.message}"` : ""}
• *Fecha:* ${new Date().toLocaleString("es-MX")}

${
  !invitadoInfo.encontrado
    ? `
⚠️ *NOTA:* Esta persona no se encontró en la lista oficial de invitados. Revisa si hay errores de escritura o si necesitas agregarlo manualmente.
`
    : ""
}

Sistema de confirmaciones automático - XV Años de Tamara 💕`
}
