"use client"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play } from "lucide-react"

const GodmotherVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
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

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error)
      })
    }
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  const handleLoadedData = () => {
    setIsLoaded(true)
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl my-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-12"
        >
          Video de la Madrina
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-xl overflow-hidden shadow-xl bg-black aspect-video"
        >
          {/* Fallback image while video loads */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-pink-900/20">
              <div className="text-white text-center p-4">
                <p className="mb-4">Video de la madrina recibiendo la invitación</p>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={handleVideoEnd}
            onLoadedData={handleLoadedData}
            playsInline
            controls
          >
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mensaje-Ju0dMSPpyBgp9VM5vM240fraX6692k.mp4"
              type="video/mp4"
            />
            Tu navegador no soporta videos HTML5.
          </video>

          {/* Play button overlay */}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
              onClick={togglePlay}
            >
              <button
                className="w-20 h-20 rounded-full bg-pink-600/90 flex items-center justify-center hover:bg-pink-700 transition-colors"
                aria-label="Reproducir video"
              >
                <Play size={36} className="text-white ml-2" />
              </button>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-lg text-pink-700">
            Un mensaje especial de Mariana, quien con mucho cariño acompaña a Tamy en este día tan importante.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default GodmotherVideo
