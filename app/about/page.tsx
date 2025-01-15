'use client'

import { motion } from 'framer-motion'
import { Search, Zap, Users, Globe } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const features = [
    { icon: Search, title: 'Busca Inteligente', description: 'Encontre as ferramentas de IA mais adequadas para suas necessidades.' },
    { icon: Zap, title: 'Atualizado Constantemente', description: 'Nossa base de dados é atualizada regularmente com as mais recentes ferramentas de IA.' },
    { icon: Users, title: 'Comunidade Ativa', description: 'Compartilhe experiências e aprenda com outros usuários de IA.' },
    { icon: Globe, title: 'Acesso Global', description: 'Conecte-se com ferramentas de IA de todo o mundo.' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="fixed inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="relative container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Sobre o Loyfus IA Search
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-300 mb-12 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Loyfus IA Search é a sua porta de entrada para o mundo da Inteligência Artificial. 
          Nossa missão é simplificar a busca e o acesso às melhores ferramentas de IA, 
          permitindo que você encontre a solução perfeita para suas necessidades.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link 
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200"
          >
            Comece a Explorar
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

