import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Función para verificar si la galería debe estar habilitada
export async function isGalleryEnabled() {
  try {
    // Importar dinámicamente para evitar errores durante el build
    const { createServerSupabaseClient } = await import("./supabase")
    const supabase = createServerSupabaseClient()

    if (!supabase) {
      return false
    }

    // Obtener configuraciones
    const { data: settings, error } = await supabase
      .from("system_settings")
      .select("setting_value")
      .in("setting_key", ["gallery_enabled", "gallery_unlock_date"])

    if (error) {
      console.error("Error al obtener configuraciones:", error)
      return false
    }

    // Verificar si la galería está habilitada manualmente
    const galleryEnabled = settings?.find((s) => s.setting_key === "gallery_enabled")?.setting_value === "true"

    if (galleryEnabled) return true

    // Verificar si debemos habilitar automáticamente por fecha
    const unlockDate = settings?.find((s) => s.setting_key === "gallery_unlock_date")?.setting_value

    if (unlockDate) {
      const now = new Date()
      const unlockDateTime = new Date(unlockDate)

      // Si la fecha actual es posterior a la fecha de desbloqueo, habilitar
      if (now >= unlockDateTime) {
        return true
      }
    }

    return false
  } catch (error) {
    console.error("Error al verificar estado de galería:", error)
    return false
  }
}
