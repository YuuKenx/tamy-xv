"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getWelcomeMessage, checkGalleryStatus } from "@/app/actions"

// Importar el componente de navegación
import GalleryNav from "@/components/gallery-nav"

export default function WaitingRoomPage() {
  const [userName, setUserName] = useState<string>("")
  const [welcomeMessage, setWelcomeMessage] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar autenticación
    const storedName = localStorage.getItem("user_name")
    const userType = localStorage.getItem("user_type")
    const sessionToken = localStorage.getItem("session_token")

    if (!sessionToken) {
      router.push("/login")
      return
    }

    setUserName(storedName || "Invitado")

    // Cargar mensaje de bienvenida
    const loadWelcomeMessage = async () => {
      try {
        const message = await getWelcomeMessage()
        setWelcomeMessage(message)
      } catch (error) {
        console.error("Error cargando mensaje:", error)
      }
    }

    // Verificar si la galería ya está habilitada
    const checkGallery = async () => {
      try {
        const { enabled } = await checkGalleryStatus()
        if (enabled) {
          router.push("/gallery/upload")
        }
      } catch (error) {
        console.error("Error verificando galería:", error)
      } finally {
        setLoading(false)
      }
    }

    loadWelcomeMessage()
    checkGallery()

    // Verificar periódicamente si la galería está habilitada
    const interval = setInterval(checkGallery, 60000) // Cada minuto
    return () => clearInterval(interval)
  }, [router])

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-purple-100">
        <div className="animate-spin w-8 h-8 border-4 border-pink-200 border-t-pink-600 rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 p-4">
      <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center text-pink-600 hover:text-pink-700 transition-colors">
          <ArrowLeft size={20} className="mr-1" />
          <span>Volver</span>
        </Link>
      </div>

      <div className="absolute top-4 right-4">
        <button onClick={handleLogout} className="text-pink-600 hover:text-pink-700 transition-colors">
          Cerrar Sesión
        </button>
      </div>

      <div className="container mx-auto max-w-3xl pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">¡Hola, {userName}!</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-purple-300 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700">
              {welcomeMessage || "Gracias por confirmar tu asistencia. Nos vemos pronto."}
            </p>
          </div>

          <div className="bg-pink-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4 text-pink-600">
              <Calendar size={24} />
              <span className="text-xl font-medium">9 de Agosto, 2025</span>
            </div>
            <p className="text-center text-gray-600">
              La galería de fotos estará disponible después del evento. Podrás subir y ver fotos a partir del 10 de
              agosto.
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-center text-purple-600 mb-4">Recordatorio</h3>
            <div className="flex items-center justify-center gap-2 mb-4 text-purple-600">
              <Clock size={20} />
              <span className="font-medium">Ceremonia: 13:00 hrs</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-purple-600">
              <Clock size={20} />
              <span className="font-medium">Recepción:  16:00 hrs</span>
            </div>
          </div>
        </motion.div>
      </div>
      <GalleryNav />
    </div>
  )
}
