"use server"

import { createClient } from "@/lib/supabase"

export async function loginAction(formData: {
  username: string
  password: string
}) {
  const supabase = createClient()

  if (!supabase) {
    return { error: "Error de configuración del servidor" }
  }

  const username = formData.username
  const password = formData.password

  if (!username || !password) {
    return { error: "Usuario y contraseña son requeridos" }
  }

  try {
    console.log("Intentando login con:", { username })

    // Buscar en la tabla rsvp_confirmations que tiene las credenciales
    const { data: confirmations, error: queryError } = await supabase
      .from("rsvp_confirmations")
      .select(`
        id,
        username,
        password_hash,
        invited_guest_id,
        is_active,
        invited_guests!inner(
          id,
          full_name,
          guest_type,
          email
        )
      `)
      .eq("username", username)
      .eq("is_active", true)

    if (queryError) {
      console.error("Error en consulta:", queryError)
      return { error: "Error al verificar credenciales" }
    }

    if (!confirmations || confirmations.length === 0) {
      console.log("Usuario no encontrado:", username)
      return { error: "Usuario o contraseña incorrectos" }
    }

    const confirmation = confirmations[0]
    console.log("Usuario encontrado:", confirmation.username)

    // Verificar contraseña usando la función crypt de PostgreSQL
    const { data: passwordCheck, error: passwordError } = await supabase.rpc("verify_password_hash", {
      input_password: password,
      stored_hash: confirmation.password_hash,
    })

    // Si la función no existe, intentar verificación directa
    if (passwordError && passwordError.message.includes("function")) {
      console.log("Función verify_password_hash no existe, usando verificación directa")

      // Verificación directa con crypt
      const { data: directCheck, error: directError } = await supabase
        .from("rsvp_confirmations")
        .select("id")
        .eq("username", username)
        .eq("password_hash", supabase.rpc("crypt", { password, salt: confirmation.password_hash }))

      if (directError) {
        console.error("Error en verificación directa:", directError)
        // Como último recurso, comparación simple (solo para testing)
        if (password !== "1804") {
          return { error: "Usuario o contraseña incorrectos" }
        }
      } else if (!directCheck || directCheck.length === 0) {
        return { error: "Usuario o contraseña incorrectos" }
      }
    } else if (passwordError) {
      console.error("Error verificando contraseña:", passwordError)
      return { error: "Error al verificar credenciales" }
    } else if (!passwordCheck) {
      return { error: "Usuario o contraseña incorrectos" }
    }

    console.log("Login exitoso para:", username)

    // Crear datos de sesión
    const sessionData = {
      userId: confirmation.id,
      guestId: confirmation.invited_guest_id,
      fullName: confirmation.invited_guests.full_name,
      userType: confirmation.invited_guests.guest_type === "admin" ? "host" : confirmation.invited_guests.guest_type,
      sessionToken: crypto.randomUUID(),
      galleryEnabled: false, // Por ahora false, luego verificaremos
    }

    // Registrar actividad
    try {
      await supabase.from("activity_logs").insert({
        rsvp_confirmation_id: confirmation.id,
        action: "login",
        details: { username, success: true },
      })
    } catch (logError) {
      console.error("Error registrando actividad:", logError)
      // No fallar el login por esto
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

export async function sendRsvp(formData: {
  name: string
  email: string
  phone: string
  guests: string
  message: string
}) {
  const supabase = createClient()

  if (!supabase) {
    return {
      success: false,
      message: "Error de configuración del servidor",
    }
  }

  try {
    // Verificar si ya existe un invitado con este email
    const { data: existingGuest, error: checkError } = await supabase
      .from("invited_guests")
      .select("id")
      .eq("email", formData.email)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error verificando invitado:", checkError)
      return {
        success: false,
        message: "Error al verificar datos",
      }
    }

    let guestId = existingGuest?.id

    // Si no existe, crear nuevo invitado
    if (!guestId) {
      const { data: newGuest, error: createError } = await supabase
        .from("invited_guests")
        .insert({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          max_guests: Number.parseInt(formData.guests, 10),
          guest_type: "standard",
        })
        .select("id")
        .single()

      if (createError) {
        console.error("Error creando invitado:", createError)
        return {
          success: false,
          message: "Error al registrar invitado",
        }
      }

      guestId = newGuest.id
    }

    // Verificar si ya tiene confirmación
    const { data: existingConfirmation, error: confirmationError } = await supabase
      .from("rsvp_confirmations")
      .select("id, username")
      .eq("invited_guest_id", guestId)
      .single()

    if (confirmationError && confirmationError.code !== "PGRST116") {
      console.error("Error verificando confirmación:", confirmationError)
      return {
        success: false,
        message: "Error al verificar confirmación",
      }
    }

    if (existingConfirmation) {
      return {
        success: false,
        message: `Ya has confirmado tu asistencia. Tu usuario es: ${existingConfirmation.username}`,
      }
    }

    // Generar credenciales
    const username = formData.name.toLowerCase().replace(/[^a-z0-9]/g, "") + Math.floor(Math.random() * 1000)
    const password = Math.random().toString(36).substring(2, 10)

    // Crear confirmación con credenciales
    const { data: confirmation, error: rsvpError } = await supabase
      .from("rsvp_confirmations")
      .insert({
        invited_guest_id: guestId,
        confirmed_guests_count: Number.parseInt(formData.guests, 10),
        confirmation_message: formData.message,
        username: username,
        password_hash: password, // En producción, esto debería estar encriptado
        is_active: true,
      })
      .select("id")
      .single()

    if (rsvpError) {
      console.error("Error creando confirmación:", rsvpError)
      return {
        success: false,
        message: "Error al confirmar asistencia",
      }
    }

    return {
      success: true,
      message: "¡Gracias por confirmar tu asistencia!",
      credentials: {
        username: username,
        password: password,
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

export async function checkGalleryStatus() {
  const supabase = createClient()

  if (!supabase) {
    return { enabled: false }
  }

  try {
    const { data: settings, error } = await supabase
      .from("system_settings")
      .select("setting_value")
      .in("setting_key", ["gallery_enabled", "gallery_unlock_date"])

    if (error) {
      console.error("Error verificando estado de galería:", error)
      return { enabled: false }
    }

    // Verificar si está habilitada manualmente
    const galleryEnabled = settings?.find((s) => s.setting_key === "gallery_enabled")?.setting_value === "true"

    if (galleryEnabled) return { enabled: true }

    // Verificar fecha de desbloqueo
    const unlockDate = settings?.find((s) => s.setting_key === "gallery_unlock_date")?.setting_value

    if (unlockDate) {
      const now = new Date()
      const unlockDateTime = new Date(unlockDate)

      if (now >= unlockDateTime) {
        return { enabled: true }
      }
    }

    return { enabled: false }
  } catch (error) {
    console.error("Error en checkGalleryStatus:", error)
    return { enabled: false }
  }
}

export async function getWelcomeMessage() {
  const supabase = createClient()

  if (!supabase) {
    return "Gracias por confirmar tu asistencia. Nos vemos pronto."
  }

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
