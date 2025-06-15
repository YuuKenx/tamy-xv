"use client"
import { motion } from "framer-motion"
import { Gift, ShoppingBag, CreditCard } from "lucide-react"

const GiftRegistry = () => {
  const giftOptions = [
    {
      id: 1,
      title: "Mesa de Regalos",
      icon: <Gift size={32} />,
      description: "Encuentra nuestra mesa de regalos en Liverpool con el código: XV-TAMARA-2025",
      link: "#",
      linkText: "Ver Mesa de Regalos",
    },
    {
      id: 2,
      title: "Tienda en Línea",
      icon: <ShoppingBag size={32} />,
      description: "Puedes comprar un regalo en línea y enviarlo directamente a nuestra dirección.",
      link: "#",
      linkText: "Comprar en Línea",
    },
    {
      id: 3,
      title: "Cofre para Sobres",
      icon: <CreditCard size={32} />,
      description: "Si prefieres dar un regalo en efectivo, habrá un buzón en la mesa de regalos.",
      link: null,
      linkText: null,
    },
  ]

  return (
    <section className="py-20 bg-pink-50 rounded-3xl">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-12"
        >
          Lista de Regalos
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {giftOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-600">
                {option.icon}
              </div>

              <h3 className="text-xl font-bold text-pink-600 mb-3">{option.title}</h3>

              <p className="text-gray-600 mb-4">{option.description}</p>

              {option.link && (
                <a
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors font-medium"
                >
                  {option.linkText}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GiftRegistry
