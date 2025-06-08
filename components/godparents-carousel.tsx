"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const GodparentsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const godparents = [
    {
      id: 1,
      role: "Pastel",
      name: "Jacqueline Hernández Callejas",
      icon: "🎂",
      gif: "/placeholder.svg?height=100&width=100",
      color: "from-pink-400 to-pink-600",
    },
    {
      id: 2,
      role: "Mesa de dulces",
      name: "Blanca Margarita Hernández Callejas y Marisela Callejas Téllez",
      icon: "🍭",
      gif: "/placeholder.svg?height=100&width=100",
      color: "from-purple-400 to-purple-600",
    },
    {
      id: 3,
      role: "Letras",
      name: "Gabriela María Ríos Albarrán",
      icon: "✨",
      gif: "/placeholder.svg?height=100&width=100",
      color: "from-rose-400 to-rose-600",
    },
    {
      id: 4,
      role: "Última muñeca",
      name: "Antonia Damiana Galván González",
      icon: "🪆",
      gif: "/placeholder.svg?height=100&width=100",
      color: "from-indigo-400 to-indigo-600",
    },
    {
      id: 5,
      role: "Vals",
      name: "José Andrés Galván Vargas",
      icon: "💃",
      gif: "/placeholder.svg?height=100&width=100",
      color: "from-emerald-400 to-emerald-600",
    },
  ]

  // Auto-scroll del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % godparents.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [godparents.length])

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-pink-50 rounded-3xl my-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Nuestros Padrinos</h2>
          <p className="text-lg text-pink-500 max-w-2xl mx-auto">
            Con amor y gratitud a quienes nos acompañan en este día tan especial
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-purple-300 mx-auto mt-6"></div>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Carrusel principal */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                width: `${(godparents.length * 100) / 3}%`,
              }}
            >
              {/* Duplicamos los elementos para efecto infinito */}
              {[...godparents, ...godparents, ...godparents].map((godparent, index) => (
                <motion.div
                  key={`${godparent.id}-${index}`}
                  className="w-1/3 px-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div
                      className={`h-32 bg-gradient-to-r ${godparent.color} flex items-center justify-center relative`}
                    >
                      <div className="text-6xl">{godparent.icon}</div>
                      <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{godparent.role}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{godparent.name}</p>
                    </div>

                    <div className="px-6 pb-6">
                      <div className="w-full h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img
                          src={godparent.gif || "/placeholder.svg"}
                          alt={`${godparent.role} animation`}
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-8 gap-2">
            {godparents.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-pink-600" : "bg-pink-300"
                }`}
                aria-label={`Ir al padrino ${index + 1}`}
              />
            ))}
          </div>

          {/* Texto de agradecimiento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
              <p className="text-gray-700 italic text-lg">
                "Gracias por ser parte de este sueño y por hacer posible que cada detalle de esta celebración sea
                perfecto. Su amor y apoyo hacen que este día sea verdaderamente mágico."
              </p>
              <p className="text-pink-600 font-medium mt-4">Con todo nuestro cariño ✨</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default GodparentsCarousel
