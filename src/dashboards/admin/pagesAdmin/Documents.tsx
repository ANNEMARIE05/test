import { useState } from 'react';
import { 
  FileText, 
  Edit,
  Trash2,
  Search,
  Plus,
  Users,
  CheckSquare,
  Square,
  AlertCircle,
  X,
} from "lucide-react";

interface Document {
    id: string;
    nom: string;
    type: string;
    taille: string;
    dateUpload: string;
    statut: string;
    utilisateur: string;
    clientId?: string;
    clientName?: string;
  }

interface Client {
    id: string;
    nom: string;
    email: string;
    limiteMensuelle: number;
    documentsConsommes: number;
    documentsAttribues: number;
  }

export default function Documents() {
    const [searchDocuments, setSearchDocuments] = useState('');
    const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState('');
    const [showClientStats, setShowClientStats] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingDocument, setEditingDocument] = useState<Document | null>(null);
    const [deletingDocument, setDeletingDocument] = useState<Document | null>(null);
    const [documents, setDocuments] = useState<Document[]>([
        {
          id: '1',
          nom: 'facture_2024_001.pdf',
          type: 'PDF',
          taille: '2.3 MB',
          dateUpload: '2024-01-15',
          statut: 'Traité',
          utilisateur: 'Jean Dupont'
        },
        {
          id: '2',
          nom: 'contrat_entreprise.docx',
          type: 'DOCX',
          taille: '1.8 MB',
          dateUpload: '2024-01-14',
          statut: 'En cours',
          utilisateur: 'Marie Martin'
        },
        {
          id: '3',
          nom: 'rapport_trimestriel.pdf',
          type: 'PDF',
          taille: '5.2 MB',
          dateUpload: '2024-01-13',
          statut: 'Traité',
          utilisateur: 'Pierre Durand'
        },
        {
          id: '4',
          nom: 'presentation_vente.pptx',
          type: 'PPTX',
          taille: '8.7 MB',
          dateUpload: '2024-01-12',
          statut: 'Erreur',
          utilisateur: 'Sophie Bernard'
        },
        {
          id: '5',
          nom: 'devis_client_A.pdf',
          type: 'PDF',
          taille: '1.5 MB',
          dateUpload: '2024-01-11',
          statut: 'Non traité',
          utilisateur: 'Admin'
        },
        {
          id: '6',
          nom: 'contrat_location.docx',
          type: 'DOCX',
          taille: '2.1 MB',
          dateUpload: '2024-01-10',
          statut: 'Non traité',
          utilisateur: 'Admin'
        }
      ]);

    const [newDocument, setNewDocument] = useState({
        nom: '',
        type: '',
        taille: '',
        statut: 'Non traité',
        utilisateur: ''
    });

    const clients: Client[] = [
        {
            id: '1',
            nom: 'Entreprise ABC',
            email: 'contact@abc.com',
            limiteMensuelle: 1000,
            documentsConsommes: 450,
            documentsAttribues: 12
        },
        {
            id: '2',
            nom: 'Société XYZ',
            email: 'info@xyz.com',
            limiteMensuelle: 500,
            documentsConsommes: 320,
            documentsAttribues: 8
        },
        {
            id: '3',
            nom: 'Startup Innov',
            email: 'hello@innov.com',
            limiteMensuelle: 200,
            documentsConsommes: 180,
            documentsAttribues: 5
        }
    ];

    const filteredDocuments = documents.filter(doc =>
        doc.nom.toLowerCase().includes(searchDocuments.toLowerCase()) ||
        doc.utilisateur.toLowerCase().includes(searchDocuments.toLowerCase()) ||
        doc.statut.toLowerCase().includes(searchDocuments.toLowerCase())
    );

    const handleSelectDocument = (documentId: string) => {
        setSelectedDocuments(prev => 
            prev.includes(documentId) 
                ? prev.filter(id => id !== documentId)
                : [...prev, documentId]
        );
    };

    const handleSelectAll = () => {
        if (selectedDocuments.length === filteredDocuments.length) {
            setSelectedDocuments([]);
        } else {
            setSelectedDocuments(filteredDocuments.map(doc => doc.id));
        }
    };

    const handleAssignToClient = () => {
        if (selectedClient && selectedDocuments.length > 0) {
            // Ici, vous ajouteriez la logique pour assigner les documents au client
            console.log(`Assigning documents ${selectedDocuments} to client ${selectedClient}`);
            setShowAssignModal(false);
            setSelectedDocuments([]);
            setSelectedClient('');
        }
    };

    const assignDocumentsToClient = (clientId: string, documentIds: string[]) => {
        // Trouver le client sélectionné
        const client = clients.find(c => c.id === clientId);
        if (!client) {
            alert('Client non trouvé');
            return;
        }

        // Vérifier si le client a assez de documents restants
        const documentsRestants = client.limiteMensuelle - client.documentsConsommes;
        if (documentIds.length > documentsRestants) {
            alert(`Le client ${client.nom} n'a que ${documentsRestants} documents restants. Impossible d'assigner ${documentIds.length} documents.`);
            return;
        }

        // Mettre à jour les documents avec le client assigné
        const updatedDocuments = documents.map(doc => {
            if (documentIds.includes(doc.id)) {
                return {
                    ...doc,
                    clientId: clientId,
                    clientName: client.nom
                };
            }
            return doc;
        });

        setDocuments(updatedDocuments);

        // Mettre à jour les statistiques du client
        const updatedClients = clients.map(c => {
            if (c.id === clientId) {
                return {
                    ...c,
                    documentsAttribues: c.documentsAttribues + documentIds.length
                };
            }
            return c;
        });

        // Ici, vous feriez un appel API pour sauvegarder les changements
        console.log('Documents assignés:', updatedDocuments);
        console.log('Clients mis à jour:', updatedClients);

        // Afficher un message de confirmation
        alert(`${documentIds.length} document(s) assigné(s) avec succès au client ${client.nom}`);

        // Fermer le modal et réinitialiser les sélections
        setShowAssignModal(false);
        setSelectedDocuments([]);
        setSelectedClient('');
    };

    const handleAddDocument = () => {
        if (newDocument.nom && newDocument.type && newDocument.taille && newDocument.utilisateur) {
            const newDoc: Document = {
                id: Date.now().toString(),
                nom: newDocument.nom,
                type: newDocument.type,
                taille: newDocument.taille,
                dateUpload: new Date().toISOString().split('T')[0],
                statut: newDocument.statut,
                utilisateur: newDocument.utilisateur
            };

            setDocuments(prev => [...prev, newDoc]);
            setNewDocument({
                nom: '',
                type: '',
                taille: '',
                statut: 'Non traité',
                utilisateur: ''
            });
            setShowAddModal(false);
        }
    };

    const handleEditDocument = () => {
        if (editingDocument && editingDocument.nom && editingDocument.type && editingDocument.taille && editingDocument.utilisateur) {
            setDocuments(prev => prev.map(doc => 
                doc.id === editingDocument.id ? editingDocument : doc
            ));
            setEditingDocument(null);
            setShowEditModal(false);
        }
    };

    const handleDeleteDocument = () => {
        if (deletingDocument) {
            setDocuments(prev => prev.filter(doc => doc.id !== deletingDocument.id));
            setDeletingDocument(null);
            setShowDeleteModal(false);
        }
    };

    const openEditModal = (document: Document) => {
        setEditingDocument({ ...document });
        setShowEditModal(true);
    };

    const openDeleteModal = (document: Document) => {
        setDeletingDocument(document);
        setShowDeleteModal(true);
    };

    const getStatusCounts = () => {
        const counts = { nonTraite: 0, enCours: 0, termine: 0, erreur: 0 };
        documents.forEach(doc => {
            switch(doc.statut) {
                case 'Non traité': counts.nonTraite++; break;
                case 'En cours': counts.enCours++; break;
                case 'Traité': counts.termine++; break;
                case 'Erreur': counts.erreur++; break;
            }
        });
        return counts;
    };

    const statusCounts = getStatusCounts();

    return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestion documents</h2>
              <p className="text-gray-600">Gérez les documents traités par l'OCR</p>
            </div>
            <div className="flex items-center space-x-2">
              {selectedDocuments.length > 0 && (
                <button 
                  onClick={() => setShowAssignModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span>Assigner ({selectedDocuments.length})</span>
                </button>
              )}
              <button 
                onClick={() => setShowClientStats(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Users className="w-4 h-4" />
                <span>Statistiques clients</span>
              </button>
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un document</span>
              </button>
            </div>
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Non traités</p>
                  <p className="text-2xl font-bold text-gray-900">{statusCounts.nonTraite}</p>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">En cours</p>
                  <p className="text-2xl font-bold text-yellow-600">{statusCounts.enCours}</p>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Terminés</p>
                  <p className="text-2xl font-bold text-green-600">{statusCounts.termine}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckSquare className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Erreurs</p>
                  <p className="text-2xl font-bold text-red-600">{statusCounts.erreur}</p>
                </div>
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher un document..."
              value={searchDocuments}
              onChange={(e) => setSearchDocuments(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Documents Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button 
                        onClick={handleSelectAll}
                        className="flex items-center"
                      >
                        {selectedDocuments.length === filteredDocuments.length ? (
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Square className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Taille
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date upload
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilisateur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client assigné
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => handleSelectDocument(doc.id)}
                          className="flex items-center"
                        >
                          {selectedDocuments.includes(doc.id) ? (
                            <CheckSquare className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{doc.nom}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {doc.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{doc.taille}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{doc.dateUpload}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          doc.statut === 'Traité' ? 'bg-green-100 text-green-800' :
                          doc.statut === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
                          doc.statut === 'Non traité' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {doc.statut}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{doc.utilisateur}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{doc.clientName || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50" title="Télécharger">
                            <FileText className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => openEditModal(doc)}
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50" 
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => openDeleteModal(doc)}
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
          </div>

          {/* Add Document Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Ajouter un document</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du document
                    </label>
                    <input
                      type="text"
                      value={newDocument.nom}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, nom: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ex: facture_2024_001.pdf"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={newDocument.type}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="PDF">PDF</option>
                      <option value="DOCX">DOCX</option>
                      <option value="PPTX">PPTX</option>
                      <option value="XLSX">XLSX</option>
                      <option value="JPG">JPG</option>
                      <option value="PNG">PNG</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taille
                    </label>
                    <input
                      type="text"
                      value={newDocument.taille}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, taille: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ex: 2.3 MB"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statut
                    </label>
                    <select
                      value={newDocument.statut}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, statut: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Non traité">Non traité</option>
                      <option value="En cours">En cours</option>
                      <option value="Traité">Traité</option>
                      <option value="Erreur">Erreur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Utilisateur
                    </label>
                    <input
                      type="text"
                      value={newDocument.utilisateur}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, utilisateur: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ex: Jean Dupont"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleAddDocument}
                    disabled={!newDocument.nom || !newDocument.type || !newDocument.taille || !newDocument.utilisateur}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Document Modal */}
          {showEditModal && editingDocument && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Modifier le document</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du document
                    </label>
                    <input
                      type="text"
                      value={editingDocument.nom}
                      onChange={(e) => setEditingDocument(prev => prev ? { ...prev, nom: e.target.value } : null)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={editingDocument.type}
                      onChange={(e) => setEditingDocument(prev => prev ? { ...prev, type: e.target.value } : null)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="PDF">PDF</option>
                      <option value="DOCX">DOCX</option>
                      <option value="PPTX">PPTX</option>
                      <option value="XLSX">XLSX</option>
                      <option value="JPG">JPG</option>
                      <option value="PNG">PNG</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taille
                    </label>
                    <input
                      type="text"
                      value={editingDocument.taille}
                      onChange={(e) => setEditingDocument(prev => prev ? { ...prev, taille: e.target.value } : null)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statut
                    </label>
                    <select
                      value={editingDocument.statut}
                      onChange={(e) => setEditingDocument(prev => prev ? { ...prev, statut: e.target.value } : null)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Non traité">Non traité</option>
                      <option value="En cours">En cours</option>
                      <option value="Traité">Traité</option>
                      <option value="Erreur">Erreur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Utilisateur
                    </label>
                    <input
                      type="text"
                      value={editingDocument.utilisateur}
                      onChange={(e) => setEditingDocument(prev => prev ? { ...prev, utilisateur: e.target.value } : null)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleEditDocument}
                    disabled={!editingDocument.nom || !editingDocument.type || !editingDocument.taille || !editingDocument.utilisateur}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Document Modal */}
          {showDeleteModal && deletingDocument && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Supprimer le document</h3>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600">
                    Êtes-vous sûr de vouloir supprimer le document <strong>"{deletingDocument.nom}"</strong> ?
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Cette action est irréversible.
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleDeleteDocument}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Assign Modal */}
          {showAssignModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Assigner des documents à un client</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sélectionner un client
                  </label>
                  <select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choisir un client...</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.nom} ({client.documentsConsommes}/{client.limiteMensuelle})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Documents sélectionnés: {selectedDocuments.length}
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => assignDocumentsToClient(selectedClient, selectedDocuments)}
                    disabled={!selectedClient}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Assigner
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Client Statistics Modal */}
          {showClientStats && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Statistiques des clients</h3>
                  <button
                    onClick={() => setShowClientStats(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-4">
                  {clients.map(client => (
                    <div key={client.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{client.nom}</h4>
                          <p className="text-sm text-gray-600">{client.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Limite mensuelle</p>
                          <p className="font-semibold text-gray-900">{client.limiteMensuelle} documents</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Consommés ce mois</p>
                          <p className="font-semibold text-blue-600">{client.documentsConsommes}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Attribués</p>
                          <p className="font-semibold text-green-600">{client.documentsAttribues}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Restants</p>
                          <p className="font-semibold text-gray-900">{client.limiteMensuelle - client.documentsConsommes}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(client.documentsConsommes / client.limiteMensuelle) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.round((client.documentsConsommes / client.limiteMensuelle) * 100)}% utilisé
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
}