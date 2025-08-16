import { useState } from 'react';
import { CheckCircle, Clock, Pause, FileText, Download, Edit, X, Plus } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  date: string;
  status: 'non traité' | 'en cours' | 'terminé';
  size: string;
  content?: string;
  extractedData?: {
    numeroFacture?: string;
    montant?: string;
    dateFacture?: string;
    entreprise?: string;
    articles?: Array<{ description: string; quantite: number; prix: number }>;
  };
}

export default function Historique() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'facture_2024_001.pdf',
      date: '2024-01-15',
      status: 'terminé',
      size: '2.3 MB',
      content: 'Facture pour services de consultation informatique...',
      extractedData: {
        numeroFacture: 'FAC-2024-001',
        montant: '820,000 FCFA',
        dateFacture: '15/01/2024',
        entreprise: 'Tech Solutions SARL',
        articles: [
          { description: 'Consultation développement web', quantite: 10, prix: 82000 },
          { description: 'Maintenance serveur', quantite: 1, prix: 328000 }
        ]
      }
    },
    {
      id: '2',
      name: 'contrat_entreprise.pdf',
      date: '2024-01-14',
      status: 'en cours',
      size: '1.8 MB',
      content: 'Contrat de prestation de services...',
      extractedData: {
        numeroFacture: 'CON-2024-002',
        montant: '3,280,000 FCFA',
        dateFacture: '14/01/2024',
        entreprise: 'Innovation Corp'
      }
    },
    {
      id: '3',
      name: 'rapport_trimestriel.pdf',
      date: '2024-01-13',
      status: 'non traité',
      size: '4.1 MB'
    },
    {
      id: '4',
      name: 'devis_projet.pdf',
      date: '2024-01-12',
      status: 'terminé',
      size: '0.9 MB',
      content: 'Devis pour projet de refonte site web...',
      extractedData: {
        numeroFacture: 'DEV-2024-003',
        montant: '5,740,000 FCFA',
        dateFacture: '12/01/2024',
        entreprise: 'WebDesign Pro'
      }
    },
    {
      id: '5',
      name: 'bon_commande.pdf',
      date: '2024-01-11',
      status: 'en cours',
      size: '3.2 MB',
      content: 'Bon de commande pour équipements...',
      extractedData: {
        numeroFacture: 'BC-2024-004',
        montant: '1,508,000 FCFA',
        dateFacture: '11/01/2024',
        entreprise: 'Office Supplies Ltd'
      }
    }
  ]);

  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editedData, setEditedData] = useState<Document['extractedData']>({});

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setEditedContent(document.content || '');
    setEditedData(document.extractedData || {});
    setIsEditMode(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDocument(null);
    setIsEditMode(false);
    setEditedContent('');
    setEditedData({});
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    if (selectedDocument) {
      const updatedDocuments = documents.map(doc => 
        doc.id === selectedDocument.id 
          ? {
              ...doc,
              content: editedContent,
              extractedData: editedData
            }
          : doc
      );
      setDocuments(updatedDocuments);
      setSelectedDocument({
        ...selectedDocument,
        content: editedContent,
        extractedData: editedData
      });
      setIsEditMode(false);
    }
  };

  const handleCancel = () => {
    if (selectedDocument) {
      setEditedContent(selectedDocument.content || '');
      setEditedData(selectedDocument.extractedData || {});
    }
    setIsEditMode(false);
  };

  const handleDataChange = (field: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    if (!editedData?.articles) return;
    
    const updatedItems = [...editedData.articles];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === 'quantite' || field === 'prix' ? Number(value) : value
    };
    
    setEditedData(prev => ({
      ...prev,
      articles: updatedItems
    }));
  };

  const addItem = () => {
    const newItem = { description: '', quantite: 1, prix: 0 };
    setEditedData(prev => ({
      ...prev,
      articles: [...(prev?.articles || []), newItem]
    }));
  };

  const removeItem = (index: number) => {
    if (!editedData?.articles) return;
    
    const updatedItems = editedData.articles.filter((_, i) => i !== index);
    setEditedData(prev => ({
      ...prev,
      articles: updatedItems
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'terminé':
        return 'bg-green-100 text-green-800';
      case 'en cours':
        return 'bg-yellow-100 text-yellow-800';
      case 'non traité':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'terminé':
        return <CheckCircle className="w-3 h-3" />;
      case 'en cours':
        return <Clock className="w-3 h-3" />;
      case 'non traité':
        return <Pause className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-2 sm:space-y-4">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Historique</h2>
        <p className="text-xs sm:text-sm text-gray-600">Consultez l'historique de vos traitements OCR</p>
      </div>
      
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-4 space-y-1 sm:space-y-0">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900">Documents traités</h3>
          <div className="flex space-x-2">
            <span className="text-xs text-gray-500">Total: {documents.length} documents</span>
          </div>
        </div>

        {/* Mobile view - Cards */}
        <div className="block sm:hidden space-y-2">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-gray-50 rounded-md p-2.5 border border-gray-200">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="h-5 w-5 rounded bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                    <FileText className="w-3 h-3 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-gray-900 truncate">{doc.name}</div>
                    <div className="text-xs text-gray-500">ID: {doc.id}</div>
                  </div>
                </div>
                <span className={`inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)} ml-1.5 flex-shrink-0`}>
                  <span className="mr-0.5">{getStatusIcon(doc.status)}</span>
                  {doc.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex space-x-2">
                  <span><span className="font-medium">Date:</span> {new Date(doc.date).toLocaleDateString('fr-FR')}</span>
                  <span><span className="font-medium">Taille:</span> {doc.size}</span>
                </div>
                <div className="flex space-x-1.5">
                  <button 
                    className="text-blue-600 hover:text-blue-900 text-xs px-1 py-0.5 rounded hover:bg-blue-50"
                    onClick={() => handleViewDocument(doc)}
                  >
                    Voir
                  </button>
                  {doc.status === 'terminé' && (
                    <button className="text-green-600 hover:text-green-900 text-xs px-1 py-0.5 rounded hover:bg-green-50 flex items-center">
                      <Download className="w-3 h-3 mr-1" />
                      Télécharger
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop view - Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Taille
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-6 w-6">
                        <div className="h-6 w-6 rounded bg-blue-100 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                        <div className="text-xs text-gray-500">ID: {doc.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {new Date(doc.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {doc.size}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      <span className="mr-1">{getStatusIcon(doc.status)}</span>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900 text-sm"
                        onClick={() => handleViewDocument(doc)}
                      >
                        Voir
                      </button>
                      {doc.status === 'terminé' && (
                        <button className="text-green-600 hover:text-green-900 text-sm flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          Télécharger
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {documents.length === 0 && (
          <div className="text-center py-6 sm:py-8">
            <div className="text-gray-400 text-3xl sm:text-4xl mb-2 sm:mb-3">📄</div>
            <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1">Aucun document</h3>
            <p className="text-xs sm:text-sm text-gray-500">Vous n'avez pas encore traité de documents OCR.</p>
          </div>
        )}
      </div>

      {/* Modal pour afficher les détails du document */}
      {showModal && selectedDocument && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-2 sm:top-20 mx-auto p-2 sm:p-4 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-2 sm:mt-3">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 space-y-1 sm:space-y-0">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                  Détails du document
                </h3>
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  {selectedDocument.status === 'terminé' && !isEditMode && (
                    <button
                      onClick={handleEdit}
                      className="px-1.5 sm:px-2 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Modifier
                    </button>
                  )}
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 text-lg font-bold"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Document Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
                {/* File Preview */}
                <div className="bg-gray-50 rounded-lg p-2 sm:p-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Aperçu du fichier</h4>
                  <div className="bg-white border rounded-lg p-2 sm:p-3 min-h-[120px] sm:min-h-[250px]">
                    <div className="flex items-center mb-2 sm:mb-3">
                      <div className="h-6 w-6 sm:h-10 sm:w-10 rounded bg-blue-100 flex items-center justify-center mr-2">
                        <FileText className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium text-gray-900 truncate">{selectedDocument.name}</div>
                        <div className="text-xs text-gray-500">{selectedDocument.size}</div>
                      </div>
                    </div>
                    {isEditMode ? (
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full h-24 sm:h-48 p-2 border border-gray-300 rounded-md text-xs text-gray-700 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Contenu du document..."
                      />
                    ) : (
                      <div className="text-xs text-gray-700 leading-relaxed max-h-24 sm:max-h-48 overflow-y-auto">
                        {selectedDocument.content || "Aperçu non disponible pour ce document..."}
                      </div>
                    )}
                  </div>
                </div>

                {/* Extracted Data */}
                <div className="bg-gray-50 rounded-lg p-2 sm:p-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Données extraites</h4>
                  {selectedDocument.extractedData || isEditMode ? (
                    <div className="space-y-2 sm:space-y-3">
                      <div className="bg-white rounded-lg p-2 sm:p-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3 text-xs">
                          <div>
                            <span className="font-medium text-gray-700">Numéro:</span>
                            {isEditMode ? (
                              <input
                                type="text"
                                value={editedData?.numeroFacture || ''}
                                onChange={(e) => handleDataChange('numeroFacture', e.target.value)}
                                className="w-full mt-1 p-1 border border-gray-300 rounded-md text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="text-gray-900 break-words">{selectedDocument.extractedData?.numeroFacture}</p>
                            )}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Montant:</span>
                            {isEditMode ? (
                              <input
                                type="text"
                                value={editedData?.montant || ''}
                                onChange={(e) => handleDataChange('montant', e.target.value)}
                                className="w-full mt-1 p-1 border border-gray-300 rounded-md text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="text-gray-900 break-words">{selectedDocument.extractedData?.montant}</p>
                            )}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Date:</span>
                            {isEditMode ? (
                              <input
                                type="text"
                                value={editedData?.dateFacture || ''}
                                onChange={(e) => handleDataChange('dateFacture', e.target.value)}
                                className="w-full mt-1 p-1 border border-gray-300 rounded-md text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="text-gray-900 break-words">{selectedDocument.extractedData?.dateFacture}</p>
                            )}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Entreprise:</span>
                            {isEditMode ? (
                              <input
                                type="text"
                                value={editedData?.entreprise || ''}
                                onChange={(e) => handleDataChange('entreprise', e.target.value)}
                                className="w-full mt-1 p-1 border border-gray-300 rounded-md text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="text-gray-900 break-words">{selectedDocument.extractedData?.entreprise}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {(selectedDocument.extractedData?.articles || isEditMode) && (
                        <div className="bg-white rounded-lg p-2 sm:p-3">
                          <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                            <h5 className="font-medium text-gray-700 text-xs">Articles</h5>
                            {isEditMode && (
                              <button
                                onClick={addItem}
                                className="px-1 py-0.5 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors flex items-center"
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                Ajouter
                              </button>
                            )}
                          </div>
                          <div className="space-y-1">
                            {(isEditMode ? editedData?.articles : selectedDocument.extractedData?.articles)?.map((item, index) => (
                              <div key={index} className="flex justify-between text-xs border-b pb-1">
                                {isEditMode ? (
                                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-1">
                                    <input
                                      type="text"
                                      value={item.description}
                                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                      className="p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="Description"
                                    />
                                    <input
                                      type="number"
                                      value={item.quantite}
                                      onChange={(e) => handleItemChange(index, 'quantite', e.target.value)}
                                      className="p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="Qté"
                                    />
                                    <div className="flex items-center space-x-1">
                                      <input
                                        type="number"
                                        step="0.01"
                                        value={item.prix}
                                        onChange={(e) => handleItemChange(index, 'prix', e.target.value)}
                                        className="p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Prix"
                                      />
                                      <button
                                        onClick={() => removeItem(index)}
                                        className="px-1 py-0.5 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <span className="text-gray-900 break-words flex-1 mr-2">{item.description}</span>
                                    <span className="text-gray-700 text-xs whitespace-nowrap">
                                      {item.quantite} × {item.prix.toLocaleString()} FCFA
                                    </span>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg p-2 sm:p-3 text-center">
                      <div className="text-gray-400 text-2xl sm:text-3xl mb-1">📄</div>
                      <p className="text-gray-500 text-xs">
                        {selectedDocument.status === 'non traité' 
                          ? "Document en attente de traitement OCR"
                          : "Données extraites non disponibles"
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row sm:justify-end space-y-1 sm:space-y-0 sm:space-x-2 mt-3 sm:mt-4 pt-2 sm:pt-3 border-t">
                {isEditMode ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="w-full sm:w-auto px-2.5 sm:px-3 py-1.5 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors text-xs sm:text-sm"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleSave}
                      className="w-full sm:w-auto px-2.5 sm:px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-xs sm:text-sm"
                    >
                      Enregistrer
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={closeModal}
                      className="w-full sm:w-auto px-2.5 sm:px-3 py-1.5 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors text-xs sm:text-sm"
                    >
                      Fermer
                    </button>
                    {selectedDocument.status === 'terminé' && (
                      <button className="w-full sm:w-auto px-2.5 sm:px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-xs sm:text-sm">
                        Télécharger
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}