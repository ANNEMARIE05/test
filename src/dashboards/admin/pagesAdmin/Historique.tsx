import { CheckCircle, XCircle, Users, Shield, Filter } from 'lucide-react';

export default function Historique() {
      return (
          <div className="space-y-1 sm:space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Historique des actions</h2>
            <p className="text-sm text-gray-600">Toutes les actions effectuées par l'administrateur</p>
          </div>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-4">
              <div className="bg-white p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 sm:w-10 sm:h-10 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-2 sm:ml-3">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Actions réussies</p>
                    <p className="text-sm sm:text-xl font-bold text-gray-900">1,234</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 sm:w-10 sm:h-10 bg-red-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <XCircle className="w-3 h-3 sm:w-5 sm:h-5 text-red-600" />
                    </div>
                  </div>
                  <div className="ml-2 sm:ml-3">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Actions échouées</p>
                    <p className="text-sm sm:text-xl font-bold text-gray-900">23</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 sm:w-10 sm:h-10 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Users className="w-3 h-3 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-2 sm:ml-3">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Actions utilisateurs</p>
                    <p className="text-sm sm:text-xl font-bold text-gray-900">456</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Shield className="w-3 h-3 sm:w-5 sm:h-5 text-gray-600" />
                    </div>
                  </div>
                  <div className="ml-2 sm:ml-3">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Actions sécurité</p>
                    <p className="text-sm sm:text-xl font-bold text-gray-900">89</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filtres */}
            <div className="bg-white p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col gap-2 sm:gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Type d'action</label>
                    <select className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:bg-gray-50 transition-colors text-sm">
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
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Période</label>
                    <select className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:bg-gray-50 transition-colors text-sm">
                      <option value="7">7 derniers jours</option>
                      <option value="30">30 derniers jours</option>
                      <option value="90">3 derniers mois</option>
                      <option value="all">Tout l'historique</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-center sm:justify-start">
                  <button className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium text-sm flex items-center justify-center gap-1.5">
                    <Filter className="w-3 h-3" />
                    Filtrer
                  </button>
                </div>
              </div>
            </div>

            {/* Tableau d'historique */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date & Heure
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Détails
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-blue-50 transition-colors duration-150">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        15/12/2024 14:30
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm text-gray-900">
                        Création d'un nouvel utilisateur
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="inline-flex px-1.5 sm:px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          Utilisateur
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-3 text-sm text-gray-700">
                        Ajout de l'utilisateur "Jean Dupont" avec le rôle "Analyste"
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="inline-flex px-1.5 sm:px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          ✓ Succès
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors duration-150">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        15/12/2024 13:45
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm text-gray-900">
                        Suppression d'un document
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="inline-flex px-1.5 sm:px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                          Document
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-3 text-sm text-gray-700">
                        Suppression du document "rapport_2024.pdf" de l'utilisateur ID: 123
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="inline-flex px-1.5 sm:px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          ✓ Succès
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors duration-150">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        15/12/2024 12:20
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm text-gray-900">
                        Modification des permissions
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="inline-flex px-1.5 sm:px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                          Sécurité
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-3 text-sm text-gray-700">
                        Changement des permissions pour le groupe "Analystes" - Ajout accès lecture
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="inline-flex px-1.5 sm:px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          ✓ Succès
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors duration-150">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        15/12/2024 11:15
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm text-gray-900">
                        Sauvegarde système
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="inline-flex px-1.5 sm:px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                          Système
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-3 text-sm text-gray-700">
                        Sauvegarde automatique de la base de données - Taille: 2.5 GB
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="inline-flex px-1.5 sm:px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          ✓ Succès
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors duration-150">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        15/12/2024 10:30
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm text-gray-900">
                        Tentative de connexion échouée
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="inline-flex px-1.5 sm:px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                          Sécurité
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-3 text-sm text-gray-700">
                        Tentative de connexion depuis IP: 192.168.1.100 - Compte bloqué temporairement
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="inline-flex px-1.5 sm:px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          ✗ Échec
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="bg-gray-50 px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-2 py-1.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    Précédent
                  </button>
                  <button className="ml-2 relative inline-flex items-center px-2 py-1.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    Suivant
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Affichage de <span className="font-semibold">1</span> à <span className="font-semibold">5</span> sur <span className="font-semibold">97</span> résultats
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-1.5 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                        <span className="sr-only">Précédent</span>
                        ←
                      </button>
                      <button className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100 transition-colors">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        2
                      </button>
                      <button className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        3
                      </button>
                      <button className="relative inline-flex items-center px-2 py-1.5 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
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