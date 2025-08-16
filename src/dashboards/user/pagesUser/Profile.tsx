import { useState } from 'react';
import { 
  User, 
  Edit, 
  Save, 
  X, 
  Lock, 
  Trash2, 
  Calendar, 
  Mail, 
  Shield,
  AlertTriangle
} from 'lucide-react';

interface ProfilUtilisateur {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  role: string;
  dateCreation: string;
  derniereConnexion?: string;
}

export default function Profile() {
  const [enModification, setEnModification] = useState(false);
  const [afficherModalSuppression, setAfficherModalSuppression] = useState(false);
  const [raisonSuppression, setRaisonSuppression] = useState('');
  const [enSoumission, setEnSoumission] = useState(false);
  const [afficherModalMotDePasse, setAfficherModalMotDePasse] = useState(false);
  const [formulaireMotDePasse, setFormulaireMotDePasse] = useState({
    motDePasseActuel: '',
    nouveauMotDePasse: '',
    confirmerMotDePasse: ''
  });
  const [erreurMotDePasse, setErreurMotDePasse] = useState('');
  
  // Données utilisateur simulées - remplacer par les vraies données de votre backend
  const [profilUtilisateur, setProfilUtilisateur] = useState<ProfilUtilisateur>({
    id: '1',
    prenom: 'Jean',
    nom: 'Dupont',
    email: 'jean.dupont@example.com',
    role: 'Utilisateur',
    dateCreation: '2024-01-15',
    derniereConnexion: '2024-03-20'
  });

  const [formulaireModification, setFormulaireModification] = useState({
    prenom: profilUtilisateur.prenom,
    nom: profilUtilisateur.nom,
    email: profilUtilisateur.email,
  });

  const gererModification = () => {
    setEnModification(true);
    setFormulaireModification({
      prenom: profilUtilisateur.prenom,
      nom: profilUtilisateur.nom,
      email: profilUtilisateur.email,
    });
  };

  const gererSauvegarde = async () => {
    setEnSoumission(true);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfilUtilisateur(prev => ({
        ...prev,
        ...formulaireModification
      }));
      setEnModification(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    } finally {
      setEnSoumission(false);
    }
  };

  const gererAnnulation = () => {
    setEnModification(false);
  };

  const gererDemandeSuppression = async () => {
    if (!raisonSuppression.trim()) {
      alert('Veuillez fournir une raison pour la suppression de votre compte.');
      return;
    }

    setEnSoumission(true);
    try {
      // Simuler un appel API pour envoyer la demande de suppression
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAfficherModalSuppression(false);
      setRaisonSuppression('');
      alert('Votre demande de suppression a été envoyée à l\'administrateur. Vous recevrez une confirmation par email.');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la demande:', error);
    } finally {
      setEnSoumission(false);
    }
  };

  const gererChangementMotDePasse = async () => {
    setErreurMotDePasse('');
    
    if (formulaireMotDePasse.nouveauMotDePasse !== formulaireMotDePasse.confirmerMotDePasse) {
      setErreurMotDePasse('Les mots de passe ne correspondent pas.');
      return;
    }
    
    if (formulaireMotDePasse.nouveauMotDePasse.length < 8) {
      setErreurMotDePasse('Le nouveau mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    setEnSoumission(true);
    try {
      // Simuler un appel API pour changer le mot de passe
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAfficherModalMotDePasse(false);
      setFormulaireMotDePasse({
        motDePasseActuel: '',
        nouveauMotDePasse: '',
        confirmerMotDePasse: ''
      });
      alert('Votre mot de passe a été modifié avec succès.');
    } catch (error) {
      console.error('Erreur lors du changement de mot de passe:', error);
      setErreurMotDePasse('Une erreur est survenue lors du changement de mot de passe.');
    } finally {
      setEnSoumission(false);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Profil</h2>
        <p className="text-xs sm:text-sm text-gray-600">Gérez votre profil utilisateur</p>
      </div>

      {/* Informations du profil */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Informations personnelles</h3>
          </div>
          {!enModification && (
            <button
              onClick={gererModification}
              className="px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto text-xs sm:text-sm flex items-center gap-1.5"
            >
              <Edit className="w-3 h-3" />
              Modifier
            </button>
          )}
        </div>

        {enModification ? (
          <div className="space-y-2 sm:space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  value={formulaireModification.prenom}
                  onChange={(e) => setFormulaireModification(prev => ({ ...prev, prenom: e.target.value }))}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  value={formulaireModification.nom}
                  onChange={(e) => setFormulaireModification(prev => ({ ...prev, nom: e.target.value }))}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formulaireModification.email}
                onChange={(e) => setFormulaireModification(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
              />
            </div>
            <div className="flex flex-col sm:flex-row space-y-1.5 sm:space-y-0 sm:space-x-2 pt-2 sm:pt-3">
              <button
                onClick={gererSauvegarde}
                disabled={enSoumission}
                className="px-2 sm:px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-xs sm:text-sm flex items-center gap-1.5"
              >
                <Save className="w-3 h-3" />
                {enSoumission ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              <button
                onClick={gererAnnulation}
                disabled={enSoumission}
                className="px-2 sm:px-3 py-1.5 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 text-xs sm:text-sm flex items-center gap-1.5"
              >
                <X className="w-3 h-3" />
                Annuler
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input
                type="text"
                value={profilUtilisateur.prenom}
                readOnly
                className="w-full px-2 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 cursor-default text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                type="text"
                value={profilUtilisateur.nom}
                readOnly
                className="w-full px-2 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 cursor-default text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                <input
                  type="email"
                  value={profilUtilisateur.email}
                  readOnly
                  className="w-full pl-7 pr-2 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 cursor-default text-xs sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Rôle</label>
              <div className="relative">
                <Shield className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                <input
                  type="text"
                  value={profilUtilisateur.role}
                  readOnly
                  className="w-full pl-7 pr-2 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 cursor-default text-xs sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Membre depuis</label>
              <div className="relative">
                <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                <input
                  type="text"
                  value={new Date(profilUtilisateur.dateCreation).toLocaleDateString('fr-FR')}
                  readOnly
                  className="w-full pl-7 pr-2 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 cursor-default text-xs sm:text-sm"
                />
              </div>
            </div>
            {profilUtilisateur.derniereConnexion && (
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Dernière connexion</label>
                <div className="relative">
                  <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                  <input
                    type="text"
                    value={new Date(profilUtilisateur.derniereConnexion).toLocaleDateString('fr-FR')}
                    readOnly
                    className="w-full pl-7 pr-2 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 cursor-default text-xs sm:text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Section changement de mot de passe */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-600" />
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">Modification du mot de passe</h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Changez votre mot de passe pour sécuriser votre compte.
              </p>
            </div>
          </div>
          <button
            onClick={() => setAfficherModalMotDePasse(true)}
            className="px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto text-xs sm:text-sm flex items-center gap-1.5"
          >
            <Lock className="w-3 h-3" />
            Changer le mot de passe
          </button>
        </div>
      </div>

      {/* Section suppression de compte */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">Suppression de compte</h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Demandez la suppression de votre compte. Cette action nécessite l'approbation de l'administrateur.
              </p>
            </div>
          </div>
          <button
            onClick={() => setAfficherModalSuppression(true)}
            className="px-2 sm:px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full sm:w-auto text-xs sm:text-sm flex items-center gap-1.5"
          >
            <Trash2 className="w-3 h-3" />
            Demander la suppression
          </button>
        </div>
      </div>

      {/* Modal suppression de compte */}
      {afficherModalSuppression && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
          <div className="bg-white rounded-lg p-3 sm:p-4 max-w-md w-full mx-3">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">
              Demande de suppression de compte
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
              Cette action enverra une demande de suppression de votre compte à l'administrateur. 
              Vous recevrez une confirmation par email une fois la demande traitée.
            </p>
            <div className="mb-2 sm:mb-3">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                Raison de la suppression *
              </label>
              <textarea
                value={raisonSuppression}
                onChange={(e) => setRaisonSuppression(e.target.value)}
                rows={3}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-xs sm:text-sm"
                placeholder="Expliquez pourquoi vous souhaitez supprimer votre compte..."
              />
            </div>
            <div className="flex flex-col sm:flex-row space-y-1.5 sm:space-y-0 sm:space-x-2">
              <button
                onClick={gererDemandeSuppression}
                disabled={enSoumission || !raisonSuppression.trim()}
                className="px-2 sm:px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex-1 text-xs sm:text-sm flex items-center gap-1.5"
              >
                <Trash2 className="w-3 h-3" />
                {enSoumission ? 'Envoi...' : 'Envoyer la demande'}
              </button>
              <button
                onClick={() => {
                  setAfficherModalSuppression(false);
                  setRaisonSuppression('');
                }}
                disabled={enSoumission}
                className="px-2 sm:px-3 py-1.5 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 flex-1 text-xs sm:text-sm flex items-center gap-1.5"
              >
                <X className="w-3 h-3" />
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal changement de mot de passe */}
      {afficherModalMotDePasse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
          <div className="bg-white rounded-lg p-3 sm:p-4 max-w-md w-full mx-3">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">
              Modification du mot de passe
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Mot de passe actuel *
                </label>
                <input
                  type="password"
                  value={formulaireMotDePasse.motDePasseActuel}
                  onChange={(e) => setFormulaireMotDePasse(prev => ({ ...prev, motDePasseActuel: e.target.value }))}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
                  placeholder="Entrez votre mot de passe actuel"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Nouveau mot de passe *
                </label>
                <input
                  type="password"
                  value={formulaireMotDePasse.nouveauMotDePasse}
                  onChange={(e) => setFormulaireMotDePasse(prev => ({ ...prev, nouveauMotDePasse: e.target.value }))}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
                  placeholder="Entrez votre nouveau mot de passe"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Confirmer le nouveau mot de passe *
                </label>
                <input
                  type="password"
                  value={formulaireMotDePasse.confirmerMotDePasse}
                  onChange={(e) => setFormulaireMotDePasse(prev => ({ ...prev, confirmerMotDePasse: e.target.value }))}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
                  placeholder="Confirmez votre nouveau mot de passe"
                />
              </div>
              {erreurMotDePasse && (
                <div className="text-red-600 text-xs sm:text-sm">
                  {erreurMotDePasse}
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row space-y-1.5 sm:space-y-0 sm:space-x-2 mt-3 sm:mt-4">
              <button
                onClick={gererChangementMotDePasse}
                disabled={enSoumission || !formulaireMotDePasse.motDePasseActuel || !formulaireMotDePasse.nouveauMotDePasse || !formulaireMotDePasse.confirmerMotDePasse}
                className="px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex-1 text-xs sm:text-sm flex items-center gap-1.5"
              >
                <Lock className="w-3 h-3" />
                {enSoumission ? 'Modification...' : 'Modifier le mot de passe'}
              </button>
              <button
                onClick={() => {
                  setAfficherModalMotDePasse(false);
                  setFormulaireMotDePasse({
                    motDePasseActuel: '',
                    nouveauMotDePasse: '',
                    confirmerMotDePasse: ''
                  });
                  setErreurMotDePasse('');
                }}
                disabled={enSoumission}
                className="px-2 sm:px-3 py-1.5 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 flex-1 text-xs sm:text-sm flex items-center gap-1.5"
              >
                <X className="w-3 h-3" />
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}