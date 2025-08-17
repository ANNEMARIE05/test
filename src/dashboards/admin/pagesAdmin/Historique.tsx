import { CheckCircle, XCircle, Users, Shield, Filter } from 'lucide-react';

export default function Historique() {
      return (
          <div className="space-y-1 sm:space-y-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Historique des actions</h2>
            <p className="text-xs text-gray-600">Toutes les actions effectuées par l'administrateur</p>
          </div>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-3">
              <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium text-gray-600">Actions réussies</p>
                    <p className="text-sm sm:text-lg font-bold text-gray-900">1,234</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <XCircle className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-red-600" />
                    </div>
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium text-gray-600">Actions échouées</p>
                    <p className="text-sm sm:text-lg font-bold text-gray-900">23</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium text-gray-600">Actions utilisateurs</p>
                    <p className="text-sm sm:text-lg font-bold text-gray-900">456</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium text-gray-600">Actions sécurité</p>
                    <p className="text-sm sm:text-lg font-bold text-gray-900">89</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filtres */}
            <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Type d'action</label>
                    <select className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:bg-gray-50 transition-colors text-xs">
                      <option value="">Tous les types</option>
                      <option value="user">Gestion utilisateurs</option>
                      <option value="client-allocation">Gestion des allocations clients</option>
                      <option value="api-keys">Clés API</option>
                      <option value="profile">Profil administrateur</option>
                      <option value="document">Gestion documents</option>
                      <option value="system">Système</option>
                      <option value="security">Sécurité</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Période</label>
                    <select className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:bg-gray-50 transition-colors text-xs">
                      <option value="7">7 derniers jours</option>
                      <option value="30">30 derniers jours</option>
                      <option value="90">3 derniers mois</option>
                      <option value="all">Tout l'historique</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-center sm:justify-start">
                  <button className="w-full sm:w-auto px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium text-xs flex items-center justify-center gap-1">
                    <Filter className="w-3 h-3" />
                    Filtrer
                  </button>
                </div>
              </div>
            </div>

            {/* Tableau d'historique */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 sm:px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date & Heure
                      </th>
                      <th className="px-2 sm:px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-2 sm:px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="hidden sm:table-cell px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Détails
                      </th>
                      <th className="px-2 sm:px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                        <div>
                          <div className="font-medium">15/12/2024</div>
                          <div className="text-gray-500">14:32</div>
                        </div>
                      </td>
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                        Création d'un nouvel utilisateur
                      </td>
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Gestion utilisateurs
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-3 py-2 text-xs text-gray-900">
                        Nouvel utilisateur créé: Jean Dupont (jean.dupont@example.com)
                      </td>
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Réussi
                        </span>
                      </td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                        <div>
                          <div className="font-medium">14/12/2024</div>
                          <div className="text-gray-500">16:45</div>
                        </div>
                      </td>
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                        Attribution de 50 documents
                      </td>
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Gestion des allocations clients
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-3 py-2 text-xs text-gray-900">
                        Attribution de 50 documents à l'utilisateur Marie Martin (marie.martin@example.com)
                      </td>
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Réussi
                        </span>
                      </td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                        <div>
                          <div className="font-medium">13/12/2024</div>
                          <div className="text-gray-500">11:20</div>
                        </div>
                      </td>
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                        Modification du profil
                      </td>
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Profil administrateur
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-3 py-2 text-xs text-gray-900">
                        Mise à jour des informations de contact et des préférences de notification
                      </td>
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Réussi
                        </span>
                      </td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                        <div>
                          <div className="font-medium">12/12/2024</div>
                          <div className="text-gray-500">09:15</div>
                        </div>
                      </td>
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                        Dernière connexion
                      </td>
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Système
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-3 py-2 text-xs text-gray-900">
                        Connexion réussie depuis l'adresse IP 192.168.1.100
                      </td>
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Réussi
                        </span>
                      </td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                        <div>
                          <div className="font-medium">11/12/2024</div>
                          <div className="text-gray-500">15:30</div>
                        </div>
                      </td>
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                        Suppression d'utilisateur
                      </td>
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Gestion utilisateurs
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-3 py-2 text-xs text-gray-900">
                        Suppression de l'utilisateur Pierre Durand (pierre.durand@example.com)
                      </td>
                      <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Réussi
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="bg-gray-50 px-2 sm:px-3 py-2 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    Précédent
                  </button>
                  <button className="ml-2 relative inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    Suivant
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs text-gray-700">
                      Affichage de <span className="font-semibold">1</span> à <span className="font-semibold">5</span> sur <span className="font-semibold">97</span> résultats
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-1 rounded-l-lg border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                        <span className="sr-only">Précédent</span>
                        ←
                      </button>
                      <button className="relative inline-flex items-center px-2.5 py-1 border border-gray-300 bg-blue-50 text-xs font-medium text-blue-600 hover:bg-blue-100 transition-colors">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-2.5 py-1 border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        2
                      </button>
                      <button className="relative inline-flex items-center px-2.5 py-1 border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        3
                      </button>
                      <button className="relative inline-flex items-center px-2 py-1 rounded-r-lg border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                        <span className="sr-only">Suivant</span>
                        →
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
  }