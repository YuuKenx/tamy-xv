"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

const GodmotherVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [volume, setVolume] = useState(0.7)
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
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!videoRef.current) return

    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)

    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }

    if (newVolume === 0) {
      setIsMuted(true)
      if (videoRef.current) videoRef.current.muted = true
    } else if (isMuted) {
      setIsMuted(false)
      if (videoRef.current) videoRef.current.muted = false
    }
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
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
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            poster="/elegant-quinceanera.png"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={handleVideoEnd}
            playsInline
          >
            <source src="/videos/mensaje.mp4" type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>

          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <button
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-pink-600/90 flex items-center justify-center hover:bg-pink-700 transition-colors"
              aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
            >
              {isPlaying ? <Pause size={36} className="text-white" /> : <Play size={36} className="text-white ml-2" />}
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-pink-300 transition-colors"
              aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button
              onClick={toggleMute}
              className="text-white hover:text-pink-300 transition-colors"
              aria-label={isMuted ? "Activar sonido" : "Silenciar"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 accent-pink-500"
              aria-label="Volumen"
            />

            <div className="ml-auto text-white text-sm">Mensaje especial de la madrina</div>
          </div>
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
