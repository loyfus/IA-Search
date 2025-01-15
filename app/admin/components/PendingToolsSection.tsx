import { useState } from 'react';
import { X, Edit, Check, Trash } from 'lucide-react';

interface Tool {
  _id: string;
  name: string;
  status: 'active' | 'pending';
  description?: string;
  link?: string;
  categories?: string[];
}

interface PendingToolsSectionProps {
  pendingTools: Tool[];
  handleToolStatusChange: (toolId: string, newStatus: 'active' | 'pending') => void;
  handleEditTool: (toolId: string, updatedTool: { name: string; description?: string; link?: string; categories?: string[] }) => void;
}

export const PendingToolsSection = ({ pendingTools, handleToolStatusChange, handleEditTool }: PendingToolsSectionProps) => {
  const [editingToolId, setEditingToolId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedLink, setEditedLink] = useState('');
  const [editedCategories, setEditedCategories] = useState<string[]>([]);

  const startEditing = (tool: Tool) => {
    setEditingToolId(tool._id);
    setEditedName(tool.name);
    setEditedDescription(tool.description || '');
    setEditedLink(tool.link || '');
    setEditedCategories(tool.categories || []);
  };

  const cancelEditing = () => {
    setEditingToolId(null);
    setEditedName('');
    setEditedDescription('');
    setEditedLink('');
    setEditedCategories([]);
  };

  const confirmEdit = (toolId: string) => {
    const updatedTool = {
      name: editedName,
      description: editedDescription,
      link: editedLink,
      categories: editedCategories,
    };
    handleEditTool(toolId, updatedTool);
    cancelEditing();
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-200">Ferramentas Pendentes</h2>
      {pendingTools.length === 0 ? (
        <p className="text-gray-400">Nenhuma ferramenta pendente.</p>
      ) : (
        <ul className="space-y-4">
          {pendingTools.map((tool) => (
            <li key={tool._id} className="bg-gray-700/50 p-4 rounded-lg border border-gray-600/50">
              {editingToolId === tool._id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full bg-gray-600/50 border border-gray-500/50 rounded-md p-2 text-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="Nome"
                  />
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="w-full bg-gray-600/50 border border-gray-500/50 rounded-md p-2 text-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="Descrição"
                  />
                  <input
                    type="url"
                    value={editedLink}
                    onChange={(e) => setEditedLink(e.target.value)}
                    className="w-full bg-gray-600/50 border border-gray-500/50 rounded-md p-2 text-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="Link"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => confirmEdit(tool._id)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-gray-200 rounded-md"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-200">{tool.name}</h3>
                  {tool.description && <p className="text-gray-400">{tool.description}</p>}
                  {tool.link && (
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {tool.link}
                    </a>
                  )}
                  {tool.categories && tool.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tool.categories.map((cat) => (
                        <span key={cat} className="bg-gray-600/50 px-2 py-1 rounded-md text-sm text-gray-200">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(tool)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleToolStatusChange(tool._id, 'active')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                    >
                      Aprovar
                    </button>
                    <button
                      onClick={() => handleToolStatusChange(tool._id, 'pending')}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};