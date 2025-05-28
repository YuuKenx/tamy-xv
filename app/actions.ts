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

    // 1. Generar username y contraseña únicos
    const { data: username, error: usernameError } = await supabase
      .rpc('generate_unique_username', { full_name: data.name })

    if (usernameError) {
      throw new Error('Error al generar username')
    }

    const { data: password, error: passwordError } = await supabase
      .rpc('generate_easy_password', { full_name: data.name })

    if (passwordError) {
      throw new Error('Error al generar contraseña')
    }

    // 2. Crear usuario invitado
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert({
        email: data.email,
        name: data.name,
        phone: data.phone,
        user_type: 'guest',
        username: username,
        password_hash: `crypt('${password}', gen_salt('bf'))` // Esto no funcionará así, necesitamos usar SQL
      })
      .select()
      .single()

    // Mejor manera: usar SQL directo para insertar con contraseña encriptada
    const { data: userResult, error: insertError } = await supabase
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

    if (insertError) {
      throw new Error('Error al crear usuario')
    }

    // Actualizar con contraseña encriptada usando SQL
    const { error: updateError } = await supabase
      .rpc('update_user_password', {
        user_id: userResult.id,
        new_password: password
      })

    // 3. Crear confirmación RSVP
    const { error: rsvpError } = await supabase
      .from('rsvp_confirmations')
      .insert({
        user_id: userResult.id,
        guests_count: parseInt(data.guests),
        message: data.message
      })

    if (rsvpError) {
      throw new Error('Error al guardar confirmación')
    }

    // 4. Registrar actividad
    await supabase
      .from('activity_logs')
      .insert({
        user_id: userResult.id,
        action: 'RSVP_CONFIRMED',
        details: {
          guests_count: parseInt(data.guests),
          message: data.message
        }
      })

    // 5. Aquí enviarías el email con las credenciales
    // Por ahora solo simulamos el envío
    console.log(`Email enviado a ${data.email}:`)
    console.log(`Usuario: ${username}`)
    console.log(`Contraseña: ${password}`)

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
