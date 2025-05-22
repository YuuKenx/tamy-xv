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
import MusicPlayer from "@/components/music-player"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export default function Home() {
  return (
    <main
      className={`${montserrat.variable} font-sans min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 relative overflow-hidden`}
    >
      <StarBackground />
      <FloatingHearts />
      <CountdownModal targetDate="2025-08-09" />
      <MusicPlayer />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <CoverSection name="Tamara" />

        <CountdownSection />

        <FamilyPhotos />

        <QuinceaneraMesage />

        <Itinerary />

        <GallerySection />

        <GodmotherVideo />

        <RsvpForm />

        <GiftRegistry />

        <footer className="text-center py-8 text-pink-700 mt-16">
          <p>Con cariño esperamos tu presencia en este día tan especial</p>
          <p className="mt-2 text-sm">© {new Date().getFullYear()} - XV Años de Tamara</p>
        </footer>
      </div>
    </main>
  )
}
