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
import DressCode from "@/components/dress-code"
import GodparentsCarousel from "@/components/godparents-carousel"
import MusicPlayer, { type MusicPlayerRef } from "@/components/music-player"
import { Montserrat } from "next/font/google"
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
        // Check if we're in a browser environment
        if (typeof window === "undefined") {
          setIsGalleryEnabled(false)
          setIsLoading(false)
          return
        }

        // Try to import and create Supabase client
        const { createClient } = await import("@/lib/supabase")

        // Check if environment variables are available
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          console.log("Supabase environment variables not configured, disabling gallery")
          setIsGalleryEnabled(false)
          setIsLoading(false)
          return
        }

        const supabase = createClient()

        if (!supabase) {
          console.log("Failed to create Supabase client, disabling gallery")
          setIsGalleryEnabled(false)
          setIsLoading(false)
          return
        }

        // Test connection first with a simple query
        const { error: connectionError } = await supabase.from("system_settings").select("setting_key").limit(1)

        if (connectionError) {
          console.log("Supabase connection failed, disabling gallery:", connectionError.message)
          setIsGalleryEnabled(false)
          setIsLoading(false)
          return
        }

        // Get gallery settings
        const { data: settings, error } = await supabase
          .from("system_settings")
          .select("setting_key, setting_value")
          .in("setting_key", ["gallery_enabled", "gallery_unlock_date"])

        if (error) {
          console.log("Error fetching gallery settings, disabling gallery:", error.message)
          setIsGalleryEnabled(false)
          setIsLoading(false)
          return
        }

        // Check if gallery is manually enabled
        const galleryEnabled = settings?.find((s) => s.setting_key === "gallery_enabled")?.setting_value === "true"

        if (galleryEnabled) {
          setIsGalleryEnabled(true)
          setIsLoading(false)
          return
        }

        // Check if gallery should be auto-enabled by date
        const unlockDate = settings?.find((s) => s.setting_key === "gallery_unlock_date")?.setting_value

        if (unlockDate) {
          const now = new Date()
          const unlockDateTime = new Date(unlockDate)

          if (now >= unlockDateTime) {
            setIsGalleryEnabled(true)
            setIsLoading(false)
            return
          }
        }

        // Default to disabled
        setIsGalleryEnabled(false)
        setIsLoading(false)
      } catch (error) {
        console.log("Gallery check failed, disabling gallery:", error)
        // Gracefully disable gallery on any error
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
      <CountdownModal targetDate="2025-08-09T13:00:00" onClose={handleCountdownClose} />
      <MusicPlayer ref={musicPlayerRef} />

      {/* Logo fijo en la esquina superior izquierda */}
      <div className="fixed top-4 left-4 z-50">
        <img
          src="/image/logo.png"
          alt="Logo Tamy XV Años"
          className="w-16 h-16 md:w-20 md:h-20 object-contain bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md"
        />
      </div>

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

        {/* Video del hada madrina ANTES del mensaje de la quinceañera */}
        <GodmotherVideo onVideoPlay={handleVideoPlay} onVideoEnd={handleVideoEnd} />

        <QuinceaneraMesage />

        <DressCode />

        <GodparentsCarousel />

        <Itinerary />

        {/* Galería condicional */}
        {isGalleryEnabled && <GallerySection />}

        <RsvpForm />

        <GiftRegistry />

        <footer className="text-center py-6 md:py-8 text-pink-700 mt-8 md:mt-16">
          <p className="text-sm md:text-base">Con cariño esperamos tu presencia en este día tan especial</p>
          <p className="mt-2 text-xs md:text-sm">© {new Date().getFullYear()} - XV Años de Tamara</p>
          <p className="mt-3 text-xs text-pink-600 italic">
            Madrina de invitación digital: RED (Guadalupe Ramírez Hernández)
          </p>
        </footer>
      </div>
    </main>
  )
}
