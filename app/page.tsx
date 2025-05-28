"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

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
    const baseUsername = data.name.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')
    let username = baseUsername
    let counter = 1

    // Verificar si el username ya existe
    while (true) {
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('username', username)
        .single()

      if (!existingUser) break
      username = `${baseUsername}${counter}`
      counter++
    }

    // 2. Generar contraseña fácil (nombre + 4 números)
    const firstName = data.name.split(' ')[0]
    const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
    const randomNumbers = Math.floor(Math.random() * 9999).toString().padStart(4, '0')
    const password = `${capitalizedName}${randomNumbers}`

    // 3. Crear usuario invitado con contraseña temporal
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert({
        email: data.email,
        name: data.name,
        phone: data.phone,
        user_type: 'guest',
        username: username,
        password_hash: 'temp' // Temporal
      })
      .select()
      .single()

    if (userError) {
      throw new Error('Error al crear usuario: ' + userError.message)
    }

    // 4. Actualizar con contraseña encriptada
    const { error: passwordError } = await supabase
      .rpc('update_user_password', {
        user_id: newUser.id,
        new_password: password
      })

    if (passwordError) {
      // Si falla, eliminar el usuario creado
      await supabase.from('users').delete().eq('id', newUser.id)
      throw new Error('Error al configurar contraseña')
    }

    // 5. Crear confirmación RSVP
    const { error: rsvpError } = await supabase
      .from('rsvp_confirmations')
      .insert({
        user_id: newUser.id,
        guests_count: parseInt(data.guests),
        message: data.message
      })

    if (rsvpError) {
      throw new Error('Error al guardar confirmación')
    }

    // 6. Registrar actividad
    await supabase
      .from('activity_logs')
      .insert({
        user_id: newUser.id,
        action: 'RSVP_CONFIRMED',
        details: {
          guests_count: parseInt(data.guests),
          message: data.message
        }
      })

    return { 
      success: true, 
      credentials: { username, password },
      message: `¡Gracias ${data.name}! Te hemos enviado tus credenciales de acceso por email.`
    }

  } catch (error) {
    console.error('Error en RSVP:', error)
    throw new Error('Error al procesar confirmación')
  }
}
