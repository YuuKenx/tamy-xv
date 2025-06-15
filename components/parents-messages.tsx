"use client"
import { motion } from "framer-motion"

const ParentsMessages = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-12"
        >
          Mensajes de los Papás
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Mensaje del Papá */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-300 to-pink-300"></div>

            <h3 className="text-2xl font-bold text-purple-600 mb-6 text-center">Mensaje del Papá</h3>

            <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
              <span className="font-semibold text-purple-600">Mi querida hija:</span>
            </p>

            <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
              Hoy cumples XV años y mi corazón está lleno de orgullo y emoción al verte tan hermosa, fuerte y llena de
              vida. Has crecido tan rápido... pero en mis ojos siempre serás mi niña, la que un día me enseñó lo que
              significa amar sin medida.
            </p>

            <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
              Este día marca el inicio de una nueva etapa en tu vida, donde comienzas a descubrir el mundo desde otra
              mirada, con ilusiones, retos y sueños por alcanzar. Quiero que sepas que siempre estaré aquí para ti, para
              apoyarte, cuidarte y abrazarte cuando lo necesites.
            </p>

            <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
              Eres mi mayor tesoro, mi alegría diaria y la razón de muchas de mis sonrisas. Que la vida te regale
              momentos hermosos y que nunca te falten la fe, el amor ni el valor para luchar por lo que deseas.
            </p>

            <p className="text-base md:text-lg text-gray-700 italic mb-6 leading-relaxed">
              Te amo con todo mi corazón.
            </p>

            <div className="text-purple-600 font-medium text-center">
              <p>Con amor y orgullo,</p>
              <p className="mt-2 text-lg">Tu papá</p>
            </div>
          </motion.div>

          {/* Mensaje de la Mamá */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 to-rose-300"></div>

            <h3 className="text-2xl font-bold text-pink-600 mb-6 text-center">Mensaje de la Mamá</h3>

            <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
              <span className="font-semibold text-pink-600">Mi hermosa hija:</span>
            </p>

            <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
              Hoy llegas a tus XV años, y mi corazón se llena de emoción al verte convertirte en una joven maravillosa.
              Pareciera que fue ayer cuando te tomé por primera vez en mis brazos, y ahora te veo radiante, fuerte y
              llena de sueños por cumplir.
            </p>

            <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
              Estoy tan orgullosa de ti, de tu nobleza, tu alegría y tu gran corazón. Que Dios te bendiga siempre, te
              proteja y te guíe por caminos llenos de luz, amor y sabiduría.
            </p>

            <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
              Nunca olvides cuánto te amo y que siempre estaré a tu lado, en cada paso, en cada decisión y en cada nuevo
              comienzo.
            </p>

            <p className="text-base md:text-lg text-gray-700 italic mb-6 leading-relaxed">
              Eres uno de mis mayores regalos, mi motivo y mi eterno amor.
            </p>

            <div className="text-pink-600 font-medium text-center">
              <p>Con todo mi corazón,</p>
              <p className="mt-2 text-lg">Tu mamá</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ParentsMessages
