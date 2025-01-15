import { useState } from 'react';
import { Edit, Trash2, Users } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface UsersSectionProps {
  users: User[];
  handleUserDelete: (userId: string) => void;
  handleUserEdit: (userId: string, updatedUser: { name: string; email: string }) => void;
}

export const UsersSection = ({ users, handleUserDelete, handleUserEdit }: UsersSectionProps) => {
  const [userToDelete, setUserToDelete] = useState<string | null>(null); // Estado para deletar
  const [userToEdit, setUserToEdit] = useState<User | null>(null); // Estado para editar
  const [editName, setEditName] = useState(''); // Estado para o nome editado
  const [editEmail, setEditEmail] = useState(''); // Estado para o email editado

  // Abre o modal de confirmação para deletar
  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
  };

  // Confirma a deleção
  const confirmDelete = () => {
    if (userToDelete) {
      handleUserDelete(userToDelete);
      setUserToDelete(null); // Fecha o modal
    }
  };

  // Cancela a deleção
  const cancelDelete = () => {
    setUserToDelete(null); // Fecha o modal
  };

  // Abre o modal de edição
  const handleEditClick = (user: User) => {
    setUserToEdit(user);
    setEditName(user.name); // Preenche o campo de nome
    setEditEmail(user.email); // Preenche o campo de email
  };

  // Confirma a edição
  const confirmEdit = () => {
    if (userToEdit) {
      handleUserEdit(userToEdit._id, { name: editName, email: editEmail });
      setUserToEdit(null); // Fecha o modal
    }
  };

  // Cancela a edição
  const cancelEdit = () => {
    setUserToEdit(null); // Fecha o modal
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/50 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Users className="mr-2 text-green-500" /> Usuários ({users.length})
      </h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center p-2 rounded-md hover:bg-gray-700/50 transition-colors"
          >
            <span>
              {user.name} ({user.email})
            </span>
            <div>
              <button
                onClick={() => handleEditClick(user)}
                className="text-blue-500 hover:text-blue-400 transition-colors mr-2"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDeleteClick(user._id)}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de Confirmação para Deletar */}
      {userToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-gray-800/90 p-6 rounded-xl border border-gray-700/50 shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirmar Exclusão</h3>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja excluir este usuário?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      {userToEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-gray-800/90 p-6 rounded-xl border border-gray-700/50 shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Editar Usuário</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Nome</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-md p-2 text-gray-200 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-md p-2 text-gray-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmEdit}
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};