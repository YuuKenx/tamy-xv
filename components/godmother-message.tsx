"use client"
import { motion } from "framer-motion"

const GodmotherMessage = () => {
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
          Mensaje de la Madrina
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-300 to-pink-300"></div>

          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            Con gran alegría y emoción, acepto ser parte de este momento tan especial en la vida de mi querida Tamy.
          </p>
          <p className="text-lg md:text-xl text-gray-700 italic mb-8 leading-relaxed">
            "Ser tu madrina es un honor que llevo en el corazón. Estaré a tu lado no solo en esta celebración, sino en
            cada paso importante de tu vida, brindándote mi apoyo, cariño y guía."
          </p>

          <div className="mt-8 text-purple-600 font-medium">
            <p>Con todo mi cariño,</p>
            <p className="mt-2 text-xl">Mariana</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default GodmotherMessage
