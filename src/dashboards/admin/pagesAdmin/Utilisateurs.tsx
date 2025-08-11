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
  Mail,
  Key,
  EyeOff,
  AlertCircle,
  TrendingUp,
  Copy,
  RefreshCw,
} from "lucide-react";

interface User {
    id: string;
    nom: string;
    email: string;
    role: string;
    documentsConsommes: number;
    motDePasse: string;
    invitationSent?: boolean;
    invitationDate?: Date;
    invitationFailed?: boolean;
    limiteDocuments?: number;
    apiKey?: string;
    apiKeyGeneratedAt?: Date;
    apiKeyExpiresAt?: Date;
    apiKeyLastUsed?: Date;
    apiKeyUsageCount?: number;
  }

export default function Utilisateurs() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showUserDetails, setShowUserDetails] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [newUser, setNewUser] = useState<Omit<User, 'id' | 'documentsConsommes'>>({
      nom: '',
      email: '',
      role: 'Utilisateur',
      motDePasse: '',
      limiteDocuments: 100
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [showInvitationModal, setShowInvitationModal] = useState(false);
    const [invitationEmail, setInvitationEmail] = useState('');
    const [invitationPassword, setInvitationPassword] = useState('');
    const [isSendingInvitation, setIsSendingInvitation] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState<{[key: string]: boolean}>({});
    const [apiKeyVisibility, setApiKeyVisibility] = useState<{[key: string]: boolean}>({});
    const [showAlerts, setShowAlerts] = useState(true);
    const [isGeneratingApiKey, setIsGeneratingApiKey] = useState(false);
    const [showApiKeyModal, setShowApiKeyModal] = useState(false);
    const [apiKeyExpirationDays, setApiKeyExpirationDays] = useState(30);
    const [showApiKeyHistory, setShowApiKeyHistory] = useState(false);
    const [apiKeyHistory, setApiKeyHistory] = useState<Array<{
      key: string;
      generatedAt: Date;
      expiresAt?: Date;
      revokedAt?: Date;
      reason?: string;
    }>>([]);

    const [users, setUsers] = useState<User[]>([
        {
          id: '1',
          nom: 'Jean Dupont',
          email: 'jean.dupont@example.com',
          role: 'Utilisateur',
          documentsConsommes: 45,
          motDePasse: 'password123',
          limiteDocuments: 100,
          apiKey: 'sk-1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          apiKeyGeneratedAt: new Date('2024-01-15'),
          apiKeyExpiresAt: new Date('2024-12-15'),
          apiKeyLastUsed: new Date('2024-01-20'),
          apiKeyUsageCount: 150
        },
        {
          id: '2',
          nom: 'Marie Martin',
          email: 'marie.martin@example.com',
          role: 'Administrateur',
          documentsConsommes: 128,
          motDePasse: 'admin456',
          limiteDocuments: 200,
          apiKey: 'sk-abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
          apiKeyGeneratedAt: new Date('2024-01-10'),
          apiKeyExpiresAt: new Date('2024-12-10'),
          apiKeyLastUsed: new Date('2024-01-25'),
          apiKeyUsageCount: 320
        },
        {
          id: '3',
          nom: 'Pierre Durand',
          email: 'pierre.durand@example.com',
          role: 'Utilisateur',
          documentsConsommes: 23,
          motDePasse: 'user789',
          limiteDocuments: 100,
          apiKey: 'sk-7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
          apiKeyGeneratedAt: new Date('2024-01-20'),
          apiKeyExpiresAt: new Date('2024-12-20'),
          apiKeyLastUsed: new Date('2024-01-22'),
          apiKeyUsageCount: 45
        },
        {
          id: '4',
          nom: 'Sophie Bernard',
          email: 'sophie.bernard@example.com',
          role: 'Modérateur',
          documentsConsommes: 67,
          motDePasse: 'moderator321',
          limiteDocuments: 150,
          apiKey: 'sk-4567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123',
          apiKeyGeneratedAt: new Date('2024-01-12'),
          apiKeyExpiresAt: new Date('2024-12-12'),
          apiKeyLastUsed: new Date('2024-01-24'),
          apiKeyUsageCount: 89
        },
        {
          id: '5',
          nom: 'Lucas Petit',
          email: 'lucas.petit@example.com',
          role: 'Utilisateur',
          documentsConsommes: 12,
          motDePasse: 'lucas2024',
          limiteDocuments: 100,
          apiKey: 'sk-234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12',
          apiKeyGeneratedAt: new Date('2024-01-18'),
          apiKeyExpiresAt: new Date('2024-12-18'),
          apiKeyLastUsed: new Date('2024-01-21'),
          apiKeyUsageCount: 23
        },
        {
          id: '6',
          nom: 'Emma Dubois',
          email: 'emma.dubois@example.com',
          role: 'Utilisateur',
          documentsConsommes: 0,
          motDePasse: 'emma123',
          invitationSent: false,
          invitationFailed: true,
          limiteDocuments: 100
        },
        {
          id: '7',
          nom: 'Thomas Moreau',
          email: 'thomas.moreau@example.com',
          role: 'Utilisateur',
          documentsConsommes: 95,
          motDePasse: 'thomas456',
          limiteDocuments: 100,
          apiKey: 'sk-567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234',
          apiKeyGeneratedAt: new Date('2024-01-14'),
          apiKeyExpiresAt: new Date('2024-12-14'),
          apiKeyLastUsed: new Date('2024-01-23'),
          apiKeyUsageCount: 156
        },
        {
          id: '8',
          nom: 'Julie Leroy',
          email: 'julie.leroy@example.com',
          role: 'Utilisateur',
          documentsConsommes: 110,
          motDePasse: 'julie789',
          limiteDocuments: 100,
          apiKey: 'sk-890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567',
          apiKeyGeneratedAt: new Date('2024-01-16'),
          apiKeyExpiresAt: new Date('2024-12-16'),
          apiKeyLastUsed: new Date('2024-01-26'),
          apiKeyUsageCount: 234
        }
      ]);

      // Fonction pour calculer le pourcentage d'utilisation
      const getUsagePercentage = (user: User) => {
        const limite = user.limiteDocuments || 100;
        return Math.round((user.documentsConsommes / limite) * 100);
      };

      // Fonction pour déterminer le niveau d'alerte
      const getAlertLevel = (user: User) => {
        const percentage = getUsagePercentage(user);
        if (percentage >= 100) return 'critical';
        if (percentage >= 80) return 'warning';
        if (percentage >= 60) return 'info';
        return 'normal';
      };

      // Fonction pour obtenir la couleur de l'alerte
      const getAlertColor = (level: string) => {
        switch (level) {
          case 'critical': return 'text-red-600 bg-red-50 border-red-200';
          case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
          case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
          default: return 'text-green-600 bg-green-50 border-green-200';
        }
      };

      // Fonction pour obtenir l'icône d'alerte
      const getAlertIcon = (level: string) => {
        switch (level) {
          case 'critical': return <AlertTriangle className="w-4 h-4" />;
          case 'warning': return <AlertCircle className="w-4 h-4" />;
          case 'info': return <TrendingUp className="w-4 h-4" />;
          default: return null;
        }
      };

      // Fonction pour obtenir le message d'alerte
      const getAlertMessage = (user: User) => {
        const percentage = getUsagePercentage(user);
        const limite = user.limiteDocuments || 100;
        
        if (percentage >= 100) {
          return `Limite dépassée ! ${user.documentsConsommes}/${limite} documents`;
        } else if (percentage >= 80) {
          return `Attention : ${percentage}% de la limite utilisée (${user.documentsConsommes}/${limite})`;
        } else if (percentage >= 60) {
          return `${percentage}% de la limite utilisée (${user.documentsConsommes}/${limite})`;
        }
        return `${percentage}% de la limite utilisée (${user.documentsConsommes}/${limite})`;
      };

      // Utilisateurs avec alertes
      const usersWithAlerts = users.filter(user => getAlertLevel(user) !== 'normal');
      const criticalUsers = users.filter(user => getAlertLevel(user) === 'critical');
      const warningUsers = users.filter(user => getAlertLevel(user) === 'warning');

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
        // Initialize password visibility for this user if not already set
        if (!passwordVisibility[user.id]) {
          setPasswordVisibility(prev => ({...prev, [user.id]: false}));
        }
        // Initialize API key visibility for this user if not already set
        if (!apiKeyVisibility[user.id]) {
          setApiKeyVisibility(prev => ({...prev, [user.id]: false}));
        }
      };
    
      // Fonction pour générer un mot de passe temporaire
      const generateTemporaryPassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 12; i++) {
          password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
      };

      // Fonction pour envoyer l'email d'invitation
      const sendInvitationEmail = async (email: string, password: string, nom: string) => {
        setIsSendingInvitation(true);
        
        try {
          // Simulation d'envoi d'email (remplacer par votre API d'envoi d'email)
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Ici vous intégreriez votre service d'envoi d'email
          // Exemple avec une API fictive :
          // await fetch('/api/send-invitation', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ email, password, nom })
          // });

          console.log(`Email d'invitation envoyé à ${email} avec le mot de passe: ${password}`);
          
          // Mettre à jour l'utilisateur avec les informations d'invitation
          setUsers(users.map(user => 
            user.email === email 
              ? { ...user, invitationSent: true, invitationDate: new Date() }
              : user
          ));
          
          setShowInvitationModal(false);
          setInvitationEmail('');
          setInvitationPassword('');
          
          // Afficher une notification de succès
          alert('Email d\'invitation envoyé avec succès !');
          
        } catch (error) {
          console.error('Erreur lors de l\'envoi de l\'email:', error);
          alert('Erreur lors de l\'envoi de l\'email d\'invitation');
        } finally {
          setIsSendingInvitation(false);
        }
      };

      // Fonction pour créer un utilisateur avec invitation
      const handleCreateUserWithInvitation = () => {
        const tempPassword = generateTemporaryPassword();
        const userToCreate: User = {
          ...newUser,
          id: (users.length + 1).toString(),
          documentsConsommes: 0,
          motDePasse: tempPassword,
          invitationSent: false
        };
        
        setUsers([...users, userToCreate]);
        setInvitationEmail(newUser.email);
        setInvitationPassword(tempPassword);
        setShowCreateModal(false);
        setShowInvitationModal(true);
        
        // Réinitialiser le formulaire
        setNewUser({
          nom: '',
          email: '',
          role: 'Utilisateur',
          motDePasse: '',
          limiteDocuments: 100
        });
      };

      // Fonction pour générer une clé API unique
      const generateApiKey = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let apiKey = 'sk-';
        for (let i = 0; i < 48; i++) {
          apiKey += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return apiKey;
      };

      // Fonction pour générer une nouvelle clé API pour un utilisateur
      const handleGenerateApiKey = async (userId: string) => {
        setIsGeneratingApiKey(true);
        
        try {
          // Simulation d'une requête API
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const newApiKey = generateApiKey();
          const now = new Date();
          const expiresAt = new Date(now.getTime() + apiKeyExpirationDays * 24 * 60 * 60 * 1000);
          
          setUsers(users.map(user => 
            user.id === userId 
              ? { ...user, apiKey: newApiKey, apiKeyGeneratedAt: now, apiKeyExpiresAt: expiresAt }
              : user
          ));
          
          // Mettre à jour l'utilisateur sélectionné si c'est le même
          if (selectedUser && selectedUser.id === userId) {
            setSelectedUser({ ...selectedUser, apiKey: newApiKey, apiKeyGeneratedAt: now, apiKeyExpiresAt: expiresAt });
          }
          
          // Afficher la nouvelle clé API
          setApiKeyVisibility(prev => ({...prev, [userId]: true}));
          
          alert('Nouvelle clé API générée avec succès !');
          
        } catch (error) {
          console.error('Erreur lors de la génération de la clé API:', error);
          alert('Erreur lors de la génération de la clé API');
        } finally {
          setIsGeneratingApiKey(false);
        }
      };

      // Fonction pour copier la clé API dans le presse-papiers
      const copyApiKeyToClipboard = (apiKey: string) => {
        navigator.clipboard.writeText(apiKey);
        alert('Clé API copiée dans le presse-papiers !');
      };

      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestion utilisateurs</h2>
              <p className="text-gray-600">Gérez les utilisateurs de la plateforme</p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Créer un utilisateur</span>
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
                      Statut invitation
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.invitationSent ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-green-700">Invitation envoyée</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <span className="text-xs text-gray-500">En attente</span>
                          </div>
                        )}
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
                          {!user.invitationSent ? (
                            <button
                              onClick={() => {
                                setInvitationEmail(user.email);
                                setInvitationPassword(user.motDePasse);
                                setShowInvitationModal(true);
                              }}
                              className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50"
                              title="Envoyer invitation"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setInvitationEmail(user.email);
                                setInvitationPassword(user.motDePasse);
                                setShowInvitationModal(true);
                              }}
                              className="text-orange-600 hover:text-orange-900 p-1 rounded hover:bg-orange-50"
                              title="Renvoyer les accès"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                          )}
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
              <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Détails de l'utilisateur</h3>
                  </div>
                  <button
                    onClick={() => setShowUserDetails(false)}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="px-6 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <label className="text-sm font-medium text-gray-700">Nom complet</label>
                        </div>
                        <p className="text-sm text-gray-900 font-medium">{selectedUser.nom}</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <label className="text-sm font-medium text-gray-700">Adresse email</label>
                        </div>
                        <p className="text-sm text-gray-900 font-medium">{selectedUser.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <label className="text-sm font-medium text-gray-700">Rôle</label>
                        </div>
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          selectedUser.role === 'Administrateur' ? 'bg-red-100 text-red-800' :
                          selectedUser.role === 'Modérateur' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {selectedUser.role}
                        </span>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <label className="text-sm font-medium text-gray-700">Documents consommés</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">{selectedUser.documentsConsommes}</span>
                          <span className="text-sm text-gray-500">documents</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <label className="text-sm font-medium text-blue-700">Mot de passe</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-900 font-mono">
                        {passwordVisibility[selectedUser.id] ? selectedUser.motDePasse : '********'}
                      </span>
                      <button 
                        onClick={() => setPasswordVisibility(prev => ({...prev, [selectedUser.id]: !prev[selectedUser.id]}))}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100 transition-colors"
                        title={passwordVisibility[selectedUser.id] ? "Masquer le mot de passe" : "Voir le mot de passe"}
                      >
                        {passwordVisibility[selectedUser.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {selectedUser.apiKey && (
                    <div className="mt-6 bg-purple-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.242a3 3 0 00-4.242 0l-4 4a3 3 0 104.242 4.242l1.414-1.414a2 2 0 00.586-1.414V14a2 2 0 10-4 0v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-.586-1.414l-1.414-1.414z" />
                        </svg>
                        <label className="text-sm font-medium text-purple-700">Clé API</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-900 font-mono bg-white px-2 py-1 rounded border">
                          {apiKeyVisibility[selectedUser.id] ? selectedUser.apiKey : '********'}
                        </span>
                        <button 
                          onClick={() => setApiKeyVisibility(prev => ({...prev, [selectedUser.id]: !prev[selectedUser.id]}))}
                          className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-100 transition-colors"
                          title={apiKeyVisibility[selectedUser.id] ? "Masquer la clé API" : "Voir la clé API"}
                        >
                          {apiKeyVisibility[selectedUser.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => copyApiKeyToClipboard(selectedUser.apiKey || '')}
                          className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-100 transition-colors"
                          title="Copier la clé API"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleGenerateApiKey(selectedUser.id)}
                          disabled={isGeneratingApiKey}
                          className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Régénérer la clé API"
                        >
                          <RefreshCw className={`w-4 h-4 ${isGeneratingApiKey ? 'animate-spin' : ''}`} />
                        </button>
                      </div>
                      <p className="text-xs text-purple-600 mt-2">
                        Cette clé API est unique et doit être gardée en sécurité. Elle est générée automatiquement lors de la création de l'utilisateur.
                      </p>
                    </div>
                  )}
                </div>
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowUserDetails(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Fermer</span>
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
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
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

          {/* Create User Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Créer un utilisateur</h3>
                  <button
                    onClick={() => setShowCreateModal(false)}
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
                      value={newUser.nom}
                      onChange={(e) => setNewUser({...newUser, nom: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Entrez le nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Entrez l'email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Utilisateur">Utilisateur</option>
                      <option value="Modérateur">Modérateur</option>
                      <option value="Administrateur">Administrateur</option>
                    </select>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Key className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-blue-700">Mot de passe temporaire</span>
                    </div>
                    <p className="text-xs text-blue-600">
                      Un mot de passe temporaire sera généré automatiquement et envoyé par email à l'utilisateur.
                    </p>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleCreateUserWithInvitation}
                    disabled={!newUser.nom || !newUser.email}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Créer et inviter</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Invitation Modal */}
          {showInvitationModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Envoyer l'invitation</h3>
                  </div>
                  <button
                    onClick={() => setShowInvitationModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="px-6 py-6 space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Mail className="w-4 h-4 text-purple-500" />
                      <label className="text-sm font-medium text-purple-700">Email de destination</label>
                    </div>
                    <p className="text-sm text-gray-900 font-medium">{invitationEmail}</p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Key className="w-4 h-4 text-yellow-500" />
                      <label className="text-sm font-medium text-yellow-700">Mot de passe temporaire</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-900 font-mono bg-white px-2 py-1 rounded border">
                        {invitationPassword}
                      </span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(invitationPassword).then(() => {
                            // Afficher une notification de succès
                            const button = event?.target as HTMLButtonElement;
                            const originalText = button.textContent;
                            button.textContent = 'Copié !';
                            button.classList.add('bg-green-100', 'text-green-700', 'border-green-300');
                            button.classList.remove('text-yellow-600', 'hover:text-yellow-800');
                            
                            setTimeout(() => {
                              button.textContent = originalText;
                              button.classList.remove('bg-green-100', 'text-green-700', 'border-green-300');
                              button.classList.add('text-yellow-600', 'hover:text-yellow-800');
                            }, 2000);
                          }).catch(() => {
                            alert('Erreur lors de la copie. Veuillez copier manuellement le mot de passe.');
                          });
                        }}
                        className="text-yellow-600 hover:text-yellow-800 text-xs px-2 py-1 rounded border border-yellow-300 hover:bg-yellow-100 transition-all duration-200"
                      >
                        Copier
                      </button>
                    </div>
                    <p className="text-xs text-yellow-600 mt-2">
                      Ce mot de passe sera envoyé par email. L'utilisateur devra le changer lors de sa première connexion.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-blue-500" />
                      <label className="text-sm font-medium text-blue-700">Contenu de l'email</label>
                    </div>
                    <div className="text-xs text-blue-600 space-y-1">
                      <p><strong>Objet :</strong> Invitation à rejoindre la plateforme</p>
                      <p><strong>Contenu :</strong></p>
                      <div className="bg-white p-3 rounded border text-gray-700">
                        <p>Bonjour,</p>
                        <p>Vous avez été invité à rejoindre notre plateforme.</p>
                        <p>Vos identifiants de connexion :</p>
                        <p>Email : {invitationEmail}</p>
                        <p>Mot de passe temporaire : {invitationPassword}</p>
                        <p>Veuillez changer votre mot de passe lors de votre première connexion.</p>
                        <p>Cordialement,<br/>L'équipe de la plateforme</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowInvitationModal(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => sendInvitationEmail(invitationEmail, invitationPassword, 'Nouvel utilisateur')}
                    disabled={isSendingInvitation}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSendingInvitation ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        <span>Envoyer l'invitation</span>
                      </>
                    )}
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