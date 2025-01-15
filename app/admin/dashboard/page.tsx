'use client'
import { useState, useEffect } from 'react'

type Tool = {
  _id: string;
  name: string;
  status: 'active' | 'pending';
  description: string;
  link?: string;
  categories?: string[];
}

type Ad = {
  _id: string;
  title: string;
  description: string;
  link: string;
  image?: string;
  category?: string;
  isPromoted?: boolean;
}

type User = {
  _id: string;
  name: string;
  email: string;
}
import { motion } from 'framer-motion'
import { API_URL } from '../../config'
import { ActiveToolsSection } from '../components/ActiveToolsSection'
import { PendingToolsSection } from '../components/PendingToolsSection'
import { AdsSection } from '../components/AdsSection'
import { UsersSection } from '../components/UsersSection'
import { AdModal } from '../components/AdModal'

export default function AdminDashboard() {
  const [activeTools, setActiveTools] = useState<Tool[]>([])
  const [pendingTools, setPendingTools] = useState<Tool[]>([])
  const [ads, setAds] = useState<Ad[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isAdModalOpen, setIsAdModalOpen] = useState(false)

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(`Erro ao carregar dados: ${err.message}`)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleToolStatusChange = async (toolId: string, newStatus: 'active' | 'pending') => {
    console.log('Tool ID:', toolId);
    if (!toolId) {
      setError('ID da ferramenta não definido.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/tools/${toolId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar status da ferramenta');
      }

      const updatedTool = await response.json();
      if (newStatus === 'active') {
        setActiveTools([...activeTools, updatedTool]);
        setPendingTools(pendingTools.filter((tool) => tool._id !== toolId));
      } else {
        setPendingTools([...pendingTools, updatedTool]);
        setActiveTools(activeTools.filter((tool) => tool._id !== toolId));
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(`Erro ao atualizar status da ferramenta: ${err.message}`);
      console.error(err);
    }
  };

  const handleEditTool = async (toolId: string, updatedTool: { name: string; description?: string; link?: string; categories?: string[] }) => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch(`${API_URL}/tools/${toolId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTool),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao editar ferramenta');
      }
  
      const updatedToolData = await response.json();
  
      // Atualiza a lista de ferramentas pendentes
      setPendingTools(pendingTools.map(tool => tool._id === toolId ? updatedToolData : tool));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(`Erro ao editar ferramenta: ${err.message}`);
      console.error(err);
    }
  };

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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Erro ao excluir anúncio: ${err.message}`);
      } else {
        setError('Erro ao excluir anúncio');
      }
      console.error(err);
    }
  }

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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Erro ao excluir usuário: ${err.message}`);
      } else {
        setError('Erro ao excluir usuário');
      }
      console.error(err);
    }
  }

  const handleAddAd = async (newAd: {
    title: string;
    description: string;
    link: string;
    image?: string;
    category?: string;
    isPromoted?: boolean;
  }) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/ads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAd),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar anúncio');
      }

      const savedAd = await response.json();
      setAds([...ads, savedAd]); // Atualiza a lista de anúncios
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Erro ao adicionar anúncio: ${err.message}`);
      } else {
        setError('Erro ao adicionar anúncio');
      }
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-2xl">Carregando...</div>
      </div>
    )

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-red-500 text-2xl">{error}</div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="fixed inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="relative">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Painel de Administração
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ActiveToolsSection
              activeTools={activeTools}
              handleToolStatusChange={handleToolStatusChange}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <PendingToolsSection
              pendingTools={pendingTools}
              handleToolStatusChange={handleToolStatusChange}
              handleEditTool={handleEditTool} // Adicione esta linha
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AdsSection
              ads={ads}
              handleAdDelete={handleAdDelete}
              setIsAdModalOpen={setIsAdModalOpen}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <UsersSection
              users={users}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              handleUserDelete={handleUserDelete} handleUserEdit={function (userId: string, updatedUser: { name: string; email: string; }): void {
                throw new Error('Function not implemented.');
              } }            />
          </motion.div>
        </div>
      </div>

      <AdModal
        isOpen={isAdModalOpen}
        onClose={() => setIsAdModalOpen(false)}
        onSave={handleAddAd}
      />
    </div>
  )
}