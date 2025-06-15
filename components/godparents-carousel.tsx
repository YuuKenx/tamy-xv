"use client"
import { motion } from "framer-motion"

const GodparentsCarousel = () => {
  const godparents = [
    {
      id: 1,
      role: "Pastel",
      name: "Jacqueline Hernández Callejas",
      svgIcon: (
        <div className="w-16 h-16 bg-gradient-to-br from-pink-300 via-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl">
          <svg viewBox="0 0 100 100" className="w-12 h-12 text-white drop-shadow-lg">
            {/* Base del pastel */}
            <ellipse cx="50" cy="75" rx="25" ry="8" fill="currentColor" opacity="0.9" />
            <rect x="25" y="60" width="50" height="15" rx="3" fill="currentColor" />

            {/* Segundo piso */}
            <ellipse cx="50" cy="60" rx="20" ry="6" fill="currentColor" opacity="0.95" />
            <rect x="30" y="48" width="40" height="12" rx="2" fill="currentColor" />

            {/* Tercer piso */}
            <ellipse cx="50" cy="48" rx="15" ry="5" fill="currentColor" />
            <rect x="35" y="38" width="30" height="10" rx="2" fill="currentColor" />

            {/* Decoraciones */}
            <circle cx="40" cy="65" r="2" fill="#FFB6C1" />
            <circle cx="60" cy="67" r="2" fill="#FFB6C1" />
            <circle cx="45" cy="52" r="1.5" fill="#FFB6C1" />
            <circle cx="55" cy="54" r="1.5" fill="#FFB6C1" />

            {/* Velas */}
            <rect x="47" y="28" width="2" height="10" fill="#FFF8DC" />
            <rect x="51" y="28" width="2" height="10" fill="#FFF8DC" />
            <ellipse cx="48" cy="27" rx="1.5" ry="2" fill="#FFD700" />
            <ellipse cx="52" cy="27" rx="1.5" ry="2" fill="#FFD700" />

            {/* Llamas */}
            <ellipse cx="48" cy="25" rx="1" ry="2" fill="#FF6347" />
            <ellipse cx="52" cy="25" rx="1" ry="2" fill="#FF6347" />
          </svg>
        </div>
      ),
    },
    {
      id: 2,
      role: "Mesa de dulces",
      name: "Blanca Margarita Hernández Callejas y Marisela Callejas Téllez",
      svgIcon: (
        <div className="w-16 h-16 bg-gradient-to-br from-purple-300 via-purple-400 to-violet-500 rounded-2xl flex items-center justify-center shadow-xl">
          <svg viewBox="0 0 100 100" className="w-12 h-12 text-white drop-shadow-lg">
            {/* Dulce 1 - Piruleta */}
            <circle cx="25" cy="30" r="8" fill="#FF69B4" />
            <circle cx="25" cy="30" r="6" fill="#FFB6C1" />
            <rect x="24" y="38" width="2" height="15" fill="currentColor" />

            {/* Dulce 2 - Caramelo */}
            <ellipse cx="50" cy="35" rx="10" ry="6" fill="#FF1493" />
            <path d="M40 35 Q35 30 30 35" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M60 35 Q65 30 70 35" stroke="currentColor" strokeWidth="2" fill="none" />

            {/* Dulce 3 - Gomita */}
            <ellipse cx="75" cy="25" rx="6" ry="8" fill="#32CD32" />
            <ellipse cx="75" cy="25" rx="4" ry="6" fill="#90EE90" />

            {/* Cupcake */}
            <path d="M35 55 L35 70 Q35 75 40 75 L60 75 Q65 75 65 70 L65 55 Z" fill="currentColor" />
            <ellipse cx="50" cy="55" rx="15" ry="8" fill="#FFB6C1" />
            <circle cx="50" cy="50" r="2" fill="#FF69B4" />

            {/* Decoraciones adicionales */}
            <circle cx="20" cy="60" r="3" fill="#FF69B4" opacity="0.7" />
            <circle cx="80" cy="65" r="3" fill="#32CD32" opacity="0.7" />
            <circle cx="30" cy="75" r="2" fill="#FF1493" opacity="0.7" />
            <circle cx="70" cy="75" r="2" fill="#FFB6C1" opacity="0.7" />
          </svg>
        </div>
      ),
    },
    {
      id: 3,
      role: "Letras",
      name: "Gabriela María Ríos Albarrán",
      svgIcon: (
        <div className="w-16 h-16 bg-gradient-to-br from-rose-300 via-rose-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
          <div className="text-white font-bold text-lg tracking-wider drop-shadow-lg" style={{ fontFamily: "serif" }}>
            TAM
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 border-2 border-white/30 rounded-xl"></div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      role: "Última muñeca",
      name: "Antonia Damiana Galván González",
      svgIcon: (
        <div className="w-16 h-16 bg-gradient-to-br from-amber-300 via-amber-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-xl">
          <svg viewBox="0 0 100 100" className="w-12 h-12 text-white drop-shadow-lg">
            {/* Cabeza */}
            <circle cx="50" cy="30" r="15" fill="currentColor" />

            {/* Cabello */}
            <path d="M35 25 Q50 15 65 25 Q65 35 50 30 Q35 35 35 25" fill="#8B4513" />

            {/* Cuerpo - vestido */}
            <path
              d="M50 45 Q35 50 30 70 Q30 75 35 75 L65 75 Q70 75 70 70 Q65 50 50 45"
              fill="currentColor"
              opacity="0.9"
            />

            {/* Brazos */}
            <ellipse cx="35" cy="50" rx="4" ry="12" fill="currentColor" opacity="0.8" />
            <ellipse cx="65" cy="50" rx="4" ry="12" fill="currentColor" opacity="0.8" />

            {/* Piernas */}
            <rect x="42" y="70" width="6" height="15" rx="3" fill="currentColor" opacity="0.7" />
            <rect x="52" y="70" width="6" height="15" rx="3" fill="currentColor" opacity="0.7" />

            {/* Cara */}
            <circle cx="45" cy="28" r="2" fill="#FF69B4" />
            <circle cx="55" cy="28" r="2" fill="#FF69B4" />
            <path d="M45 35 Q50 38 55 35" stroke="#FF69B4" strokeWidth="1.5" fill="none" />

            {/* Decoraciones del vestido */}
            <circle cx="45" cy="60" r="2" fill="#FFB6C1" />
            <circle cx="55" cy="65" r="2" fill="#FFB6C1" />
            <circle cx="50" cy="55" r="1.5" fill="#FFB6C1" />
          </svg>
        </div>
      ),
    },
    {
      id: 5,
      role: "Vals",
      name: "José Andrés Galván Vargas",
      svgIcon: (
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-300 via-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
          <svg viewBox="0 0 100 100" className="w-12 h-12 text-white drop-shadow-lg">
            {/* Pareja bailando - Hombre */}
            <circle cx="35" cy="25" r="8" fill="currentColor" />
            <rect x="30" y="33" width="10" height="20" rx="2" fill="currentColor" />
            <rect x="25" y="40" width="8" height="15" rx="2" fill="currentColor" opacity="0.8" />
            <rect x="37" y="40" width="8" height="15" rx="2" fill="currentColor" opacity="0.8" />
            <rect x="30" y="53" width="5" height="12" rx="2" fill="currentColor" opacity="0.7" />
            <rect x="35" y="53" width="5" height="12" rx="2" fill="currentColor" opacity="0.7" />

            {/* Pareja bailando - Mujer */}
            <circle cx="65" cy="25" r="8" fill="currentColor" opacity="0.9" />
            <path d="M65 33 Q55 40 50 55 Q55 65 70 65 Q75 55 80 40 Q75 33 65 33" fill="currentColor" opacity="0.9" />
            <rect x="60" y="53" width="5" height="12" rx="2" fill="currentColor" opacity="0.7" />
            <rect x="65" y="53" width="5" height="12" rx="2" fill="currentColor" opacity="0.7" />

            {/* Notas musicales */}
            <circle cx="20" cy="15" r="2" fill="#FFD700" />
            <rect x="22" y="10" width="1" height="8" fill="#FFD700" />
            <circle cx="80" cy="20" r="2" fill="#FFD700" />
            <rect x="82" y="15" width="1" height="8" fill="#FFD700" />

            {/* Corazones */}
            <path d="M50 75 Q45 70 40 75 Q45 80 50 85 Q55 80 60 75 Q55 70 50 75" fill="#FF69B4" opacity="0.8" />

            {/* Líneas de movimiento */}
            <path d="M25 70 Q50 65 75 70" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
          </svg>
        </div>
      ),
    },
    {
      id: 6,
      role: "Copas",
      name: "Arely Tovar Galván",
      svgIcon: (
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-300 via-cyan-400 to-blue-400 rounded-2xl flex items-center justify-center shadow-xl">
          <svg viewBox="0 0 100 100" className="w-12 h-12 text-white drop-shadow-lg">
            {/* Copa 1 */}
            <path
              d="M25 30 L25 40 Q25 50 35 55 L35 70 L30 70 L30 75 L50 75 L50 70 L45 70 L45 55 Q55 50 55 40 L55 30 Z"
              fill="currentColor"
            />
            <ellipse cx="40" cy="30" rx="15" ry="3" fill="currentColor" opacity="0.3" />

            {/* Copa 2 */}
            <path
              d="M55 25 L55 35 Q55 45 65 50 L65 65 L60 65 L60 70 L80 70 L80 65 L75 65 L75 50 Q85 45 85 35 L85 25 Z"
              fill="currentColor"
              opacity="0.9"
            />
            <ellipse cx="70" cy="25" rx="15" ry="3" fill="currentColor" opacity="0.3" />

            {/* Burbujas de champagne */}
            <circle cx="35" cy="20" r="1.5" fill="#FFD700" opacity="0.8" />
            <circle cx="42" cy="15" r="1" fill="#FFD700" opacity="0.6" />
            <circle cx="38" cy="10" r="1.5" fill="#FFD700" opacity="0.7" />

            <circle cx="65" cy="18" r="1.5" fill="#FFD700" opacity="0.8" />
            <circle cx="72" cy="12" r="1" fill="#FFD700" opacity="0.6" />
            <circle cx="68" cy="8" r="1.5" fill="#FFD700" opacity="0.7" />

            {/* Decoración de brindis */}
            <path d="M45 45 Q50 40 55 45" stroke="#FFD700" strokeWidth="2" fill="none" opacity="0.8" />

            {/* Corazón pequeño */}
            <path d="M50 85 Q47 82 44 85 Q47 88 50 90 Q53 88 56 85 Q53 82 50 85" fill="#FF69B4" opacity="0.7" />
          </svg>
        </div>
      ),
    },
    {
      id: 7,
      role: "Invitación digital",
      name: "Red",
      svgIcon: (
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-300 via-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
          <svg viewBox="0 0 100 100" className="w-12 h-12 text-white drop-shadow-lg">
            {/* Teléfono */}
            <rect x="30" y="15" width="40" height="70" rx="8" fill="currentColor" />
            <rect x="32" y="17" width="36" height="66" rx="6" fill="currentColor" opacity="0.2" />

            {/* Pantalla */}
            <rect x="35" y="25" width="30" height="45" rx="3" fill="#87CEEB" />

            {/* Contenido de la invitación */}
            <rect x="38" y="30" width="24" height="3" rx="1" fill="#FF69B4" />
            <rect x="38" y="36" width="18" height="2" rx="1" fill="#DDA0DD" />
            <rect x="38" y="40" width="20" height="2" rx="1" fill="#DDA0DD" />

            {/* Corazón en la pantalla */}
            <path d="M50 50 Q47 47 44 50 Q47 53 50 55 Q53 53 56 50 Q53 47 50 50" fill="#FF69B4" />

            {/* Fecha */}
            <rect x="38" y="58" width="12" height="2" rx="1" fill="#DDA0DD" />
            <rect x="52" y="58" width="8" height="2" rx="1" fill="#DDA0DD" />

            {/* Botón home */}
            <circle cx="50" cy="77" r="3" fill="currentColor" opacity="0.3" />

            {/* Efectos de brillo */}
            <circle cx="40" cy="20" r="1" fill="#FFD700" opacity="0.8" />
            <circle cx="60" cy="22" r="1.5" fill="#FFD700" opacity="0.6" />

            {/* Ondas de señal */}
            <path d="M20 35 Q25 30 30 35" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M18 40 Q25 32 32 40" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
            <path d="M70 35 Q75 30 80 35" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M68 40 Q75 32 82 40" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
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
