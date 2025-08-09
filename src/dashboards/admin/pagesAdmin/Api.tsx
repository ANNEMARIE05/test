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
  Clock
} from "lucide-react";

interface ApiPermission {
  lecture: boolean;
  soumission: boolean;
  accesResultats: boolean;
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
              }
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
              }
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
              }
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
          clesApi: []
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

      const getStatusColor = (statut: string) => {
        switch (statut) {
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
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestion d'API</h2>
              <p className="text-gray-600">Configurez et surveillez les APIs et leurs clés</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* APIs Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Clés API - {apis.find(api => api.id === selectedApi)?.nom}
                  </h3>
                  <p className="text-sm text-gray-600">Gérez les clés d'accès et les permissions</p>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Nouvelle clé API</span>
                </button>
              </div>

              <div className="space-y-4">
                {apis.find(api => api.id === selectedApi)?.clesApi.map((apiKey) => (
                  <div key={apiKey.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{apiKey.nom}</h4>
                          <p className="text-sm text-gray-500">Créée le {formatDate(apiKey.dateCreation)}</p>
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
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <code className="text-sm font-mono text-gray-700">
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

                    {/* Permissions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={apiKey.permissions.lecture}
                          readOnly
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">Lecture seule</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={apiKey.permissions.soumission}
                          readOnly
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">Soumission</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={apiKey.permissions.accesResultats}
                          readOnly
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">Accès aux résultats</span>
                      </div>
                    </div>

                    {/* Usage Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700">{apiKey.utilisation.requetes.toLocaleString()} requêtes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="text-gray-700">{apiKey.utilisation.erreurs} erreurs</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">Dernier accès: {formatDateTime(apiKey.utilisation.dernierAcces)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">Expire le {formatDate(apiKey.dateExpiration)}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {apis.find(api => api.id === selectedApi)?.clesApi.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Key className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Aucune clé API configurée pour cette API</p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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