"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Pause } from "lucide-react"

const GodmotherVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    const video = document.getElementById("godmother-video") as HTMLVideoElement
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl my-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-12"
        >
          Mensaje de la Madrina
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative rounded-xl overflow-hidden shadow-xl bg-black aspect-video"
        >
          {/* Placeholder for video - replace with actual video */}
          <div className="absolute inset-0 flex items-center justify-center bg-pink-900/20">
            <div className="text-white text-center p-4">
              <p className="mb-4">Video de la madrina recibiendo la invitación</p>
              <button
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-pink-600 flex items-center justify-center hover:bg-pink-700 transition-colors"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
            </div>
          </div>

          <video
            id="godmother-video"
            className="w-full h-full object-cover"
            poster="/placeholder.svg?height=720&width=1280"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          >
            <source src="#" type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-lg text-pink-700 italic">
            "Estoy muy emocionada de ser tu madrina en este día tan especial. ¡Será una celebración inolvidable!"
          </p>
          <p className="mt-2 font-medium text-pink-600">- Madrina de Tamara</p>
        </motion.div>
      </div>
    </section>
  )
}

export default GodmotherVideo
