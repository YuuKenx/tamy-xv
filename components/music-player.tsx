"use client"
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react"
import type React from "react"

import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export interface MusicPlayerRef {
  startMusic: () => void
  pauseMusic: () => void
  resumeMusic: () => void
}

const MusicPlayer = forwardRef<MusicPlayerRef>((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [isLoaded, setIsLoaded] = useState(false)
  const [wasPlayingBeforeVideo, setWasPlayingBeforeVideo] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("/music/musica.mp3")

    if (audioRef.current) {
      audioRef.current.loop = true
      audioRef.current.volume = volume
      audioRef.current.preload = "auto"

      audioRef.current.addEventListener("canplaythrough", () => {
        setIsLoaded(true)
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null
      }
    }
  }, [])

  useImperativeHandle(ref, () => ({
    startMusic: async () => {
      if (audioRef.current && isLoaded && !isPlaying) {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.log("Autoplay prevented:", error)
          // En móviles, el usuario necesita interactuar primero
        }
      }
    },
    pauseMusic: () => {
      if (audioRef.current && isPlaying) {
        setWasPlayingBeforeVideo(true)
        audioRef.current.pause()
        setIsPlaying(false)
      }
    },
    resumeMusic: () => {
      if (audioRef.current && wasPlayingBeforeVideo) {
        audioRef.current.play().catch((error) => {
          console.error("Error resuming audio:", error)
        })
        setIsPlaying(true)
        setWasPlayingBeforeVideo(false)
      }
    },
  }))

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

  const togglePlay = async () => {
    if (!audioRef.current || !isLoaded) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        // En móviles, asegurar que el audio esté listo
        audioRef.current.load()
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error("Error toggling audio:", error)
      // Si falla, intentar una vez más
      try {
        if (!isPlaying) {
          await audioRef.current.play()
          setIsPlaying(true)
        }
      } catch (secondError) {
        console.error("Second attempt failed:", secondError)
        alert("No se pudo reproducir la música. Intenta tocar el botón nuevamente.")
      }
    }
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
    <div className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-3 md:p-3 flex items-center gap-2 md:gap-3">
      <button
        onClick={togglePlay}
        className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600 transition-colors touch-manipulation"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        disabled={!isLoaded}
      >
        {isPlaying ? (
          <Pause size={18} className="md:w-[18px] md:h-[18px]" />
        ) : (
          <Play size={18} className="ml-1 md:w-[18px] md:h-[18px] md:ml-1" />
        )}
      </button>

      <div className="hidden sm:flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="text-pink-600 hover:text-pink-700"
          aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          disabled={!isLoaded}
        >
          {isMuted ? (
            <VolumeX size={16} className="md:w-[18px] md:h-[18px]" />
          ) : (
            <Volume2 size={16} className="md:w-[18px] md:h-[18px]" />
          )}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 md:w-20 accent-pink-500"
          aria-label="Volumen"
          disabled={!isLoaded}
        />
      </div>

      <div className="text-xs text-pink-600 hidden lg:block">
        {!isLoaded ? "Cargando..." : isPlaying ? "♪ Música" : "Música"}
      </div>
    </div>
  )
})

MusicPlayer.displayName = "MusicPlayer"

export default MusicPlayer
