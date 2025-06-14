"use client"
import { motion } from "framer-motion"
import { Shirt, Crown, Sparkles } from "lucide-react"

const DressCode = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl my-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Código de Vestimenta</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-purple-300 mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shirt size={32} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">Etiqueta</h3>
                <p className="text-gray-600">Vestimenta formal para la ocasión</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown size={32} className="text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">Color Especial</h3>
                <p className="text-gray-600">El rosa está reservado para nuestra quinceañera</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={32} className="text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-yellow-600 mb-2">Elegancia</h3>
                <p className="text-gray-600">Ven con tu mejor atuendo para celebrar</p>
              </div>
            </div>

            <div className="text-center bg-pink-50 rounded-xl p-6">
              <h4 className="text-lg font-bold text-pink-700 mb-3">Importante</h4>
              <p className="text-pink-600 text-lg">
                <span className="font-semibold">Vestimenta formal</span> - El color{" "}
                <span className="font-bold text-pink-700">rosa está reservado para Tamy</span>
              </p>
              <p className="text-gray-600 mt-2 text-sm">
                Agradecemos tu comprensión para hacer de este día algo verdaderamente especial
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DressCode
