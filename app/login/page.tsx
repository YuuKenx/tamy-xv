"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { loginAction, getWelcomeMessage } from "@/app/actions"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [welcomeMessage, setWelcomeMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      const message = await getWelcomeMessage()
      setWelcomeMessage(message)
    }

    fetchWelcomeMessage()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const result = await loginAction({
        username,
        password,
      })

      if (result.error) {
        setError(result.error)
        setLoading(false)
        return
      }

      if (result.success && result.session) {
        // Guardar sesión en localStorage
        localStorage.setItem("session_token", result.session.sessionToken)
        localStorage.setItem("user_id", result.session.userId)
        localStorage.setItem("guest_id", result.session.guestId)
        localStorage.setItem("user_type", result.session.userType)
        localStorage.setItem("user_name", result.session.fullName)
        localStorage.setItem("gallery_enabled", String(result.session.galleryEnabled))

        console.log("Login exitoso, redirigiendo...", { userType: result.session.userType })

        // Redirigir según tipo de usuario
        console.log("Tipo de usuario:", result.session.userType)
        if (
          result.session.userType === "admin" ||
          result.session.userType === "host" ||
          result.session.userType === "super_admin"
        ) {
          console.log("Redirigiendo a admin dashboard")
          router.push("/admin/dashboard")
        } else if (result.session.galleryEnabled) {
          console.log("Redirigiendo a galería")
          router.push("/gallery/upload")
        } else {
          console.log("Redirigiendo a sala de espera")
          router.push("/waiting-room")
        }
      } else {
        setError("Error desconocido al iniciar sesión")
      }
    } catch (error) {
      console.error("Error de login:", error)
      setError("Error al iniciar sesión. Intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-purple-100 p-4">
      <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center text-pink-600 hover:text-pink-700 transition-colors">
          <ArrowLeft size={20} className="mr-1" />
          <span>Volver</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">Iniciar Sesión</h1>

        <p className="text-gray-600 text-center mb-8">Accede para ver y compartir fotos del evento</p>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Tu nombre de usuario"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Tu contraseña"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>¿No tienes una cuenta? Confirma tu asistencia para recibir tus credenciales.</p>
        </div>
      </div>
    </div>
  )
}
