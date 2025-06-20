"use client"
import { motion } from "framer-motion"
import { CreditCard, ExternalLink } from "lucide-react"

const GiftRegistry = () => {
  const giftOptions = [
    {
      id: 1,
      title: "Liverpool",
      description: "Encuentra nuestra mesa de regalos en Liverpool.",
      link: "https://mesaderegalos.liverpool.com.mx/milistaderegalos/51642519",
      linkText: "Comprar en Liverpool",
      logo: "/logos/liverpool.png",
      bgColor: "bg-pink-100",
      textColor: "text-pink-600",
      buttonColor: "bg-pink-600 hover:bg-pink-700",
    },
    {
      id: 2,
      title: "Sears",
      description: "Visita nuestra mesa de regalos en Sears. Encuentra el regalo perfecto para Tamy.",
      link: "https://www.sears.com.mx/Mesa-de-Regalos/180961/te-invito-a-mi-xv-anos-tamara-ismar",
      linkText: "Comprar en Sears",
      logo: "/logos/sears.png",
      bgColor: "bg-gray-100",
      textColor: "text-gray-700",
      buttonColor: "bg-gray-700 hover:bg-gray-800",
    },
    {
      id: 3,
      title: "Cofre para Sobres",
      icon: <CreditCard size={32} />,
      description:
        "Si prefieres dar un regalo en efectivo, habrá un buzón en la mesa de regalos durante la celebración.",
      link: null,
      linkText: null,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      buttonColor: null,
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
              <div className={`w-16 h-16 ${option.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {option.logo ? (
                  <img
                    src={option.logo || "/placeholder.svg"}
                    alt={`Logo ${option.title}`}
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <div className={option.textColor}>{option.icon}</div>
                )}
              </div>

              <h3 className={`text-xl font-bold ${option.textColor} mb-3`}>{option.title}</h3>

              <p className="text-gray-600 mb-4">{option.description}</p>

              {option.link && (
                <a
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2 ${option.buttonColor} text-white rounded-full transition-colors font-medium`}
                >
                  <ExternalLink size={16} />
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
