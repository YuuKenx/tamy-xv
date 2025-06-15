"use client"
import { motion } from "framer-motion"

const GodparentsCarousel = () => {
  const godparents = [
    {
      id: 1,
      role: "Pastel",
      name: "Jacqueline Hernández Callejas",
      svgIcon: (
        <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 100 100" className="w-10 h-10 text-white">
            <rect x="25" y="60" width="50" height="20" rx="4" fill="currentColor" />
            <rect x="30" y="45" width="40" height="15" rx="3" fill="currentColor" opacity="0.9" />
            <rect x="35" y="30" width="30" height="15" rx="3" fill="currentColor" opacity="0.8" />
            <circle cx="42" cy="22" r="2" fill="#FFD700" />
            <circle cx="50" cy="20" r="2" fill="#FFD700" />
            <circle cx="58" cy="22" r="2" fill="#FFD700" />
            <rect x="48" y="15" width="4" height="8" fill="currentColor" opacity="0.7" />
          </svg>
        </div>
      ),
    },
    {
      id: 2,
      role: "Mesa de dulces",
      name: "Blanca Margarita Hernández Callejas y Marisela Callejas Téllez",
      svgIcon: (
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 100 100" className="w-10 h-10 text-white">
            <circle cx="30" cy="35" r="8" fill="currentColor" />
            <rect x="28" y="43" width="4" height="12" fill="currentColor" opacity="0.8" />
            <circle cx="70" cy="30" r="6" fill="currentColor" opacity="0.9" />
            <rect x="68" y="36" width="4" height="14" fill="currentColor" opacity="0.8" />
            <circle cx="50" cy="50" r="10" fill="currentColor" />
            <rect x="48" y="60" width="4" height="10" fill="currentColor" opacity="0.8" />
            <ellipse cx="50" cy="75" rx="35" ry="3" fill="currentColor" opacity="0.4" />
          </svg>
        </div>
      ),
    },
    {
      id: 3,
      role: "Letras",
      name: "Gabriela María Ríos Albarrán",
      svgIcon: (
        <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
          <div className="text-white font-bold text-xl tracking-wider">TAM</div>
        </div>
      ),
    },
    {
      id: 4,
      role: "Última muñeca",
      name: "Antonia Damiana Galván González",
      svgIcon: (
        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 100 100" className="w-10 h-10 text-white">
            <circle cx="50" cy="25" r="12" fill="currentColor" />
            <ellipse cx="50" cy="45" rx="8" ry="15" fill="currentColor" opacity="0.9" />
            <rect x="42" y="40" width="6" height="15" rx="3" fill="currentColor" opacity="0.7" />
            <rect x="52" y="40" width="6" height="15" rx="3" fill="currentColor" opacity="0.7" />
            <rect x="46" y="60" width="8" height="15" rx="4" fill="currentColor" opacity="0.8" />
            <circle cx="46" cy="22" r="1.5" fill="#333" />
            <circle cx="54" cy="22" r="1.5" fill="#333" />
            <path d="M46 28 Q50 30 54 28" stroke="#333" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      ),
    },
    {
      id: 5,
      role: "Vals",
      name: "José Andrés Galván Vargas",
      svgIcon: (
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 100 100" className="w-10 h-10 text-white">
            <circle cx="35" cy="20" r="6" fill="currentColor" />
            <circle cx="65" cy="20" r="6" fill="currentColor" opacity="0.9" />
            <ellipse cx="35" cy="35" rx="5" ry="12" fill="currentColor" />
            <ellipse cx="65" cy="35" rx="5" ry="12" fill="currentColor" opacity="0.9" />
            <rect x="32" y="47" width="6" height="12" rx="3" fill="currentColor" opacity="0.7" />
            <rect x="62" y="47" width="6" height="12" rx="3" fill="currentColor" opacity="0.7" />
            <path d="M25 65 Q50 55 75 65" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.6" />
            <circle cx="30" cy="70" r="2" fill="currentColor" opacity="0.5" />
            <circle cx="70" cy="70" r="2" fill="currentColor" opacity="0.5" />
          </svg>
        </div>
      ),
    },
    {
      id: 6,
      role: "Copas",
      name: "Arely Tovar Galván",
      svgIcon: (
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 100 100" className="w-10 h-10 text-white">
            <path
              d="M30 25 L30 35 Q30 45 40 50 L40 65 L35 65 L35 70 L65 70 L65 65 L60 65 L60 50 Q70 45 70 35 L70 25 Z"
              fill="currentColor"
            />
            <path
              d="M70 25 L70 35 Q70 45 60 50 L60 65 L65 65 L65 70 L75 70 L75 65 L70 65 L70 50 Q80 45 80 35 L80 25 Z"
              fill="currentColor"
              opacity="0.8"
            />
            <ellipse cx="50" cy="25" rx="20" ry="3" fill="currentColor" opacity="0.6" />
            <ellipse cx="65" cy="25" rx="15" ry="2" fill="currentColor" opacity="0.5" />
            <circle cx="45" cy="20" r="1" fill="#FFD700" />
            <circle cx="55" cy="18" r="1" fill="#FFD700" />
            <circle cx="65" cy="20" r="1" fill="#FFD700" />
          </svg>
        </div>
      ),
    },
    {
      id: 7,
      role: "Invitación digital",
      name: "Red",
      svgIcon: (
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 100 100" className="w-10 h-10 text-white">
            <rect x="25" y="15" width="50" height="70" rx="8" fill="currentColor" />
            <rect x="30" y="25" width="40" height="25" rx="3" fill="currentColor" opacity="0.3" />
            <rect x="30" y="55" width="25" height="3" rx="1" fill="currentColor" opacity="0.6" />
            <rect x="30" y="62" width="35" height="3" rx="1" fill="currentColor" opacity="0.6" />
            <rect x="30" y="69" width="20" height="3" rx="1" fill="currentColor" opacity="0.6" />
            <circle cx="65" cy="65" r="3" fill="#4ADE80" />
            <path d="M35 35 L45 45 L60 30" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>
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
                transition={{ duration: 0.5, delay: (index % 7) * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100 h-56">
                  <div className="h-full bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col items-center justify-center relative p-6">
                    <div className="text-lg font-bold text-pink-600 mb-4 uppercase tracking-wide text-center">
                      {godparent.role}
                    </div>
                    <div className="flex items-center justify-center mb-4 transform hover:scale-110 transition-transform duration-300">
                      {godparent.svgIcon}
                    </div>
                    <div className="text-sm font-medium text-purple-700 text-center leading-tight px-2">
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
          animation: scroll 25s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default GodparentsCarousel
