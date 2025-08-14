import { useState, useEffect } from 'react';

interface Parametres {
  auth2F: boolean;
  notifs: {
    email: boolean;
    sms: boolean;
  };
}

export default function Parametres() {
  const [parametres, setParametres] = useState<Parametres>({
    auth2F: false,
    notifs: {
      email: true,
      sms: false,
    },
  });

  const [chargement, setChargement] = useState(false);

  // Simuler le chargement des paramètres depuis l'API
  useEffect(() => {
    // Ici vous feriez un appel API pour récupérer les paramètres
    console.log('Chargement des paramètres...');
  }, []);

  const changerParametre = (cle: string, valeur: any) => {
    setParametres(prev => ({
      ...prev,
      [cle]: valeur
    }));
  };

  const changerNotif = (cle: string, valeur: boolean) => {
    setParametres(prev => ({
      ...prev,
      notifs: {
        ...prev.notifs,
        [cle]: valeur
      }
    }));
  };

  const sauvegarder = async () => {
    setChargement(true);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Simuler une notification toast
      console.log('Paramètres sauvegardés avec succès');
    } catch (error) {
      // Simuler une notification toast
      console.error('Erreur lors de la sauvegarde des paramètres');
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Paramètres</h2>
        <p className="text-xs sm:text-sm text-gray-600">Gérez les paramètres de sécurité et de configuration de votre application</p>
      </div>
      <button 
        onClick={sauvegarder} 
        disabled={chargement}
        className="flex items-center justify-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm">
        {chargement ? 'Sauvegarde...' : 'Sauvegarder'}
      </button>
    </div>

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
        {/* Authentification 2FA */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-3 border-b border-gray-200 sm:p-4">
            <h3 className="text-sm font-semibold flex items-center gap-2 sm:text-base">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Authentification à deux facteurs
            </h3>
          </div>
          <div className="p-3 space-y-2 sm:p-4 sm:space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-3">
                <label htmlFor="2fa-toggle" className="text-xs font-medium sm:text-sm">Activer la 2FA</label>
                <p className="text-xs text-gray-600">
                  Exiger une authentification à deux facteurs pour tous les utilisateurs
                </p>
              </div>
              <button
                id="2fa-toggle"
                onClick={() => changerParametre('auth2F', !parametres.auth2F)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${
                  parametres.auth2F ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                    parametres.auth2F ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {parametres.auth2F && (
              <div className="space-y-1.5 p-2 bg-gray-50 rounded-lg sm:space-y-2 sm:p-3">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 text-xs font-medium bg-gray-200 text-gray-800 rounded-full">Recommandé</span>
                  <span className="text-xs">La 2FA sera obligatoire pour tous les nouveaux utilisateurs</span>
                </div>
                <div className="text-xs text-gray-600">
                  Les utilisateurs existants devront configurer la 2FA lors de leur prochaine connexion
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-3 border-b border-gray-200 sm:p-4">
            <h3 className="text-sm font-semibold flex items-center gap-2 sm:text-base">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A2 2 0 006 3h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" />
              </svg>
              Notifications
            </h3>
          </div>
          <div className="p-3 space-y-2 sm:p-4 sm:space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="email-notif" className="text-xs font-medium sm:text-sm">Notifications par email</label>
                <button
                  onClick={() => changerNotif('email', !parametres.notifs.email)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${
                    parametres.notifs.email ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      parametres.notifs.email ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="sms-notif" className="text-xs font-medium sm:text-sm">Notifications par SMS</label>
                <button
                  onClick={() => changerNotif('sms', !parametres.notifs.sms)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${
                    parametres.notifs.sms ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      parametres.notifs.sms ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}