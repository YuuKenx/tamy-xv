"use client"
import { useState } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { sendRsvp } from "@/app/actions"
import { Check, Loader2 } from "lucide-react"

const RsvpForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    message: "",
  })

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string>("")
  const [credentials, setCredentials] = useState<{ username: string; password: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setError(null)

    try {
      const result = await sendRsvp(formState)

      if (result.success) {
        setStatus("success")
        setSuccessMessage(result.message || "¡Gracias por confirmar tu asistencia!")

        if (result.credentials) {
          setCredentials(result.credentials)
        }

        setFormState({
          name: "",
          email: "",
          phone: "",
          guests: "1",
          message: "",
        })
      } else {
        setStatus("error")
        setError(result.message || "Hubo un error al enviar tu confirmación. Por favor intenta de nuevo.")
      }
    } catch (err) {
      setStatus("error")
      setError("Hubo un error al enviar tu confirmación. Por favor intenta de nuevo.")
      console.error(err)
    }
  }

  return (
    <section id="rsvp" className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-12"
        >
          Confirma tu Asistencia
        </motion.h2>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">¡Gracias por confirmar!</h3>
            <div className="text-green-600 mb-6">{successMessage}</div>

            {credentials && (
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6 max-w-md mx-auto">
                <h4 className="font-bold text-gray-700 mb-3">Tus credenciales de acceso</h4>
                <div className="text-left mb-4">
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Usuario:</span> {credentials.username}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Contraseña:</span> {credentials.password}
                  </p>
                </div>
                <p className="text-sm text-pink-600">
                  Guarda estas credenciales para acceder a la galería de fotos después del evento.
                </p>
              </div>
            )}

            <p className="text-gray-600">Nos vemos el 9 de agosto para celebrar juntos este día tan especial.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Tu número de teléfono"
                />
              </div>

              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de invitados
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formState.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="1">1 persona</option>
                  <option value="2">2 personas</option>
                  <option value="3">3 personas</option>
                  <option value="4">4 personas</option>
                  <option value="5">5 personas</option>
                  <option value="6">6 personas</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje (opcional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="¿Algún mensaje especial para Tamara?"
              ></textarea>
            </div>

            {error && <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-md">{error}</div>}

            <div className="text-center">
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors shadow-md disabled:opacity-70 flex items-center justify-center mx-auto"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={20} className="animate-spin mr-2" />
                    Enviando...
                  </>
                ) : (
                  "Confirmar Asistencia"
                )}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  )
}

export default RsvpForm
