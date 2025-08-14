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
  Upload,
  File,
  Eye,
  Save,
  RotateCcw,
  Download,
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
    ocrText?: string;
    originalUrl?: string;
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
    const [showProcessModal, setShowProcessModal] = useState(false);
    const [processingDocument, setProcessingDocument] = useState<Document | null>(null);
    const [editingDocument, setEditingDocument] = useState<Document | null>(null);
    const [deletingDocument, setDeletingDocument] = useState<Document | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [ocrText, setOcrText] = useState('');
    const [isEditingOcr, setIsEditingOcr] = useState(false);
    const [originalOcrText, setOriginalOcrText] = useState('');
    const [documents, setDocuments] = useState<Document[]>([
        {
          id: '1',
          nom: 'facture_2024_001.pdf',
          type: 'PDF',
          taille: '2.3 MB',
          dateUpload: '2024-01-15',
          statut: 'Traité',
          utilisateur: 'Jean Dupont',
          ocrText: 'FACTURE N° 2024-001\n\nEntreprise ABC\n123 Rue de la Paix\n75001 Paris\n\nDate: 15/01/2024\n\nDétails:\n- Service de consultation: 500€\n- Frais de dossier: 50€\n\nTotal: 550€\n\nConditions de paiement: 30 jours',
          originalUrl: '/documents/facture_2024_001.pdf'
        },
        {
          id: '2',
          nom: 'contrat_entreprise.docx',
          type: 'DOCX',
          taille: '1.8 MB',
          dateUpload: '2024-01-14',
          statut: 'En cours',
          utilisateur: 'Marie Martin',
          ocrText: 'CONTRAT DE PRESTATION DE SERVICES\n\nEntre les soussignés:\n\nLa société XYZ, représentée par M. Martin\nEt\nLa société ABC, représentée par M. Dupont\n\nIl a été convenu ce qui suit:\n\nArticle 1 - Objet\nLe présent contrat a pour objet la prestation de services de conseil.\n\nArticle 2 - Durée\nLe contrat est conclu pour une durée de 12 mois.',
          originalUrl: '/documents/contrat_entreprise.docx'
        },
        {
          id: '3',
          nom: 'rapport_trimestriel.pdf',
          type: 'PDF',
          taille: '5.2 MB',
          dateUpload: '2024-01-13',
          statut: 'Traité',
          utilisateur: 'Pierre Durand',
          ocrText: 'RAPPORT TRIMESTRIEL Q4 2023\n\nRésumé exécutif:\n- Chiffre d\'affaires: 2.5M€ (+15% vs Q3)\n- Marge brute: 45%\n- Nouveaux clients: 25\n- Satisfaction client: 4.2/5\n\nAnalyse détaillée:\n1. Performance commerciale\n2. Analyse des coûts\n3. Perspectives Q1 2024',
          originalUrl: '/documents/rapport_trimestriel.pdf'
        },
        {
          id: '4',
          nom: 'presentation_vente.pptx',
          type: 'PPTX',
          taille: '8.7 MB',
          dateUpload: '2024-01-12',
          statut: 'Erreur',
          utilisateur: 'Sophie Bernard',
          ocrText: 'PRÉSENTATION COMMERCIALE\n\nSlide 1: Introduction\n- Notre solution\n- Avantages concurrentiels\n\nSlide 2: Marché\n- Taille du marché: 50M€\n- Croissance: 12% par an\n\nSlide 3: Produit\n- Fonctionnalités principales\n- Cas d\'usage',
          originalUrl: '/documents/presentation_vente.pptx'
        },
        {
          id: '5',
          nom: 'devis_client_A.pdf',
          type: 'PDF',
          taille: '1.5 MB',
          dateUpload: '2024-01-11',
          statut: 'Non traité',
          utilisateur: 'Admin',
          ocrText: 'DEVIS N° DEV-2024-001\n\nClient: Entreprise A\nDate: 11/01/2024\n\nPrestations:\n1. Audit technique: 2000€\n2. Formation équipe: 1500€\n3. Support 6 mois: 3000€\n\nTotal HT: 6500€\nTVA (20%): 1300€\nTotal TTC: 7800€\n\nValidité: 30 jours',
          originalUrl: '/documents/devis_client_A.pdf'
        },
        {
          id: '6',
          nom: 'contrat_location.docx',
          type: 'DOCX',
          taille: '2.1 MB',
          dateUpload: '2024-01-10',
          statut: 'Non traité',
          utilisateur: 'Admin',
          ocrText: 'CONTRAT DE LOCATION\n\nBail commercial\n\nEntre:\nLe propriétaire: M. Durand\nEt\nLe locataire: Société ABC\n\nObjet: Location d\'un local commercial\nAdresse: 456 Avenue des Champs\nSurface: 150m²\nLoyer: 3000€/mois\nDurée: 3 ans\n\nConditions particulières:\n- Charges: 500€/mois\n- Dépôt de garantie: 6000€',
          originalUrl: '/documents/contrat_location.docx'
        }
      ]);

    const [newDocument, setNewDocument] = useState({
        nom: ''
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

    const handleFileUpload = (file: File) => {
        // Validation des types de fichiers autorisés
        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png'];
        
        if (!allowedTypes.includes(file.type)) {
            alert('Type de fichier non supporté. Veuillez sélectionner un fichier PDF, DOCX, PPTX, XLSX, JPG ou PNG.');
            return;
        }

        // Validation de la taille (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            alert('Le fichier est trop volumineux. La taille maximale autorisée est de 10MB.');
            return;
        }

        setUploadedFile(file);
        setNewDocument(prev => ({ ...prev, nom: file.name }));
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const simulateFileUpload = async () => {
        if (!uploadedFile) return;

        setIsUploading(true);
        setUploadProgress(0);

        // Simulation d'un upload progressif
        for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 100));
            setUploadProgress(i);
        }

        // Créer le nouveau document avec les informations du fichier
        const fileExtension = uploadedFile.name.split('.').pop()?.toUpperCase() || 'PDF';
        const fileSize = (uploadedFile.size / (1024 * 1024)).toFixed(1) + ' MB';

        const newDoc: Document = {
            id: Date.now().toString(),
            nom: uploadedFile.name,
            type: fileExtension,
            taille: fileSize,
            dateUpload: new Date().toISOString().split('T')[0],
            statut: 'Non traité',
            utilisateur: 'Admin'
        };

        setDocuments(prev => [...prev, newDoc]);
        setUploadedFile(null);
        setNewDocument({ nom: '' });
        setUploadProgress(0);
        setIsUploading(false);
        setShowAddModal(false);
    };

    const handleAddDocument = () => {
        if (uploadedFile) {
            simulateFileUpload();
        } else if (newDocument.nom) {
            const newDoc: Document = {
                id: Date.now().toString(),
                nom: newDocument.nom,
                type: 'PDF', // Default type
                taille: '1.0 MB', // Default size
                dateUpload: new Date().toISOString().split('T')[0],
                statut: 'Non traité',
                utilisateur: 'Admin' // Default user
            };

            setDocuments(prev => [newDoc, ...prev]);
            setNewDocument({
                nom: ''
            });
            setShowAddModal(false);
        }
    };

    const handleEditDocument = () => {
        if (editingDocument && editingDocument.nom) {
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

    const openProcessModal = (document: Document) => {
        setProcessingDocument(document);
        setOcrText(document.ocrText || '');
        setOriginalOcrText(document.ocrText || '');
        setIsEditingOcr(false);
        setShowProcessModal(true);
    };

    const handleSaveOcrText = () => {
        if (processingDocument) {
            setDocuments(prev => prev.map(doc => 
                doc.id === processingDocument.id 
                    ? { ...doc, ocrText: ocrText, statut: 'Traité' }
                    : doc
            ));
            setIsEditingOcr(false);
            setOriginalOcrText(ocrText);
        }
    };

    const handleResetOcrText = () => {
        setOcrText(originalOcrText);
        setIsEditingOcr(false);
    };

    const handleCancelEdit = () => {
        setOcrText(originalOcrText);
        setIsEditingOcr(false);
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
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Gestion documents</h2>
              <p className="text-xs sm:text-sm text-gray-600">Gérez les documents traités par l'OCR</p>
            </div>
            <div className="flex flex-wrap items-center gap-1 sm:space-x-2">
              {selectedDocuments.length > 0 && (
                <button 
                  onClick={() => setShowAssignModal(true)}
                  className="flex items-center space-x-1 px-2 sm:px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm"
                >
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Assigner ({selectedDocuments.length})</span>
                </button>
              )}
              <button 
                onClick={() => setShowClientStats(true)}
                className="flex items-center space-x-1 px-2 sm:px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs sm:text-sm"
              >
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Statistiques clients</span>
              </button>
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-1 px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Ajouter un document</span>
              </button>
            </div>
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <div className="bg-white p-2 sm:p-3 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Non traités</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900">{statusCounts.nonTraite}</p>
                </div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-2 sm:p-3 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">En cours</p>
                  <p className="text-lg sm:text-xl font-bold text-yellow-600">{statusCounts.enCours}</p>
                </div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-2 sm:p-3 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Terminés</p>
                  <p className="text-lg sm:text-xl font-bold text-green-600">{statusCounts.termine}</p>
                </div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckSquare className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-2 sm:p-3 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Erreurs</p>
                  <p className="text-lg sm:text-xl font-bold text-red-600">{statusCounts.erreur}</p>
                </div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
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
              className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Documents Table - Mobile Responsive */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date upload
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client assigné
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
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
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{doc.nom}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{doc.dateUpload}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          doc.statut === 'Traité' ? 'bg-green-100 text-green-800' :
                          doc.statut === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
                          doc.statut === 'Non traité' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {doc.statut}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{doc.clientName || '-'}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button 
                            onClick={() => openProcessModal(doc)}
                            className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50" 
                            title="Traiter/Visualiser"
                          >
                            <Eye className="w-4 h-4" />
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
                          <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50" title="Télécharger">
                            <Download className="w-4 h-4" />
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
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="border-b border-gray-200 p-3 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2 flex-1">
                      <button 
                        onClick={() => handleSelectDocument(doc.id)}
                        className="flex-shrink-0"
                      >
                        {selectedDocuments.includes(doc.id) ? (
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Square className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{doc.nom}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{doc.dateUpload}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => openProcessModal(doc)}
                        className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50" 
                        title="Traiter/Visualiser"
                      >
                        <Eye className="w-4 h-4" />
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
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      doc.statut === 'Traité' ? 'bg-green-100 text-green-800' :
                      doc.statut === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
                      doc.statut === 'Non traité' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {doc.statut}
                    </span>
                    <div className="text-xs text-gray-500">
                      {doc.clientName || 'Aucun client'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Document Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-lg font-semibold">Ajouter un document</h3>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setUploadedFile(null);
                      setNewDocument({ nom: '' });
                      setIsDragOver(false);
                      setUploadProgress(0);
                      setIsUploading(false);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Zone de drag & drop */}
                <div className="space-y-3">
                  <div
                    className={`border-2 border-dashed rounded-lg p-3 sm:p-4 text-center transition-colors ${
                      isDragOver 
                        ? 'border-blue-500 bg-blue-50' 
                        : uploadedFile 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {uploadedFile ? (
                      <div className="space-y-1 sm:space-y-2">
                        <File className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-green-600" />
                        <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB
                        </p>
                        <button
                          onClick={() => {
                            setUploadedFile(null);
                            setNewDocument({ nom: '' });
                          }}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          Supprimer
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1 sm:space-y-2">
                        <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Glissez-déposez votre fichier ici ou
                        </p>
                        <label className="cursor-pointer">
                          <span className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            cliquez pour sélectionner
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.docx,.pptx,.xlsx,.jpg,.jpeg,.png"
                            onChange={handleFileInputChange}
                          />
                        </label>
                        <p className="text-xs text-gray-500">
                          PDF, DOCX, PPTX, XLSX, JPG, PNG (max 10MB)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Barre de progression */}
                  {isUploading && (
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Upload en cours...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setUploadedFile(null);
                      setNewDocument({ nom: '' });
                      setIsDragOver(false);
                      setUploadProgress(0);
                      setIsUploading(false);
                    }}
                    className="px-3 sm:px-4 py-1.5 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleAddDocument}
                    disabled={(!uploadedFile && !newDocument.nom) || isUploading}
                    className="px-3 sm:px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isUploading ? 'Upload...' : 'Ajouter'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Document Modal */}
          {showEditModal && editingDocument && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-lg font-semibold">Modifier le document</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                  {/* Informations du document */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Informations du document</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom du document
                        </label>
                        <input
                          type="text"
                          value={editingDocument.nom}
                          onChange={(e) => setEditingDocument(prev => prev ? { ...prev, nom: e.target.value } : null)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type
                        </label>
                        <input
                          type="text"
                          value={editingDocument.type}
                          disabled
                          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Taille
                        </label>
                        <input
                          type="text"
                          value={editingDocument.taille}
                          disabled
                          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Statut
                        </label>
                        <input
                          type="text"
                          value={editingDocument.statut}
                          disabled
                          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Client assigné
                        </label>
                        <select
                          value={editingDocument.clientId || ''}
                          onChange={(e) => setEditingDocument(prev => prev ? { 
                            ...prev, 
                            clientId: e.target.value,
                            clientName: e.target.value ? clients.find(c => c.id === e.target.value)?.nom || '' : ''
                          } : null)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="">Aucun client assigné</option>
                          {clients.map(client => (
                            <option key={client.id} value={client.id}>
                              {client.nom}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Contenu du document */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Contenu du document</h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Texte extrait par OCR
                      </label>
                      <textarea
                        value={editingDocument.ocrText || ''}
                        onChange={(e) => setEditingDocument(prev => prev ? { ...prev, ocrText: e.target.value } : null)}
                        className="w-full h-[200px] sm:h-[250px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
                        placeholder="Modifiez le contenu du document..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-3 sm:px-4 py-1.5 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleEditDocument}
                    disabled={!editingDocument.nom}
                    className="px-3 sm:px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Document Modal */}
          {showDeleteModal && deletingDocument && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 w-full max-w-md">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-lg font-semibold">Supprimer le document</h3>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <div className="mb-3">
                  <p className="text-gray-600 text-sm">
                    Êtes-vous sûr de vouloir supprimer le document <strong>"{deletingDocument.nom}"</strong> ?
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Cette action est irréversible.
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-3 sm:px-4 py-1.5 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleDeleteDocument}
                    className="px-3 sm:px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Assign Modal */}
          {showAssignModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 w-full max-w-md">
                <h3 className="text-base sm:text-lg font-semibold mb-3">Assigner des documents à un client</h3>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sélectionner un client
                  </label>
                  <select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Choisir un client...</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.nom} ({client.documentsConsommes}/{client.limiteMensuelle})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <p className="text-sm text-gray-600">
                    Documents sélectionnés: {selectedDocuments.length}
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="px-3 sm:px-4 py-1.5 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => assignDocumentsToClient(selectedClient, selectedDocuments)}
                    disabled={!selectedClient}
                    className="px-3 sm:px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Assigner
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Client Statistics Modal */}
          {showClientStats && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-lg font-semibold">Statistiques des clients</h3>
                  <button
                    onClick={() => setShowClientStats(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {clients.map(client => (
                    <div key={client.id} className="border border-gray-200 rounded-lg p-2 sm:p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{client.nom}</h4>
                          <p className="text-xs text-gray-600">{client.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600">Limite mensuelle</p>
                          <p className="font-semibold text-gray-900 text-sm">{client.limiteMensuelle} documents</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        <div>
                          <p className="text-xs text-gray-600">Consommés ce mois</p>
                          <p className="font-semibold text-blue-600 text-sm">{client.documentsConsommes}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Attribués</p>
                          <p className="font-semibold text-green-600 text-sm">{client.documentsAttribues}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Restants</p>
                          <p className="font-semibold text-gray-900 text-sm">{client.limiteMensuelle - client.documentsConsommes}</p>
                        </div>
                      </div>
                      <div className="mt-2">
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

          {/* Process Document Modal */}
          {showProcessModal && processingDocument && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-lg font-semibold">Traitement du document: {processingDocument.nom}</h3>
                  <button
                    onClick={() => setShowProcessModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                  {/* Document Original */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center text-sm sm:text-base">
                      <File className="w-4 h-4 mr-2" />
                      Document original
                    </h4>
                    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-600 mb-1 text-sm">Aperçu du document</p>
                        <p className="text-xs text-gray-500">{processingDocument.nom}</p>
                        <p className="text-xs text-gray-500">{processingDocument.taille}</p>
                        <button className="mt-3 px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-sm">
                          Télécharger l'original
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Texte OCR */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-gray-900 flex items-center text-sm sm:text-base">
                        <FileText className="w-4 h-4 mr-2" />
                        Texte extrait par OCR
                      </h4>
                      <div className="flex items-center space-x-1">
                        {isEditingOcr ? (
                          <>
                            <button
                              onClick={handleSaveOcrText}
                              className="flex items-center space-x-1 px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                            >
                              <Save className="w-3 h-3" />
                              <span>Sauvegarder</span>
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="flex items-center space-x-1 px-2 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700"
                            >
                              <X className="w-3 h-3" />
                              <span>Annuler</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => setIsEditingOcr(true)}
                              className="flex items-center space-x-1 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                            >
                              <Edit className="w-3 h-3" />
                              <span>Modifier</span>
                            </button>
                            <button
                              onClick={handleResetOcrText}
                              className="flex items-center space-x-1 px-2 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Réinitialiser</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {isEditingOcr ? (
                      <textarea
                        value={ocrText}
                        onChange={(e) => setOcrText(e.target.value)}
                        className="w-full h-[250px] sm:h-[300px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
                        placeholder="Modifiez le texte extrait par OCR..."
                      />
                    ) : (
                      <div className="border border-gray-200 rounded-lg p-3 bg-white min-h-[250px] sm:min-h-[300px] overflow-y-auto">
                        <pre className="whitespace-pre-wrap font-mono text-sm text-gray-900">
                          {ocrText || 'Aucun texte extrait disponible'}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>

                {/* Informations du document */}
                <div className="mt-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-2 text-sm">Informations du document</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-xs">
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <span className="ml-1 font-medium">{processingDocument.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Taille:</span>
                      <span className="ml-1 font-medium">{processingDocument.taille}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Date d'upload:</span>
                      <span className="ml-1 font-medium">{processingDocument.dateUpload}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Statut:</span>
                      <span className={`ml-1 font-medium px-1.5 py-0.5 rounded-full text-xs ${
                        processingDocument.statut === 'Traité' ? 'bg-green-100 text-green-800' :
                        processingDocument.statut === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
                        processingDocument.statut === 'Non traité' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {processingDocument.statut}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => setShowProcessModal(false)}
                    className="px-3 sm:px-4 py-1.5 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Fermer
                  </button>
                  {isEditingOcr && (
                    <button
                      onClick={handleSaveOcrText}
                      className="px-3 sm:px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                    >
                      Sauvegarder les modifications
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      );
}