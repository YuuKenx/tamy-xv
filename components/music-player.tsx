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
    startMusic: () => {
      if (audioRef.current && isLoaded && !isPlaying) {
        // En móviles, necesitamos interacción del usuario
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              console.log("Autoplay prevented:", error)
              // En móviles, mostrar el botón de play
            })
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
    <div className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-2 md:p-3 flex items-center gap-2 md:gap-3">
      <button
        onClick={togglePlay}
        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600 transition-colors"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        disabled={!isLoaded}
      >
        {isPlaying ? (
          <Pause size={14} className="md:w-[18px] md:h-[18px]" />
        ) : (
          <Play size={14} className="ml-0.5 md:w-[18px] md:h-[18px] md:ml-1" />
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
