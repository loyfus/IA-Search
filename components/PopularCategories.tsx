'use client'

import { motion } from 'framer-motion'
import { Image, Code, Sparkles, BrainCircuit, Palette, MessageSquare, Bot, Music, Camera } from 'lucide-react'

const categories = [
  { name: 'Imagens', icon: Image, description: 'Geração de imagens' },
  { name: 'Texto', icon: MessageSquare, description: 'Processamento de texto' },
  { name: 'Áudio', icon: Music, description: 'Edição de áudio' },
  { name: 'Código', icon: Code, description: 'Assistente de código' },
  { name: 'Vídeo', icon: Camera, description: 'Edição de vídeo' },
  { name: 'Arte', icon: Palette, description: 'Criação artística' },
  { name: 'Chatbots', icon: Bot, description: 'Assistentes virtuais' },
  { name: 'Machine Learning', icon: BrainCircuit, description: 'IA avançada' },
]

export default function PopularCategories() {
  return (
    <section className="my-16">
      {/* Animação para o título */}
      <motion.div
        className="flex items-center justify-center gap-3 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Sparkles className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-white">Categorias Populares</h2>
      </motion.div>

      {/* Grade de categorias com animações */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group relative p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 overflow-hidden"
          >
            <div className="relative flex flex-col items-center gap-3">
              {/* Animação para o ícone */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <category.icon className="w-8 h-8 text-blue-500" />
              </motion.div>

              {/* Animação para o texto */}
              <motion.div
                className="text-center"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <span className="block text-sm font-medium text-white mb-1">{category.name}</span>
                <span className="block text-xs text-gray-400">{category.description}</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}