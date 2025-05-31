"use client"
import { useState } from "react"
import { createClient } from "@/lib/supabase"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function DebugUsers() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadUsers = async () => {
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      if (!supabase) {
        setError("Error de conexión a Supabase")
        setLoading(false)
        return
      }

      const { data, error: queryError } = await supabase
        .from("users")
        .select("id, username, email, name, user_type, is_active, created_at")
        .order("created_at", { ascending: false })

      if (queryError) {
        setError(`Error: ${queryError.message}`)
        setLoading(false)
        return
      }

      setUsers(data || [])
    } catch (err: any) {
      setError(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testPassword = async (username: string, password: string) => {
    try {
      const supabase = createClient()
      if (!supabase) return

      const { data, error } = await supabase.rpc("verify_password", {
        input_username: username,
        input_password: password,
      })

      alert(`Verificación de contraseña para ${username}: ${data ? "✅ Correcta" : "❌ Incorrecta"}`)
    } catch (err: any) {
      alert(`Error: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center text-pink-600 hover:text-pink-700 transition-colors">
            <ArrowLeft size={20} className="mr-1" />
            <span>Volver</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Debug: Usuarios en la Base de Datos</h1>

          <button
            onClick={loadUsers}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 mb-6"
          >
            {loading ? "Cargando..." : "Cargar Usuarios"}
          </button>

          {error && <div className="bg-red-50 text-red-600 p-4 rounded mb-6">{error}</div>}

          {users.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Username</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Tipo</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Activo</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Creado</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="border border-gray-300 px-4 py-2 text-xs">{user.id}</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono">{user.username}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            user.user_type === "super_admin"
                              ? "bg-purple-100 text-purple-600"
                              : user.user_type === "host"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {user.user_type}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            user.is_active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                          }`}
                        >
                          {user.is_active ? "Sí" : "No"}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          onClick={() => {
                            const password = prompt(`Ingresa la contraseña para probar ${user.username}:`)
                            if (password) testPassword(user.username, password)
                          }}
                          className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                        >
                          Test Password
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {users.length === 0 && !loading && !error && (
            <div className="text-center py-8 text-gray-500">
              Haz clic en "Cargar Usuarios" para ver los usuarios en la base de datos
            </div>
          )}
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">💡 Pasos para diagnosticar:</h3>
          <ol className="text-sm text-yellow-700 space-y-1">
            <li>1. Haz clic en "Cargar Usuarios" para ver todos los usuarios</li>
            <li>2. Verifica que el usuario "red" existe y está activo</li>
            <li>3. Usa el botón "Test Password" para verificar la contraseña</li>
            <li>4. Si el usuario no existe, créalo usando el formulario RSVP</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
