import { useState } from 'react';
import { 
  Activity,
  Edit,
  Trash2,
  Search,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  Calendar,
  Shield,
  Key,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  FileText,
  Settings,
  X
} from "lucide-react";
import React from 'react'; // Added missing import for React
import { journaliserAction } from '../../../services/audit';

interface ApiPermission {
  lecture: boolean;
  soumission: boolean;
  accesResultats: boolean;
}

interface ApiKeyUsage {
  timestamp: string;
  endpoint: string;
  method: string;
  status: number;
  responseTime: number;
  ipAddress: string;
  userAgent: string;
}

interface ApiKey {
  id: string;
  nom: string;
  cle: string;
  permissions: ApiPermission;
  dateCreation: string;
  dateExpiration: string;
  statut: 'active' | 'expiree' | 'revoquee';
  utilisation: {
    requetes: number;
    erreurs: number;
    dernierAcces: string;
  };
  usageLog: ApiKeyUsage[];
}

interface ApiEndpoint {
    id: string;
    nom: string;
    nomClient: string; // Added client name
    url: string;
    statut: string;
    tempsReponse: string;
    utilisation: number;
    clesApi: ApiKey[];
  }

export default function Api() {
    const [searchApis, setSearchApis] = useState('');
    const [selectedApi, setSelectedApi] = useState<string | null>(null);
    const [showApiKeys, setShowApiKeys] = useState(false);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    const [showKey, setShowKey] = useState<{[key: string]: boolean}>({});
    const [showUsageLog, setShowUsageLog] = useState<string | null>(null);
    const [editingPermissions, setEditingPermissions] = useState<{[key: string]: boolean}>({});
    const [showApiLogs, setShowApiLogs] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [apiToDelete, setApiToDelete] = useState<ApiEndpoint | null>(null);

    const apis: ApiEndpoint[] = [
        {
          id: '1',
          nom: 'OCR Document API',
          nomClient: 'Jean Dupont',
          url: '/api/ocr/document',
          statut: 'Actif',
          tempsReponse: '150ms',
          utilisation: 85,
          clesApi: [
            {
              id: 'key1',
              nom: 'Clé Production',
              cle: 'sk_live_1234567890abcdef',
              permissions: {
                lecture: true,
                soumission: true,
                accesResultats: true
              },
              dateCreation: '2024-01-15',
              dateExpiration: '2025-01-15',
              statut: 'active',
              utilisation: {
                requetes: 15420,
                erreurs: 23,
                dernierAcces: '2024-01-20T10:30:00Z'
              },
              usageLog: [
                {
                  timestamp: '2024-01-20T10:30:00Z',
                  endpoint: '/api/ocr/document',
                  method: 'POST',
                  status: 200,
                  responseTime: 145,
                  ipAddress: '192.168.1.100',
                  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                {
                  timestamp: '2024-01-20T10:25:00Z',
                  endpoint: '/api/ocr/document',
                  method: 'POST',
                  status: 400,
                  responseTime: 89,
                  ipAddress: '192.168.1.100',
                  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                {
                  timestamp: '2024-01-20T10:20:00Z',
                  endpoint: '/api/ocr/document',
                  method: 'GET',
                  status: 200,
                  responseTime: 23,
                  ipAddress: '192.168.1.100',
                  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
              ]
            },
            {
              id: 'key2',
              nom: 'Clé Test',
              cle: 'sk_test_abcdef1234567890',
              permissions: {
                lecture: true,
                soumission: false,
                accesResultats: false
              },
              dateCreation: '2024-01-10',
              dateExpiration: '2024-02-10',
              statut: 'active',
              utilisation: {
                requetes: 1250,
                erreurs: 5,
                dernierAcces: '2024-01-19T15:45:00Z'
              },
              usageLog: [
                {
                  timestamp: '2024-01-19T15:45:00Z',
                  endpoint: '/api/ocr/document',
                  method: 'GET',
                  status: 200,
                  responseTime: 67,
                  ipAddress: '192.168.1.101',
                  userAgent: 'PostmanRuntime/7.32.3'
                }
              ]
            }
          ]
        },
        {
          id: '2',
          nom: 'User Management API',
          nomClient: 'Marie Martin',
          url: '/api/users',
          statut: 'Actif',
          tempsReponse: '45ms',
          utilisation: 92,
          clesApi: [
            {
              id: 'key3',
              nom: 'Clé Admin',
              cle: 'sk_admin_9876543210fedcba',
              permissions: {
                lecture: true,
                soumission: true,
                accesResultats: true
              },
              dateCreation: '2024-01-01',
              dateExpiration: '2024-12-31',
              statut: 'active',
              utilisation: {
                requetes: 8920,
                erreurs: 12,
                dernierAcces: '2024-01-20T09:15:00Z'
              },
              usageLog: [
                {
                  timestamp: '2024-01-20T09:15:00Z',
                  endpoint: '/api/users',
                  method: 'GET',
                  status: 200,
                  responseTime: 45,
                  ipAddress: '192.168.1.102',
                  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
                },
                {
                  timestamp: '2024-01-20T09:10:00Z',
                  endpoint: '/api/users',
                  method: 'POST',
                  status: 201,
                  responseTime: 67,
                  ipAddress: '192.168.1.102',
                  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
                }
              ]
            }
          ]
        },
        {
          id: '3',
          nom: 'Document Storage API',
          nomClient: 'Pierre Durand',
          url: '/api/documents',
          statut: 'Maintenance',
          tempsReponse: '320ms',
          utilisation: 67,
          clesApi: [
            {
              id: 'key6',
              nom: 'Clé Storage',
              cle: 'sk_storage_abcdef1234567890',
              permissions: {
                lecture: true,
                soumission: true,
                accesResultats: true
              },
              dateCreation: '2024-01-08',
              dateExpiration: '2024-12-31',
              statut: 'active',
              utilisation: {
                requetes: 5670,
                erreurs: 15,
                dernierAcces: '2024-01-20T08:45:00Z'
              },
              usageLog: [
                {
                  timestamp: '2024-01-20T08:45:00Z',
                  endpoint: '/api/documents/upload',
                  method: 'POST',
                  status: 200,
                  responseTime: 320,
                  ipAddress: '192.168.1.105',
                  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                {
                  timestamp: '2024-01-20T08:40:00Z',
                  endpoint: '/api/documents/list',
                  method: 'GET',
                  status: 200,
                  responseTime: 145,
                  ipAddress: '192.168.1.105',
                  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
              ]
            }
          ]
        },
        {
          id: '4',
          nom: 'Email Service API',
          nomClient: 'Sophie Bernard',
          url: '/api/email',
          statut: 'Actif',
          tempsReponse: '78ms',
          utilisation: 45,
          clesApi: [
            {
              id: 'key4',
              nom: 'Clé Email Service',
              cle: 'sk_email_abcdef1234567890',
              permissions: {
                lecture: true,
                soumission: true,
                accesResultats: false
              },
              dateCreation: '2024-01-05',
              dateExpiration: '2024-12-31',
              statut: 'active',
              utilisation: {
                requetes: 3450,
                erreurs: 8,
                dernierAcces: '2024-01-20T11:20:00Z'
              },
              usageLog: [
                {
                  timestamp: '2024-01-20T11:20:00Z',
                  endpoint: '/api/email/send',
                  method: 'POST',
                  status: 200,
                  responseTime: 78,
                  ipAddress: '192.168.1.103',
                  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
                },
                {
                  timestamp: '2024-01-20T11:15:00Z',
                  endpoint: '/api/email/templates',
                  method: 'GET',
                  status: 200,
                  responseTime: 45,
                  ipAddress: '192.168.1.103',
                  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
                },
                {
                  timestamp: '2024-01-20T11:10:00Z',
                  endpoint: '/api/email/send',
                  method: 'POST',
                  status: 400,
                  responseTime: 23,
                  ipAddress: '192.168.1.103',
                  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
                }
              ]
            },
            {
              id: 'key5',
              nom: 'Clé Email Test',
              cle: 'sk_email_test_1234567890abcdef',
              permissions: {
                lecture: true,
                soumission: false,
                accesResultats: false
              },
              dateCreation: '2024-01-12',
              dateExpiration: '2024-02-12',
              statut: 'active',
              utilisation: {
                requetes: 890,
                erreurs: 2,
                dernierAcces: '2024-01-19T16:30:00Z'
              },
              usageLog: [
                {
                  timestamp: '2024-01-19T16:30:00Z',
                  endpoint: '/api/email/templates',
                  method: 'GET',
                  status: 200,
                  responseTime: 52,
                  ipAddress: '192.168.1.104',
                  userAgent: 'PostmanRuntime/7.32.3'
                }
              ]
            }
          ]
        },
        {
          id: '5',
          nom: 'Payment Gateway API',
          nomClient: 'Lucas Petit',
          url: '/api/payments',
          statut: 'Actif',
          tempsReponse: '95ms',
          utilisation: 78,
          clesApi: [
            {
              id: 'key7',
              nom: 'Clé Payment Live',
              cle: 'sk_payment_live_1234567890abcdef',
              permissions: {
                lecture: true,
                soumission: true,
                accesResultats: true
              },
              dateCreation: '2024-01-03',
              dateExpiration: '2024-12-31',
              statut: 'active',
              utilisation: {
                requetes: 12340,
                erreurs: 45,
                dernierAcces: '2024-01-20T12:15:00Z'
              },
              usageLog: [
                {
                  timestamp: '2024-01-20T12:15:00Z',
                  endpoint: '/api/payments/process',
                  method: 'POST',
                  status: 200,
                  responseTime: 95,
                  ipAddress: '192.168.1.106',
                  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
                },
                {
                  timestamp: '2024-01-20T12:10:00Z',
                  endpoint: '/api/payments/status',
                  method: 'GET',
                  status: 200,
                  responseTime: 67,
                  ipAddress: '192.168.1.106',
                  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
                }
              ]
            }
          ]
        },
        {
          id: '6',
          nom: 'Analytics Dashboard API',
          nomClient: 'Emma Dubois',
          url: '/api/analytics',
          statut: 'Actif',
          tempsReponse: '120ms',
          utilisation: 65,
          clesApi: [
            {
              id: 'key8',
              nom: 'Clé Analytics',
              cle: 'sk_analytics_abcdef1234567890',
              permissions: {
                lecture: true,
                soumission: false,
                accesResultats: true
              },
              dateCreation: '2024-01-06',
              dateExpiration: '2024-12-31',
              statut: 'active',
              utilisation: {
                requetes: 7890,
                erreurs: 12,
                dernierAcces: '2024-01-20T13:30:00Z'
              },
              usageLog: [
                {
                  timestamp: '2024-01-20T13:30:00Z',
                  endpoint: '/api/analytics/metrics',
                  method: 'GET',
                  status: 200,
                  responseTime: 120,
                  ipAddress: '192.168.1.107',
                  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
                },
                {
                  timestamp: '2024-01-20T13:25:00Z',
                  endpoint: '/api/analytics/reports',
                  method: 'GET',
                  status: 200,
                  responseTime: 89,
                  ipAddress: '192.168.1.107',
                  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
                }
              ]
            }
          ]
        }
      ];

      const filteredApis = apis.filter(api =>
        api.nom.toLowerCase().includes(searchApis.toLowerCase()) ||
        api.statut.toLowerCase().includes(searchApis.toLowerCase())
      );

      // Pagination logic
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentApis = filteredApis.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(filteredApis.length / itemsPerPage);

      const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

      const copyToClipboard = async (text: string, keyId: string) => {
        try {
          await navigator.clipboard.writeText(text);
          setCopiedKey(keyId);
          setTimeout(() => setCopiedKey(null), 2000);
          journaliserAction({ action: 'copie_cle_api', entityType: 'api_key', entityId: keyId });
        } catch (err) {
          console.error('Erreur lors de la copie:', err);
        }
      };

      const regenerateKey = (apiId: string, keyId: string) => {
        // Logique pour régénérer une clé API
        console.log(`Régénération de la clé ${keyId} pour l'API ${apiId}`);
        journaliserAction({ action: 'regeneration_cle_api', entityType: 'api', entityId: apiId, metadata: { keyId } });
      };

      const updatePermissions = (apiId: string, keyId: string, permissions: ApiPermission) => {
        // Logique pour mettre à jour les permissions
        console.log(`Mise à jour des permissions pour la clé ${keyId} de l'API ${apiId}:`, permissions);
        setEditingPermissions({...editingPermissions, [keyId]: false});
        journaliserAction({ action: 'maj_permissions_api', entityType: 'api', entityId: apiId, metadata: { keyId, permissions } });
      };

      const handleDeleteApi = (api: ApiEndpoint) => {
        setApiToDelete(api);
        setShowDeleteModal(true);
      };

      const confirmDeleteApi = () => {
        if (apiToDelete) {
          // Logique pour supprimer l'API
          console.log(`Suppression de l'API ${apiToDelete.id} - ${apiToDelete.nom}`);
          // Ici vous pouvez ajouter la logique de suppression réelle
          setShowDeleteModal(false);
          setApiToDelete(null);
          journaliserAction({ action: 'suppression_api', entityType: 'api', entityId: apiToDelete.id, metadata: { nom: apiToDelete.nom } });
        }
      };

      const cancelDeleteApi = () => {
        setShowDeleteModal(false);
        setApiToDelete(null);
      };

      const getMethodColor = (method: string) => {
        switch (method) {
          case 'GET': return 'bg-green-100 text-green-800';
          case 'POST': return 'bg-blue-100 text-blue-800';
          case 'PUT': return 'bg-yellow-100 text-yellow-800';
          case 'DELETE': return 'bg-red-100 text-red-800';
          default: return 'bg-gray-100 text-gray-800';
        }
      };

      const getStatusColor = (status: number | string) => {
        if (typeof status === 'number') {
          if (status >= 200 && status < 300) return 'text-green-600';
          if (status >= 400 && status < 500) return 'text-yellow-600';
          if (status >= 500) return 'text-red-600';
          return 'text-gray-600';
        }
        // For API key status
        switch (status) {
          case 'active': return 'bg-green-100 text-green-800';
          case 'expiree': return 'bg-yellow-100 text-yellow-800';
          case 'revoquee': return 'bg-red-100 text-red-800';
          default: return 'bg-gray-100 text-gray-800';
        }
      };

      const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR');
      };

      const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('fr-FR');
      };

      const handleApiKeyToggle = (apiId: string) => {
        if (selectedApi === apiId) {
          // If clicking on the same API, close it
          setSelectedApi(null);
          setShowApiKeys(false);
        } else {
          // If clicking on a different API, close the current one and open the new one
          setSelectedApi(apiId);
          setShowApiKeys(true);
        }
      };

      return (
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5 sm:mb-1">Gestion d'API</h2>
              <p className="text-xs sm:text-sm text-gray-600">Configurez et surveillez les APIs et leurs clés</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher une API..."
              value={searchApis}
              onChange={(e) => setSearchApis(e.target.value)}
              className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
            />
          </div>

          {/* APIs Table - Mobile Cards */}
          <div className="block sm:hidden space-y-1">
            {currentApis.map((api) => (
              <div key={api.id} className="space-y-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1.5">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-medium text-gray-900 truncate">{api.nom}</h3>
                      <p className="text-xs text-gray-500 truncate">{api.nomClient}</p>
                      <p className="text-xs text-gray-500 font-mono truncate">
                        {api.clesApi.length > 0 ? api.clesApi[0].cle.substring(0, 20) + '...' : 'Aucune clé'}
                      </p>
                    </div>
                    <span className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded-full ml-1 flex-shrink-0 ${
                      api.statut === 'Actif' ? 'bg-green-100 text-green-800' :
                      api.statut === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {api.statut}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1 mb-1 text-xs">
                    <div>
                      <span className="text-gray-500">Temps:</span>
                      <span className="ml-1 text-gray-900">{api.tempsReponse}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Utilisation:</span>
                      <span className="ml-1 text-gray-900">{api.utilisation}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">{api.clesApi.length} clés</span>
                      <button 
                        onClick={() => handleApiKeyToggle(api.id)}
                        className="text-blue-600 hover:text-blue-900 p-0.5 rounded hover:bg-blue-50"
                        title="Gérer les clés API"
                      >
                        <Key className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => handleApiKeyToggle(api.id)}
                        className="text-green-600 hover:text-green-900 p-0.5 rounded hover:bg-green-50"
                        title="Voir les informations"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={() => handleDeleteApi(api)}
                        className="text-red-600 hover:text-red-900 p-0.5 rounded hover:bg-red-50" 
                        title="Supprimer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* API Keys for this API */}
                {selectedApi === api.id && showApiKeys && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1.5 ml-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-xs font-medium text-gray-900">Clés API</h4>
                      <button 
                        onClick={() => {
                          setSelectedApi(null);
                          setShowApiKeys(false);
                        }}
                        className="text-gray-400 hover:text-gray-600 p-0.5 rounded hover:bg-gray-50"
                        title="Fermer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <div className="space-y-1.5">
                      {api.clesApi.map((apiKey) => (
                        <div key={apiKey.id} className="border border-gray-200 rounded-lg p-1.5">
                          {/* Header with name and status */}
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center space-x-1">
                              <Shield className="w-3 h-3 text-blue-600" />
                              <span className="text-xs font-medium text-gray-900">{apiKey.nom}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(apiKey.statut)}`}>
                                {apiKey.statut}
                              </span>
                              <button 
                                onClick={() => setShowKey({...showKey, [apiKey.id]: !showKey[apiKey.id]})}
                                className="text-gray-400 hover:text-gray-600 p-0.5 rounded hover:bg-gray-50"
                              >
                                {showKey[apiKey.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                              </button>
                            </div>
                          </div>

                          {/* API Key Display */}
                          <div className="bg-gray-50 rounded p-1.5 mb-1.5">
                            <div className="flex flex-col space-y-1">
                              <code className="text-xs font-mono text-gray-700 break-all leading-relaxed">
                                {showKey[apiKey.id] ? apiKey.cle : '••••••••••••••••••••••••••••••••'}
                              </code>
                              <div className="flex items-center justify-end space-x-1">
                                <button
                                  onClick={() => copyToClipboard(apiKey.cle, apiKey.id)}
                                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 px-1 py-0.5 rounded text-xs hover:bg-blue-50"
                                >
                                  {copiedKey === apiKey.id ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                  <span>{copiedKey === apiKey.id ? 'Copié' : 'Copier'}</span>
                                </button>
                                <button
                                  onClick={() => regenerateKey(api.id, apiKey.id)}
                                  className="flex items-center space-x-1 text-orange-600 hover:text-orange-800 px-1 py-0.5 rounded text-xs hover:bg-orange-50"
                                >
                                  <RefreshCw className="w-3 h-3" />
                                  <span>Régénérer</span>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Permissions - Vertical Layout */}
                          <div className="mb-1.5">
                            <h5 className="text-xs font-medium text-gray-700 mb-1 flex items-center space-x-1">
                              <Settings className="w-3 h-3" />
                              <span>Permissions</span>
                            </h5>
                            <div className="space-y-0.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">Lecture seule</span>
                                <input 
                                  type="checkbox" 
                                  checked={apiKey.permissions.lecture}
                                  readOnly
                                  className="rounded border-gray-300 w-3 h-3"
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">Soumission</span>
                                <input 
                                  type="checkbox" 
                                  checked={apiKey.permissions.soumission}
                                  readOnly
                                  className="rounded border-gray-300 w-3 h-3"
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">Accès aux résultats</span>
                                <input 
                                  type="checkbox" 
                                  checked={apiKey.permissions.accesResultats}
                                  readOnly
                                  className="rounded border-gray-300 w-3 h-3"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Usage Stats - Vertical Layout */}
                          <div className="mb-1.5">
                            <h5 className="text-xs font-medium text-gray-700 mb-1 flex items-center space-x-1">
                              <Activity className="w-3 h-3" />
                              <span>Statistiques</span>
                            </h5>
                            <div className="space-y-0.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">Requêtes totales</span>
                                <span className="text-xs font-medium text-gray-900">{apiKey.utilisation.requetes.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">Erreurs</span>
                                <span className="text-xs font-medium text-red-600">{apiKey.utilisation.erreurs}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">Dernier accès</span>
                                <span className="text-xs font-medium text-gray-900">{formatDateTime(apiKey.utilisation.dernierAcces)}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">Expire le</span>
                                <span className="text-xs font-medium text-gray-900">{formatDate(apiKey.dateExpiration)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Usage Log Button */}
                          <div className="border-t pt-1.5">
                            <button
                              onClick={() => setShowUsageLog(showUsageLog === apiKey.id ? null : apiKey.id)}
                              className="flex items-center justify-center space-x-1 w-full text-blue-600 hover:text-blue-800 text-xs py-1 rounded-lg hover:bg-blue-50"
                            >
                              <FileText className="w-3 h-3" />
                              <span>Journal ({apiKey.usageLog?.length || 0})</span>
                            </button>
                          </div>

                          {/* Usage Log Display */}
                          {showUsageLog === apiKey.id && apiKey.usageLog && (
                            <div className="mt-1.5 border-t pt-1.5">
                              <h6 className="font-medium text-gray-900 mb-1.5 text-xs flex items-center space-x-1">
                                <BarChart3 className="w-3 h-3" />
                                <span>Journal d'utilisation</span>
                              </h6>
                              <div className="space-y-1 max-h-32 overflow-y-auto">
                                {apiKey.usageLog.map((log, index) => (
                                  <div key={index} className="bg-gray-50 rounded p-1.5 text-xs">
                                    <div className="space-y-0.5">
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-600 font-medium">Date/Heure</span>
                                        <span className="text-gray-900">{formatDateTime(log.timestamp)}</span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-600 font-medium">Endpoint</span>
                                        <span className="text-gray-900 font-mono truncate max-w-24">{log.endpoint}</span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-600 font-medium">Méthode</span>
                                        <span className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded-full ${getMethodColor(log.method)}`}>
                                          {log.method}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-600 font-medium">Statut</span>
                                        <span className={`font-medium ${getStatusColor(log.status)}`}>
                                          {log.status}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-600 font-medium">Temps</span>
                                        <span className="text-gray-900">{log.responseTime}ms</span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-600 font-medium">IP</span>
                                        <span className="text-gray-900 font-mono truncate max-w-20">{log.ipAddress}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {api.clesApi.length === 0 && (
                        <div className="text-center py-3 text-gray-500">
                          <Key className="w-5 h-5 mx-auto mb-1 text-gray-300" />
                          <p className="text-xs">Aucune clé API configurée</p>
                          <button className="mt-1.5 px-2.5 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs">
                            Créer la première clé API
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* API Logs */}
                {showApiLogs === api.id && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1.5 ml-1">
                    <h4 className="text-xs font-medium text-gray-900 mb-1.5 flex items-center space-x-1">
                      <Activity className="w-3 h-3" />
                      <span>Logs de l'API</span>
                    </h4>
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {api.clesApi.flatMap(key => key.usageLog || []).slice(0, 5).map((log, index) => (
                        <div key={index} className="bg-gray-50 rounded p-1 text-xs">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-gray-600">{formatDateTime(log.timestamp)}</span>
                            <span className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded-full ${getMethodColor(log.method)}`}>
                              {log.method}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700 font-mono truncate">{log.endpoint}</span>
                            <span className={`font-medium ${getStatusColor(log.status)}`}>
                              {log.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-gray-600">
                            <span>{log.responseTime}ms</span>
                            <span className="font-mono truncate">{log.ipAddress}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* APIs Table - Desktop */}
          <div className="hidden sm:block space-y-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom du client
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Clé API
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Temps de réponse
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisation
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Clés API
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentApis.map((api) => (
                      <React.Fragment key={api.id}>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{api.nomClient}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-mono">
                              {api.clesApi.length > 0 ? api.clesApi[0].cle.substring(0, 20) + '...' : 'Aucune clé'}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              api.statut === 'Actif' ? 'bg-green-100 text-green-800' :
                              api.statut === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {api.statut}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{api.tempsReponse}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${api.utilisation}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-900">{api.utilisation}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-900">{api.clesApi.length}</span>
                              <button 
                                onClick={() => {
                                  setSelectedApi(selectedApi === api.id ? null : api.id);
                                  setShowApiKeys(!showApiKeys);
                                }}
                                className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                title="Gérer les clés API"
                              >
                                <Key className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => handleApiKeyToggle(api.id)}
                                className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                title="Voir les informations"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteApi(api)}
                                className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50" 
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* API Keys Management Section - Inline */}
                        {selectedApi === api.id && showApiKeys && (
                          <tr>
                            <td colSpan={7} className="px-4 py-3 bg-gray-50">
                              <div className="bg-white rounded-lg border border-gray-200 p-3">
                                <div className="flex items-center justify-between mb-3">
                                  <div>
                                    <h3 className="text-base font-semibold text-gray-900">
                                      Clés API - {api.nomClient}
                                    </h3>
                                    <p className="text-xs text-gray-600">Gérez les clés d'accès et les permissions</p>
                                  </div>
                                  <button 
                                    onClick={() => {
                                      setSelectedApi(null);
                                      setShowApiKeys(false);
                                    }}
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-50"
                                    title="Fermer"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>

                                <div className="space-y-3">
                                  {api.clesApi.map((apiKey) => (
                                    <div key={apiKey.id} className="border border-gray-200 rounded-lg p-3">
                                      <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-2">
                                          <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                          <div className="min-w-0 flex-1">
                                            <h4 className="font-medium text-gray-900 truncate text-sm">{apiKey.nom}</h4>
                                            <p className="text-xs text-gray-500">Créée le {formatDate(apiKey.dateCreation)}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(apiKey.statut)}`}>
                                            {apiKey.statut}
                                          </span>
                                          <button 
                                            onClick={() => setShowKey({...showKey, [apiKey.id]: !showKey[apiKey.id]})}
                                            className="text-gray-400 hover:text-gray-600"
                                          >
                                            {showKey[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                          </button>
                                        </div>
                                      </div>

                                      {/* API Key Display */}
                                      <div className="bg-gray-50 rounded-lg p-2 mb-3">
                                        <div className="flex items-center justify-between">
                                          <code className="text-sm font-mono text-gray-700 break-all">
                                            {showKey[apiKey.id] ? apiKey.cle : '••••••••••••••••••••••••••••••••'}
                                          </code>
                                          <div className="flex items-center space-x-2">
                                            <button
                                              onClick={() => copyToClipboard(apiKey.cle, apiKey.id)}
                                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                              title="Copier la clé"
                                            >
                                              {copiedKey === apiKey.id ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                            <button
                                              onClick={() => regenerateKey(api.id, apiKey.id)}
                                              className="text-orange-600 hover:text-orange-800 p-1 rounded hover:bg-orange-50"
                                              title="Régénérer la clé"
                                            >
                                              <RefreshCw className="w-4 h-4" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Permissions Section */}
                                      <div className="mb-3">
                                        <div className="flex items-center justify-between mb-2">
                                          <h5 className="font-medium text-gray-900 flex items-center space-x-2 text-sm">
                                            <Settings className="w-4 h-4" />
                                            <span>Permissions</span>
                                          </h5>
                                          <button
                                            onClick={() => setEditingPermissions({...editingPermissions, [apiKey.id]: !editingPermissions[apiKey.id]})}
                                            className="text-blue-600 hover:text-blue-800 text-xs flex items-center space-x-1"
                                          >
                                            <Edit className="w-3 h-3" />
                                            <span>{editingPermissions[apiKey.id] ? 'Annuler' : 'Modifier'}</span>
                                          </button>
                                        </div>
                                        
                                        {editingPermissions[apiKey.id] ? (
                                          <div className="space-y-2">
                                            <div className="grid grid-cols-3 gap-3">
                                              <div className="flex items-center space-x-2">
                                                <input 
                                                  type="checkbox" 
                                                  defaultChecked={apiKey.permissions.lecture}
                                                  className="rounded border-gray-300"
                                                />
                                                <span className="text-xs text-gray-700">Lecture seule</span>
                                              </div>
                                              <div className="flex items-center space-x-2">
                                                <input 
                                                  type="checkbox" 
                                                  defaultChecked={apiKey.permissions.soumission}
                                                  className="rounded border-gray-300"
                                                />
                                                <span className="text-xs text-gray-700">Soumission</span>
                                              </div>
                                              <div className="flex items-center space-x-2">
                                                <input 
                                                  type="checkbox" 
                                                  defaultChecked={apiKey.permissions.accesResultats}
                                                  className="rounded border-gray-300"
                                                />
                                                <span className="text-xs text-gray-700">Accès aux résultats</span>
                                              </div>
                                            </div>
                                            <div className="flex space-x-2">
                                              <button
                                                onClick={() => updatePermissions(api.id, apiKey.id, apiKey.permissions)}
                                                className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                                              >
                                                Sauvegarder
                                              </button>
                                              <button
                                                onClick={() => setEditingPermissions({...editingPermissions, [apiKey.id]: false})}
                                                className="px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                                              >
                                                Annuler
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="grid grid-cols-3 gap-3">
                                            <div className="flex items-center space-x-2">
                                              <input 
                                                type="checkbox" 
                                                checked={apiKey.permissions.lecture}
                                                readOnly
                                                className="rounded border-gray-300"
                                              />
                                              <span className="text-xs text-gray-700">Lecture seule</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <input 
                                                type="checkbox" 
                                                checked={apiKey.permissions.soumission}
                                                readOnly
                                                className="rounded border-gray-300"
                                              />
                                              <span className="text-xs text-gray-700">Soumission</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <input 
                                                type="checkbox" 
                                                checked={apiKey.permissions.accesResultats}
                                                readOnly
                                                className="rounded border-gray-300"
                                              />
                                              <span className="text-xs text-gray-700">Accès aux résultats</span>
                                            </div>
                                          </div>
                                        )}
                                      </div>

                                      {/* Usage Statistics */}
                                      <div className="grid grid-cols-4 gap-3 text-xs mb-3">
                                        <div className="flex items-center space-x-1">
                                          <Activity className="w-3 h-3 text-blue-600 flex-shrink-0" />
                                          <span className="text-gray-700 truncate">{apiKey.utilisation.requetes.toLocaleString()} requêtes</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                          <AlertTriangle className="w-3 h-3 text-red-600 flex-shrink-0" />
                                          <span className="text-gray-700">{apiKey.utilisation.erreurs} erreurs</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                          <Clock className="w-3 h-3 text-gray-600 flex-shrink-0" />
                                          <span className="text-gray-700 truncate">Dernier: {formatDateTime(apiKey.utilisation.dernierAcces)}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                          <Calendar className="w-3 h-3 text-gray-600 flex-shrink-0" />
                                          <span className="text-gray-700 truncate">Expire: {formatDate(apiKey.dateExpiration)}</span>
                                        </div>
                                      </div>

                                      {/* Usage Log Button */}
                                      <div className="flex items-center justify-between">
                                        <button
                                          onClick={() => setShowUsageLog(showUsageLog === apiKey.id ? null : apiKey.id)}
                                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-xs"
                                        >
                                          <FileText className="w-3 h-3" />
                                          <span>Journal d'utilisation ({apiKey.usageLog?.length || 0} entrées)</span>
                                        </button>
                                      </div>

                                      {/* Usage Log Display */}
                                      {showUsageLog === apiKey.id && apiKey.usageLog && (
                                        <div className="mt-3 border-t pt-3">
                                          <h6 className="font-medium text-gray-900 mb-2 flex items-center space-x-2 text-sm">
                                            <BarChart3 className="w-4 h-4" />
                                            <span>Journal d'utilisation</span>
                                          </h6>
                                          <div className="overflow-x-auto">
                                            <table className="w-full text-xs">
                                              <thead className="bg-gray-50">
                                                <tr>
                                                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">Date/Heure</th>
                                                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">Endpoint</th>
                                                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">Méthode</th>
                                                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">Statut</th>
                                                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">Temps</th>
                                                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">IP</th>
                                                </tr>
                                              </thead>
                                              <tbody className="divide-y divide-gray-200">
                                                {apiKey.usageLog.map((log, index) => (
                                                  <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-2 py-1 text-gray-700 text-xs">
                                                      {formatDateTime(log.timestamp)}
                                                    </td>
                                                    <td className="px-2 py-1 text-gray-700 font-mono text-xs truncate max-w-32">
                                                      {log.endpoint}
                                                    </td>
                                                    <td className="px-2 py-1">
                                                      <span className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded-full ${getMethodColor(log.method)}`}>
                                                        {log.method}
                                                      </span>
                                                    </td>
                                                    <td className="px-2 py-1">
                                                      <span className={`font-medium ${getStatusColor(log.status)}`}>
                                                        {log.status}
                                                      </span>
                                                    </td>
                                                    <td className="px-2 py-1 text-gray-700 text-xs">
                                                      {log.responseTime}ms
                                                    </td>
                                                    <td className="px-2 py-1 text-gray-700 font-mono text-xs truncate max-w-24">
                                                      {log.ipAddress}
                                                    </td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ))}

                                  {api.clesApi.length === 0 && (
                                    <div className="text-center py-6 text-gray-500">
                                      <Key className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                                      <p className="text-sm">Aucune clé API configurée pour cette API</p>
                                      <button className="mt-3 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                        Créer la première clé API
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}

                        {/* API Logs - Inline */}
                        {showApiLogs === api.id && (
                          <tr>
                            <td colSpan={7} className="px-4 py-3 bg-gray-50">
                              <div className="bg-white rounded-lg border border-gray-200 p-3">
                                <div className="flex items-center justify-between mb-3">
                                  <h3 className="text-base font-semibold text-gray-900 flex items-center space-x-2">
                                    <Activity className="w-4 h-4" />
                                    <span>Logs de l'API - {api.nom}</span>
                                  </h3>
                                  <button 
                                    onClick={() => setShowApiLogs(null)}
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-50"
                                    title="Fermer"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                                <div className="overflow-x-auto">
                                  <table className="w-full text-xs">
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">Date/Heure</th>
                                        <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">Endpoint</th>
                                        <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">Méthode</th>
                                        <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">Statut</th>
                                        <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">Temps</th>
                                        <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">IP</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                      {api.clesApi.flatMap(key => key.usageLog || []).slice(0, 20).map((log, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                          <td className="px-2 py-1 text-gray-700 text-xs">
                                            {formatDateTime(log.timestamp)}
                                          </td>
                                          <td className="px-2 py-1 text-gray-700 font-mono text-xs truncate max-w-32">
                                            {log.endpoint}
                                          </td>
                                          <td className="px-2 py-1">
                                            <span className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded-full ${getMethodColor(log.method)}`}>
                                              {log.method}
                                            </span>
                                          </td>
                                          <td className="px-2 py-1">
                                            <span className={`font-medium ${getStatusColor(log.status)}`}>
                                              {log.status}
                                            </span>
                                          </td>
                                          <td className="px-2 py-1 text-gray-700 text-xs">
                                            {log.responseTime}ms
                                          </td>
                                          <td className="px-2 py-1 text-gray-700 font-mono text-xs truncate max-w-24">
                                            {log.ipAddress}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white px-3 py-2 border-t border-gray-200 sm:px-4">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Précédent
                </button>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="ml-2 relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-gray-700">
                    Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredApis.length)}
                    </span>{' '}
                    sur <span className="font-medium">{filteredApis.length}</span> résultats
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-1.5 rounded-l-md border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Précédent</span>
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`relative inline-flex items-center px-3 py-1.5 border text-xs font-medium ${
                          currentPage === number
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-1.5 rounded-r-md border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Suivant</span>
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && apiToDelete && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-4 border w-80 shadow-lg rounded-md bg-white">
                <div className="mt-2 text-center">
                  <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-red-100">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="text-base font-medium text-gray-900 mt-3">
                    Confirmer la suppression
                  </h3>
                  <div className="mt-2 px-6 py-2">
                    <p className="text-xs text-gray-500">
                      Êtes-vous sûr de vouloir supprimer l'API <strong>{apiToDelete.nom}</strong> ?
                    </p>
                    <p className="text-xs text-gray-500 mt-1.5">
                      Cette action est irréversible et supprimera également toutes les clés API associées.
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-2 mt-3">
                    <button
                      onClick={cancelDeleteApi}
                      className="px-3 py-1.5 bg-gray-300 text-gray-700 text-sm font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={confirmDeleteApi}
                      className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}