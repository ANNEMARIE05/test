import { useState } from 'react';

interface User {
    id: string;
    nom: string;
    email: string;
    role: string;
    documentsConsommes: number;
    motDePasse: string;
  }

export default function Email() {
    const [selectedUser] = useState<User | null>(null);
    const [showUserDetails, setShowUserDetails] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    // Données fictives des utilisateurs pour le select
    const users = [
        { id: '1', nom: 'Jean Dupont', email: 'jean.dupont@example.com' },
        { id: '2', nom: 'Marie Martin', email: 'marie.martin@example.com' },
        { id: '3', nom: 'Pierre Durand', email: 'pierre.durand@example.com' },
        { id: '4', nom: 'Sophie Leroy', email: 'sophie.leroy@example.com' },
    ];

    const handleRenvoyerAcces = () => {
        setShowMessage(true);
    };

    return (
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Gestion d'email</h2>
            <p className="text-xs sm:text-sm text-gray-600">Configurez les paramètres email</p>
          </div>

          {/* Génération d'email automatique */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Génération d'email automatique</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">URL du portail</label>
                  <input
                    type="url"
                    defaultValue="https://ocr-portal.com"
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Nombre de documents</label>
                  <input
                    type="number"
                    defaultValue="100"
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Identifiants (nom d'utilisateur)</label>
                <select
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Sélectionner un utilisateur</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.nom} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Instructions personnalisées</label>
                <textarea
                  rows={2}
                  defaultValue="Bienvenue sur notre plateforme OCR ! Voici vos identifiants de connexion et les instructions pour commencer à utiliser le service."
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="flex-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-xs sm:text-sm">
                  Générer et envoyer l'email
                </button>
                <button className="flex-1 px-3 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-xs sm:text-sm">
                  Prévisualiser l'email
                </button>
              </div>
            </div>
          </div>

          {/* Historique des emails */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Historique des emails</h3>
            <div className="space-y-3">
              {/* Email 1 */}
              <div className="border border-gray-200 rounded-md p-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div className="mb-1 sm:mb-0">
                    <h4 className="font-medium text-gray-900 text-sm">jean.dupont@example.com</h4>
                    <p className="text-xs text-gray-600">Bienvenue sur OCR Platform</p>
                  </div>
                  <span className="inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800 self-start sm:self-auto">
                    Envoyé
                  </span>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  <p>Date: 2024-01-15 10:30</p>
                </div>
              </div>

              {/* Email 2 */}
              <div className="border border-gray-200 rounded-md p-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div className="mb-1 sm:mb-0">
                    <h4 className="font-medium text-gray-900 text-sm">marie.martin@example.com</h4>
                    <p className="text-xs text-gray-600">Document traité avec succès</p>
                  </div>
                  <span className="inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800 self-start sm:self-auto">
                    Envoyé
                  </span>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  <p>Date: 2024-01-15 09:15</p>
                </div>
              </div>

              {/* Email 3 */}
              <div className="border border-gray-200 rounded-md p-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div className="mb-1 sm:mb-0">
                    <h4 className="font-medium text-gray-900 text-sm">pierre.durand@example.com</h4>
                    <p className="text-xs text-gray-600">Accès à la plateforme OCR</p>
                  </div>
                  <span className="inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-800 self-start sm:self-auto">
                    Non traité
                  </span>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  <p>Date: 2024-01-15 08:45</p>
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={handleRenvoyerAcces}
                    className="px-2 py-1 text-xs bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                  >
                    Renvoyer
                  </button>
                </div>
              </div>

              {/* Email 4 */}
              <div className="border border-gray-200 rounded-md p-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div className="mb-1 sm:mb-0">
                    <h4 className="font-medium text-gray-900 text-sm">sophie.leroy@example.com</h4>
                    <p className="text-xs text-gray-600">Nouveaux identifiants</p>
                  </div>
                  <span className="inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-800 self-start sm:self-auto">
                    Non traité
                  </span>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  <p>Date: 2024-01-15 07:20</p>
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={handleRenvoyerAcces}
                    className="px-2 py-1 text-xs bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                  >
                    Renvoyer
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User Details Modal */}
          {showUserDetails && selectedUser && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900">Détails de l'utilisateur</h3>
                </div>
                <div className="px-4 py-3 space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Nom</label>
                    <p className="text-xs text-gray-900">{selectedUser.nom}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-xs text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Mot de passe</label>
                    <p className="text-xs text-gray-900">{selectedUser.motDePasse}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Rôle</label>
                    <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${
                      selectedUser.role === 'Administrateur' ? 'bg-red-100 text-red-800' :
                      selectedUser.role === 'Modérateur' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedUser.role}
                    </span>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Documents consommés</label>
                    <p className="text-xs text-gray-900">{selectedUser.documentsConsommes}</p>
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-gray-200 flex justify-end">
                  <button
                    onClick={() => setShowUserDetails(false)}
                    className="px-3 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de confirmation pour renvoi d'accès */}
          {showMessage && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900">Confirmation</h3>
                </div>
                <div className="px-4 py-3">
                  <p className="text-xs text-gray-900">Les accès ont été renvoyés avec succès !</p>
                </div>
                <div className="px-4 py-3 border-t border-gray-200 flex justify-end">
                  <button
                    onClick={() => setShowMessage(false)}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}