import { useState, useEffect } from 'react';

interface Settings {
  twoFactorAuth: boolean;
  notifications: {
    email: boolean;
    sms: boolean;
  };
}

export default function Parametres() {
  const [settings, setSettings] = useState<Settings>({
    twoFactorAuth: false,
    notifications: {
      email: true,
      sms: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Simuler le chargement des paramètres depuis l'API
  useEffect(() => {
    // Ici vous feriez un appel API pour récupérer les paramètres
    console.log('Chargement des paramètres...');
  }, []);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const saveSettings = async () => {
    setIsLoading(true);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Simuler une notification toast
      console.log('Paramètres sauvegardés avec succès');
    } catch (error) {
      // Simuler une notification toast
      console.error('Erreur lors de la sauvegarde des paramètres');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Paramètres</h2>
        <p className="text-sm sm:text-base text-gray-600">Gérez les paramètres de sécurité et de configuration de votre application</p>
      </div>
      <button 
        onClick={saveSettings} 
        disabled={isLoading}
        className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
        {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
      </button>
    </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Authentification 2FA */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200 sm:p-6">
            <h3 className="text-base font-semibold flex items-center gap-2 sm:text-lg">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Authentification à deux facteurs
            </h3>
          </div>
          <div className="p-4 space-y-3 sm:p-6 sm:space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <label htmlFor="2fa-toggle" className="text-sm font-medium sm:text-base">Activer la 2FA</label>
                <p className="text-xs text-gray-600 sm:text-sm">
                  Exiger une authentification à deux facteurs pour tous les utilisateurs
                </p>
              </div>
              <button
                id="2fa-toggle"
                onClick={() => handleSettingChange('twoFactorAuth', !settings.twoFactorAuth)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                  settings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {settings.twoFactorAuth && (
              <div className="space-y-2 p-3 bg-gray-50 rounded-lg sm:space-y-3 sm:p-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-800 rounded-full">Recommandé</span>
                  <span className="text-xs sm:text-sm">La 2FA sera obligatoire pour tous les nouveaux utilisateurs</span>
                </div>
                <div className="text-xs text-gray-600 sm:text-sm">
                  Les utilisateurs existants devront configurer la 2FA lors de leur prochaine connexion
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200 sm:p-6">
            <h3 className="text-base font-semibold flex items-center gap-2 sm:text-lg">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A2 2 0 006 3h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" />
              </svg>
              Notifications
            </h3>
          </div>
          <div className="p-4 space-y-3 sm:p-6 sm:space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="email-notif" className="text-sm font-medium sm:text-base">Notifications par email</label>
                <button
                  onClick={() => handleNotificationChange('email', !settings.notifications.email)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                    settings.notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications.email ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="sms-notif" className="text-sm font-medium sm:text-base">Notifications par SMS</label>
                <button
                  onClick={() => handleNotificationChange('sms', !settings.notifications.sms)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                    settings.notifications.sms ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications.sms ? 'translate-x-6' : 'translate-x-1'
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