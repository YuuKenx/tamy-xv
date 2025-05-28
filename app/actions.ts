"use server"

import { createClient } from "@/lib/supabase"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  const supabase = createClient()

  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (!username || !password) {
    return { error: "Usuario y contraseña son requeridos" }
  }

  try {
    // Verificar credenciales usando la función de la base de datos
    const { data: isValid, error } = await supabase.rpc("verify_password", {
      input_username: username,
      input_password: password,
    })

    if (error) {
      console.error("Error verificando credenciales:", error)
      return { error: "Error al verificar credenciales" }
    }

    if (!isValid) {
      return { error: "Usuario o contraseña incorrectos" }
    }

    // Obtener datos del usuario
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("is_active", true)
      .single()

    if (userError || !user) {
      return { error: "Usuario no encontrado" }
    }

    // Crear sesión simple (en una app real usarías JWT o cookies seguras)
    const sessionData = {
      userId: user.id,
      username: user.username,
      userType: user.user_type,
      name: user.name,
    }

    // Redirigir según el tipo de usuario
    if (user.user_type === "super_admin") {
      redirect("/admin/dashboard")
    } else {
      redirect("/")
    }
  } catch (error) {
    console.error("Error en login:", error)
    return { error: "Error interno del servidor" }
  }
}

export async function createUserAction(formData: FormData) {
  const supabase = createClient()

  const email = formData.get("email") as string
  const name = formData.get("name") as string
  const phone = formData.get("phone") as string
  const username = formData.get("username") as string
  const password = formData.get("password") as string
  const userType = (formData.get("userType") as string) || "guest"

  if (!email || !name || !username || !password) {
    return { error: "Todos los campos son requeridos" }
  }

  try {
    const { data: userId, error } = await supabase.rpc("create_user_with_password", {
      p_email: email,
      p_name: name,
      p_phone: phone,
      p_user_type: userType,
      p_username: username,
      p_password: password,
    })

    if (error) {
      console.error("Error creando usuario:", error)
      return { error: "Error al crear usuario" }
    }

    return { success: true, userId }
  } catch (error) {
    console.error("Error en createUser:", error)
    return { error: "Error interno del servidor" }
  }
}

export async function submitRSVP(formData: FormData) {
  const supabase = createClient()

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const guestsCount = Number.parseInt(formData.get("guestsCount") as string) || 1
  const message = formData.get("message") as string

  if (!name || !email) {
    return { error: "Nombre y email son requeridos" }
  }

  try {
    // Crear o encontrar usuario
    let userId: string

    const { data: existingUser } = await supabase.from("users").select("id").eq("email", email).single()

    if (existingUser) {
      userId = existingUser.id
    } else {
      // Crear nuevo usuario
      const { data: newUserId, error: createError } = await supabase.rpc("create_user_with_password", {
        p_email: email,
        p_name: name,
        p_phone: phone,
        p_user_type: "guest",
        p_username: email,
        p_password: "temp_password_" + Date.now(),
      })

      if (createError) {
        console.error("Error creando usuario:", createError)
        return { error: "Error al procesar RSVP" }
      }

      userId = newUserId
    }

    // Crear confirmación RSVP
    const { error: rsvpError } = await supabase.from("rsvp_confirmations").insert({
      user_id: userId,
      guests_count: guestsCount,
      message: message,
    })

    if (rsvpError) {
      console.error("Error creando RSVP:", rsvpError)
      return { error: "Error al confirmar asistencia" }
    }

    return { success: true, message: "RSVP confirmado exitosamente" }
  } catch (error) {
    console.error("Error en submitRSVP:", error)
    return { error: "Error interno del servidor" }
  }
}
