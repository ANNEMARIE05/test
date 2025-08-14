import { useState } from 'react';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  lastLogin?: string;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  
  // Mock user data - replace with actual data from your backend
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    role: 'Utilisateur',
    createdAt: '2024-01-15',
    lastLogin: '2024-03-20'
  });

  const [editForm, setEditForm] = useState({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    email: userProfile.email,
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
    });
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUserProfile(prev => ({
        ...prev,
        ...editForm
      }));
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDeleteRequest = async () => {
    if (!deleteReason.trim()) {
      alert('Veuillez fournir une raison pour la suppression de votre compte.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call to send deletion request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowDeleteModal(false);
      setDeleteReason('');
      alert('Votre demande de suppression a été envoyée à l\'administrateur. Vous recevrez une confirmation par email.');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la demande:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = async () => {
    setPasswordError('');
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas.');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      setPasswordError('Le nouveau mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call to change password
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowPasswordModal(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      alert('Votre mot de passe a été modifié avec succès.');
    } catch (error) {
      console.error('Erreur lors du changement de mot de passe:', error);
      setPasswordError('Une erreur est survenue lors du changement de mot de passe.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Profil</h2>
        <p className="text-xs sm:text-sm text-gray-600">Gérez votre profil utilisateur</p>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900">Informations personnelles</h3>
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto text-xs sm:text-sm"
            >
              Modifier
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-2 sm:space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  value={editForm.firstName}
                  onChange={(e) => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  value={editForm.lastName}
                  onChange={(e) => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
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
                value={editForm.email}
                onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
              />
            </div>
            <div className="flex flex-col sm:flex-row space-y-1.5 sm:space-y-0 sm:space-x-2 pt-2 sm:pt-3">
              <button
                onClick={handleSave}
                disabled={isSubmitting}
                className="px-2 sm:px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-xs sm:text-sm"
              >
                {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              <button
                onClick={handleCancel}
                disabled={isSubmitting}
                className="px-2 sm:px-3 py-1.5 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 text-xs sm:text-sm"
              >
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
                value={userProfile.firstName}
                readOnly
                className="w-full px-2 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 cursor-default text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                type="text"
                value={userProfile.lastName}
                readOnly
                className="w-full px-2 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 cursor-default text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={userProfile.email}
                readOnly
                className="w-full px-2 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 cursor-default text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Rôle</label>
              <input
                type="text"
                value={userProfile.role}
                readOnly
                className="w-full px-2 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 cursor-default text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Membre depuis</label>
              <input
                type="text"
                value={new Date(userProfile.createdAt).toLocaleDateString('fr-FR')}
                readOnly
                className="w-full px-2 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 cursor-default text-xs sm:text-sm"
              />
            </div>
            {userProfile.lastLogin && (
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Dernière connexion</label>
                <input
                  type="text"
                  value={new Date(userProfile.lastLogin).toLocaleDateString('fr-FR')}
                  readOnly
                  className="w-full px-2 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 cursor-default text-xs sm:text-sm"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Password Change Section */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-3">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Modification du mot de passe</h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Changez votre mot de passe pour sécuriser votre compte.
            </p>
          </div>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto text-xs sm:text-sm"
          >
            Changer le mot de passe
          </button>
        </div>
      </div>

      {/* Account Deletion Section */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-3">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Suppression de compte</h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Demandez la suppression de votre compte. Cette action nécessite l'approbation de l'administrateur.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-2 sm:px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full sm:w-auto text-xs sm:text-sm"
          >
            Demander la suppression
          </button>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
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
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                rows={3}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-xs sm:text-sm"
                placeholder="Expliquez pourquoi vous souhaitez supprimer votre compte..."
              />
            </div>
            <div className="flex flex-col sm:flex-row space-y-1.5 sm:space-y-0 sm:space-x-2">
              <button
                onClick={handleDeleteRequest}
                disabled={isSubmitting || !deleteReason.trim()}
                className="px-2 sm:px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex-1 text-xs sm:text-sm"
              >
                {isSubmitting ? 'Envoi...' : 'Envoyer la demande'}
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteReason('');
                }}
                disabled={isSubmitting}
                className="px-2 sm:px-3 py-1.5 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 flex-1 text-xs sm:text-sm"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
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
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
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
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
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
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
                  placeholder="Confirmez votre nouveau mot de passe"
                />
              </div>
              {passwordError && (
                <div className="text-red-600 text-xs sm:text-sm">
                  {passwordError}
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row space-y-1.5 sm:space-y-0 sm:space-x-2 mt-3 sm:mt-4">
              <button
                onClick={handlePasswordChange}
                disabled={isSubmitting || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                className="px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex-1 text-xs sm:text-sm"
              >
                {isSubmitting ? 'Modification...' : 'Modifier le mot de passe'}
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordForm({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                  setPasswordError('');
                }}
                disabled={isSubmitting}
                className="px-2 sm:px-3 py-1.5 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 flex-1 text-xs sm:text-sm"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}