"use client"
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react"
import { Music, MicOff } from "lucide-react"

export interface SimpleMusicPlayerRef {
  startMusic: () => void
  pauseMusic: () => void
  resumeMusic: () => void
}

const SimpleMusicPlayer = forwardRef<SimpleMusicPlayerRef>((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleCanPlay = () => {
      setIsLoaded(true)
      setHasError(false)
    }

    const handleError = (e: Event) => {
      console.error("Audio loading error:", e)
      setHasError(true)
      setIsLoaded(false)
    }

    const handleLoadStart = () => {
      setIsLoaded(false)
      setHasError(false)
    }

    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("error", handleError)
    audio.addEventListener("loadstart", handleLoadStart)

    // Configurar el audio
    audio.loop = true
    audio.volume = 0.5
    audio.preload = "auto"

    return () => {
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("loadstart", handleLoadStart)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isLoaded || hasError) return

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error)
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying, isLoaded, hasError])

  useImperativeHandle(ref, () => ({
    startMusic: () => {
      if (isLoaded && !hasError) {
        setIsPlaying(true)
      }
    },
    pauseMusic: () => {
      setIsPlaying(false)
    },
    resumeMusic: () => {
      if (isLoaded && !hasError) {
        setIsPlaying(true)
      }
    },
  }))

  const toggleMusic = () => {
    if (!isLoaded || hasError) {
      console.warn("Audio not ready or has error")
      return
    }
    setIsPlaying(!isPlaying)
  }

  // No mostrar el botón si hay error
  if (hasError) {
    return null
  }

  return (
    <>
      {/* Elemento de audio HTML */}
      <audio ref={audioRef} preload="auto">
        <source src="/music/musica.mp3" type="audio/mpeg" />
        <source src="/placeholder-music.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>

      {/* Botón de control */}
      <button
        onClick={toggleMusic}
        disabled={!isLoaded}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isLoaded ? "bg-pink-500 hover:bg-pink-600 cursor-pointer" : "bg-gray-400 cursor-not-allowed opacity-50"
        }`}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? <MicOff size={20} className="text-white" /> : <Music size={20} className="text-white" />}
      </button>

      {/* Indicador de carga (opcional) */}
      {!isLoaded && !hasError && (
        <div className="fixed top-16 right-4 z-50 text-xs text-pink-600 bg-white px-2 py-1 rounded shadow">
          Cargando música...
        </div>
      )}
    </>
  )
})

SimpleMusicPlayer.displayName = "SimpleMusicPlayer"

export default SimpleMusicPlayer
