'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react'
import Link from 'next/link' // Importe o Link do Next.js para navegação

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você enviaria os dados do formulário para o backend
    console.log('Form submitted:', { name, email, message })
    // Resetar os campos do formulário
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
      <div className="fixed inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="relative container mx-auto px-4 py-16 max-w-4xl">
        {/* Botão para voltar à Home */}
        <Link href="/" className="absolute top-6 left-6 md:left-10 inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar à Home
        </Link>

        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Entre em Contato
        </motion.h1>
        
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">Envie-nos uma mensagem</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Mensagem</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensagem
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">Informações de Contato</h2>
            <div className="flex items-start space-x-4">
              <Mail className="w-7 h-7 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-300">contato@loyfusiasearch.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="w-7 h-7 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold">Telefone</h3>
                <p className="text-gray-300">+55 (11) 1234-5678</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="w-7 h-7 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold">Endereço</h3>
                <p className="text-gray-300">Rua da Inovação, 123<br />Bairro Tecnológico<br />São Paulo - SP, 01234-567</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}