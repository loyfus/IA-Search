'use client'

import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface SearchSectionProps {
  onSearch: (query: string) => void
  loading?: boolean
}

export default function SearchSection({ onSearch, loading }: SearchSectionProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) onSearch(query.trim())
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-16 max-w-3xl mx-auto text-center px-4"
    >
      {/* Título Simples */}
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Encontre a Ferramenta de IA Ideal
      </h1>

      {/* Descrição Curta */}
      <p className="text-gray-400 mb-8 text-lg">
        Busque ferramentas de IA para suas necessidades.
      </p>

      {/* Campo de Busca */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Ex: IA para criar imagens..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-3 px-6 pr-12 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 text-white"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </motion.section>
  )
}