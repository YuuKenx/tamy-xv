"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Upload, ImageIcon, X, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function UploadGallery() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [captions, setCaptions] = useState<{ [key: number]: string }>({})
  const [uploadedPhotos, setUploadedPhotos] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const sessionToken = localStorage.getItem("session_token")
      const userType = localStorage.getItem("user_type")
      const userName = localStorage.getItem("user_name")
      const userId = localStorage.getItem("user_id")

      if (!sessionToken || userType !== "guest") {
        router.push("/login")
        return
      }

      setUser({ id: userId, name: userName, type: userType })
      loadUserPhotos(userId!)
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const loadUserPhotos = async (userId: string) => {
    try {
      const supabase = createClient()
      const { data: photos, error } = await supabase
        .from("photos")
        .select("*")
        .eq("user_id", userId)
        .order("uploaded_at", { ascending: false })

      if (error) throw error
      setUploadedPhotos(photos || [])
    } catch (error) {
      console.error("Error al cargar fotos:", error)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    if (imageFiles.length + selectedFiles.length > 10) {
      alert("Máximo 10 fotos por sesión")
      return
    }

    setSelectedFiles((prev) => [...prev, ...imageFiles])
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
    setCaptions((prev) => {
      const newCaptions = { ...prev }
      delete newCaptions[index]
      return newCaptions
    })
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return

    setUploading(true)
    try {
      const supabase = createClient()

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        const fileExt = file.name.split(".").pop()
        const fileName = `${user.id}/${Date.now()}-${i}.${fileExt}`

        // Subir archivo a Storage
        const { error: uploadError } = await supabase.storage.from("event-photos").upload(fileName, file)

        if (uploadError) throw uploadError

        // Guardar registro en base de datos
        const { error: dbError } = await supabase.from("photos").insert({
          user_id: user.id,
          filename: fileName,
          original_name: file.name,
          file_path: fileName,
          caption: captions[i] || null,
          status: "pending",
        })

        if (dbError) throw dbError
      }

      // Limpiar formulario
      setSelectedFiles([])
      setCaptions({})

      // Recargar fotos
      await loadUserPhotos(user.id)

      alert("¡Fotos subidas exitosamente! Están pendientes de aprobación.")
    } catch (error) {
      console.error("Error al subir fotos:", error)
      alert("Error al subir fotos. Intenta de nuevo.")
    } finally {
      setUploading(false)
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Aprobada"
      case "rejected":
        return "Rechazada"
      default:
        return "Pendiente"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-pink-200 border-t-pink-600 rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-3xl font-bold text-pink-600 mb-2">Galería de Fotos</h1>
          <p className="text-gray-600 mb-8">Hola {user?.name}, comparte tus fotos del evento</p>

          {/* Subir nuevas fotos */}
          <div className="border-2 border-dashed border-pink-300 rounded-xl p-8 mb-8">
            <div className="text-center">
              <Upload size={48} className="mx-auto text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Subir Fotos</h3>
              <p className="text-gray-500 mb-4">Selecciona hasta 10 fotos para compartir</p>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors cursor-pointer"
              >
                Seleccionar Fotos
              </label>
            </div>
          </div>

          {/* Fotos seleccionadas */}
          {selectedFiles.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Fotos Seleccionadas ({selectedFiles.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium truncate">{file.name}</span>
                      <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                        <X size={16} />
                      </button>
                    </div>
                    <textarea
                      placeholder="Descripción de la foto (opcional)"
                      value={captions[index] || ""}
                      onChange={(e) => setCaptions((prev) => ({ ...prev, [index]: e.target.value }))}
                      className="w-full p-2 border rounded text-sm"
                      rows={2}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-70"
              >
                {uploading ? "Subiendo..." : `Subir ${selectedFiles.length} foto(s)`}
              </button>
            </div>
          )}

          {/* Fotos subidas */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Mis Fotos Subidas ({uploadedPhotos.length})</h3>

            {uploadedPhotos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                <p>Aún no has subido fotos</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploadedPhotos.map((photo) => (
                  <div key={photo.id} className="border rounded-lg overflow-hidden">
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      <ImageIcon size={32} className="text-gray-400" />
                    </div>
                    <div className="p-3">
                      <p className="text-sm text-gray-600 mb-2">{photo.caption || "Sin descripción"}</p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(photo.status)}`}
                      >
                        {getStatusText(photo.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
