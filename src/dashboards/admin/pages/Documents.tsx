import { useState } from 'react';
import { 
  FileText, 
  Edit,
  Trash2,
  Search,
  Plus,
} from "lucide-react";

interface Document {
    id: string;
    nom: string;
    type: string;
    taille: string;
    dateUpload: string;
    statut: string;
    utilisateur: string;
  }

export default function Documents() {
    const [searchDocuments, setSearchDocuments] = useState('');

    const documents: Document[] = [
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
        }
      ];

      const filteredDocuments = documents.filter(doc =>
        doc.nom.toLowerCase().includes(searchDocuments.toLowerCase()) ||
        doc.utilisateur.toLowerCase().includes(searchDocuments.toLowerCase()) ||
        doc.statut.toLowerCase().includes(searchDocuments.toLowerCase())
      );
      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestion documents</h2>
              <p className="text-gray-600">Gérez les documents traités par l'OCR</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Ajouter un document</span>
            </button>
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
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
                          'bg-red-100 text-red-800'
                        }`}>
                          {doc.statut}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{doc.utilisateur}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50" title="Télécharger">
                            <FileText className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50" title="Modifier">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50" title="Supprimer">
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
        </div>
      );
}