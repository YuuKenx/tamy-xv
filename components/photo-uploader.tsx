"use client"
import { useState } from "react"
import type React from "react"

import { Upload, X, Loader2 } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

// Componente simplificado para subir fotos
export default function PhotoUploader({ userId }: { userId: string }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Función para manejar la selección de archivos
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    if (imageFiles.length > 5) {
      setError("Máximo 5 fotos a la vez")
      return
    }

    setSelectedFiles(imageFiles)
    setError(null)
    setSuccess(null)
  }

  // Función para eliminar un archivo seleccionado
  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // Función para subir las fotos
  const uploadPhotos = async () => {
    if (selectedFiles.length === 0) {
      setError("No hay fotos seleccionadas")
      return
    }

    setUploading(true)
    setError(null)
    setSuccess(null)

    try {
      // Crear cliente de Supabase directamente
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      )

      console.log("Iniciando subida de", selectedFiles.length, "fotos")

      // Subir cada archivo
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        const fileExt = file.name.split(".").pop()
        const fileName = `${userId}/${Date.now()}-${i}.${fileExt}`

        console.log(`Subiendo archivo ${i + 1}/${selectedFiles.length}: ${fileName}`)

        // Subir archivo a Storage
        const { error: uploadError } = await supabase.storage.from("photos").upload(fileName, file)

        if (uploadError) {
          console.error(`Error al subir archivo ${i + 1}:`, uploadError)
          setError(`Error al subir ${file.name}: ${uploadError.message}`)
          setUploading(false)
          return
        }

        // Registrar en la base de datos
        const { error: dbError } = await supabase.from("photos").insert({
          user_id: userId,
          filename: fileName,
          original_name: file.name,
          file_path: fileName,
          status: "pending",
        })

        if (dbError) {
          console.error(`Error al registrar archivo ${i + 1}:`, dbError)
          setError(`Error al registrar ${file.name}: ${dbError.message}`)
          setUploading(false)
          return
        }
      }

      setSuccess(`${selectedFiles.length} fotos subidas correctamente`)
      setSelectedFiles([])
    } catch (err: any) {
      console.error("Error general:", err)
      setError(`Error: ${err.message || "Error desconocido"}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Subir Fotos</h2>

      {/* Mensajes de error o éxito */}
      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4">{error}</div>}

      {success && <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded mb-4">{success}</div>}

      {/* Selector de archivos */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">Haz clic para seleccionar fotos</p>
        <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="photo-upload"
          disabled={uploading}
        />
        <label
          htmlFor="photo-upload"
          className="mt-4 inline-block bg-pink-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-700 disabled:opacity-50"
        >
          Seleccionar Fotos
        </label>
      </div>

      {/* Lista de archivos seleccionados */}
      {selectedFiles.length > 0 && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Fotos seleccionadas ({selectedFiles.length})</h3>
          <ul className="space-y-2">
            {selectedFiles.map((file, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="truncate text-sm">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                  disabled={uploading}
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botón de subida */}
      <button
        onClick={uploadPhotos}
        disabled={uploading || selectedFiles.length === 0}
        className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 disabled:opacity-50 flex items-center justify-center"
      >
        {uploading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={18} />
            Subiendo...
          </>
        ) : (
          "Subir Fotos"
        )}
      </button>
    </div>
  )
}
