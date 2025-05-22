"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"

import { Play, Pause, Volume2, VolumeX } from "lucide-react"

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Crear el elemento de audio
    audioRef.current = new Audio("/music/musica.mp3")

    // Configurar propiedades
    if (audioRef.current) {
      audioRef.current.loop = true
      audioRef.current.volume = volume
      audioRef.current.preload = "auto"

      // Evento para detectar cuando la música está cargada
      audioRef.current.addEventListener("canplaythrough", () => {
        setIsLoaded(true)
      })
    }

    // Limpiar al desmontar
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current || !isLoaded) return

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error)
        setIsPlaying(false)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, isLoaded])

  useEffect(() => {
    if (!audioRef.current) return

    if (isMuted) {
      audioRef.current.volume = 0
    } else {
      audioRef.current.volume = volume
    }
  }, [isMuted, volume])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (isMuted && newVolume > 0) {
      setIsMuted(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-3 flex items-center gap-3">
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600 transition-colors"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        disabled={!isLoaded}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
      </button>

      <div className="hidden sm:flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="text-pink-600 hover:text-pink-700"
          aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          disabled={!isLoaded}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 accent-pink-500"
          aria-label="Volumen"
          disabled={!isLoaded}
        />
      </div>

      <div className="text-xs text-pink-600 hidden sm:block">
        {!isLoaded ? "Cargando música..." : isPlaying ? "♪ Música de XV años" : "Música"}
      </div>
    </div>
  )
}

export default MusicPlayer
