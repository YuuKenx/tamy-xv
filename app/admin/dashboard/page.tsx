"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, X, Trash2, ImageIcon, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [pendingPhotos, setPendingPhotos] = useState<any[]>([])
  const [allPhotos, setAllPhotos] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<"pending" | "all" | "users">("pending")
  const [supabase, setSupabase] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        const { createClient } = await import("@/lib/supabase")
        const client = createClient()
        setSupabase(client)
      } catch (error) {
        console.error("Error initializing Supabase:", error)
        router.push("/")
      }
    }

    initializeSupabase()
  }, [router])

  useEffect(() => {
    if (!supabase) return

    const checkAuth = () => {
      const sessionToken = localStorage.getItem("session_token")
      const userType = localStorage.getItem("user_type")
      const userName = localStorage.getItem("user_name")
      const userId = localStorage.getItem("user_id")

      if (!sessionToken || !["host", "super_admin"].includes(userType || "")) {
        router.push("/login")
        return
      }

      setUser({ id: userId, name: userName, type: userType })
      loadData()
      setLoading(false)
    }

    checkAuth()
  }, [router, supabase])

  const loadData = async () => {
    if (!supabase) return

    try {
      // Cargar fotos pendientes
      const { data: pending } = await supabase
        .from("photos")
        .select(`
          *,
          users!inner(name, email)
        `)
        .eq("status", "pending")
        .order("uploaded_at", { ascending: false })

      setPendingPhotos(pending || [])

      // Cargar todas las fotos
      const { data: all } = await supabase
        .from("photos")
        .select(`
          *,
          users!inner(name, email)
        `)
        .order("uploaded_at", { ascending: false })

      setAllPhotos(all || [])

      // Cargar usuarios
      const { data: usersData } = await supabase.from("users").select("*").order("created_at", { ascending: false })

      setUsers(usersData || [])
    } catch (error) {
      console.error("Error al cargar datos:", error)
    }
  }

  const handlePhotoAction = async (photoId: string, action: "approved" | "rejected") => {
    if (!supabase) return

    try {
      const { error } = await supabase
        .from("photos")
        .update({
          status: action,
          reviewed_at: new Date().toISOString(),
          reviewed_by: user.id,
        })
        .eq("id", photoId)

      if (error) throw error

      // Recargar datos
      await loadData()

      alert(`Foto ${action === "approved" ? "aprobada" : "rechazada"} exitosamente`)
    } catch (error) {
      console.error("Error al actualizar foto:", error)
      alert("Error al procesar la acción")
    }
  }

  const handleDeletePhoto = async (photoId: string, filePath: string) => {
    if (!supabase) return
    if (!confirm("¿Estás seguro de eliminar esta foto permanentemente?")) return

    try {
      // Eliminar archivo del storage
      const { error: storageError } = await supabase.storage.from("event-photos").remove([filePath])

      if (storageError) throw storageError

      // Eliminar registro de la base de datos
      const { error: dbError } = await supabase.from("photos").delete().eq("id", photoId)

      if (dbError) throw dbError

      await loadData()
      alert("Foto eliminada exitosamente")
    } catch (error) {
      console.error("Error al eliminar foto:", error)
      alert("Error al eliminar la foto")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100"
      case "rejected":
        return "text-red-600 bg-red-100"
      default:
        return "text-yellow-600 bg-yellow-100"
    }
  }

  if (loading || !supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-pink-200 border-t-pink-600 rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center text-pink-600 hover:text-pink-700 transition-colors">
            <ArrowLeft size={20} className="mr-1" />
            <span>Volver al sitio</span>
          </Link>

          <button
            onClick={() => {
              localStorage.clear()
              router.push("/")
            }}
            className="text-gray-600 hover:text-gray-700"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-pink-600 mb-2">Panel de Administración</h1>
          <p className="text-gray-600 mb-8">Hola {user?.name}, gestiona las fotos y usuarios del evento</p>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("pending")}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                activeTab === "pending" ? "bg-white text-pink-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Fotos Pendientes ({pendingPhotos.length})
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                activeTab === "all" ? "bg-white text-pink-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Todas las Fotos ({allPhotos.length})
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                activeTab === "users" ? "bg-white text-pink-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Usuarios ({users.length})
            </button>
          </div>

          {/* Contenido de tabs */}
          {activeTab === "pending" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Fotos Pendientes de Aprobación</h2>
              {pendingPhotos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                  <p>No hay fotos pendientes</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingPhotos.map((photo) => (
                    <div key={photo.id} className="border rounded-lg overflow-hidden">
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        <ImageIcon size={32} className="text-gray-400" />
                      </div>
                      <div className="p-4">
                        <p className="font-medium text-gray-800">{photo.users.name}</p>
                        <p className="text-sm text-gray-600 mb-2">{photo.caption || "Sin descripción"}</p>
                        <p className="text-xs text-gray-500 mb-3">{new Date(photo.uploaded_at).toLocaleDateString()}</p>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => handlePhotoAction(photo.id, "approved")}
                            className="flex-1 bg-green-600 text-white py-2 px-3 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                          >
                            <Check size={16} className="mr-1" />
                            Aprobar
                          </button>
                          <button
                            onClick={() => handlePhotoAction(photo.id, "rejected")}
                            className="flex-1 bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
                          >
                            <X size={16} className="mr-1" />
                            Rechazar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "all" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Todas las Fotos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allPhotos.map((photo) => (
                  <div key={photo.id} className="border rounded-lg overflow-hidden">
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      <ImageIcon size={32} className="text-gray-400" />
                    </div>
                    <div className="p-4">
                      <p className="font-medium text-gray-800">{photo.users.name}</p>
                      <p className="text-sm text-gray-600 mb-2">{photo.caption || "Sin descripción"}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(photo.status)}`}>
                          {photo.status === "approved"
                            ? "Aprobada"
                            : photo.status === "rejected"
                              ? "Rechazada"
                              : "Pendiente"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(photo.uploaded_at).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        {photo.status === "pending" && (
                          <>
                            <button
                              onClick={() => handlePhotoAction(photo.id, "approved")}
                              className="flex-1 bg-green-600 text-white py-1 px-2 rounded text-sm hover:bg-green-700 transition-colors"
                            >
                              Aprobar
                            </button>
                            <button
                              onClick={() => handlePhotoAction(photo.id, "rejected")}
                              className="flex-1 bg-red-600 text-white py-1 px-2 rounded text-sm hover:bg-red-700 transition-colors"
                            >
                              Rechazar
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDeletePhoto(photo.id, photo.file_path)}
                          className="bg-gray-600 text-white py-1 px-2 rounded text-sm hover:bg-gray-700 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Usuarios Registrados</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Usuario</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Tipo</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Registro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.user_type === "super_admin"
                                ? "bg-purple-100 text-purple-600"
                                : user.user_type === "host"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {user.user_type === "super_admin"
                              ? "Super Admin"
                              : user.user_type === "host"
                                ? "Anfitrión"
                                : "Invitado"}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
