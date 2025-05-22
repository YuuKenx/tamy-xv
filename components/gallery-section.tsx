"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react"
import Image from "next/image"

const GallerySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Mock gallery data - replace with actual photos
  const galleryImages = [
    {
      id: 1,
      src: "/placeholder.svg?height=600&width=800&query=quinceañera celebration with pink decorations",
      alt: "Celebración de XV años",
      caption: "Celebrando momentos especiales",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=600&width=800&query=elegant ballroom with pink and gold decorations",
      alt: "Salón decorado",
      caption: "El lugar de la celebración",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=600&width=800&query=quinceañera dress in soft pink",
      alt: "Vestido de quinceañera",
      caption: "El vestido perfecto",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=600&width=800&query=quinceañera tiara and accessories",
      alt: "Accesorios",
      caption: "Detalles que brillan",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=600&width=800&query=quinceañera dancing with father",
      alt: "Baile con papá",
      caption: "Un momento inolvidable",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=600&width=800&query=quinceañera cake with elegant decorations",
      alt: "Pastel de XV años",
      caption: "Dulce celebración",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % galleryImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 + galleryImages.length) % galleryImages.length)
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
    setModalImage((prevIndex) => (prevIndex + 1) % galleryImages.length)
  }

  const prevModalImage = () => {
    setModalImage((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length)
  }

  // Handle keyboard navigation
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

  // Visible images based on current index
  const visibleImages = [
    galleryImages[currentIndex % galleryImages.length],
    galleryImages[(currentIndex + 1) % galleryImages.length],
    galleryImages[(currentIndex + 2) % galleryImages.length],
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-pink-50 to-purple-50 rounded-3xl my-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-pink-600 mb-4">Galería de Recuerdos</h2>
          <p className="text-lg text-pink-500 max-w-2xl mx-auto">
            Momentos especiales que hemos compartido y los que están por venir en esta celebración
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-purple-300 mx-auto mt-6"></div>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {visibleImages.map((image, index) => (
              <motion.div
                key={`${image.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="overflow-hidden rounded-xl shadow-md bg-white p-3 h-full">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <p className="text-white font-medium">{image.caption}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => openModal(currentIndex + index)}
                      className="absolute top-3 right-3 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-label="Ver imagen completa"
                    >
                      <Maximize2 size={16} className="text-pink-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevSlide}
              className="bg-white hover:bg-pink-50 text-pink-600 p-3 rounded-full shadow-md transition-colors"
              aria-label="Imágenes anteriores"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white hover:bg-pink-50 text-pink-600 p-3 rounded-full shadow-md transition-colors"
              aria-label="Siguientes imágenes"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
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
              <X size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                prevModalImage()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full z-10"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={24} />
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
              <Image
                src={galleryImages[modalImage].src || "/placeholder.svg"}
                alt={galleryImages[modalImage].alt}
                layout="fill"
                objectFit="contain"
                className="pointer-events-none"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <p className="text-lg font-medium">{galleryImages[modalImage].caption}</p>
              </div>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                nextModalImage()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full z-10"
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default GallerySection
