"use client"
import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface CountdownModalProps {
  targetDate: string
  onClose?: () => void
}

const CountdownModal = ({ targetDate, onClose }: CountdownModalProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = target - now

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
  }, [targetDate])

  const handleClose = () => {
    setIsOpen(false)
    // Pequeño delay para permitir que el modal se cierre antes de iniciar música
    setTimeout(() => {
      if (onClose) {
        onClose()
      }
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg p-6 md:p-8 max-w-sm md:max-w-md w-full shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleClose}>
          <X size={20} className="md:w-6 md:h-6" />
        </button>

        <h2 className="text-xl md:text-2xl font-bold text-center text-pink-600 mb-3 md:mb-4">Cuenta regresiva</h2>
        <p className="text-center text-gray-600 mb-4 md:mb-6 text-sm md:text-base px-2">
          ¡Faltan pocos días para celebrar los XV años de Tamara!
        </p>

        <div className="grid grid-cols-4 gap-1 md:gap-2 text-center">
          <div className="bg-pink-100 rounded-lg p-2 md:p-3">
            <div className="text-xl md:text-3xl font-bold text-pink-700">{countdown.days}</div>
            <div className="text-xs text-pink-600">Días</div>
          </div>
          <div className="bg-pink-100 rounded-lg p-2 md:p-3">
            <div className="text-xl md:text-3xl font-bold text-pink-700">{countdown.hours}</div>
            <div className="text-xs text-pink-600">Horas</div>
          </div>
          <div className="bg-pink-100 rounded-lg p-2 md:p-3">
            <div className="text-xl md:text-3xl font-bold text-pink-700">{countdown.minutes}</div>
            <div className="text-xs text-pink-600">Minutos</div>
          </div>
          <div className="bg-pink-100 rounded-lg p-2 md:p-3">
            <div className="text-xl md:text-3xl font-bold text-pink-700">{countdown.seconds}</div>
            <div className="text-xs text-pink-600">Segundos</div>
          </div>
        </div>

        <div className="text-center mt-4 md:mt-6">
          <p className="text-pink-700 font-medium text-sm md:text-base">9 de Agosto, 2025</p>
        </div>
      </div>
    </div>
  )
}

export default CountdownModal
