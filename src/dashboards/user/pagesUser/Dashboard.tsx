import { 
  FileText, 
  BarChart3, 
  Search, 
  Upload,
  CheckCircle,
  Clock,
} from "lucide-react";


export default function Dashboard(){
    return(
        <div className="space-y-3 md:space-y-4">
            <div className="hidden md:block">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Tableau de bord</h2>
              <p className="text-sm text-gray-600">Vue d'ensemble de vos activités OCR</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
              <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-2 md:p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Documents traités</p>
                    <p className="text-base md:text-xl font-bold text-gray-900">1,234</p>
                  </div>
                  <div className="w-6 h-6 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-3 h-3 md:w-5 md:h-5 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-2 md:p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Documents consommés</p>
                    <p className="text-base md:text-xl font-bold text-gray-900">856</p>
                  </div>
                  <div className="w-6 h-6 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 md:w-5 md:h-5 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-2 md:p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Documents restants</p>
                    <p className="text-base md:text-xl font-bold text-gray-900">144</p>
                  </div>
                  <div className="w-6 h-6 md:w-10 md:h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-3 h-3 md:w-5 md:h-5 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-2 md:p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Précision moyenne</p>
                    <p className="text-base md:text-xl font-bold text-gray-900">98.5%</p>
                  </div>
                  <div className="w-6 h-6 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-3 h-3 md:w-5 md:h-5 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-2 md:p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Temps moyen</p>
                    <p className="text-base md:text-xl font-bold text-gray-900">2.3s</p>
                  </div>
                  <div className="w-6 h-6 md:w-10 md:h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Search className="w-3 h-3 md:w-5 md:h-5 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-2 md:p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Documents en attente</p>
                    <p className="text-base md:text-xl font-bold text-gray-900">5</p>
                  </div>
                  <div className="w-6 h-6 md:w-10 md:h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-3 h-3 md:w-5 md:h-5 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-3 md:p-4">
              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2 md:mb-3">Activité récente</h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-2.5 h-2.5 md:w-3 md:h-3 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">Document traité avec succès</p>
                    <p className="text-xs text-gray-500">Il y a 5 minutes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-green-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">Nouveau document uploadé</p>
                    <p className="text-xs text-gray-500">Il y a 15 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}