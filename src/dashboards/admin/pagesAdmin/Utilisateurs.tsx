import { useState } from 'react';
import { 
  User,
  Edit,
  Trash2,
  Eye,
  Search,
  Plus,
  X,
  AlertTriangle,
  Save,
} from "lucide-react";

interface User {
    id: string;
    nom: string;
    email: string;
    role: string;
    documentsConsommes: number;
    motDePasse: string;
  }

export default function Utilisateurs() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showUserDetails, setShowUserDetails] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [users, setUsers] = useState<User[]>([
        {
          id: '1',
          nom: 'Jean Dupont',
          email: 'jean.dupont@example.com',
          role: 'Utilisateur',
          documentsConsommes: 45,
          motDePasse: '********'
        },
        {
          id: '2',
          nom: 'Marie Martin',
          email: 'marie.martin@example.com',
          role: 'Administrateur',
          documentsConsommes: 128,
          motDePasse: '********'
        },
        {
          id: '3',
          nom: 'Pierre Durand',
          email: 'pierre.durand@example.com',
          role: 'Utilisateur',
          documentsConsommes: 23,
          motDePasse: '********'
        },
        {
          id: '4',
          nom: 'Sophie Bernard',
          email: 'sophie.bernard@example.com',
          role: 'Modérateur',
          documentsConsommes: 67,
          motDePasse: '********'
        },
        {
          id: '5',
          nom: 'Lucas Petit',
          email: 'lucas.petit@example.com',
          role: 'Utilisateur',
          documentsConsommes: 12,
          motDePasse: '********'
        }
      ]);

      const filteredUsers = users.filter(user =>
        user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const handleEditUser = (user: User) => {
        setEditingUser({ ...user });
        setShowEditModal(true);
      };
    
      const handleSaveUser = () => {
        if (editingUser) {
          setUsers(users.map(user => 
            user.id === editingUser.id ? editingUser : user
          ));
          setShowEditModal(false);
          setEditingUser(null);
        }
      };
    
      const handleDeleteUser = (user: User) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
      };
    
      const confirmDeleteUser = () => {
        if (selectedUser) {
          setUsers(users.filter(user => user.id !== selectedUser.id));
          setShowDeleteModal(false);
          setSelectedUser(null);
        }
      };
    
      const handleViewDetails = (user: User) => {
        setSelectedUser(user);
        setShowUserDetails(true);
      };
    
      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestion utilisateurs</h2>
              <p className="text-gray-600">Gérez les utilisateurs de la plateforme</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Ajouter un utilisateur</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rôle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documents consommés
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.nom}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'Administrateur' ? 'bg-red-100 text-red-800' :
                          user.role === 'Modérateur' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.documentsConsommes}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewDetails(user)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            title="Voir les détails"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Details Modal */}
          {showUserDetails && selectedUser && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Détails de l'utilisateur</h3>
                </div>
                <div className="px-6 py-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <p className="text-sm text-gray-900">{selectedUser.nom}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-sm text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                    <p className="text-sm text-gray-900">{selectedUser.motDePasse}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedUser.role === 'Administrateur' ? 'bg-red-100 text-red-800' :
                      selectedUser.role === 'Modérateur' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedUser.role}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Documents consommés</label>
                    <p className="text-sm text-gray-900">{selectedUser.documentsConsommes}</p>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                  <button
                    onClick={() => setShowUserDetails(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit User Modal */}
          {showEditModal && editingUser && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Modifier l'utilisateur</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="px-6 py-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      value={editingUser.nom}
                      onChange={(e) => setEditingUser({...editingUser, nom: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                    <select
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Utilisateur">Utilisateur</option>
                      <option value="Modérateur">Modérateur</option>
                      <option value="Administrateur">Administrateur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Documents consommés</label>
                    <input
                      type="number"
                      value={editingUser.documentsConsommes}
                      onChange={(e) => setEditingUser({...editingUser, documentsConsommes: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSaveUser}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Sauvegarder</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && selectedUser && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Confirmer la suppression</h3>
                </div>
                <div className="px-6 py-4">
                  <p className="text-gray-600">
                    Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{selectedUser.nom}</strong> ? 
                    Cette action est irréversible.
                  </p>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={confirmDeleteUser}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Supprimer</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}