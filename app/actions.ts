"use server"

import { createClient } from "@/lib/supabase"

export async function sendRsvp(formData: {
  name: string
  email: string
  phone: string
  guests: string
  message: string
}) {
  const supabase = createClient()

  try {
    // Usar la nueva función para crear confirmación RSVP
    const { data, error } = await supabase.rpc("create_rsvp_confirmation", {
      guest_email: formData.email,
      guest_name: formData.name,
      guests_count: Number.parseInt(formData.guests, 10),
      message: formData.message || null,
    })

    if (error) {
      console.error("Error en RSVP:", error)
      return {
        success: false,
        message: "Error al procesar tu confirmación: " + error.message,
      }
    }

    if (!data.success) {
      return {
        success: false,
        message: data.message_text,
      }
    }

    return {
      success: true,
      message: data.message_text,
      credentials: {
        username: data.username,
        password: data.password,
      },
    }
  } catch (error) {
    console.error("Error en sendRsvp:", error)
    return {
      success: false,
      message: "Error interno del servidor",
    }
  }
}

export async function loginAction(formData: {
  username: string
  password: string
}) {
  const supabase = createClient()

  const username = formData.username
  const password = formData.password

  if (!username || !password) {
    return { error: "Usuario y contraseña son requeridos" }
  }

  try {
    // Usar la nueva función para verificar credenciales
    const { data, error } = await supabase.rpc("verify_login_credentials", {
      input_username: username,
      input_password: password,
    })

    if (error) {
      console.error("Error verificando credenciales:", error)
      return { error: "Error al verificar credenciales" }
    }

    if (!data || data.length === 0) {
      return { error: "Usuario o contraseña incorrectos" }
    }

    const user = data[0]

    // Verificar si la galería está habilitada
    const { data: galleryEnabled, error: galleryError } = await supabase.rpc("is_gallery_enabled")

    if (galleryError) {
      console.error("Error verificando estado de galería:", galleryError)
    }

    // Crear sesión simple
    const sessionToken = crypto.randomUUID()
    const { error: sessionError } = await supabase.from("activity_logs").insert({
      rsvp_confirmation_id: user.user_id,
      action: "login",
      details: { username, gallery_enabled: galleryEnabled || false },
    })

    if (sessionError) {
      console.error("Error registrando sesión:", sessionError)
    }

    // Guardar datos en localStorage
    const sessionData = {
      userId: user.user_id,
      guestId: user.guest_id,
      fullName: user.full_name,
      userType: user.guest_type,
      sessionToken,
      galleryEnabled: galleryEnabled || false,
    }

    return {
      success: true,
      session: sessionData,
    }
  } catch (error) {
    console.error("Error en login:", error)
    return { error: "Error interno del servidor" }
  }
}

export async function checkGalleryStatus() {
  const supabase = createClient()

  try {
    const { data: galleryEnabled, error } = await supabase.rpc("is_gallery_enabled")

    if (error) {
      console.error("Error verificando estado de galería:", error)
      return { enabled: false }
    }

    return { enabled: galleryEnabled || false }
  } catch (error) {
    console.error("Error en checkGalleryStatus:", error)
    return { enabled: false }
  }
}

export async function getWelcomeMessage() {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("system_settings")
      .select("setting_value")
      .eq("setting_key", "welcome_message")
      .single()

    if (error || !data) {
      return "Gracias por confirmar tu asistencia. Nos vemos pronto."
    }

    return data.setting_value
  } catch (error) {
    console.error("Error obteniendo mensaje:", error)
    return "Gracias por confirmar tu asistencia. Nos vemos pronto."
  }
}
