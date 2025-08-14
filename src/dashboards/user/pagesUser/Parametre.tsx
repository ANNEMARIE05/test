import { useState } from 'react';

export default function Parametre() {
    const [deuxFacteursActive, setDeuxFacteursActive] = useState(false);
    const [notificationsEmail, setNotificationsEmail] = useState(true);

    const basculerDeuxFacteurs = () => {
        setDeuxFacteursActive(!deuxFacteursActive);
        // Ici vous pouvez ajouter la logique pour activer/désactiver la 2FA
        if (!deuxFacteursActive) {
            // Logique pour activer la 2FA
            console.log('Activation de la 2FA...');
        } else {
            // Logique pour désactiver la 2FA
            console.log('Désactivation de la 2FA...');
        }
    };

    return (
        <div className="space-y-3 sm:space-y-4 px-4 sm:px-0">
            <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Paramètres</h2>
                <p className="text-xs sm:text-sm text-gray-600">Configurez vos préférences et sécurisez votre compte</p>
            </div>

            {/* Section Sécurité */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Sécurité</h3>
                
                {/* 2FA */}
                <div className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100">
                    <div className="flex-1 pr-3">
                        <h4 className="font-medium text-gray-900 text-sm">Authentification à deux facteurs (2FA)</h4>
                        <p className="text-xs text-gray-600 mt-0.5">Sécurisez votre compte avec une authentification supplémentaire</p>
                    </div>
                    <button
                        onClick={basculerDeuxFacteurs}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0 ${
                            deuxFacteursActive ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                    >
                        <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                deuxFacteursActive ? 'translate-x-5' : 'translate-x-0.5'
                            }`}
                        />
                    </button>
                </div>

                {/* Mot de passe */}
                <div className="flex items-center justify-between py-2 sm:py-3">
                    <div className="flex-1 pr-3">
                        <h4 className="font-medium text-gray-900 text-sm">Changer le mot de passe</h4>
                        <p className="text-xs text-gray-600 mt-0.5">Mettez à jour votre mot de passe</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex-shrink-0">
                        Modifier
                    </button>
                </div>
            </div>

            {/* Section Notifications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Notifications</h3>
                
                <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 pr-3">
                            <h4 className="font-medium text-gray-900 text-sm">Notifications par email</h4>
                            <p className="text-xs text-gray-600 mt-0.5">Recevez des notifications importantes par email</p>
                        </div>
                        <button
                            onClick={() => setNotificationsEmail(!notificationsEmail)}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0 ${
                                notificationsEmail ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                        >
                            <span
                                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                    notificationsEmail ? 'translate-x-5' : 'translate-x-0.5'
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bouton de sauvegarde */}
            <div className="flex justify-end pt-1 sm:pt-0">
                <button className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-sm w-full sm:w-auto">
                    Sauvegarder les paramètres
                </button>
            </div>
        </div>
    );
}