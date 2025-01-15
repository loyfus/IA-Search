'use client'

import { useState } from 'react'
import Header from '../components/Header'
import SearchSection from '../components/SearchSection'
import PopularCategories from '../components/PopularCategories'
import ResultsList from '../components/ResultsList'
import Footer from '../components/Footer'
import { API_URL } from './config'

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/tools?q=${encodeURIComponent(query)}`)
      if (!response.ok) throw new Error('Failed to fetch results')
      const data = await response.json()
      setResults(data.tools)
    } catch (error) {
      console.error('Error fetching results:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="relative">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <SearchSection onSearch={handleSearch} loading={loading} />
          {/* Renderiza PopularCategories apenas se não houver resultados */}
          {results.length === 0 && <PopularCategories />}
          {/* Renderiza ResultsList apenas se houver resultados */}
          {results.length > 0 && <ResultsList results={results} />}
        </main>
        <Footer />
      </div>
    </div>
  )
}