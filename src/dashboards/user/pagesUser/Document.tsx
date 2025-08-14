import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ProcessedDocument {
    name: string;
    type: string;
    content: string;
    processedAt: Date;
    id: string; // Ajout d'un ID unique pour identifier les documents
}

export default function Document() {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [processedDocuments, setProcessedDocuments] = useState<ProcessedDocument[]>([]);
    const [editingDocumentId, setEditingDocumentId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState('');

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setUploadedFiles(prev => [...prev, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff'],
            'text/plain': ['.txt'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        multiple: true
    });

    const handleUpload = async () => {
        if (uploadedFiles.length === 0) return;

        setUploading(true);
        setUploadProgress(0);

        try {
            // Simuler l'upload avec progression
            for (let i = 0; i <= 100; i += 10) {
                await new Promise(resolve => setTimeout(resolve, 100));
                setUploadProgress(i);
            }

            // Simuler le traitement OCR et l'extraction des informations
            const newProcessedDocuments: ProcessedDocument[] = uploadedFiles.map(file => {
                // Simuler le contenu extrait selon le type de document
                let extractedContent = '';
                const fileType = file.type || 'unknown';
                
                if (fileType.includes('pdf')) {
                    extractedContent = `Document PDF traité: ${file.name}\n\nContenu extrait:\n- Titre: Rapport trimestriel\n- Date: 15/12/2024\n- Pages: 12\n- Auteur: Jean Dupont\n- Résumé: Ce document contient les résultats financiers du dernier trimestre avec une analyse détaillée des performances.\n- Sections principales: Introduction, Méthodologie, Résultats, Discussion, Conclusion\n- Mots-clés: finance, trimestre, performance, analyse, rapport\n- Version: 1.0\n- Statut: Finalisé\n- Destinataires: Direction générale, Comité de direction\n- Confidentialité: Interne`;
                } else if (fileType.includes('image')) {
                    extractedContent = `Image traitée: ${file.name}\n\nInformations extraites:\n- Type: Facture\n- Numéro: FAC-2024-001\n- Date: 10/12/2024\n- Montant: 1,250.00 €\n- Fournisseur: TechCorp Solutions\n- Description: Services de maintenance informatique\n- TVA: 20% (208.33 €)\n- Montant HT: 1,041.67 €\n- Conditions de paiement: 30 jours\n- Référence client: CL-2024-789\n- Adresse de facturation: 123 Rue de la Paix, 75001 Paris\n- Contact: contact@techcorp.fr\n- Téléphone: 01 23 45 67 89\n- SIRET: 12345678901234\n- IBAN: FR76 1234 5678 9012 3456 7890 123`;
                } else if (fileType.includes('word') || fileType.includes('document')) {
                    extractedContent = `Document Word traité: ${file.name}\n\nContenu extrait:\n- Titre: Plan stratégique 2025\n- Version: 2.1\n- Créé le: 20/11/2024\n- Modifié le: 15/12/2024\n- Auteur: Marie Martin\n- Sections: Introduction, Objectifs, Stratégies, Budget, Conclusion\n- Nombre de pages: 25\n- Nombre de mots: 8,750\n- Révision: 3ème version\n- Statut: En cours de validation\n- Priorité: Haute\n- Département: Stratégie\n- Collaborateurs: Jean Dupont, Sophie Bernard, Marc Leroy\n- Date limite: 31/01/2025\n- Budget prévisionnel: 500,000 €\n- Risques identifiés: 5\n- Opportunités: 8`;
                } else if (fileType.includes('text')) {
                    extractedContent = `Fichier texte traité: ${file.name}\n\nContenu extrait:\n- Type: Notes de réunion\n- Date: 12/12/2024\n- Participants: 8 personnes\n- Durée: 2h30\n- Points abordés: Projet Q1, Budget, Ressources humaines, Planning\n- Animateur: Pierre Dubois\n- Secrétaire: Anne Moreau\n- Lieu: Salle de conférence A\n- Ordre du jour: 5 points\n- Décisions prises: 3\n- Actions à suivre: 7\n- Prochaine réunion: 19/12/2024\n- Budget alloué: 150,000 €\n- Échéances: Q1 2025\n- Risques mentionnés: Délais, Ressources\n- Succès: Objectifs atteints à 85%`;
                } else {
                    extractedContent = `Document traité: ${file.name}\n\nType de fichier non reconnu. Contenu extrait limité.\n- Nom du fichier: ${file.name}\n- Taille: ${(file.size / 1024 / 1024).toFixed(2)} MB\n- Type MIME: ${file.type}\n- Date de création: ${new Date(file.lastModified).toLocaleDateString('fr-FR')}\n- Statut: Traitement partiel\n- Recommandation: Vérifier le format du fichier`;
                }

                return {
                    name: file.name,
                    type: fileType,
                    content: extractedContent,
                    processedAt: new Date(),
                    id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
                };
            });

            setProcessedDocuments(prev => [...prev, ...newProcessedDocuments]);
            
            // Réinitialiser après upload
            setUploadedFiles([]);
            setUploadProgress(0);
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    };

    const removeFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    // Fonction pour commencer l'édition d'un document
    const startEditing = (document: ProcessedDocument) => {
        setEditingDocumentId(document.id);
        setEditContent(document.content);
    };

    // Fonction pour sauvegarder les modifications
    const saveEdit = () => {
        if (editingDocumentId) {
            setProcessedDocuments(prev => 
                prev.map(doc => 
                    doc.id === editingDocumentId 
                        ? { ...doc, content: editContent }
                        : doc
                )
            );
            setEditingDocumentId(null);
            setEditContent('');
        }
    };

    // Fonction pour annuler l'édition
    const cancelEdit = () => {
        setEditingDocumentId(null);
        setEditContent('');
    };

    return (
        <div className="space-y-3 sm:space-y-4 px-4 sm:px-0">
            <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Upload document</h2>
                <p className="text-xs sm:text-sm text-gray-600">Téléchargez un nouveau document pour traitement OCR</p>
            </div>
            
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
                {/* Zone de drop */}
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-3 sm:p-6 text-center transition-colors ${
                        isDragActive
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                    }`}
                >
                    <input {...getInputProps()} />
                    <div className="space-y-2 sm:space-y-3">
                        <div className="mx-auto w-6 h-6 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm sm:text-base font-medium text-gray-900">
                                {isDragActive ? 'Déposez les fichiers ici' : 'Glissez-déposez vos fichiers ici'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                ou cliquez pour sélectionner des fichiers
                            </p>
                        </div>
                        <p className="text-xs text-gray-400">
                            PDF, images (PNG, JPG, GIF, BMP, TIFF), documents (DOC, DOCX), texte (TXT)
                        </p>
                    </div>
                </div>

                {/* Liste des fichiers */}
                {uploadedFiles.length > 0 && (
                    <div className="mt-3 sm:mt-4">
                        <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2 sm:mb-3">Fichiers sélectionnés</h3>
                        <div className="space-y-1.5">
                            {uploadedFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-2 sm:space-x-3">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded flex items-center justify-center">
                                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-medium text-gray-900 truncate">{file.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFile(index)}
                                        className="text-red-500 hover:text-red-700 p-1 ml-2"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Barre de progression */}
                {uploading && (
                    <div className="mt-3 sm:mt-4">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-medium text-gray-700">Upload en cours...</span>
                            <span className="text-xs text-gray-500">{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Bouton d'upload */}
                {uploadedFiles.length > 0 && !uploading && (
                    <div className="mt-3 sm:mt-4">
                        <button
                            onClick={handleUpload}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                            Traiter {uploadedFiles.length} document{uploadedFiles.length > 1 ? 's' : ''}
                        </button>
                    </div>
                )}
            </div>

            {/* Section des documents traités */}
            {processedDocuments.length > 0 && (
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
                    <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">Documents traités</h3>
                    <div className="space-y-2 sm:space-y-3">
                        {processedDocuments.map((doc) => (
                            <div key={doc.id} className="border border-gray-200 rounded-lg p-2 sm:p-3">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-1.5 sm:space-y-0">
                                    <div className="flex items-start space-x-2 sm:space-x-3 min-w-0 flex-1">
                                        <div className="w-5 h-5 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                                            <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="text-xs sm:text-base font-medium text-gray-900 truncate">{doc.name}</h4>
                                            <p className="text-xs text-gray-500 leading-tight">
                                                Type: {doc.type}
                                            </p>
                                            <p className="text-xs text-gray-500 leading-tight">
                                                Traité le {doc.processedAt.toLocaleDateString('fr-FR')} à {doc.processedAt.toLocaleTimeString('fr-FR')}
                                            </p>
                                        </div>
                                    </div>
                                    {editingDocumentId !== doc.id && (
                                        <div className="flex items-center space-x-2">
                                            {/* Bouton Modifier pour mobile */}
                                            <button
                                                onClick={() => startEditing(doc)}
                                                className="sm:hidden px-2.5 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
                                            >
                                                Modifier
                                            </button>
                                            {/* Icône pour desktop */}
                                            <button
                                                onClick={() => startEditing(doc)}
                                                className="hidden sm:block text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50 transition-colors flex-shrink-0 self-start sm:self-center"
                                                title="Modifier le contenu"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                
                                {editingDocumentId === doc.id ? (
                                    <div className="space-y-2 sm:space-y-3">
                                        <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                                            <h5 className="text-xs font-medium text-gray-700 mb-1.5">Modifier le contenu extrait:</h5>
                                            <textarea
                                                value={editContent}
                                                onChange={(e) => setEditContent(e.target.value)}
                                                className="w-full h-24 sm:h-48 p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                                                placeholder="Modifiez le contenu extrait ici..."
                                            />
                                        </div>
                                        <div className="flex flex-col sm:flex-row space-y-1.5 sm:space-y-0 sm:space-x-2">
                                            <button
                                                onClick={saveEdit}
                                                className="px-2.5 sm:px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-1.5 text-xs"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Sauvegarder</span>
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="px-2.5 sm:px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-1.5 text-xs"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                <span>Annuler</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                                        <h5 className="text-xs font-medium text-gray-700 mb-1.5">Informations extraites:</h5>
                                        <pre className="text-xs text-gray-600 whitespace-pre-wrap font-sans max-h-20 sm:max-h-32 overflow-y-auto leading-relaxed">{doc.content}</pre>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}