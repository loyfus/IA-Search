import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Tool {
  _id: string;
  name: string;
  status: 'active' | 'pending';
}

interface ActiveToolsSectionProps {
  activeTools: Tool[];
  handleToolStatusChange: (toolId: string, newStatus: 'active' | 'pending') => void;
}

export const ActiveToolsSection = ({ activeTools, handleToolStatusChange }: ActiveToolsSectionProps) => {
  const [toolToDeactivate, setToolToDeactivate] = useState<string | null>(null);

  const handleDeactivateTool = (toolId: string) => {
    setToolToDeactivate(toolId);
  };

  const confirmDeactivation = () => {
    if (toolToDeactivate) {
      handleToolStatusChange(toolToDeactivate, 'pending');
      setToolToDeactivate(null);
    }
  };

  const cancelDeactivation = () => {
    setToolToDeactivate(null);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/50 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <AlertTriangle className="mr-2 text-blue-500" /> Ferramentas Ativas ({activeTools.length})
      </h2>
      <ul className="space-y-2">
        {activeTools.map((tool) => (
          <li
            key={tool._id}
            className="flex justify-between items-center p-2 rounded-md hover:bg-gray-700/50 transition-colors"
          >
            <span>{tool.name}</span>
            <button
              onClick={() => handleDeactivateTool(tool._id)}
              className="text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              <AlertTriangle size={20} />
            </button>
          </li>
        ))}
      </ul>

      {/* Modal de Confirmação */}
      {toolToDeactivate && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-gray-800/90 p-6 rounded-xl border border-gray-700/50 shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirmar Desativação</h3>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja desativar esta ferramenta?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDeactivation}
                className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeactivation}
                className="px-4 py-2 rounded-md bg-yellow-600 hover:bg-yellow-700 text-white transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};