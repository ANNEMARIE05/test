import { useState } from 'react';
import { 
  Activity,
  Edit,
  Trash2,
  Search,
  Plus,
} from "lucide-react";

interface ApiEndpoint {
    id: string;
    nom: string;
    url: string;
    statut: string;
    tempsReponse: string;
    utilisation: number;
  }
export default function Api() {
    const [searchApis, setSearchApis] = useState('');

    const apis: ApiEndpoint[] = [
        {
          id: '1',
          nom: 'OCR Document API',
          url: '/api/ocr/document',
          statut: 'Actif',
          tempsReponse: '150ms',
          utilisation: 85
        },
        {
          id: '2',
          nom: 'User Management API',
          url: '/api/users',
          statut: 'Actif',
          tempsReponse: '45ms',
          utilisation: 92
        },
        {
          id: '3',
          nom: 'Document Storage API',
          url: '/api/documents',
          statut: 'Maintenance',
          tempsReponse: '320ms',
          utilisation: 67
        },
        {
          id: '4',
          nom: 'Email Service API',
          url: '/api/email',
          statut: 'Actif',
          tempsReponse: '78ms',
          utilisation: 45
        }
      ];

      const filteredApis = apis.filter(api =>
        api.nom.toLowerCase().includes(searchApis.toLowerCase()) ||
        api.statut.toLowerCase().includes(searchApis.toLowerCase())
      );
      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestion d'API</h2>
              <p className="text-gray-600">Configurez et surveillez les APIs</p>
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
        </div>
      );
}