"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { buscarInvitado } from "@/lib/invitados"
import { Check, Loader2, User, AlertCircle, MessageCircle, Calendar } from "lucide-react"

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

  // Estados para la búsqueda de invitados
  const [buscandoInvitado, setBuscandoInvitado] = useState(false)
  const [invitadoEncontrado, setInvitadoEncontrado] = useState<{
    encontrado: boolean
    nombre?: string
    cupo?: number
    similitud?: number
  }>({ encontrado: false })

  // Buscar invitado cuando cambie el nombre
  useEffect(() => {
    const buscarEnLista = async () => {
      if (formState.name.length >= 3) {
        setBuscandoInvitado(true)
        const resultado = await buscarInvitado(formState.name)
        setInvitadoEncontrado(resultado)

        // Si encontramos al invitado, actualizar el cupo automáticamente
        if (resultado.encontrado && resultado.cupo) {
          setFormState((prev) => ({
            ...prev,
            guests: resultado.cupo.toString(),
          }))
        }
        setBuscandoInvitado(false)
      } else {
        setInvitadoEncontrado({ encontrado: false })
        setFormState((prev) => ({ ...prev, guests: "1" }))
      }
    }

    const timeoutId = setTimeout(buscarEnLista, 500) // Debounce de 500ms
    return () => clearTimeout(timeoutId)
  }, [formState.name])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setError(null)

    try {
      // Validaciones básicas
      if (!formState.name || !formState.email) {
        setError("Nombre y correo electrónico son requeridos")
        setStatus("error")
        return
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formState.email)) {
        setError("Por favor ingresa un correo electrónico válido")
        setStatus("error")
        return
      }

      // Verificar invitado en la lista si no se verificó antes
      let invitadoInfo = invitadoEncontrado
      if (!invitadoInfo || !invitadoInfo.encontrado) {
        invitadoInfo = await buscarInvitado(formState.name)
      }

      // Validar cupo de invitados
      const numInvitados = Number.parseInt(formState.guests)
      if (invitadoInfo.encontrado && invitadoInfo.cupo) {
        if (numInvitados > invitadoInfo.cupo) {
          setError(`El cupo máximo para ${invitadoInfo.nombre} es de ${invitadoInfo.cupo} personas`)
          setStatus("error")
          return
        }
      }

      // Construir mensaje para WhatsApp
      const nombreMostrar = invitadoInfo.encontrado ? invitadoInfo.nombre : formState.name
      const estadoInvitado = invitadoInfo.encontrado ? "✅ Verificado en lista" : "⚠️ Registro adicional"

      let message = `🌸 *Confirmación XV Años de Tamy* 🌸\n\n`
      message += `*Nombre:* ${formState.name}\n`
      message += `*Email:* ${formState.email}\n`
      if (formState.phone) {
        message += `*Teléfono:* ${formState.phone}\n`
      }
      message += `*Invitados:* ${formState.guests} personas\n`
      message += `*Estado:* ${estadoInvitado}\n`
      if (formState.message) {
        message += `*Mensaje:* "${formState.message}"\n`
      }
      message += `\n📅 *Evento:* 9 de Agosto, 2025\n`
      message += `⛪ *Ceremonia:* 13:00 hrs - Iglesia San Judas Tadeo\n`
      message += `🎉 *Recepción:* 15:30 hrs - Rivento Salón y Jardín\n\n`
      message += `¡Gracias por confirmar! Esperamos verte en la celebración ✨`

      // Número de WhatsApp de la anfitriona (formato correcto)
      const phoneNumber = "5217711279436" // +52 1 771 127 9436

      // Abrir WhatsApp
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank")

      // Mostrar mensaje de éxito
      setStatus("success")
      setSuccessMessage(`¡Gracias ${nombreMostrar}! Tu confirmación ha sido enviada por WhatsApp.`)

      // Limpiar formulario
      setFormState({
        name: "",
        email: "",
        phone: "",
        guests: "1",
        message: "",
      })
      setInvitadoEncontrado({ encontrado: false })
    } catch (err) {
      setStatus("error")
      setError("Hubo un error al procesar tu confirmación. Por favor intenta de nuevo.")
      console.error(err)
    }
  }

  // Generar opciones de invitados basado en el cupo encontrado
  const generarOpcionesInvitados = () => {
    const maxInvitados = invitadoEncontrado.encontrado && invitadoEncontrado.cupo ? invitadoEncontrado.cupo : 6

    const opciones = []
    for (let i = 1; i <= maxInvitados; i++) {
      opciones.push(
        <option key={i} value={i.toString()}>
          {i} {i === 1 ? "persona" : "personas"}
        </option>,
      )
    }
    return opciones
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center mb-8 bg-amber-50 border border-amber-200 rounded-xl p-4 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center mb-2">
            <Calendar size={20} className="text-amber-600 mr-2" />
            <span className="text-amber-700 font-bold">Fecha Límite de Confirmación</span>
          </div>
          <p className="text-amber-700 font-medium">
            Por favor confirma tu asistencia antes del <span className="font-bold">27 de Julio de 2025</span>
          </p>
          <p className="text-amber-600 text-sm mt-1">
            Esto nos ayudará a organizar mejor todos los detalles para que tengas una experiencia perfecta
          </p>
        </motion.div>

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

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center mb-2">
                <MessageCircle size={20} className="text-blue-600 mr-2" />
                <span className="text-blue-700 font-medium">Notificación por WhatsApp</span>
              </div>
              <p className="text-blue-600 text-sm">
                Recibirás los detalles de confirmación por WhatsApp{" "}
                {formState.phone ? "en tu número registrado" : "si proporcionaste tu teléfono"}. La anfitriona también
                será notificada automáticamente.
              </p>
            </div>

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
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <div className="relative">
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
                  {buscandoInvitado && (
                    <div className="absolute right-3 top-2">
                      <Loader2 size={20} className="animate-spin text-pink-500" />
                    </div>
                  )}
                </div>

                {/* Indicador de estado del invitado */}
                {formState.name.length >= 3 && !buscandoInvitado && (
                  <div className="mt-2">
                    {invitadoEncontrado.encontrado ? (
                      <div className="flex items-center text-green-600 text-sm">
                        <User size={16} className="mr-2" />
                        <span>
                          ✓ Invitado encontrado: <strong>{invitadoEncontrado.nombre}</strong>
                          {invitadoEncontrado.similitud && invitadoEncontrado.similitud < 100 && (
                            <span className="text-gray-500">
                              {" "}
                              (similitud: {Math.round(invitadoEncontrado.similitud)}%)
                            </span>
                          )}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center text-amber-600 text-sm">
                        <AlertCircle size={16} className="mr-2" />
                        <span>No se encontró en la lista de invitados. Puedes continuar con el registro.</span>
                      </div>
                    )}
                  </div>
                )}
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
                  Teléfono (WhatsApp)
                  <span className="text-green-600 text-xs ml-1">📱 Para recibir confirmación</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="55 1234 5678"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de invitados
                  {invitadoEncontrado.encontrado && invitadoEncontrado.cupo && (
                    <span className="text-green-600 font-medium">
                      (máximo {invitadoEncontrado.cupo} para {invitadoEncontrado.nombre})
                    </span>
                  )}
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formState.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  {generarOpcionesInvitados()}
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

            {/* Información sobre WhatsApp */}
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <MessageCircle size={20} className="text-green-600 mr-2" />
                <span className="text-green-700 font-medium">Confirmación por WhatsApp</span>
              </div>
              <p className="text-green-600 text-sm">
                Recibirás un mensaje de confirmación por WhatsApp con todos los detalles del evento. Si proporcionas tu
                número de teléfono, te enviaremos la confirmación directamente.
              </p>
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
