import { 
  Users, 
  FileText, 
  Activity,
  Database,
  BarChart3,
} from "lucide-react";

export default function Dashboard() {
    return (
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Tableau de bord</h2>
            <p className="text-xs sm:text-sm text-gray-600">Vue d'ensemble de la plateforme OCR</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 sm:p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Utilisateurs actifs</p>
                  <p className="text-base sm:text-xl font-bold text-gray-900">1,847</p>
                </div>
                <div className="w-6 h-6 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-3 h-3 sm:w-5 sm:h-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 sm:p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Documents traités</p>
                  <p className="text-base sm:text-xl font-bold text-gray-900">45,231</p>
                </div>
                <div className="w-6 h-6 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-3 h-3 sm:w-5 sm:h-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 sm:p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Précision moyenne</p>
                  <p className="text-base sm:text-xl font-bold text-gray-900">99.2%</p>
                </div>
                <div className="w-6 h-6 sm:w-10 sm:h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 sm:p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Serveurs actifs</p>
                  <p className="text-base sm:text-xl font-bold text-gray-900">12</p>
                </div>
                <div className="w-6 h-6 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Database className="w-3 h-3 sm:w-5 sm:h-5 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Statut du système</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Serveur principal</span>
                  <span className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-green-600">Opérationnel</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Base de données</span>
                  <span className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-green-600">Opérationnel</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">API OCR</span>
                  <span className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-green-600">Opérationnel</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Activité récente</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">Nouveau utilisateur inscrit</p>
                    <p className="text-xs text-gray-500">Il y a 5 minutes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">Mise à jour du système OCR</p>
                    <p className="text-xs text-gray-500">Il y a 15 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}