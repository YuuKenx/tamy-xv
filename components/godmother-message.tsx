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

          <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
            <span className="font-semibold text-purple-600">Querida Tamy:</span>
          </p>

          <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
            Hoy que celebras tus XV años, doy gracias a Dios por tu vida y por permitirme ser parte de este momento tan
            especial. Es un honor para mí acompañarte como madrina de velación, guiándote con cariño, fe y confianza en
            este nuevo camino hacia tu juventud.
          </p>

          <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
            Que nunca te falte el amor, la alegría, ni la luz para tomar decisiones sabias. Siempre estoy aquí para ti,
            con los brazos abiertos y el corazón lleno de bendiciones.
          </p>

          <p className="text-lg md:text-xl text-gray-700 italic mb-8 leading-relaxed">
            Te amo y siempre contarás conmigo.
          </p>

          <div className="mt-8 text-purple-600 font-medium">
            <p>Con todo mi cariño,</p>
            <p className="mt-2 text-xl">Tu tía y madrina Mariana</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default GodmotherMessage
