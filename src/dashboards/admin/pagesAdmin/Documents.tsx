import { useState } from 'react';
import { 
  FileText, 
  Edit,
  Trash2,
  Search,
  Plus,
  Users,
  CheckSquare,
  Square,
  AlertCircle,
  X,
  Upload,
  File,
  Eye,
  Save,
  RotateCcw,
  Download,
  History,
  UserPlus,
} from "lucide-react";

interface Document {
    id: string;
    nom: string;
    type: string;
    taille: string;
    dateUpload: string;
    statut: string;
    utilisateur: string;
    clientId?: string;
    clientName?: string;
    ocrText?: string;
    originalUrl?: string;
  }

interface Client {
    id: string;
    nom: string;
    email: string;
    limiteMensuelle: number;
    documentsConsommes: number;
    documentsAttribues: number;
  }

interface AllocationHistory {
    id: string;
    clientId: string;
    clientName: string;
    action: 'assignation' | 'modification' | 'suppression';
    ancienneValeur?: number;
    nouvelleValeur?: number;
    date: string;
    adminName: string;
    commentaire?: string;
  }

export default function Documents() {
    const [searchClients, setSearchClients] = useState('');
    const [showAddClientModal, setShowAddClientModal] = useState(false);
    const [showEditClientModal, setShowEditClientModal] = useState(false);
    const [showDeleteClientModal, setShowDeleteClientModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [deletingClient, setDeletingClient] = useState<Client | null>(null);
    const [selectedClientForHistory, setSelectedClientForHistory] = useState<Client | null>(null);
    const [newClient, setNewClient] = useState({
        nom: '',
        email: '',
        limiteMensuelle: 0
    });

    const [clients, setClients] = useState<Client[]>([
        {
            id: '1',
            nom: 'Entreprise ABC',
            email: 'contact@abc.com',
            limiteMensuelle: 1000,
            documentsConsommes: 450,
            documentsAttribues: 12
        },
        {
            id: '2',
            nom: 'Société XYZ',
            email: 'info@xyz.com',
            limiteMensuelle: 500,
            documentsConsommes: 320,
            documentsAttribues: 8
        },
        {
            id: '3',
            nom: 'Startup Innov',
            email: 'hello@innov.com',
            limiteMensuelle: 200,
            documentsConsommes: 180,
            documentsAttribues: 5
        }
    ]);

    const [allocationHistory, setAllocationHistory] = useState<AllocationHistory[]>([
        {
            id: '1',
            clientId: '1',
            clientName: 'Entreprise ABC',
            action: 'assignation',
            ancienneValeur: 0,
            nouvelleValeur: 1000,
            date: '2024-01-15 10:30:00',
            adminName: 'Admin',
            commentaire: 'Création du client avec allocation initiale'
        },
        {
            id: '2',
            clientId: '2',
            clientName: 'Société XYZ',
            action: 'assignation',
            ancienneValeur: 0,
            nouvelleValeur: 500,
            date: '2024-01-14 14:20:00',
            adminName: 'Admin',
            commentaire: 'Création du client avec allocation initiale'
        },
        {
            id: '3',
            clientId: '1',
            clientName: 'Entreprise ABC',
            action: 'modification',
            ancienneValeur: 1000,
            nouvelleValeur: 1200,
            date: '2024-01-13 09:15:00',
            adminName: 'Admin',
            commentaire: 'Augmentation de l\'allocation mensuelle'
        }
    ]);

    const filteredClients = clients.filter(client =>
        client.nom.toLowerCase().includes(searchClients.toLowerCase()) ||
        client.email.toLowerCase().includes(searchClients.toLowerCase())
    );

    const handleAddClient = () => {
        if (newClient.nom && newClient.email && newClient.limiteMensuelle > 0) {
            const client: Client = {
                id: Date.now().toString(),
                nom: newClient.nom,
                email: newClient.email,
                limiteMensuelle: newClient.limiteMensuelle,
                documentsConsommes: 0,
                documentsAttribues: 0
            };

            setClients(prev => [...prev, client]);

            // Ajouter à l'historique
            const historyEntry: AllocationHistory = {
                id: Date.now().toString(),
                clientId: client.id,
                clientName: client.nom,
                action: 'assignation',
                ancienneValeur: 0,
                nouvelleValeur: client.limiteMensuelle,
                date: new Date().toISOString().replace('T', ' ').substring(0, 19),
                adminName: 'Admin',
                commentaire: 'Création du client avec allocation initiale'
            };

            setAllocationHistory(prev => [historyEntry, ...prev]);

            setNewClient({ nom: '', email: '', limiteMensuelle: 0 });
            setShowAddClientModal(false);
        }
    };

    const handleEditClient = () => {
        if (editingClient) {
            const oldClient = clients.find(c => c.id === editingClient.id);
            if (oldClient) {
                setClients(prev => prev.map(client => 
                    client.id === editingClient.id ? editingClient : client
                ));

                // Ajouter à l'historique si la limite a changé
                if (oldClient.limiteMensuelle !== editingClient.limiteMensuelle) {
                    const historyEntry: AllocationHistory = {
                        id: Date.now().toString(),
                        clientId: editingClient.id,
                        clientName: editingClient.nom,
                        action: 'modification',
                        ancienneValeur: oldClient.limiteMensuelle,
                        nouvelleValeur: editingClient.limiteMensuelle,
                        date: new Date().toISOString().replace('T', ' ').substring(0, 19),
                        adminName: 'Admin',
                        commentaire: 'Modification de l\'allocation mensuelle'
                    };

                    setAllocationHistory(prev => [historyEntry, ...prev]);
                }
            }

            setEditingClient(null);
            setShowEditClientModal(false);
        }
    };

    const handleDeleteClient = () => {
        if (deletingClient) {
            // Ajouter à l'historique avant suppression
            const historyEntry: AllocationHistory = {
                id: Date.now().toString(),
                clientId: deletingClient.id,
                clientName: deletingClient.nom,
                action: 'suppression',
                ancienneValeur: deletingClient.limiteMensuelle,
                nouvelleValeur: 0,
                date: new Date().toISOString().replace('T', ' ').substring(0, 19),
                adminName: 'Admin',
                commentaire: 'Suppression du client'
            };

            setAllocationHistory(prev => [historyEntry, ...prev]);

            setClients(prev => prev.filter(client => client.id !== deletingClient.id));
            setDeletingClient(null);
            setShowDeleteClientModal(false);
        }
    };

    const openEditModal = (client: Client) => {
        setEditingClient({ ...client });
        setShowEditClientModal(true);
    };

    const openDeleteModal = (client: Client) => {
        setDeletingClient(client);
        setShowDeleteClientModal(true);
    };

    const openHistoryModal = (client: Client) => {
        setSelectedClientForHistory(client);
        setShowHistoryModal(true);
    };

    const getClientHistory = (clientId: string) => {
        return allocationHistory.filter(entry => entry.clientId === clientId);
    };

    const getStatusColor = (client: Client) => {
        const percentage = (client.documentsConsommes / client.limiteMensuelle) * 100;
        if (percentage >= 90) return 'text-red-600';
        if (percentage >= 75) return 'text-yellow-600';
        return 'text-green-600';
    };

    const getStatusBgColor = (client: Client) => {
        const percentage = (client.documentsConsommes / client.limiteMensuelle) * 100;
        if (percentage >= 90) return 'bg-red-100';
        if (percentage >= 75) return 'bg-yellow-100';
        return 'bg-green-100';
    };

    return (
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Gestion des allocations clients</h2>
              <p className="text-xs sm:text-sm text-gray-600">Gérez les allocations de documents par client</p>
            </div>
            <div className="flex flex-wrap items-center gap-1 sm:space-x-2">
              <button 
                onClick={() => setShowAddClientModal(true)}
                className="flex items-center space-x-1 px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
              >
                <UserPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Ajouter un client</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={searchClients}
              onChange={(e) => setSearchClients(e.target.value)}
              className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Clients Table - Mobile Responsive */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom du client
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documents attribués
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documents restants
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilisation
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{client.nom}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{client.email}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{client.limiteMensuelle}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                        <div className={`text-sm font-medium ${getStatusColor(client)}`}>
                          {client.limiteMensuelle - client.documentsConsommes}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getStatusBgColor(client).replace('bg-', 'bg-').replace('-100', '-600')}`}
                              style={{ width: `${Math.min((client.documentsConsommes / client.limiteMensuelle) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {Math.round((client.documentsConsommes / client.limiteMensuelle) * 100)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button 
                            onClick={() => openHistoryModal(client)}
                            className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50" 
                            title="Historique"
                          >
                            <History className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => openEditModal(client)}
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50" 
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => openDeleteModal(client)}
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

            {/* Mobile Cards */}
            <div className="md:hidden">
              {filteredClients.map((client) => (
                <div key={client.id} className="border-b border-gray-200 p-3 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{client.nom}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{client.email}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => openHistoryModal(client)}
                        className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50" 
                        title="Historique"
                      >
                        <History className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openEditModal(client)}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50" 
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openDeleteModal(client)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50" 
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-600">Attribués:</span>
                      <span className="ml-1 font-medium">{client.limiteMensuelle}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Restants:</span>
                      <span className={`ml-1 font-medium ${getStatusColor(client)}`}>
                        {client.limiteMensuelle - client.documentsConsommes}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getStatusBgColor(client).replace('bg-', 'bg-').replace('-100', '-600')}`}
                          style={{ width: `${Math.min((client.documentsConsommes / client.limiteMensuelle) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {Math.round((client.documentsConsommes / client.limiteMensuelle) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Client Modal */}
          {showAddClientModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 w-full max-w-md">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-lg font-semibold">Ajouter un client</h3>
                  <button
                    onClick={() => {
                      setShowAddClientModal(false);
                      setNewClient({ nom: '', email: '', limiteMensuelle: 0 });
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom du client
                    </label>
                    <input
                      type="text"
                      value={newClient.nom}
                      onChange={(e) => setNewClient(prev => ({ ...prev, nom: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Nom de l'entreprise"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="contact@entreprise.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de documents attribués
                    </label>
                    <input
                      type="number"
                      value={newClient.limiteMensuelle}
                      onChange={(e) => setNewClient(prev => ({ ...prev, limiteMensuelle: parseInt(e.target.value) || 0 }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="1000"
                      min="1"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => {
                      setShowAddClientModal(false);
                      setNewClient({ nom: '', email: '', limiteMensuelle: 0 });
                    }}
                    className="px-3 sm:px-4 py-1.5 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleAddClient}
                    disabled={!newClient.nom || !newClient.email || newClient.limiteMensuelle <= 0}
                    className="px-3 sm:px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Client Modal */}
          {showEditClientModal && editingClient && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 w-full max-w-md">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-lg font-semibold">Modifier le client</h3>
                  <button
                    onClick={() => setShowEditClientModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom du client
                    </label>
                    <input
                      type="text"
                      value={editingClient.nom}
                      onChange={(e) => setEditingClient(prev => prev ? { ...prev, nom: e.target.value } : null)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editingClient.email}
                      onChange={(e) => setEditingClient(prev => prev ? { ...prev, email: e.target.value } : null)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de documents attribués
                    </label>
                    <input
                      type="number"
                      value={editingClient.limiteMensuelle}
                      onChange={(e) => setEditingClient(prev => prev ? { ...prev, limiteMensuelle: parseInt(e.target.value) || 0 } : null)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      min="1"
                    />
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-600">
                      Documents consommés: {editingClient.documentsConsommes}
                    </p>
                    <p className="text-xs text-gray-600">
                      Documents restants: {editingClient.limiteMensuelle - editingClient.documentsConsommes}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => setShowEditClientModal(false)}
                    className="px-3 sm:px-4 py-1.5 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleEditClient}
                    disabled={!editingClient.nom || !editingClient.email || editingClient.limiteMensuelle <= 0}
                    className="px-3 sm:px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Client Modal */}
          {showDeleteClientModal && deletingClient && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 w-full max-w-md">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-lg font-semibold">Supprimer le client</h3>
                  <button
                    onClick={() => setShowDeleteClientModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <div className="mb-3">
                  <p className="text-gray-600 text-sm">
                    Êtes-vous sûr de vouloir supprimer le client <strong>"{deletingClient.nom}"</strong> ?
                  </p>
                  <div className="mt-2 p-2 bg-red-50 rounded-lg">
                    <p className="text-xs text-red-600 font-medium">Attention:</p>
                    <ul className="text-xs text-red-600 mt-1 space-y-1">
                      <li>• Toutes les données du client seront supprimées</li>
                      <li>• L'historique des allocations sera conservé</li>
                      <li>• Cette action est irréversible</li>
                    </ul>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowDeleteClientModal(false)}
                    className="px-3 sm:px-4 py-1.5 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleDeleteClient}
                    className="px-3 sm:px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* History Modal */}
          {showHistoryModal && selectedClientForHistory && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Historique des modifications - {selectedClientForHistory.nom}
                  </h3>
                  <button
                    onClick={() => setShowHistoryModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {getClientHistory(selectedClientForHistory.id).map((entry) => (
                    <div key={entry.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            entry.action === 'assignation' ? 'bg-green-100 text-green-800' :
                            entry.action === 'modification' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {entry.action === 'assignation' ? 'Assignation' :
                             entry.action === 'modification' ? 'Modification' : 'Suppression'}
                          </span>
                          <span className="text-xs text-gray-500">{entry.date}</span>
                        </div>
                        <span className="text-xs text-gray-600">Par {entry.adminName}</span>
                      </div>
                      
                      {entry.action !== 'suppression' && (
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-600">Ancienne valeur:</span>
                            <span className="ml-1 font-medium">{entry.ancienneValeur} documents</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Nouvelle valeur:</span>
                            <span className="ml-1 font-medium">{entry.nouvelleValeur} documents</span>
                          </div>
                        </div>
                      )}
                      
                      {entry.commentaire && (
                        <p className="text-xs text-gray-600 mt-2 italic">
                          "{entry.commentaire}"
                        </p>
                      )}
                    </div>
                  ))}
                  
                  {getClientHistory(selectedClientForHistory.id).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <History className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p>Aucun historique disponible pour ce client</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      );
}