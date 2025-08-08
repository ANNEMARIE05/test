import { useState } from "react";
import { Eye, EyeOff, Lock, Shield, Check, X, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Reinitialisation() {
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState("");
  const [afficherNouveauMotDePasse, setAfficherNouveauMotDePasse] = useState(false);
  const [afficherConfirmationMotDePasse, setAfficherConfirmationMotDePasse] = useState(false);
  const [motDePasseValide, setMotDePasseValide] = useState(false);
  const [messageSucces, setMessageSucces] = useState("");
  const navigate = useNavigate();

  // Critères de validation du mot de passe
  const criteresValidation = {
    longueur: nouveauMotDePasse.length >= 8
  };

  // Vérification de la correspondance des mots de passe
  const motsDePasseCorrespondent = nouveauMotDePasse && confirmerMotDePasse && nouveauMotDePasse === confirmerMotDePasse;

  // Validation du formulaire
  const formulaireValide = Object.values(criteresValidation).every(Boolean) && motsDePasseCorrespondent;

  // Gestion de la validation
  const validerNouveauMotDePasse = () => {
    if (formulaireValide) {
      setMotDePasseValide(true);
      setMessageSucces("Votre mot de passe a été mis à jour avec succès !");
      console.log("Nouveau mot de passe validé:", { nouveauMotDePasse });
      
      // Redirection après 2 secondes
      setTimeout(() => {
        console.log("Redirection vers la page de connexion...");
        navigate("/login");
      }, 2000);
    }
  };

  // Retour à la page précédente
  const retourPagePrecedente = () => {
    console.log("Retour à la page précédente");
    navigate("/otp");
  };

  // Basculer l'affichage des mots de passe
  const basculerAffichageNouveauMotDePasse = () => {
    setAfficherNouveauMotDePasse(!afficherNouveauMotDePasse);
  };

  const basculerAffichageConfirmationMotDePasse = () => {
    setAfficherConfirmationMotDePasse(!afficherConfirmationMotDePasse);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Éléments décoratifs animés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 rounded-full opacity-15 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-ping" style={{animationDuration: '4s'}}></div>
      </div>

      {/* Conteneur principal */}
      <div className="relative w-full max-w-md">
        {/* Carte de réinitialisation */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-blue-200/50">
          
          {/* Bouton retour */}
          <button 
            onClick={retourPagePrecedente}
            className="mb-4 flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm">Retour</span>
          </button>

          {/* En-tête */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
              Nouveau mot de passe
            </h1>
            <p className="text-gray-600 text-sm">
              Créez un mot de passe sécurisé pour votre compte
            </p>
          </div>

          {!motDePasseValide ? (
            <div className="space-y-6">
              {/* Nouveau mot de passe */}
              <div className="relative">
                <label htmlFor="nouveauMotDePasse" className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    id="nouveauMotDePasse"
                    type={afficherNouveauMotDePasse ? "text" : "password"}
                    value={nouveauMotDePasse}
                    onChange={(e) => setNouveauMotDePasse(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-50"
                    placeholder="Saisissez votre nouveau mot de passe"
                  />
                  <button
                    type="button"
                    onClick={basculerAffichageNouveauMotDePasse}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                  >
                    {afficherNouveauMotDePasse ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Message informatif */}
                {nouveauMotDePasse && nouveauMotDePasse.length < 8 && (
                  <div className="mt-2">
                    <span className="text-xs text-red-500">
                      Le mot de passe doit contenir au moins 8 caractères
                    </span>
                  </div>
                )}
              </div>

              {/* Confirmer le mot de passe */}
              <div className="relative">
                <label htmlFor="confirmerMotDePasse" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    id="confirmerMotDePasse"
                    type={afficherConfirmationMotDePasse ? "text" : "password"}
                    value={confirmerMotDePasse}
                    onChange={(e) => setConfirmerMotDePasse(e.target.value)}
                    className={`w-full pl-12 pr-12 py-4 bg-gray-50/50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 hover:bg-gray-50 ${
                      confirmerMotDePasse 
                        ? motsDePasseCorrespondent 
                          ? 'border-green-300 focus:ring-green-500' 
                          : 'border-red-300 focus:ring-red-500'
                        : 'border-gray-200 focus:ring-blue-500'
                    }`}
                    placeholder="Confirmez votre mot de passe"
                  />
                  <button
                    type="button"
                    onClick={basculerAffichageConfirmationMotDePasse}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                  >
                    {afficherConfirmationMotDePasse ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Message de correspondance */}
                {confirmerMotDePasse && (
                  <div className="mt-2">
                    {motsDePasseCorrespondent ? (
                      <div className="flex items-center space-x-1 text-green-600 text-xs">
                        <Check className="w-4 h-4" />
                        <span>Les mots de passe correspondent</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-red-500 text-xs">
                        <X className="w-4 h-4" />
                        <span>Les mots de passe ne correspondent pas</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bouton de validation */}
              <button
                onClick={validerNouveauMotDePasse}
                disabled={!formulaireValide}
                className={`w-full py-4 rounded-xl font-semibold shadow-lg transform transition-all duration-300 flex items-center justify-center space-x-2 group ${
                  formulaireValide
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:scale-105 hover:shadow-blue-300/50'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Mettre à jour le mot de passe</span>
                {formulaireValide && (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                )}
              </button>
            </div>
          ) : (
            /* Message de succès */
            <div className="text-center animate-pulse">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <Shield className="w-10 h-10 text-green-500 animate-bounce" />
              </div>
              <h2 className="text-2xl font-bold text-green-700 mb-2">Mot de passe mis à jour !</h2>
              <p className="text-gray-600 text-sm mb-4">
                {messageSucces}
              </p>
              <div className="text-xs text-gray-500">
                Redirection automatique...
              </div>
            </div>
          )}

          {/* Ligne décorative */}
          <div className="mt-8 flex items-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="px-4 text-xs text-gray-500 bg-white rounded-full">Sécurisé</div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>

        {/* Pied de page */}
        <div className="text-center mt-6 text-sm text-gray-500">
          © 2024 OCR Platform. Tous droits réservés.
        </div>
      </div>
    </div>
  );
}