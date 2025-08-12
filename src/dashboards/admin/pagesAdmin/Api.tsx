import { useState } from 'react';
import { 
  Activity,
  Edit,
  Trash2,
  Search,
  Plus,
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
  Settings
} from "lucide-react";

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

    const apis: ApiEndpoint[] = [
        {
          id: '1',
          nom: 'OCR Document API',
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
          url: '/api/documents',
          statut: 'Maintenance',
          tempsReponse: '320ms',
          utilisation: 67,
          clesApi: []
        },
        {
          id: '4',
          nom: 'Email Service API',
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
        }
      ];

      const filteredApis = apis.filter(api =>
        api.nom.toLowerCase().includes(searchApis.toLowerCase()) ||
        api.statut.toLowerCase().includes(searchApis.toLowerCase())
      );

      const copyToClipboard = async (text: string, keyId: string) => {
        try {
          await navigator.clipboard.writeText(text);
          setCopiedKey(keyId);
          setTimeout(() => setCopiedKey(null), 2000);
        } catch (err) {
          console.error('Erreur lors de la copie:', err);
        }
      };

      const regenerateKey = (apiId: string, keyId: string) => {
        // Logique pour régénérer une clé API
        console.log(`Régénération de la clé ${keyId} pour l'API ${apiId}`);
      };

      const updatePermissions = (apiId: string, keyId: string, permissions: ApiPermission) => {
        // Logique pour mettre à jour les permissions
        console.log(`Mise à jour des permissions pour la clé ${keyId} de l'API ${apiId}:`, permissions);
        setEditingPermissions({...editingPermissions, [keyId]: false});
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

      return (
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Gestion d'API</h2>
              <p className="text-sm sm:text-base text-gray-600">Configurez et surveillez les APIs et leurs clés</p>
            </div>
            <button className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
              <Plus className="w-4 h-4" />
              <span>Ajouter une API</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher une API..."
              value={searchApis}
              onChange={(e) => setSearchApis(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          {/* APIs Table - Mobile Cards */}
          <div className="block sm:hidden space-y-3">
            {filteredApis.map((api) => (
              <div key={api.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{api.nom}</h3>
                    <p className="text-xs text-gray-500 font-mono truncate">{api.url}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 flex-shrink-0 ${
                    api.statut === 'Actif' ? 'bg-green-100 text-green-800' :
                    api.statut === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {api.statut}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
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
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{api.clesApi.length} clés</span>
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
                  <div className="flex items-center space-x-1">
                    <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50" title="Voir les logs">
                      <Activity className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50" title="Modifier">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50" title="Supprimer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* APIs Table - Desktop */}
          <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Temps de réponse
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilisation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clés API
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApis.map((api) => (
                    <tr key={api.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{api.nom}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-mono">{api.url}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          api.statut === 'Actif' ? 'bg-green-100 text-green-800' :
                          api.statut === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {api.statut}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{api.tempsReponse}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50" title="Voir les logs">
                            <Activity className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50" title="Modifier">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50" title="Supprimer">
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

          {/* API Keys Management Section */}
          {selectedApi && showApiKeys && (
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Clés API - {apis.find(api => api.id === selectedApi)?.nom}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">Gérez les clés d'accès et les permissions</p>
                </div>
                <button className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                  <Plus className="w-4 h-4" />
                  <span>Nouvelle clé API</span>
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {apis.find(api => api.id === selectedApi)?.clesApi.map((apiKey) => (
                  <div key={apiKey.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">{apiKey.nom}</h4>
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
                    <div className="bg-gray-50 rounded-lg p-3 mb-3 sm:mb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                        <code className="text-xs sm:text-sm font-mono text-gray-700 break-all">
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
                            onClick={() => regenerateKey(selectedApi, apiKey.id)}
                            className="text-orange-600 hover:text-orange-800 p-1 rounded hover:bg-orange-50"
                            title="Régénérer la clé"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Permissions Section */}
                    <div className="mb-3 sm:mb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                        <h5 className="font-medium text-gray-900 flex items-center space-x-2 text-sm sm:text-base">
                          <Settings className="w-4 h-4" />
                          <span>Permissions</span>
                        </h5>
                        <button
                          onClick={() => setEditingPermissions({...editingPermissions, [apiKey.id]: !editingPermissions[apiKey.id]})}
                          className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm flex items-center space-x-1 self-start sm:self-auto"
                        >
                          <Edit className="w-3 h-3" />
                          <span>{editingPermissions[apiKey.id] ? 'Annuler' : 'Modifier'}</span>
                        </button>
                      </div>
                      
                      {editingPermissions[apiKey.id] ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                            <div className="flex items-center space-x-2">
                              <input 
                                type="checkbox" 
                                defaultChecked={apiKey.permissions.lecture}
                                className="rounded border-gray-300"
                              />
                              <span className="text-xs sm:text-sm text-gray-700">Lecture seule</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input 
                                type="checkbox" 
                                defaultChecked={apiKey.permissions.soumission}
                                className="rounded border-gray-300"
                              />
                              <span className="text-xs sm:text-sm text-gray-700">Soumission</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input 
                                type="checkbox" 
                                defaultChecked={apiKey.permissions.accesResultats}
                                className="rounded border-gray-300"
                              />
                              <span className="text-xs sm:text-sm text-gray-700">Accès aux résultats</span>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <button
                              onClick={() => updatePermissions(selectedApi, apiKey.id, apiKey.permissions)}
                              className="px-3 py-1 bg-green-600 text-white text-xs sm:text-sm rounded hover:bg-green-700"
                            >
                              Sauvegarder
                            </button>
                            <button
                              onClick={() => setEditingPermissions({...editingPermissions, [apiKey.id]: false})}
                              className="px-3 py-1 bg-gray-600 text-white text-xs sm:text-sm rounded hover:bg-gray-700"
                            >
                              Annuler
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                          <div className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              checked={apiKey.permissions.lecture}
                              readOnly
                              className="rounded border-gray-300"
                            />
                            <span className="text-xs sm:text-sm text-gray-700">Lecture seule</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              checked={apiKey.permissions.soumission}
                              readOnly
                              className="rounded border-gray-300"
                            />
                            <span className="text-xs sm:text-sm text-gray-700">Soumission</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              checked={apiKey.permissions.accesResultats}
                              readOnly
                              className="rounded border-gray-300"
                            />
                            <span className="text-xs sm:text-sm text-gray-700">Accès aux résultats</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Usage Statistics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm mb-3 sm:mb-4">
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700 truncate">{apiKey.utilisation.requetes.toLocaleString()} requêtes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span className="text-gray-700">{apiKey.utilisation.erreurs} erreurs</span>
                      </div>
                      <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
                        <Clock className="w-4 h-4 text-gray-600 flex-shrink-0" />
                        <span className="text-gray-700 truncate">Dernier: {formatDateTime(apiKey.utilisation.dernierAcces)}</span>
                      </div>
                      <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
                        <Calendar className="w-4 h-4 text-gray-600 flex-shrink-0" />
                        <span className="text-gray-700 truncate">Expire: {formatDate(apiKey.dateExpiration)}</span>
                      </div>
                    </div>

                    {/* Usage Log Button */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setShowUsageLog(showUsageLog === apiKey.id ? null : apiKey.id)}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-xs sm:text-sm"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Journal d'utilisation ({apiKey.usageLog?.length || 0} entrées)</span>
                      </button>
                    </div>

                    {/* Usage Log Display */}
                    {showUsageLog === apiKey.id && apiKey.usageLog && (
                      <div className="mt-3 sm:mt-4 border-t pt-3 sm:pt-4">
                        <h6 className="font-medium text-gray-900 mb-3 flex items-center space-x-2 text-sm sm:text-base">
                          <BarChart3 className="w-4 h-4" />
                          <span>Journal d'utilisation</span>
                        </h6>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs sm:text-sm">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium text-gray-500">Date/Heure</th>
                                <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium text-gray-500">Endpoint</th>
                                <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium text-gray-500">Méthode</th>
                                <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium text-gray-500">Statut</th>
                                <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium text-gray-500">Temps</th>
                                <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium text-gray-500">IP</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {apiKey.usageLog.map((log, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="px-2 sm:px-3 py-2 text-gray-700 text-xs">
                                    {formatDateTime(log.timestamp)}
                                  </td>
                                  <td className="px-2 sm:px-3 py-2 text-gray-700 font-mono text-xs truncate max-w-20 sm:max-w-32">
                                    {log.endpoint}
                                  </td>
                                  <td className="px-2 sm:px-3 py-2">
                                    <span className={`inline-flex px-1 sm:px-2 py-1 text-xs font-semibold rounded-full ${getMethodColor(log.method)}`}>
                                      {log.method}
                                    </span>
                                  </td>
                                  <td className="px-2 sm:px-3 py-2">
                                    <span className={`font-medium ${getStatusColor(log.status)}`}>
                                      {log.status}
                                    </span>
                                  </td>
                                  <td className="px-2 sm:px-3 py-2 text-gray-700 text-xs">
                                    {log.responseTime}ms
                                  </td>
                                  <td className="px-2 sm:px-3 py-2 text-gray-700 font-mono text-xs truncate max-w-16 sm:max-w-24">
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

                {apis.find(api => api.id === selectedApi)?.clesApi.length === 0 && (
                  <div className="text-center py-6 sm:py-8 text-gray-500">
                    <Key className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
                    <p className="text-sm sm:text-base">Aucune clé API configurée pour cette API</p>
                    <button className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Créer la première clé API
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      );
}