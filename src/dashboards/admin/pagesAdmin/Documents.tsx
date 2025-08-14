import { useState } from 'react';
import { 
  Edit,
  Trash2,
  Search,
  CheckSquare,
  X,
  History,
  Bell,
  UserCheck,
} from "lucide-react";

interface Client {
    id: string;
    nom: string;
    email: string;
    limiteMensuelle: number;
    documentsConsommes: number;
    documentsAttribues: number;
  }

interface HistoriqueAllocation {
    id: string;
    clientId: string;
    nomClient: string;
    action: 'assignation' | 'modification' | 'suppression';
    ancienneValeur?: number;
    nouvelleValeur?: number;
    date: string;
    nomAdmin: string;
    commentaire?: string;
  }

export default function Documents() {
    const [rechercheClients, setRechercheClients] = useState('');
    const [afficherModalAssignation, setAfficherModalAssignation] = useState(false);
    const [afficherModalModification, setAfficherModalModification] = useState(false);
    const [afficherModalSuppression, setAfficherModalSuppression] = useState(false);
    const [afficherModalHistorique, setAfficherModalHistorique] = useState(false);
    const [afficherModalAlerte, setAfficherModalAlerte] = useState(false);
    const [clientEnModification, setClientEnModification] = useState<Client | null>(null);
    const [clientASupprimer, setClientASupprimer] = useState<Client | null>(null);
    const [clientPourHistorique, setClientPourHistorique] = useState<Client | null>(null);
    const [clientPourAlerte, setClientPourAlerte] = useState<Client | null>(null);
    const [formulaireAssignation, setFormulaireAssignation] = useState({
        clientSelectionne: '',
        limiteMensuelle: 0
    });

    const [clients, setClients] = useState<Client[]>([
        {
            id: '1',
            nom: 'Jean Dupont',
            email: 'jean.dupont@email.com',
            limiteMensuelle: 1000,
            documentsConsommes: 450,
            documentsAttribues: 12
        },
        {
            id: '2',
            nom: 'Marie Martin',
            email: 'marie.martin@email.com',
            limiteMensuelle: 500,
            documentsConsommes: 320,
            documentsAttribues: 8
        },
        {
            id: '3',
            nom: 'Pierre Durand',
            email: 'pierre.durand@email.com',
            limiteMensuelle: 200,
            documentsConsommes: 180,
            documentsAttribues: 5
        }
    ]);

    const [historiqueAllocations, setHistoriqueAllocations] = useState<HistoriqueAllocation[]>([
        {
            id: '1',
            clientId: '1',
            nomClient: 'Jean Dupont',
            action: 'assignation',
            ancienneValeur: 0,
            nouvelleValeur: 1000,
            date: '2024-01-15 10:30:00',
            nomAdmin: 'Admin',
            commentaire: 'Création du client avec allocation initiale'
        },
        {
            id: '2',
            clientId: '2',
            nomClient: 'Marie Martin',
            action: 'assignation',
            ancienneValeur: 0,
            nouvelleValeur: 500,
            date: '2024-01-14 14:20:00',
            nomAdmin: 'Admin',
            commentaire: 'Création du client avec allocation initiale'
        },
        {
            id: '3',
            clientId: '3',
            nomClient: 'Pierre Durand',
            action: 'assignation',
            ancienneValeur: 0,
            nouvelleValeur: 200,
            date: '2024-01-13 09:15:00',
            nomAdmin: 'Admin',
            commentaire: 'Création du client avec allocation initiale'
        }
    ]);

    const clientsFiltres = clients.filter(client =>
        client.nom.toLowerCase().includes(rechercheClients.toLowerCase()) ||
        client.email.toLowerCase().includes(rechercheClients.toLowerCase())
    );

    const assignerClient = () => {
        if (formulaireAssignation.clientSelectionne && formulaireAssignation.limiteMensuelle > 0) {
            const clientSelectionne = clients.find(c => c.id === formulaireAssignation.clientSelectionne);
            if (clientSelectionne) {
                const ancienClient = { ...clientSelectionne };
                const clientMisAJour = {
                    ...clientSelectionne,
                    limiteMensuelle: formulaireAssignation.limiteMensuelle
                };

                setClients(prev => prev.map(client => 
                    client.id === formulaireAssignation.clientSelectionne ? clientMisAJour : client
                ));

                // Ajouter à l'historique
                const entreeHistorique: HistoriqueAllocation = {
                    id: Date.now().toString(),
                    clientId: clientSelectionne.id,
                    nomClient: clientSelectionne.nom,
                    action: ancienClient.limiteMensuelle === 0 ? 'assignation' : 'modification',
                    ancienneValeur: ancienClient.limiteMensuelle,
                    nouvelleValeur: formulaireAssignation.limiteMensuelle,
                    date: new Date().toISOString().replace('T', ' ').substring(0, 19),
                    nomAdmin: 'Admin',
                    commentaire: ancienClient.limiteMensuelle === 0 ? 'Assignation initiale' : 'Modification de l\'allocation'
                };

                setHistoriqueAllocations(prev => [entreeHistorique, ...prev]);
            }

            setFormulaireAssignation({ clientSelectionne: '', limiteMensuelle: 0 });
            setAfficherModalAssignation(false);
        }
    };

    const envoyerAlerte = () => {
        if (clientPourAlerte) {
            // Ici vous pouvez implémenter la logique d'envoi d'alerte
            console.log(`Alerte envoyée à ${clientPourAlerte.nom} (${clientPourAlerte.email})`);
            setClientPourAlerte(null);
            setAfficherModalAlerte(false);
        }
    };

    const ouvrirModalAlerte = (client: Client) => {
        setClientPourAlerte(client);
        setAfficherModalAlerte(true);
    };

    const quotaAtteint = (client: Client) => {
        return client.documentsConsommes >= client.limiteMensuelle;
    };

    const quotaAvertissement = (client: Client) => {
        const pourcentage = (client.documentsConsommes / client.limiteMensuelle) * 100;
        return pourcentage >= 90;
    };

    const modifierClient = () => {
        if (clientEnModification) {
            const ancienClient = clients.find(c => c.id === clientEnModification.id);
            if (ancienClient) {
                setClients(prev => prev.map(client => 
                    client.id === clientEnModification.id ? clientEnModification : client
                ));

                // Ajouter à l'historique si la limite a changé
                if (ancienClient.limiteMensuelle !== clientEnModification.limiteMensuelle) {
                    const entreeHistorique: HistoriqueAllocation = {
                        id: Date.now().toString(),
                        clientId: clientEnModification.id,
                        nomClient: clientEnModification.nom,
                        action: 'modification',
                        ancienneValeur: ancienClient.limiteMensuelle,
                        nouvelleValeur: clientEnModification.limiteMensuelle,
                        date: new Date().toISOString().replace('T', ' ').substring(0, 19),
                        nomAdmin: 'Admin',
                        commentaire: 'Modification de l\'allocation mensuelle'
                    };

                    setHistoriqueAllocations(prev => [entreeHistorique, ...prev]);
                }
            }

            setClientEnModification(null);
            setAfficherModalModification(false);
        }
    };

    const supprimerClient = () => {
        if (clientASupprimer) {
            // Ajouter à l'historique avant suppression
            const entreeHistorique: HistoriqueAllocation = {
                id: Date.now().toString(),
                clientId: clientASupprimer.id,
                nomClient: clientASupprimer.nom,
                action: 'suppression',
                ancienneValeur: clientASupprimer.limiteMensuelle,
                nouvelleValeur: 0,
                date: new Date().toISOString().replace('T', ' ').substring(0, 19),
                nomAdmin: 'Admin',
                commentaire: 'Suppression du client'
            };

            setHistoriqueAllocations(prev => [entreeHistorique, ...prev]);

            setClients(prev => prev.filter(client => client.id !== clientASupprimer.id));
            setClientASupprimer(null);
            setAfficherModalSuppression(false);
        }
    };

    const ouvrirModalModification = (client: Client) => {
        setClientEnModification({ ...client });
        setAfficherModalModification(true);
    };

    const ouvrirModalSuppression = (client: Client) => {
        setClientASupprimer(client);
        setAfficherModalSuppression(true);
    };

    const ouvrirModalHistorique = (client: Client) => {
        setClientPourHistorique(client);
        setAfficherModalHistorique(true);
    };

    const obtenirHistoriqueClient = (clientId: string) => {
        return historiqueAllocations.filter(entree => entree.clientId === clientId);
    };

    const obtenirCouleurStatut = (client: Client) => {
        const pourcentage = (client.documentsConsommes / client.limiteMensuelle) * 100;
        if (pourcentage >= 90) return 'text-red-600';
        if (pourcentage >= 75) return 'text-yellow-600';
        return 'text-green-600';
    };

    const obtenirCouleurFondStatut = (client: Client) => {
        const pourcentage = (client.documentsConsommes / client.limiteMensuelle) * 100;
        if (pourcentage >= 90) return 'bg-red-100';
        if (pourcentage >= 75) return 'bg-yellow-100';
        return 'bg-green-100';
    };

    return (
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Gestion des allocations clients</h2>
              <p className="text-xs sm:text-sm text-gray-600">Gérez les allocations de documents par client</p>
            </div>
            <div className="flex flex-wrap items-center gap-1 sm:space-x-2">
              <button 
                onClick={() => setAfficherModalAssignation(true)}
                className="flex items-center space-x-1 px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
              >
                <UserCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Assigner</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={rechercheClients}
              onChange={(e) => setRechercheClients(e.target.value)}
              className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Clients Table - Mobile Responsive */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom du client
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documents attribués
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documents restants
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilisation
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clientsFiltres.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{client.nom}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{client.email}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{client.limiteMensuelle}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                        <div className={`text-sm font-medium ${obtenirCouleurStatut(client)}`}>
                          {Math.max(0, client.limiteMensuelle - client.documentsConsommes)}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${obtenirCouleurFondStatut(client).replace('bg-', 'bg-').replace('-100', '-600')}`}
                              style={{ width: `${Math.min((client.documentsConsommes / client.limiteMensuelle) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {Math.round((client.documentsConsommes / client.limiteMensuelle) * 100)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button 
                            onClick={() => ouvrirModalHistorique(client)}
                            className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50" 
                            title="Historique"
                          >
                            <History className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => ouvrirModalModification(client)}
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50" 
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {(quotaAvertissement(client) || quotaAtteint(client)) && (
                            <button 
                              onClick={() => ouvrirModalAlerte(client)}
                              className="text-orange-600 hover:text-orange-900 p-1 rounded hover:bg-orange-50" 
                              title="Envoyer une alerte"
                            >
                              <Bell className="w-4 h-4" />
                            </button>
                          )}
                          <button 
                            onClick={() => ouvrirModalSuppression(client)}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50" 
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden">
              {clientsFiltres.map((client) => (
                <div key={client.id} className="border-b border-gray-200 p-3 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{client.nom}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{client.email}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => ouvrirModalHistorique(client)}
                        className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50" 
                        title="Historique"
                      >
                        <History className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => ouvrirModalModification(client)}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50" 
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {(quotaAvertissement(client) || quotaAtteint(client)) && (
                        <button 
                          onClick={() => ouvrirModalAlerte(client)}
                          className="text-orange-600 hover:text-orange-900 p-1 rounded hover:bg-orange-50" 
                          title="Envoyer une alerte"
                        >
                          <Bell className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => ouvrirModalSuppression(client)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50" 
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-600">Attribués:</span>
                      <span className="ml-1 font-medium">{client.limiteMensuelle}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Restants:</span>
                      <span className={`ml-1 font-medium ${obtenirCouleurStatut(client)}`}>
                        {Math.max(0, client.limiteMensuelle - client.documentsConsommes)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${obtenirCouleurFondStatut(client).replace('bg-', 'bg-').replace('-100', '-600')}`}
                          style={{ width: `${Math.min((client.documentsConsommes / client.limiteMensuelle) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {Math.round((client.documentsConsommes / client.limiteMensuelle) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assign Client Modal */}
          {afficherModalAssignation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 w-full max-w-md">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-lg font-semibold">Assigner des documents</h3>
                  <button
                    onClick={() => {
                      setAfficherModalAssignation(false);
                      setFormulaireAssignation({ clientSelectionne: '', limiteMensuelle: 0 });
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sélectionner un client
                    </label>
                    <select
                      value={formulaireAssignation.clientSelectionne}
                      onChange={(e) => setFormulaireAssignation(prev => ({ ...prev, clientSelectionne: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option value="">Choisir un client...</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.nom} ({client.email})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de documents à attribuer
                    </label>
                    <input
                      type="number"
                      value={formulaireAssignation.limiteMensuelle}
                      onChange={(e) => setFormulaireAssignation(prev => ({ ...prev, limiteMensuelle: parseInt(e.target.value) || 0 }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="1000"
                      min="1"
                    />
                  </div>
                  {formulaireAssignation.clientSelectionne && (
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-600">
                        Allocation actuelle: {clients.find(c => c.id === formulaireAssignation.clientSelectionne)?.limiteMensuelle || 0} documents
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => {
                      setAfficherModalAssignation(false);
                      setFormulaireAssignation({ clientSelectionne: '', limiteMensuelle: 0 });
                    }}
                    className="px-3 sm:px-4 py-1.5 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={assignerClient}
                    disabled={!formulaireAssignation.clientSelectionne || formulaireAssignation.limiteMensuelle <= 0}
                    className="px-3 sm:px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Assigner
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Alert Modal */}
          {afficherModalAlerte && clientPourAlerte && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 w-full max-w-md">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-lg font-semibold">Envoyer une alerte</h3>
                  <button
                    onClick={() => setAfficherModalAlerte(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <div className="mb-3">
                  <p className="text-gray-600 text-sm">
                    Envoyer une alerte à <strong>"{clientPourAlerte.nom}"</strong> ?
                  </p>
                  <div className="mt-2 p-2 bg-orange-50 rounded-lg">
                    <p className="text-xs text-orange-600 font-medium">Raison:</p>
                    <p className="text-xs text-orange-600 mt-1">
                      {quotaAtteint(clientPourAlerte) 
                        ? "Quota de documents atteint" 
                        : "Quota de documents presque atteint (90%+)"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setAfficherModalAlerte(false)}
                    className="px-3 sm:px-4 py-1.5 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={envoyerAlerte}
                    className="px-3 sm:px-4 py-1.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm"
                  >
                    Envoyer l'alerte
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Client Modal */}
          {afficherModalModification && clientEnModification && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 w-full max-w-md">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-lg font-semibold">Modifier le client</h3>
                  <button
                    onClick={() => setAfficherModalModification(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom du client
                    </label>
                    <input
                      type="text"
                      value={clientEnModification.nom}
                      onChange={(e) => setClientEnModification(prev => prev ? { ...prev, nom: e.target.value } : null)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={clientEnModification.email}
                      onChange={(e) => setClientEnModification(prev => prev ? { ...prev, email: e.target.value } : null)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de documents attribués
                    </label>
                    <input
                      type="number"
                      value={clientEnModification.limiteMensuelle}
                      onChange={(e) => setClientEnModification(prev => prev ? { ...prev, limiteMensuelle: parseInt(e.target.value) || 0 } : null)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      min="1"
                    />
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-600">
                      Documents consommés: {clientEnModification.documentsConsommes}
                    </p>
                    <p className="text-xs text-gray-600">
                      Documents restants: {clientEnModification.limiteMensuelle - clientEnModification.documentsConsommes}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => setAfficherModalModification(false)}
                    className="px-3 sm:px-4 py-1.5 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={modifierClient}
                    disabled={!clientEnModification.nom || !clientEnModification.email || clientEnModification.limiteMensuelle <= 0}
                    className="px-3 sm:px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Client Modal */}
          {afficherModalSuppression && clientASupprimer && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 w-full max-w-md">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-lg font-semibold">Supprimer le client</h3>
                  <button
                    onClick={() => setAfficherModalSuppression(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <div className="mb-3">
                  <p className="text-gray-600 text-sm">
                    Êtes-vous sûr de vouloir supprimer le client <strong>"{clientASupprimer.nom}"</strong> ?
                  </p>
                  <div className="mt-2 p-2 bg-red-50 rounded-lg">
                    <p className="text-xs text-red-600 font-medium">Attention:</p>
                    <ul className="text-xs text-red-600 mt-1 space-y-1">
                      <li>• Toutes les données du client seront supprimées</li>
                      <li>• L'historique des allocations sera conservé</li>
                      <li>• Cette action est irréversible</li>
                    </ul>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setAfficherModalSuppression(false)}
                    className="px-3 sm:px-4 py-1.5 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={supprimerClient}
                    className="px-3 sm:px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* History Modal */}
          {afficherModalHistorique && clientPourHistorique && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Historique des modifications - {clientPourHistorique.nom}
                  </h3>
                  <button
                    onClick={() => setAfficherModalHistorique(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                
                {/* Current Value Display */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckSquare className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Valeur actuelle</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-blue-600">Documents attribués:</span>
                      <span className="ml-1 font-medium text-blue-800">{clientPourHistorique.limiteMensuelle} documents</span>
                    </div>
                    <div>
                      <span className="text-blue-600">Documents consommés:</span>
                      <span className="ml-1 font-medium text-blue-800">{clientPourHistorique.documentsConsommes} documents</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {obtenirHistoriqueClient(clientPourHistorique.id).map((entree) => (
                    <div key={entree.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            entree.action === 'assignation' ? 'bg-green-100 text-green-800' :
                            entree.action === 'modification' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {entree.action === 'assignation' ? 'Assignation' :
                             entree.action === 'modification' ? 'Modification' : 'Suppression'}
                          </span>
                          <span className="text-xs text-gray-500">{entree.date}</span>
                        </div>
                        <span className="text-xs text-gray-600">Par {entree.nomAdmin}</span>
                      </div>
                      
                      {entree.action !== 'suppression' && (
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-600">Ancienne valeur:</span>
                            <span className="ml-1 font-medium">{entree.ancienneValeur} documents</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Nouvelle valeur:</span>
                            <span className="ml-1 font-medium">{entree.nouvelleValeur} documents</span>
                          </div>
                        </div>
                      )}
                      
                      {entree.commentaire && (
                        <p className="text-xs text-gray-600 mt-2 italic">
                          "{entree.commentaire}"
                        </p>
                      )}
                    </div>
                  ))}
                  
                  {obtenirHistoriqueClient(clientPourHistorique.id).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <History className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p>Aucun historique disponible pour ce client</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      );
}