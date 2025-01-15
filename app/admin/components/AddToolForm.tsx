import { useState } from 'react';
import { X } from 'lucide-react';

interface AddToolFormProps {
  onAddTool: (tool: {
    name: string;
    description: string;
    link: string;
    icon?: string;
    categories: string[];
  }) => void;
  onClose: () => void;
}

export const AddToolForm = ({ onAddTool, onClose }: AddToolFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [icon, setIcon] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!name || !description || !link) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Envia os dados para o componente pai
    onAddTool({
      name,
      description,
      link,
      icon: icon || undefined, // Envia o ícone apenas se estiver preenchido
      categories,
    });

    // Limpa o formulário
    setName('');
    setDescription('');
    setLink('');
    setIcon('');
    setCategories([]);
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    setCategories(categories.filter((cat) => cat !== categoryToRemove));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-gray-800/90 p-6 rounded-xl border border-gray-700/50 shadow-lg max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Adicionar Nova Ferramenta</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Nome*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-md p-2 text-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Descrição*</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-md p-2 text-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Link*</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-md p-2 text-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Ícone (URL da imagem)</label>
            <input
              type="url"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-md p-2 text-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Categorias</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-md p-2 text-gray-200 focus:outline-none focus:border-blue-500"
                placeholder="Adicionar categoria"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Adicionar
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className="flex items-center bg-gray-700/50 rounded-md px-2 py-1 text-sm text-gray-200"
                >
                  {cat}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(cat)}
                    className="ml-2 text-red-500 hover:text-red-400"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-gray-200 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Adicionar Ferramenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};