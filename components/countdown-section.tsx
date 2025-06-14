"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const CountdownSection = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )

    const section = document.getElementById("countdown-section")
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  useEffect(() => {
    // Fecha correcta: 9 de agosto 2025 a las 13:00 horas
    const targetDate = new Date("2025-08-09T13:00:00").getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  const countdownItems = [
    { label: "Días", value: countdown.days },
    { label: "Horas", value: countdown.hours },
    { label: "Minutos", value: countdown.minutes },
    { label: "Segundos", value: countdown.seconds },
  ]

  return (
    <section id="countdown-section" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-purple-100/50 pointer-events-none"></div>

      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-pink-200/30 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-purple-200/30 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-pink-600 mb-4">Cuenta Regresiva</h2>
          <p className="text-lg text-pink-500 max-w-2xl mx-auto">
            El tiempo vuela cuando estamos emocionados. ¡Cada segundo nos acerca más al gran día!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-purple-300 mx-auto mt-6"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {countdownItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
                    {item.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 font-medium">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-10"
          >
            <div className="inline-block bg-white px-8 py-4 rounded-full shadow-md">
              <p className="text-lg font-medium text-pink-600">9 de Agosto, 2025 - 13:00 hrs</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CountdownSection
