import { Star, ExternalLink, ThumbsUp, Share2, BookmarkPlus } from 'lucide-react'
import { motion } from 'framer-motion'

interface Result {
  id: number
  name: string
  description: string
  rating?: number
  link: string
  icon?: string // URL do ícone
}

interface ResultsListProps {
  results: Result[]
}

export default function ResultsList({ results }: ResultsListProps) {
  return (
    <section className="my-16">
      <div className="flex items-center justify-center gap-3 mb-8">
        <Share2 className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-white">Resultados da Busca</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-6 rounded-xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                {/* Exibe o ícone se a URL estiver disponível */}
                {result.icon && (
                  <img
                    src={result.icon} // URL da imagem
                    alt={`${result.name} icon`} // Texto alternativo
                    className="w-8 h-8 rounded-full object-cover" // Estilos para o ícone
                    onError={(e) => {
                      // Fallback caso a imagem não carregue
                      e.currentTarget.src = 'https://via.placeholder.com/32'; // URL de fallback
                    }}
                  />
                )}
                <h3 className="text-xl font-semibold text-white">
                  {result.name}
                </h3>
              </div>
              <p className="text-gray-300 mb-4 line-clamp-2">{result.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(result.rating || 0) // Usa 0 como fallback se rating for undefined
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-300">
                    {(result.rating || 0).toFixed(1)} {/* Usa 0 como fallback se rating for undefined */}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 rounded-full hover:bg-gray-700/50 text-gray-300 hover:text-white transition-colors">
                    <ThumbsUp size={16} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-700/50 text-gray-300 hover:text-white transition-colors">
                    <BookmarkPlus size={16} />
                  </button>
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Visitar</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
