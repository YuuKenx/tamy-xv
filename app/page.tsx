"use client"

import { useRef, useEffect, useState } from "react"
import StarBackground from "@/components/star-background"
import FloatingHearts from "@/components/floating-hearts"
import CountdownModal from "@/components/countdown-modal"
import CoverSection from "@/components/cover-section"
import FamilyPhotos from "@/components/family-photos"
import QuinceaneraMesage from "@/components/parents-message"
import Itinerary from "@/components/itinerary"
import GodmotherVideo from "@/components/godmother-video"
import RsvpForm from "@/components/rsvp-form"
import GiftRegistry from "@/components/gift-registry"
import GallerySection from "@/components/gallery-section"
import CountdownSection from "@/components/countdown-section"
import MusicPlayer, { type MusicPlayerRef } from "@/components/music-player"
import { Montserrat } from "next/font/google"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export default function Home() {
  const musicPlayerRef = useRef<MusicPlayerRef>(null)
  const [isGalleryEnabled, setIsGalleryEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkGalleryStatus = async () => {
      try {
        const supabase = createClient()

        // Obtener configuraciones
        const { data: settings, error } = await supabase
          .from("system_settings")
          .select("setting_key, setting_value")
          .in("setting_key", ["gallery_enabled", "gallery_unlock_date"])

        if (error) {
          console.error("Error al obtener configuraciones:", error)
          setIsGalleryEnabled(false)
          setIsLoading(false)
          return
        }

        // Verificar si la galería está habilitada manualmente
        const galleryEnabled = settings.find((s) => s.setting_key === "gallery_enabled")?.setting_value === "true"

        if (galleryEnabled) {
          setIsGalleryEnabled(true)
          setIsLoading(false)
          return
        }

        // Verificar si debemos habilitar automáticamente por fecha
        const unlockDate = settings.find((s) => s.setting_key === "gallery_unlock_date")?.setting_value

        if (unlockDate) {
          const now = new Date()
          const unlockDateTime = new Date(unlockDate)

          // Si la fecha actual es posterior a la fecha de desbloqueo, habilitar
          if (now >= unlockDateTime) {
            setIsGalleryEnabled(true)
          }
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error al verificar estado de galería:", error)
        setIsGalleryEnabled(false)
        setIsLoading(false)
      }
    }

    checkGalleryStatus()
  }, [])

  const handleCountdownClose = () => {
    if (musicPlayerRef.current) {
      musicPlayerRef.current.startMusic()
    }
  }

  const handleVideoPlay = () => {
    if (musicPlayerRef.current) {
      musicPlayerRef.current.pauseMusic()
    }
  }

  const handleVideoEnd = () => {
    if (musicPlayerRef.current) {
      musicPlayerRef.current.resumeMusic()
    }
  }

  const handleLoginClick = () => {
    router.push("/login")
  }

  return (
    <main
      className={`${montserrat.variable} font-sans min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 relative overflow-hidden`}
    >
      <StarBackground />
      <FloatingHearts />
      <CountdownModal targetDate="2025-08-09" onClose={handleCountdownClose} />
      <MusicPlayer ref={musicPlayerRef} />

      {/* Botón de login */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleLoginClick}
          className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md text-pink-600 hover:bg-white transition-colors text-sm"
        >
          Iniciar Sesión
        </button>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8 relative z-10">
        <CoverSection name="Tamy" />

        <CountdownSection />

        <FamilyPhotos />

        <QuinceaneraMesage />

        <GodmotherVideo onVideoPlay={handleVideoPlay} onVideoEnd={handleVideoEnd} />

        <Itinerary />

        {/* Galería condicional */}
        {isGalleryEnabled && <GallerySection />}

        <RsvpForm />

        <GiftRegistry />

        <footer className="text-center py-6 md:py-8 text-pink-700 mt-8 md:mt-16">
          <p className="text-sm md:text-base">Con cariño esperamos tu presencia en este día tan especial</p>
          <p className="mt-2 text-xs md:text-sm">© {new Date().getFullYear()} - XV Años de Tamara</p>
        </footer>
      </div>
    </main>
  )
}
