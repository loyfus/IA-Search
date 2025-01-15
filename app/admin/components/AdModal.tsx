'use client'

import { useState } from 'react';

interface Ad {
  title: string;
  description: string;
  link: string;
  image?: string;
  category?: string;
  isPromoted?: boolean;
}

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newAd: Ad) => void;
}

export const AdModal = ({ isOpen, onClose, onSave }: AdModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [isPromoted, setIsPromoted] = useState(false);

  const handleSave = () => {
    if (!title || !description || !link) {
      alert('Título, descrição e link são obrigatórios.');
      return;
    }

    const newAd: Ad = {
      title,
      description,
      link,
      image,
      category,
      isPromoted,
    };

    onSave(newAd);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Adicionar Novo Anúncio</h2>

        {/* Título */}
        <input
          type="text"
          placeholder="Título do anúncio"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded-md text-white"
        />

        {/* Descrição */}
        <textarea
          placeholder="Descrição do anúncio"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded-md text-white"
        />

        {/* Link */}
        <input
          type="text"
          placeholder="Link do anúncio"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded-md text-white"
        />

        {/* URL da Imagem */}
        <input
          type="text"
          placeholder="URL da imagem (opcional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded-md text-white"
        />

        {/* Categoria */}
        <input
          type="text"
          placeholder="Categoria (opcional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded-md text-white"
        />

        {/* Anúncio Promovido */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isPromoted}
            onChange={(e) => setIsPromoted(e.target.checked)}
            className="mr-2"
          />
          <span>Anúncio promovido</span>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};