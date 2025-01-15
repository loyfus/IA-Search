
import { Trash2, Plus, BarChart2 } from 'lucide-react';

interface Ad {
    _id: string;
    title: string;
    description: string;
    link: string;
    image?: string;
    category?: string;
    isPromoted?: boolean;
  }
  
  interface AdsSectionProps {
    ads: Ad[];
    handleAdDelete: (adId: string) => void;
    setIsAdModalOpen: (isOpen: boolean) => void;
  }
  
  export const AdsSection = ({ ads, handleAdDelete, setIsAdModalOpen }: AdsSectionProps) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/50 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <BarChart2 className="mr-2 text-blue-500" /> Anúncios ({ads.length})
      </h2>
      <ul className="space-y-2">
        {ads.map((ad) => (
          <li
            key={ad._id}
            className="flex justify-between items-center p-2 rounded-md hover:bg-gray-700/50 transition-colors"
          >
            <span>{ad.title}</span>
            <button
              onClick={() => handleAdDelete(ad._id)}
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setIsAdModalOpen(true)}
        className="mt-4 flex items-center text-blue-500 hover:text-blue-400 transition-colors"
      >
        <Plus size={20} className="mr-1" /> Adicionar Novo Anúncio
      </button>
    </div>
  );
};