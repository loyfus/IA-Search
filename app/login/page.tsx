/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogIn, UserPlus, Loader2, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { API_URL } from '../config'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await fetch(`${API_URL}/users/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isLogin ? { email, password } : { name, email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.user.role); 
        localStorage.setItem('userName', data.user.name);
        
  
        if (data.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      } else {
        if (data.errors) {
          setError(data.errors[0].msg || 'Ocorreu um erro.');
        } else {
          setError(data.message || 'Ocorreu um erro. Tente novamente.');
        }
      }
    } catch (err) {
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
    }
  
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <Link href="/" className="absolute top-8 left-8 text-white hover:text-blue-400 transition-colors">
        <ArrowLeft className="inline-block mr-2" size={20} />
        Voltar para a Home
      </Link>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-gray-800/50 backdrop-blur-xl p-10 rounded-xl border border-gray-700/50 shadow-2xl"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isLogin ? 'Entrar na sua conta' : 'Criar uma nova conta'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Endereço de e-mail
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${
                  isLogin ? 'rounded-t-md' : ''
                } focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Endereço de e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              disabled={loading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isLogin ? <LogIn className="h-5 w-5 text-blue-500 group-hover:text-blue-400" /> : <UserPlus className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />}
              </span>
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5 mr-3" />
              ) : isLogin ? (
                'Entrar'
              ) : (
                'Cadastrar'
              )}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            {isLogin ? 'Precisa de uma conta? Cadastre-se' : 'Já tem uma conta? Entrar'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}