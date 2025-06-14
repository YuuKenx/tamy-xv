"use client"
import { motion } from "framer-motion"

const GodparentsCarousel = () => {
  const godparents = [
    {
      id: 1,
      role: "Pastel",
      name: "Jacqueline Hernández Callejas",
      svgIcon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <rect x="25" y="60" width="50" height="20" rx="2" fill="currentColor" opacity="0.8" />
          <rect x="30" y="45" width="40" height="15" rx="2" fill="currentColor" opacity="0.9" />
          <rect x="35" y="30" width="30" height="15" rx="2" fill="currentColor" />
          <rect x="48" y="20" width="4" height="10" fill="currentColor" opacity="0.7" />
          <circle cx="50" cy="18" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 2,
      role: "Mesa de dulces",
      name: "Blanca Margarita Hernández Callejas y Marisela Callejas Téllez",
      svgIcon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <circle cx="30" cy="35" r="6" fill="currentColor" opacity="0.8" />
          <rect x="28" y="41" width="4" height="15" fill="currentColor" opacity="0.6" />
          <circle cx="70" cy="30" r="5" fill="currentColor" opacity="0.9" />
          <rect x="68" y="35" width="4" height="18" fill="currentColor" opacity="0.6" />
          <circle cx="50" cy="50" r="8" fill="currentColor" />
          <rect x="48" y="58" width="4" height="12" fill="currentColor" opacity="0.6" />
          <rect x="20" y="70" width="60" height="3" rx="1" fill="currentColor" opacity="0.4" />
        </svg>
      ),
    },
    {
      id: 3,
      role: "Letras",
      name: "Gabriela María Ríos Albarrán",
      svgIcon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <path d="M25 30 L35 30 L45 60 L40 60 L25 30 Z" fill="currentColor" />
          <path d="M35 30 L45 30 L35 60 L30 60 L35 30 Z" fill="currentColor" opacity="0.8" />
          <rect x="28" y="42" width="14" height="2" fill="currentColor" opacity="0.6" />
          <path
            d="M55 30 L65 30 L65 45 L75 45 L75 50 L65 50 L65 60 L60 60 L60 50 L55 50 L55 30 Z"
            fill="currentColor"
          />
          <circle cx="80" cy="25" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="85" cy="35" r="1" fill="currentColor" opacity="0.5" />
          <circle cx="75" cy="20" r="1" fill="currentColor" opacity="0.6" />
        </svg>
      ),
    },
    {
      id: 4,
      role: "Última muñeca",
      name: "Antonia Damiana Galván González",
      svgIcon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <circle cx="50" cy="25" r="8" fill="currentColor" />
          <rect x="45" y="33" width="10" height="20" rx="5" fill="currentColor" opacity="0.8" />
          <rect x="40" y="40" width="6" height="12" rx="3" fill="currentColor" opacity="0.6" />
          <rect x="54" y="40" width="6" height="12" rx="3" fill="currentColor" opacity="0.6" />
          <rect x="47" y="53" width="6" height="12" rx="3" fill="currentColor" opacity="0.6" />
          <circle cx="47" cy="22" r="1" fill="currentColor" opacity="0.4" />
          <circle cx="53" cy="22" r="1" fill="currentColor" opacity="0.4" />
          <path d="M47 27 Q50 29 53 27" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
        </svg>
      ),
    },
    {
      id: 5,
      role: "Vals",
      name: "José Andrés Galván Vargas",
      svgIcon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <circle cx="35" cy="20" r="5" fill="currentColor" />
          <circle cx="65" cy="20" r="5" fill="currentColor" opacity="0.8" />
          <rect x="32" y="25" width="6" height="15" rx="3" fill="currentColor" />
          <rect x="62" y="25" width="6" height="15" rx="3" fill="currentColor" opacity="0.8" />
          <rect x="29" y="35" width="5" height="10" rx="2" fill="currentColor" opacity="0.6" />
          <rect x="36" y="35" width="5" height="10" rx="2" fill="currentColor" opacity="0.6" />
          <rect x="59" y="35" width="5" height="10" rx="2" fill="currentColor" opacity="0.6" />
          <rect x="66" y="35" width="5" height="10" rx="2" fill="currentColor" opacity="0.6" />
          <path d="M25 55 Q50 45 75 55" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
          <circle cx="30" cy="60" r="1" fill="currentColor" opacity="0.3" />
          <circle cx="70" cy="60" r="1" fill="currentColor" opacity="0.3" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-pink-50 rounded-3xl my-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Nuestros Padrinos</h2>
          <p className="text-lg text-pink-500 max-w-2xl mx-auto">
            Con amor y gratitud a quienes nos acompañan en este día tan especial
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-purple-300 mx-auto mt-6"></div>
        </motion.div>

        {/* Carrusel infinito */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* Duplicamos el array 3 veces para el efecto infinito */}
            {[...godparents, ...godparents, ...godparents].map((godparent, index) => (
              <motion.div
                key={`${godparent.id}-${index}`}
                className="flex-shrink-0 w-80 mx-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-pink-100 h-48">
                  <div className="h-full bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col items-center justify-center relative text-pink-600 p-6">
                    <div className="text-lg font-bold text-pink-600 mb-3 uppercase tracking-wide text-center">
                      {godparent.role}
                    </div>
                    <div className="flex items-center justify-center mb-3">{godparent.svgIcon}</div>
                    <div className="text-sm font-medium text-purple-600 text-center leading-tight">
                      {godparent.name}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Texto de agradecimiento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-sm p-6 max-w-2xl mx-auto border border-pink-100">
            <p className="text-gray-700 italic text-lg">
              "Gracias por ser parte de este sueño y por hacer posible que cada detalle de esta celebración sea
              perfecto. Su amor y apoyo hacen que este día sea verdaderamente mágico."
            </p>
            <p className="text-pink-600 font-medium mt-4">Con todo nuestro cariño ✨</p>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${320 * godparents.length}px);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default GodparentsCarousel
