"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, MapPin, Calendar, Music, Cake, ChevronDown, ChevronUp } from "lucide-react"

const Itinerary = () => {
  const [activeEvent, setActiveEvent] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const events = [
    {
      id: 1,
      time: "13:00",
      title: "Ceremonia religiosa de agradecimiento",
      location: "Iglesia San Judas Tadeo",
      address: "166, Carboneras CP 42180 Mineral de la Reforma, Hgo.",
      description:
        "Te invito a acompañarme en esta ceremonia especial donde agradeceré a Dios por estos 15 años de vida y recibiré la bendición para esta nueva etapa que comienza.",
      mapUrl: "https://maps.google.com/?q=Iglesia+San+Judas+Tadeo+Carboneras+Mineral+de+la+Reforma+Hidalgo",
      icon: <Calendar className="w-6 h-6" />,
      image: "/image/iglesia.jpg",
      color: "from-pink-400 to-pink-600",
    },
    {
      id: 2,
      time: "16:00",
      title: "Recepción",
      location: "Rivento Salón y Jardín",
      address: "Carr. a Petróleos #200, Centro, 42180 Pachuquilla, Hgo.",
      description:
        "Recuerda que al ser parte importante de esta celebración es necesario tu participación e integración para construir juntos momentos mágicos.",
      mapUrl: "https://maps.google.com/?q=Rivento+Salon+Jardin+Pachuquilla+Hidalgo",
      icon: <Music className="w-6 h-6" />,
      image: "/image/salon.jpg",
      color: "from-purple-400 to-purple-600",
    },
    {
      id: 3,
      time: "16:30",
      title: "Entrada de Tamy",
      location: "Rivento Salón y Jardín",
      address: "Carr. a Petróleos #200, Centro, 42180 Pachuquilla, Hgo.",
      description:
        "Ya todos en el salón recibamos con cariño a Tamy, hoy celebramos con alegría y gozo sus quince años de vida.",
      mapUrl: "https://maps.google.com/?q=Rivento+Salon+Jardin+Pachuquilla+Hidalgo",
      icon: <Cake className="w-6 h-6" />,
      image: "/image/salon.jpg",
      color: "from-rose-400 to-rose-600",
    },
  ]

  const toggleEvent = (id: number) => {
    setActiveEvent(activeEvent === id ? null : id)
  }

  return (
    <section id="itinerary" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-50/50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-pink-600 mb-4">Itinerario</h2>
          <p className="text-lg text-pink-500 max-w-2xl mx-auto">
            Acompáñanos en este día tan especial. Hemos preparado una celebración inolvidable para Tamy.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-purple-300 mx-auto mt-6"></div>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-200 via-purple-200 to-pink-200 transform -translate-x-1/2 hidden md:block"></div>

          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`mb-16 md:mb-24 relative ${index % 2 === 0 ? "md:pr-12 md:text-right md:ml-auto md:mr-[50%]" : "md:pl-12 md:ml-[50%]"}`}
            >
              {/* Timeline dot */}
              <div className="hidden md:block absolute top-10 w-8 h-8 rounded-full bg-white shadow-md border-4 border-pink-300 left-1/2 transform -translate-x-1/2 z-10"></div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className={`h-48 relative overflow-hidden`}>
                  <div className="absolute inset-0">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center text-white mb-3`}
                    >
                      {event.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-gray-700">
                    <Clock size={18} className="text-pink-500" />
                    <span className="font-medium">{event.time} hrs</span>
                  </div>

                  <div className="flex items-center gap-3 mb-4 text-gray-700">
                    <MapPin size={18} className="text-pink-500" />
                    <span>
                      {event.location} - {event.address}
                    </span>
                  </div>

                  <div className="border-t border-pink-100 pt-4 mt-4">
                    <button
                      onClick={() => toggleEvent(event.id)}
                      className="flex items-center justify-between w-full text-pink-600 font-medium hover:text-pink-700 transition-colors"
                    >
                      <span>Ver detalles</span>
                      {activeEvent === event.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    <AnimatePresence>
                      {activeEvent === event.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-600 my-4 leading-relaxed">{event.description}</p>

                          <a
                            href={event.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-2 text-pink-600 hover:text-pink-700 font-medium transition-colors"
                          >
                            <MapPin size={16} />
                            Ver ubicación en el mapa
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Itinerary
