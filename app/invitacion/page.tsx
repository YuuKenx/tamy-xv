"use client"

import { useRef } from "react"
import StarBackground from "@/components/star-background"
import FloatingHearts from "@/components/floating-hearts"
import CountdownModal from "@/components/countdown-modal"
import CoverSection from "@/components/cover-section"
import ParentsMessages from "@/components/parents-messages"
import QuinceaneraMesage from "@/components/parents-message"
import Itinerary from "@/components/itinerary"
import GodmotherMessage from "@/components/godmother-message"
import RsvpForm from "@/components/rsvp-form"
import GiftRegistry from "@/components/gift-registry"
import CountdownSection from "@/components/countdown-section"
import DressCode from "@/components/dress-code"
import GodparentsCarousel from "@/components/godparents-carousel"
import SimpleMusicPlayer, { type SimpleMusicPlayerRef } from "@/components/simple-music-player"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export default function InvitacionPage() {
  const musicPlayerRef = useRef<SimpleMusicPlayerRef>(null)

  const handleCountdownClose = () => {
    // Iniciar música automáticamente cuando se cierre el modal
    if (musicPlayerRef.current) {
      musicPlayerRef.current.startMusic()
    }
  }

  return (
    <main
      className={`${montserrat.variable} font-sans min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 relative overflow-hidden flex flex-col gap-16`}
    >
      <StarBackground />
      <FloatingHearts />
      <CountdownModal targetDate="2025-08-09T13:00:00" onClose={handleCountdownClose} />
      <SimpleMusicPlayer ref={musicPlayerRef} />

      {/* Logo fijo en la esquina superior izquierda */}
      <div className="fixed top-4 left-4 z-50">
        <img
          src="/image/logo.png"
          alt="Logo Tamy XV Años"
          className="w-16 h-16 md:w-20 md:h-20 object-contain bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md"
        />
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8 relative z-10">
        <CoverSection name="Tamy" />

        <CountdownSection />

        {/* Mensajes de los papás */}
        <ParentsMessages />

        {/* Mensaje de la madrina */}
        <GodmotherMessage />

        {/* Mensaje de la quinceañera */}
        <QuinceaneraMesage />

        <GodparentsCarousel />

        <Itinerary />

        <DressCode />

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
