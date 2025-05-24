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
    // Llamar la función onClose que iniciará la música
    if (onClose) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleClose}>
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleClose}>
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">Cuenta regresiva</h2>
        <p className="text-center text-gray-600 mb-6">¡Faltan pocos días para celebrar los XV años de Tamara!</p>

        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-pink-100 rounded-lg p-3">
            <div className="text-3xl font-bold text-pink-700">{countdown.days}</div>
            <div className="text-xs text-pink-600">Días</div>
          </div>
          <div className="bg-pink-100 rounded-lg p-3">
            <div className="text-3xl font-bold text-pink-700">{countdown.hours}</div>
            <div className="text-xs text-pink-600">Horas</div>
          </div>
          <div className="bg-pink-100 rounded-lg p-3">
            <div className="text-3xl font-bold text-pink-700">{countdown.minutes}</div>
            <div className="text-xs text-pink-600">Minutos</div>
          </div>
          <div className="bg-pink-100 rounded-lg p-3">
            <div className="text-3xl font-bold text-pink-700">{countdown.seconds}</div>
            <div className="text-xs text-pink-600">Segundos</div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-pink-700 font-medium">9 de Agosto, 2025</p>
        </div>
      </div>
    </div>
  )
}

export default CountdownModal
