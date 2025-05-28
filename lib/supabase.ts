import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export function createClient() {
  // Verificar que las variables existan antes de crear el cliente
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Missing Supabase environment variables")
    // Retornar un cliente mock para evitar errores durante el build
    return null as any
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

// Cliente para el lado del servidor con service role key
export function createServerSupabaseClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!serviceRoleKey || !supabaseUrl) {
    console.warn("Missing Supabase service role key or URL")
    return null as any
  }

  return createSupabaseClient(supabaseUrl, serviceRoleKey)
}
