import { useState } from 'react';

export default function Parametre() {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);

    const handleTwoFactorToggle = () => {
        setTwoFactorEnabled(!twoFactorEnabled);
        // Ici vous pouvez ajouter la logique pour activer/désactiver la 2FA
        if (!twoFactorEnabled) {
            // Logique pour activer la 2FA
            console.log('Activation de la 2FA...');
        } else {
            // Logique pour désactiver la 2FA
            console.log('Désactivation de la 2FA...');
        }
    };

    return (
        <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Paramètres</h2>
                <p className="text-sm sm:text-base text-gray-600">Configurez vos préférences et sécurisez votre compte</p>
            </div>

            {/* Section Sécurité */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Sécurité</h3>
                
                {/* 2FA */}
                <div className="flex items-center justify-between py-3 sm:py-4 border-b border-gray-100">
                    <div className="flex-1 pr-4">
                        <h4 className="font-medium text-gray-900 text-sm sm:text-base">Authentification à deux facteurs (2FA)</h4>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">Sécurisez votre compte avec une authentification supplémentaire</p>
                    </div>
                    <button
                        onClick={handleTwoFactorToggle}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0 ${
                            twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>

                {/* Mot de passe */}
                <div className="flex items-center justify-between py-3 sm:py-4">
                    <div className="flex-1 pr-4">
                        <h4 className="font-medium text-gray-900 text-sm sm:text-base">Changer le mot de passe</h4>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">Mettez à jour votre mot de passe</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base flex-shrink-0">
                        Modifier
                    </button>
                </div>
            </div>

            {/* Section Notifications */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Notifications</h3>
                
                <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 pr-4">
                            <h4 className="font-medium text-gray-900 text-sm sm:text-base">Notifications par email</h4>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">Recevez des notifications importantes par email</p>
                        </div>
                        <button
                            onClick={() => setEmailNotifications(!emailNotifications)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0 ${
                                emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    emailNotifications ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bouton de sauvegarde */}
            <div className="flex justify-end pt-2 sm:pt-0">
                <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base w-full sm:w-auto">
                    Sauvegarder les paramètres
                </button>
            </div>
        </div>
    );
}