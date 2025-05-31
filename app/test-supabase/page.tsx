"use client"

import { useState } from "react"

export default function TestSupabase() {
  const [result, setResult] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const checkEnvironmentVariables = () => {
    const vars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }

    let resultText = "🔍 Variables de entorno:\n\n"

    Object.entries(vars).forEach(([key, value]) => {
      if (value) {
        resultText += `✅ ${key}: Configurada (${value.substring(0, 20)}...)\n`
      } else {
        resultText += `❌ ${key}: NO ENCONTRADA\n`
      }
    })

    if (!vars.NEXT_PUBLIC_SUPABASE_URL || !vars.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      resultText += `\n❌ PROBLEMA: Faltan variables de entorno críticas.

📝 SOLUCIÓN:
1. Crea un archivo .env.local en la raíz de tu proyecto
2. Agrega estas líneas:

NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio_aqui

3. Reinicia el servidor de desarrollo (npm run dev)
4. Recarga esta página`
    } else {
      resultText += `\n✅ Variables de entorno configuradas correctamente`
    }

    setResult(resultText)
  }

  const testConnection = async () => {
    setLoading(true)
    setResult("🔄 Probando conexión...")

    try {
      // Verificar variables de entorno primero
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        setResult(`❌ Variables de entorno faltantes:
- NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? "✅" : "❌"}
- NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? "✅" : "❌"}

Por favor configura estas variables en tu archivo .env.local`)
        setLoading(false)
        return
      }

      setResult("🔄 Variables OK, creando cliente Supabase...")

      // Importar dinámicamente para evitar errores de SSR
      const { createClient } = await import("@/lib/supabase")

      setResult("🔄 Cliente creado, probando conexión...")

      const supabase = createClient()

      if (!supabase) {
        setResult("❌ Error: No se pudo crear el cliente de Supabase")
        setLoading(false)
        return
      }

      setResult("🔄 Probando consulta a la base de datos...")

      // Test básico de conexión - intentar obtener información del proyecto
      const { data, error } = await supabase.from("users").select("count").limit(1)

      if (error) {
        setResult(`❌ Error de conexión: ${error.message}

🔍 Posibles causas:
1. URL o clave incorrectas
2. Tabla 'users' no existe
3. Configuración de RLS (Row Level Security)
4. Proyecto de Supabase pausado o eliminado

💡 Soluciones:
1. Verifica que tu proyecto de Supabase esté activo
2. Ejecuta los scripts SQL para crear las tablas
3. Verifica las credenciales en tu dashboard de Supabase`)
      } else {
        setResult(`✅ ¡Conexión exitosa a Supabase!

📊 Información:
- Cliente creado correctamente
- Conexión a la base de datos establecida
- Tabla 'users' accesible

🎉 Todo está funcionando correctamente`)
      }
    } catch (error: any) {
      setResult(`❌ Error inesperado: ${error.message}

🔍 Detalles del error:
${error.stack || "No hay stack trace disponible"}

💡 Verifica:
1. Que las variables de entorno estén configuradas
2. Que el proyecto de Supabase esté activo
3. Que las URLs sean correctas
4. Que no haya errores de sintaxis en .env.local`)
    } finally {
      setLoading(false)
    }
  }

  const testCreateUser = async () => {
    setLoading(true)
    setResult("🔄 Probando crear usuario...")

    try {
      const { createClient } = await import("@/lib/supabase")
      const supabase = createClient()

      if (!supabase) {
        setResult("❌ Error: No se pudo crear el cliente de Supabase")
        setLoading(false)
        return
      }

      const testUsername = "test_user_" + Date.now()

      const { data, error } = await supabase.rpc("create_user_with_password", {
        p_email: "test@example.com",
        p_name: "Usuario Test",
        p_phone: "123456789",
        p_user_type: "guest",
        p_username: testUsername,
        p_password: "test123",
      })

      if (error) {
        setResult(`❌ Error creando usuario: ${error.message}

🔍 Posibles causas:
1. La función 'create_user_with_password' no existe
2. Permisos insuficientes
3. Extensión pgcrypto no habilitada
4. Tablas no creadas

💡 Solución:
Ejecuta los scripts SQL proporcionados anteriormente para crear las tablas y funciones necesarias.`)
      } else {
        setResult(`✅ Usuario creado exitosamente!

📊 Detalles:
- ID del usuario: ${data}
- Username: ${testUsername}
- Función SQL funcionando correctamente

🎉 La base de datos está completamente configurada`)
      }
    } catch (error: any) {
      setResult(`❌ Error: ${error.message}

🔍 Stack trace:
${error.stack || "No disponible"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Test Supabase</h1>

        <div className="space-y-4">
          <button
            onClick={checkEnvironmentVariables}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            🔍 Verificar Variables de Entorno
          </button>

          <button
            onClick={testConnection}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "🔄 Probando..." : "🔗 Probar Conexión"}
          </button>

          <button
            onClick={testCreateUser}
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? "🔄 Creando..." : "👤 Probar Crear Usuario"}
          </button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded border">
            <h3 className="font-semibold mb-2">Resultado:</h3>
            <pre className="text-sm whitespace-pre-wrap font-mono overflow-x-auto">{result}</pre>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 rounded border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Pasos para configurar Supabase:</h3>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. Crea un proyecto en supabase.com</li>
            <li>2. Ve a Settings → API</li>
            <li>3. Copia la URL y la clave anónima</li>
            <li>4. Crea .env.local con las variables</li>
            <li>5. Ejecuta los scripts SQL para crear tablas</li>
            <li>6. Reinicia el servidor y prueba la conexión</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
