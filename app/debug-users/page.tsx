"use client"

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"

const DebugUsersPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const supabase = createClient()

      if (!supabase) {
        setError("No se pudo conectar a Supabase")
        setLoading(false)
        return
      }

      // Obtener todos los usuarios sin filtros
      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false })

      console.log("Datos de usuarios cargados:", { usersData, usersError })

      if (usersError) {
        console.error("Error cargando usuarios:", usersError)
        setError(`Error: ${usersError.message}`)
        setUsers([])
      } else {
        setUsers(usersData || [])
        setError(null)
      }
    } catch (error) {
      console.error("Error inesperado:", error)
      setError("Error inesperado al cargar usuarios")
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Cargando usuarios...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Debug Users</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.email} - {user.id}
            </li>
          ))}
        </ul>
      ) : (
        <div>No hay usuarios.</div>
      )}
    </div>
  )
}

export default DebugUsersPage
