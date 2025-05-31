"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"

const FamilyPhotos = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState(0)

  const photos = [
    {
      id: 1,
      src: "/images/familia1.jpg",
      fallback: "/placeholder.svg?height=600&width=800",
      alt: "Familia reunida",
      caption: "Momentos especiales en familia",
    },
    {
      id: 2,
      src: "/images/familia2.jpg",
      fallback: "/placeholder.svg?height=600&width=800",
      alt: "Celebración familiar",
      caption: "Celebrando juntos",
    },
    {
      id: 3,
      src: "/images/familia3.jpg",
      fallback: "/placeholder.svg?height=600&width=800",
      alt: "Reunión familiar",
      caption: "Unidos siempre",
    },
    {
      id: 4,
      src: "/images/familia4.jpg",
      fallback: "/placeholder.svg?height=600&width=800",
      alt: "Momentos en familia",
      caption: "Recuerdos inolvidables",
    },
    {
      id: 5,
      src: "/images/familia5.jpg",
      fallback: "/placeholder.svg?height=600&width=800",
      alt: "Familia feliz",
      caption: "Sonrisas que perduran",
    },
    {
      id: 6,
      src: "/images/familia6.jpg",
      fallback: "/placeholder.svg?height=600&width=800",
      alt: "Tiempo en familia",
      caption: "Amor incondicional",
    },
    {
      id: 7,
      src: "/images/familia7.jpg",
      fallback: "/placeholder.svg?height=600&width=800",
      alt: "Familia unida",
      caption: "Lazos que nos unen",
    },
    {
      id: 8,
      src: "/images/familia8.jpg",
      fallback: "/placeholder.svg?height=600&width=800",
      alt: "Momentos familiares",
      caption: "Tesoros del corazón",
    },
    {
      id: 9,
      src: "/images/familia9.jpg",
      fallback: "/placeholder.svg?height=600&width=800",
      alt: "Familia completa",
      caption: "Nuestra historia",
    },
    {
      id: 10,
      src: "/images/familia10.jpg",
      fallback: "/placeholder.svg?height=600&width=800",
      alt: "Familia querida",
      caption: "Amor eterno",
    },
  ]

  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }))
  }

  const getImageSrc = (index: number) => {
    return imageErrors[index] ? photos[index].fallback : photos[index].src
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
  }

  const openModal = (index: number) => {
    setModalImage(index)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto"
  }

  const nextModalImage = () => {
    setModalImage((prevIndex) => (prevIndex + 1) % photos.length)
  }

  const prevModalImage = () => {
    setModalImage((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
  }

  // Navegación con teclado en el modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return

      if (e.key === "ArrowRight") nextModalImage()
      if (e.key === "ArrowLeft") prevModalImage()
      if (e.key === "Escape") closeModal()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen])

  // Carrusel automático (se pausa cuando el modal está abierto)
  useEffect(() => {
    if (isModalOpen) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, isModalOpen])

  return (
    <section className="py-10 md:py-20 bg-pink-50 rounded-3xl my-8 md:my-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-pink-600 mb-8 md:mb-12"
        >
          Nuestra Familia
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-xl shadow-xl">
            <div className="relative aspect-[4/3] bg-pink-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => openModal(currentIndex)}
                >
                  <img
                    src={getImageSrc(currentIndex) || "/placeholder.svg"}
                    alt={photos[currentIndex].alt}
                    className="w-full h-full object-contain bg-pink-50"
                    onError={() => handleImageError(currentIndex)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm md:text-lg font-medium">{photos[currentIndex].caption}</p>
                        <p className="text-white/80 text-xs md:text-sm">
                          {currentIndex + 1} de {photos.length}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openModal(currentIndex)
                        }}
                        className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                        aria-label="Ver imagen completa"
                      >
                        <Maximize2 size={16} className="text-white md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Botones de navegación */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 p-2 md:p-3 rounded-full shadow-md z-10 transition-colors"
            aria-label="Foto anterior"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 p-2 md:p-3 rounded-full shadow-md z-10 transition-colors"
            aria-label="Siguiente foto"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </button>

          {/* Indicadores de puntos */}
          <div className="flex justify-center mt-4 md:mt-6 gap-1 md:gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-pink-600" : "bg-pink-300"
                }`}
                aria-label={`Ir a la foto ${index + 1}`}
              />
            ))}
          </div>

          {/* Miniaturas */}
          <div className="mt-6 md:mt-8 grid grid-cols-5 md:grid-cols-10 gap-1 md:gap-2">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                  index === currentIndex
                    ? "ring-2 ring-pink-500 scale-105"
                    : "hover:scale-105 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={getImageSrc(index) || "/placeholder.svg"}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(index)}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de imagen completa */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-pink-300 z-10"
              onClick={closeModal}
              aria-label="Cerrar galería"
            >
              <X size={24} className="md:w-8 md:h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                prevModalImage()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full z-10"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>

            <motion.div
              key={modalImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImageSrc(modalImage) || "/placeholder.svg"}
                alt={photos[modalImage].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
                onError={() => handleImageError(modalImage)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6 text-white rounded-b-lg">
                <p className="text-sm md:text-lg font-medium">{photos[modalImage].caption}</p>
                <p className="text-xs md:text-sm opacity-80">
                  {modalImage + 1} de {photos.length}
                </p>
              </div>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                nextModalImage()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full z-10"
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default FamilyPhotos
