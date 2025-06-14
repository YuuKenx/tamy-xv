"use client"
import { motion } from "framer-motion"

const QuinceaneraMesage = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-12"
        >
          Mensaje de la Quinceañera
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 to-purple-300"></div>

          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            Con alegría en el corazón y sueños en el alma, quiero compartir con ustedes este momento tan especial, donde
            la gratitud y la ilusión se unen en un solo día.
          </p>
          <p className="text-lg md:text-xl text-gray-700 italic mb-8 leading-relaxed">
            "Los momentos más hermosos se viven rodeados de quienes amamos... gracias por ser parte de este capítulo tan
            importante en mi vida."
          </p>

          <div className="mt-8 text-pink-600 font-medium">
            <p>Con todo mi amor,</p>
            <p className="mt-2">a ustedes que hicieron esto posible</p>
          </div>

          <div className="mt-8 flex justify-center space-x-8">
            <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
              Gittel
            </div>
            <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
              Ismael
            </div>
            <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
              Mariana
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default QuinceaneraMesage
