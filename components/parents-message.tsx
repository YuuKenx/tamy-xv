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

          <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
            Hoy es un día muy especial para mí, y no quiero dejar pasar la oportunidad de agradecerles por acompañarme
            en este momento tan significativo.
          </p>

          <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
            Cumplir XV años es más que una fiesta, es el inicio de una nueva etapa llena de sueños, aprendizajes y
            crecimiento. Me siento muy bendecida por tener a personas tan maravillosas a mi lado, que me han guiado,
            cuidado y querido desde siempre.
          </p>

          <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
            Gracias a mis papás por su amor incondicional, por cada esfuerzo y por enseñarme con su ejemplo. A mis
            padrinos, gracias por su cariño y por estar conmigo en este día tan bonito. Y a todos los que hoy me
            acompañan, gracias por hacerme sentir tan especial.
          </p>

          <p className="text-lg md:text-xl text-gray-700 italic mb-8 leading-relaxed">
            Llevo en el corazón cada sonrisa, cada palabra y cada abrazo.
          </p>

          <div className="mt-8 text-pink-600 font-medium">
            <p>Con mucho amor,</p>
            <p className="mt-2 text-xl">Tam</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default QuinceaneraMesage
