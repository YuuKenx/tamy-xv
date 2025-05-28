"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase"

export default function TestSupabase() {
  const [result, setResult] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const supabase = createClient()

      // Test básico de conexión
      const { data, error } = await supabase.from("users").select("count").limit(1)

      if (error) {
        setResult(`Error: ${error.message}`)
      } else {
        setResult("✅ Conexión exitosa a Supabase")
      }
    } catch (error) {
      setResult(`Error de conexión: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const testCreateUser = async () => {
    setLoading(true)
    try {
      const supabase = createClient()

      const { data, error } = await supabase.rpc("create_user_with_password", {
        p_email: "test@example.com",
        p_name: "Usuario Test",
        p_phone: "123456789",
        p_user_type: "guest",
        p_username: "test_user_" + Date.now(),
        p_password: "test123",
      })

      if (error) {
        setResult(`Error creando usuario: ${error.message}`)
      } else {
        setResult(`✅ Usuario creado exitosamente. ID: ${data}`)
      }
    } catch (error) {
      setResult(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Test Supabase</h1>

        <div className="space-y-4">
          <button
            onClick={testConnection}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Probando..." : "Probar Conexión"}
          </button>

          <button
            onClick={testCreateUser}
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? "Creando..." : "Probar Crear Usuario"}
          </button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded border">
            <h3 className="font-semibold mb-2">Resultado:</h3>
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
