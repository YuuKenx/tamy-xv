"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CoverSectionProps {
  name: string
}

const CoverSection = ({ name }: CoverSectionProps) => {
  const [mounted, setMounted] = useState(false)
  const [imageVersion, setImageVersion] = useState(Date.now())

  useEffect(() => {
    setMounted(true)

    const timer = setTimeout(() => {
      setImageVersion(Date.now())
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-10 md:py-20 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-4 text-pink-400 text-sm md:text-base"
        >
          Te invito a celebrar mis
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6"
          style={{
            background: "linear-gradient(135deg, #b76e79, #f7cac9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow:
              "1px 1px 2px rgba(183, 110, 121, 0.4), 2px 2px 4px rgba(183, 110, 121, 0.3), 3px 3px 6px rgba(183, 110, 121, 0.2)",
            animation: "flotar 3s ease-in-out infinite",
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          }}
        >
          XV Años
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto mb-8 rounded-full overflow-hidden border-4 border-pink-300 shadow-lg"
        >
          <img
            src={`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.jpg-hTe2x7nvIsDPgVzxcORL3BzKZuyD3C.jpeg?v=${imageVersion}`}
            alt="Foto de Tamy"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4"
          style={{
            background: "linear-gradient(135deg, #b76e79, #f7cac9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow:
              "1px 1px 2px rgba(183, 110, 121, 0.4), 2px 2px 4px rgba(183, 110, 121, 0.3), 3px 3px 6px rgba(183, 110, 121, 0.2)",
            animation: "flotar 4s ease-in-out infinite",
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          }}
        >
          Tamy
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="text-base md:text-lg text-pink-700"
        >
          9 de Agosto, 2025
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center"
      >
        <div className="animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-pink-500 md:w-6 md:h-6"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes flotar {
          0%, 100% {
            transform: translateY(0) rotateX(0deg);
          }
          50% {
            transform: translateY(-15px) rotateX(5deg);
          }
        }
      `}</style>
    </section>
  )
}

export default CoverSection
