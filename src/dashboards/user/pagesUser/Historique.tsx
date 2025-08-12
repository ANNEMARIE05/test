import { useState } from 'react';

interface Document {
  id: string;
  name: string;
  date: string;
  status: 'non traité' | 'en cours' | 'terminé';
  size: string;
  content?: string;
  extractedData?: {
    invoiceNumber?: string;
    amount?: string;
    date?: string;
    company?: string;
    items?: Array<{ description: string; quantity: number; price: number }>;
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
        invoiceNumber: 'FAC-2024-001',
        amount: '820,000 FCFA',
        date: '15/01/2024',
        company: 'Tech Solutions SARL',
        items: [
          { description: 'Consultation développement web', quantity: 10, price: 82000 },
          { description: 'Maintenance serveur', quantity: 1, price: 328000 }
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
        invoiceNumber: 'CON-2024-002',
        amount: '3,280,000 FCFA',
        date: '14/01/2024',
        company: 'Innovation Corp'
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
        invoiceNumber: 'DEV-2024-003',
        amount: '5,740,000 FCFA',
        date: '12/01/2024',
        company: 'WebDesign Pro'
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
        invoiceNumber: 'BC-2024-004',
        amount: '1,508,000 FCFA',
        date: '11/01/2024',
        company: 'Office Supplies Ltd'
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
    if (!editedData?.items) return;
    
    const updatedItems = [...editedData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === 'quantity' || field === 'price' ? Number(value) : value
    };
    
    setEditedData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const addItem = () => {
    const newItem = { description: '', quantity: 1, price: 0 };
    setEditedData(prev => ({
      ...prev,
      items: [...(prev?.items || []), newItem]
    }));
  };

  const removeItem = (index: number) => {
    if (!editedData?.items) return;
    
    const updatedItems = editedData.items.filter((_, i) => i !== index);
    setEditedData(prev => ({
      ...prev,
      items: updatedItems
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
        return '✓';
      case 'en cours':
        return '⏳';
      case 'non traité':
        return '⏸';
      default:
        return '•';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Historique</h2>
        <p className="text-gray-600">Consultez l'historique de vos traitements OCR</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-2 sm:space-y-0">
          <h3 className="text-lg font-semibold text-gray-900">Documents traités</h3>
          <div className="flex space-x-2">
            <span className="text-sm text-gray-500">Total: {documents.length} documents</span>
          </div>
        </div>

        {/* Mobile view - Cards */}
        <div className="block sm:hidden space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-blue-600 text-xs font-medium">PDF</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-900 truncate">{doc.name}</div>
                    <div className="text-xs text-gray-500">ID: {doc.id}</div>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)} ml-2 flex-shrink-0`}>
                  <span className="mr-1">{getStatusIcon(doc.status)}</span>
                  {doc.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex space-x-4">
                  <span><span className="font-medium">Date:</span> {new Date(doc.date).toLocaleDateString('fr-FR')}</span>
                  <span><span className="font-medium">Taille:</span> {doc.size}</span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="text-blue-600 hover:text-blue-900 text-sm"
                    onClick={() => handleViewDocument(doc)}
                  >
                    Voir
                  </button>
                  {doc.status === 'terminé' && (
                    <button className="text-green-600 hover:text-green-900 text-sm">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Taille
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 text-sm font-medium">PDF</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                        <div className="text-sm text-gray-500">ID: {doc.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(doc.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doc.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      <span className="mr-1">{getStatusIcon(doc.status)}</span>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900 text-sm"
                        onClick={() => handleViewDocument(doc)}
                      >
                        Voir
                      </button>
                      {doc.status === 'terminé' && (
                        <button className="text-green-600 hover:text-green-900 text-sm">
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
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document</h3>
            <p className="text-gray-500">Vous n'avez pas encore traité de documents OCR.</p>
          </div>
        )}
      </div>

      {/* Modal pour afficher les détails du document */}
      {showModal && selectedDocument && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-4 sm:top-20 mx-auto p-4 sm:p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-2 sm:space-y-0">
                <h3 className="text-lg font-semibold text-gray-900">
                  Détails du document
                </h3>
                <div className="flex items-center space-x-2">
                  {selectedDocument.status === 'terminé' && !isEditMode && (
                    <button
                      onClick={handleEdit}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Modifier
                    </button>
                  )}
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Document Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* File Preview */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Aperçu du fichier</h4>
                  <div className="bg-white border rounded-lg p-3 sm:p-4 min-h-[200px] sm:min-h-[300px]">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-blue-600 text-sm sm:text-lg font-medium">PDF</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 truncate">{selectedDocument.name}</div>
                        <div className="text-sm text-gray-500">{selectedDocument.size}</div>
                      </div>
                    </div>
                    {isEditMode ? (
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full h-48 sm:h-64 p-3 border border-gray-300 rounded-md text-sm text-gray-700 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Contenu du document..."
                      />
                    ) : (
                      <div className="text-sm text-gray-700 leading-relaxed max-h-48 sm:max-h-64 overflow-y-auto">
                        {selectedDocument.content || "Aperçu non disponible pour ce document..."}
                      </div>
                    )}
                  </div>
                </div>

                {/* Extracted Data */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Données extraites</h4>
                  {selectedDocument.extractedData || isEditMode ? (
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-3 sm:p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Numéro:</span>
                            {isEditMode ? (
                              <input
                                type="text"
                                value={editedData?.invoiceNumber || ''}
                                onChange={(e) => handleDataChange('invoiceNumber', e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="text-gray-900 break-words">{selectedDocument.extractedData?.invoiceNumber}</p>
                            )}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Montant:</span>
                            {isEditMode ? (
                              <input
                                type="text"
                                value={editedData?.amount || ''}
                                onChange={(e) => handleDataChange('amount', e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="text-gray-900 break-words">{selectedDocument.extractedData?.amount}</p>
                            )}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Date:</span>
                            {isEditMode ? (
                              <input
                                type="text"
                                value={editedData?.date || ''}
                                onChange={(e) => handleDataChange('date', e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="text-gray-900 break-words">{selectedDocument.extractedData?.date}</p>
                            )}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Entreprise:</span>
                            {isEditMode ? (
                              <input
                                type="text"
                                value={editedData?.company || ''}
                                onChange={(e) => handleDataChange('company', e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="text-gray-900 break-words">{selectedDocument.extractedData?.company}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {(selectedDocument.extractedData?.items || isEditMode) && (
                        <div className="bg-white rounded-lg p-3 sm:p-4">
                          <div className="flex justify-between items-center mb-3">
                            <h5 className="font-medium text-gray-700">Articles</h5>
                            {isEditMode && (
                              <button
                                onClick={addItem}
                                className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                              >
                                + Ajouter
                              </button>
                            )}
                          </div>
                          <div className="space-y-2">
                            {(isEditMode ? editedData?.items : selectedDocument.extractedData?.items)?.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm border-b pb-2">
                                {isEditMode ? (
                                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    <input
                                      type="text"
                                      value={item.description}
                                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                      className="p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="Description"
                                    />
                                    <input
                                      type="number"
                                      value={item.quantity}
                                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                      className="p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="Qté"
                                    />
                                    <div className="flex items-center space-x-1">
                                      <input
                                        type="number"
                                        step="0.01"
                                        value={item.price}
                                        onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                        className="p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Prix"
                                      />
                                      <button
                                        onClick={() => removeItem(index)}
                                        className="px-1 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <span className="text-gray-900 break-words flex-1 mr-2">{item.description}</span>
                                    <span className="text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                                      {item.quantity} × {item.price.toLocaleString()} FCFA
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
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-gray-400 text-4xl mb-2">📄</div>
                      <p className="text-gray-500 text-sm">
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
              <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6 pt-4 border-t">
                {isEditMode ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleSave}
                      className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Enregistrer
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={closeModal}
                      className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Fermer
                    </button>
                    {selectedDocument.status === 'terminé' && (
                      <button className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
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