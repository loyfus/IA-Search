'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Logotipo e Descrição */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Loyfus IA Search
            </h3>
          </motion.div>

          {/* Direitos Autorais */}
          <motion.div
            className="mt-6 text-gray-300 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            © {new Date().getFullYear()} Loyfus IA Search. Todos os direitos reservados.
          </motion.div>
        </div>
      </div>
    </footer>
  )
}