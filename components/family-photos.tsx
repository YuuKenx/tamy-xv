"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const FamilyPhotos = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Mock photo data - replace with actual photos
  const photos = [
    { id: 1, src: "/placeholder.svg?height=400&width=600", alt: "Familia reunida", caption: "Nuestra familia" },
    {
      id: 2,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Tamara con sus padres",
      caption: "Tamara con sus padres",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Tamara de pequeña",
      caption: "Recuerdos de la infancia",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Celebración familiar",
      caption: "Momentos especiales",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
  }

  return (
    <section className="py-20 bg-pink-50 rounded-3xl my-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-12"
        >
          Nuestra Familia
        </motion.h2>

        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden rounded-xl shadow-xl">
            <div className="relative aspect-[3/2] bg-pink-100">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={photos[currentIndex].src || "/placeholder.svg"}
                  alt={photos[currentIndex].alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                  <p className="text-lg font-medium">{photos[currentIndex].caption}</p>
                </div>
              </motion.div>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 p-2 rounded-full shadow-md z-10"
            aria-label="Foto anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 p-2 rounded-full shadow-md z-10"
            aria-label="Siguiente foto"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center mt-4 gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-pink-600" : "bg-pink-300"}`}
                aria-label={`Ir a la foto ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FamilyPhotos
