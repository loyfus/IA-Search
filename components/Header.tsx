'use client' // Marca o componente como Client Component

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Info, Mail, LogIn, LogOut, Menu, LayoutDashboard } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Estado para verificar se o usuário está logado
  const [userRole, setUserRole] = useState<string | null>(null) // Estado para armazenar o role do usuário

  // Verifica se o usuário está logado e o role ao carregar o componente
  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('userRole') // Obtém o role do localStorage

    if (token) {
      setIsLoggedIn(true) // Se houver um token, o usuário está logado
      setUserRole(role) // Define o role do usuário
    }
  }, [])

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem('token') // Remove o token
    localStorage.removeItem('userRole') // Remove o role
    setIsLoggedIn(false) // Atualiza o estado para "não logado"
    setUserRole(null) // Limpa o role
    router.push('/') // Redireciona para a página inicial
  }

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-10 backdrop-blur-xl bg-gray-900/50 border-b border-gray-800/50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Loyfus IA Search
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/about" 
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Info size={18} />
              <span>Sobre</span>
            </Link>
            <Link 
              href="/contact" 
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Mail size={18} />
              <span>Contato</span>
            </Link>

            {/* Botão de Dashboard para ADMIN */}
            {isLoggedIn && userRole === 'admin' && (
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
            )}

            {isLoggedIn ? (
              // Botão de Logout se o usuário estiver logado
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              // Botão de Login se o usuário não estiver logado
              <Link 
                href="/login" 
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </nav>
          <button className="md:hidden p-2 text-gray-300 hover:text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </motion.header>
  )
}