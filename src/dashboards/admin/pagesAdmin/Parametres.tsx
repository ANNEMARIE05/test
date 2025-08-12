import React, { useState, useEffect } from 'react';

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
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-gray-600">
            Gérez les paramètres de sécurité et de configuration de votre application
          </p>
        </div>
        <button 
          onClick={saveSettings} 
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Authentification 2FA */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Authentification à deux facteurs
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="2fa-toggle" className="font-medium">Activer la 2FA</label>
                <p className="text-sm text-gray-600">
                  Exiger une authentification à deux facteurs pour tous les utilisateurs
                </p>
              </div>
              <button
                id="2fa-toggle"
                onClick={() => handleSettingChange('twoFactorAuth', !settings.twoFactorAuth)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
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
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-800 rounded-full">Recommandé</span>
                  <span className="text-sm">La 2FA sera obligatoire pour tous les nouveaux utilisateurs</span>
                </div>
                <div className="text-sm text-gray-600">
                  Les utilisateurs existants devront configurer la 2FA lors de leur prochaine connexion
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A2 2 0 006 3h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" />
              </svg>
              Notifications
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="email-notif" className="font-medium">Notifications par email</label>
                <button
                  onClick={() => handleNotificationChange('email', !settings.notifications.email)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
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
                <label htmlFor="sms-notif" className="font-medium">Notifications par SMS</label>
                <button
                  onClick={() => handleNotificationChange('sms', !settings.notifications.sms)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
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