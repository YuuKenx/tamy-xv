"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

interface RsvpData {
  name: string
  email: string
  phone: string
  guests: string
  message: string
}

export async function sendRsvp(data: RsvpData) {
  try {
    const supabase = createServerSupabaseClient()

    // 1. Generar username único
    const baseUsername = data.name
      .split(" ")[0]
      .toLowerCase()
      .replace(/[^a-z]/g, "")
    let username = baseUsername
    let counter = 1

    // Verificar si el username ya existe
    while (true) {
      const { data: existingUser } = await supabase.from("users").select("id").eq("username", username).single()

      if (!existingUser) break
      username = `${baseUsername}${counter}`
      counter++
    }

    // 2. Generar contraseña fácil (nombre + 4 números)
    const firstName = data.name.split(" ")[0]
    const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
    const randomNumbers = Math.floor(Math.random() * 9999)
      .toString()
      .padStart(4, "0")
    const password = `${capitalizedName}${randomNumbers}`

    // 3. Crear usuario invitado
    const { data: userId, error: userError } = await supabase.rpc("create_user_with_password", {
      p_email: data.email,
      p_name: data.name,
      p_phone: data.phone || null,
      p_user_type: "guest",
      p_username: username,
      p_password: password,
    })

    if (userError) {
      console.error("Error al crear usuario:", userError)
      throw new Error("Error al crear usuario")
    }

    // 4. Crear confirmación RSVP
    const { error: rsvpError } = await supabase.from("rsvp_confirmations").insert({
      user_id: userId,
      guests_count: Number.parseInt(data.guests),
      message: data.message || null,
    })

    if (rsvpError) {
      console.error("Error al guardar confirmación:", rsvpError)
      throw new Error("Error al guardar confirmación")
    }

    // 5. Registrar actividad
    await supabase.from("activity_logs").insert({
      user_id: userId,
      action: "RSVP_CONFIRMED",
      details: {
        guests_count: Number.parseInt(data.guests),
      },
    })

    revalidatePath("/")

    return {
      success: true,
      credentials: { username, password },
      message: `¡Gracias ${data.name}! Te hemos enviado tus credenciales de acceso.`,
    }
  } catch (error) {
    console.error("Error en RSVP:", error)
    throw new Error("Error al procesar confirmación. Por favor intenta de nuevo.")
  }
}
