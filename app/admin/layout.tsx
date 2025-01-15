'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Home, Database, BarChart2, Users, LogOut } from 'lucide-react'
import { ActiveToolsSection } from './components/ActiveToolsSection'
import { PendingToolsSection } from './components/PendingToolsSection'
import { AddToolForm } from './components/AddToolForm' // Importe o componente AddToolForm
import { AdsSection } from './components/AdsSection'
import { UsersSection } from './components/UsersSection'
import { AdModal } from './components/AdModal'
import { API_URL } from '../config'

// Define the Tool type
type Tool = {
  _id: string;
  name: string;
  status: 'active' | 'pending';
}

// Define the Ad type
type Ad = {
  _id: string;
  title: string;
  description: string;
  link: string;
}

// Define the User type
type User = {
  _id: string;
  name: string;
  email: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [activeSection, setActiveSection] = useState<'tools' | 'pendingTools' | 'ads' | 'users' | 'addTool'>('tools') // Adicionado 'addTool'

  // Estados para os dados
  const [activeTools, setActiveTools] = useState<Tool[]>([])
  const [pendingTools, setPendingTools] = useState<Tool[]>([])
  const [ads, setAds] = useState<Ad[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isAdModalOpen, setIsAdModalOpen] = useState(false)

  // Função para buscar dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')

        const [toolsRes, adsRes, usersRes] = await Promise.all([
          fetch(`${API_URL}/tools`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/ads`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        if (!toolsRes.ok || !adsRes.ok || !usersRes.ok) {
          throw new Error('Erro ao carregar dados')
        }

        const toolsData = await toolsRes.json()
        const adsData = await adsRes.json()
        const usersData = await usersRes.json()

        setActiveTools(toolsData.tools.filter((tool: Tool) => tool.status === 'active'))
        setPendingTools(toolsData.tools.filter((tool: Tool) => tool.status === 'pending'))
        setAds(adsData.ads)
        setUsers(usersData.users)
      } catch (err) {
        console.error('Erro ao carregar dados:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Função para alterar o status de uma ferramenta
  const handleToolStatusChange = async (toolId: string, newStatus: 'active' | 'pending') => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`${API_URL}/tools/${toolId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar status da ferramenta')
      }

      const updatedTool = await response.json()

      if (newStatus === 'active') {
        setActiveTools([...activeTools, updatedTool])
        setPendingTools(pendingTools.filter((tool) => tool._id !== toolId))
      } else {
        setPendingTools([...pendingTools, updatedTool])
        setActiveTools(activeTools.filter((tool) => tool._id !== toolId))
      }
    } catch (err) {
      console.error('Erro ao atualizar status da ferramenta:', err)
    }
  }

  // Função para excluir um anúncio
  const handleAdDelete = async (adId: string) => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`${API_URL}/ads/${adId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error('Erro ao excluir anúncio')
      }

      setAds(ads.filter((ad) => ad._id !== adId))
    } catch (err) {
      console.error('Erro ao excluir anúncio:', err)
    }
  }

  // Função para excluir um usuário
  const handleUserDelete = async (userId: string) => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error('Erro ao excluir usuário')
      }

      setUsers(users.filter((user) => user._id !== userId))
    } catch (err) {
      console.error('Erro ao excluir usuário:', err)
    }
  }

  // Função para adicionar um anúncio
  const handleAddAd = async (newAd: Omit<Ad, '_id'>) => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`${API_URL}/ads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAd),
      })

      if (!response.ok) {
        throw new Error('Erro ao adicionar anúncio')
      }

      const savedAd = await response.json()
      setAds([...ads, savedAd])
    } catch (err) {
      console.error('Erro ao adicionar anúncio:', err)
    }
  }

  // Função para adicionar uma nova ferramenta
  const handleAddTool = async (tool: {
    name: string;
    description: string;
    link: string;
    icon?: string;
    categories: string[];
  }) => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`${API_URL}/tools`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...tool, status: 'pending' }), // Define o status como 'pending'
      })

      if (!response.ok) {
        throw new Error('Erro ao adicionar ferramenta')
      }

      const savedTool = await response.json()
      setPendingTools([...pendingTools, savedTool]) // Adiciona a nova ferramenta à lista de pendentes
      setActiveSection('pendingTools') // Redireciona para a seção de ferramentas pendentes
    } catch (err) {
      console.error('Erro ao adicionar ferramenta:', err)
    }
  }

  // Verificação de autenticação
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      const userRole = localStorage.getItem('userRole')
      const name = localStorage.getItem('userName')

      if (!token || userRole !== 'admin') {
        router.push('/login')
      } else {
        setLoading(false)
        setUserName(name || 'Usuário')
      }
    }
  }, [router])

  // Função para logout
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userName')
    }
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-2xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className=" text-white flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <aside className="relative w-64 bg-gray-800/50 backdrop-blur-xl text-white p-6 border-r border-gray-700/50 flex flex-col justify-between">
        <nav className="space-y-4">
          <button
            onClick={() => setActiveSection('tools')}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors w-full"
          >
            <Home size={20} />
            <span>Ferramentas Ativas</span>
          </button>
          <button
            onClick={() => setActiveSection('pendingTools')}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors w-full"
          >
            <Database size={20} />
            <span>Ferramentas Pendentes</span>
          </button>
          <button
            onClick={() => setActiveSection('addTool')} // Botão para adicionar ferramenta
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors w-full"
          >
            <Database size={20} />
            <span>Adicionar Ferramenta</span>
          </button>
          <button
            onClick={() => setActiveSection('ads')}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors w-full"
          >
            <BarChart2 size={20} />
            <span>Anúncios</span>
          </button>
          <button
            onClick={() => setActiveSection('users')}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors w-full"
          >
            <Users size={20} />
            <span>Usuários</span>
          </button>
        </nav>

        {/* Seção do usuário e botão de logout */}
        <div className="mt-6 border-t border-gray-700/50 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">{userName}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
      <main className="relative flex-1 overflow-y-auto p-8">
        {activeSection === 'tools' && (
          <ActiveToolsSection
            activeTools={activeTools}
            handleToolStatusChange={handleToolStatusChange}
          />
        )}
        {activeSection === 'pendingTools' && (
          <PendingToolsSection
            pendingTools={pendingTools}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            handleToolStatusChange={handleToolStatusChange} handleEditTool={function (toolId: string, updatedTool: { name: string; description?: string; link?: string; categories?: string[] }): void {
              throw new Error('Function not implemented.')
            } }          />
        )}
        {activeSection === 'addTool' && ( // Renderiza o formulário de adição de ferramenta
          <AddToolForm
            onAddTool={handleAddTool}
            onClose={() => setActiveSection('pendingTools')} // Volta para a seção de ferramentas pendentes
          />
        )}
        {activeSection === 'ads' && (
          <AdsSection
            ads={ads}
            handleAdDelete={handleAdDelete}
            setIsAdModalOpen={setIsAdModalOpen}
          />
        )}
        {activeSection === 'users' && (
          <UsersSection
            users={users}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            handleUserDelete={handleUserDelete} handleUserEdit={function (userId: string, updatedUser: { name: string; email: string }): void {
              throw new Error('Function not implemented.')
            } }          />
        )}
      </main>

      {/* Modal de Adição de Anúncio */}
      <AdModal
        isOpen={isAdModalOpen}
        onClose={() => setIsAdModalOpen(false)}
        onSave={handleAddAd}
      />
    </div>
  )
}