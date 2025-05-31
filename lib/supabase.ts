import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function createClient() {
  // Verificar que las variables existan
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Missing Supabase environment variables:", {
      url: !!supabaseUrl,
      key: !!supabaseAnonKey,
      urlValue: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : "undefined",
      keyValue: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : "undefined",
    })

    // En lugar de lanzar un error, retornar null para manejar graciosamente
    return null
  }

  try {
    const client = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false, // Para evitar problemas en SSR
      },
    })

    console.log("✅ Supabase client created successfully")
    return client
  } catch (error) {
    console.error("❌ Error creating Supabase client:", error)
    return null
  }
}

// Cliente para el lado del servidor con service role key
export function createServerSupabaseClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!serviceRoleKey || !supabaseUrl) {
    console.error("❌ Missing Supabase server environment variables:", {
      url: !!supabaseUrl,
      serviceKey: !!serviceRoleKey,
    })
    return null
  }

  try {
    return createSupabaseClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
      },
    })
  } catch (error) {
    console.error("❌ Error creating Supabase server client:", error)
    return null
  }
}
