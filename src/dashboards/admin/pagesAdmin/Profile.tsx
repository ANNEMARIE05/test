import { 
  User,
} from "lucide-react";

export default function Profil() {
    
    return (
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Profile</h2>
            <p className="text-xs sm:text-sm text-gray-600">Gérez votre profil administrateur</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Profile Info */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Informations personnelles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input
                      type="text"
                      defaultValue="Administrateur OCR"
                      className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue="admin@ocr.com"
                      className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      defaultValue="+33 1 23 45 67 89"
                      className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Fonction</label>
                    <input
                      type="text"
                      defaultValue="Administrateur système"
                      className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4">
                  <button className="w-full sm:w-auto px-3 py-1.5 bg-blue-600 text-white text-xs sm:text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    Sauvegarder les modifications
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Sécurité</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Ancien mot de passe</label>
                    <input
                      type="password"
                      placeholder="Entrez votre ancien mot de passe"
                      className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                    <input
                      type="password"
                      placeholder="Entrez votre nouveau mot de passe"
                      className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                    <input
                      type="password"
                      placeholder="Confirmez votre nouveau mot de passe"
                      className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                    <button className="w-full sm:w-auto px-3 py-1.5 bg-green-600 text-white text-xs sm:text-sm rounded-lg hover:bg-green-700 transition-colors">
                      Changer le mot de passe
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Sidebar */}
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900">Administrateur OCR</h3>
                  <p className="text-xs text-gray-600">admin@ocr.com</p>
                  <span className="inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-800 mt-1.5">
                    Administrateur
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Statistiques</h3>
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Connexions</span>
                    <span className="text-xs font-medium text-gray-900">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Dernière connexion</span>
                    <span className="text-xs font-medium text-gray-900">Aujourd'hui</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Actions effectuées</span>
                    <span className="text-xs font-medium text-gray-900">456</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Membre depuis</span>
                    <span className="text-xs font-medium text-gray-900">2023-01-15</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}