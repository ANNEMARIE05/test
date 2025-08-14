import { useState } from 'react';
import { 
  FileText, 
  BarChart3, 
  History,
  Settings,
  User,
  MessageCircle,
  X,
  Code,
  Send
} from "lucide-react";
import Layout from '../../components/Layout';
import type { SidebarItem } from '../../components/Sidebar';
import Dashboard from './pagesUser/Dashboard';
import Document from './pagesUser/Document';
import Historique from './pagesUser/Historique';
import Parametre from './pagesUser/Parametre';
import Profile from './pagesUser/Profile';
import Assistance from './pagesUser/Assistance';
import Apis from './pagesUser/Apis';

interface UserDashboardProps {
  onLogout: () => void;
}

export default function UserDashboard({ onLogout }: UserDashboardProps) {
  const [sectionActive, setSectionActive] = useState('dashboard');
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [confirmationDeconnexion, setConfirmationDeconnexion] = useState(false);

  const gererClicDeconnexion = () => {
    setConfirmationDeconnexion(true);
  };

  const confirmerDeconnexion = () => {
    setConfirmationDeconnexion(false);
    onLogout();
  };

  const annulerDeconnexion = () => {
    setConfirmationDeconnexion(false);
  };

  const elementsMenu: SidebarItem[] = [
    { id: 'dashboard', label: 'Tableau de bord', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'documents', label: 'Gestion documents', icon: <FileText className="w-4 h-4" /> },
    { id: 'history', label: 'Historique', icon: <History className="w-4 h-4" /> },
    { id: 'apis', label: 'Gestion d\'APIs', icon: <Code className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings className="w-4 h-4" /> },
    { id: 'assistance', label: 'Assistance', icon: <MessageCircle className="w-4 h-4" /> },
  ];

  const afficherContenu = () => {
    switch (sectionActive) {
      case 'dashboard':
        return (
          <Dashboard />
        );

      case 'documents':
        return (
          <Document />
        );

      case 'history':
        return (
          <Historique />
        );

      case 'settings':
        return (
          <Parametre />
        );

      case 'profile':
        return (
          <Profile />
        );

      case 'assistance':
        return (
          <Assistance />
        );

      case 'apis':
        return (
          <Apis />
        );

      default:
        return null;
    }
  };

  const obtenirTitreEnTete = () => {
    const titres: { [key: string]: string } = {
      dashboard: 'Tableau de bord',
      documents: 'Gestion documents',
      upload: 'Upload document',
      history: 'Historique',
      settings: 'Paramètres',
      profile: 'Profile',
      assistance: 'Assistance',
      apis: 'Gestion d\'APIs'
    };
    return titres[sectionActive] || 'Dashboard';
  };

  return (
    <>
      <Layout
        activeSection={sectionActive}
        onSectionChange={setSectionActive}
        onLogout={gererClicDeconnexion}
        title="OCR"
        headerTitle={obtenirTitreEnTete()}
        user={{ name: "Utilisateur" }}
        sidebarItems={elementsMenu}
      >
        {afficherContenu()}
        
        {/* Chatbot Icon */}
        <div className="fixed bottom-2 right-6 z-50">
          <button
            onClick={() => setChatbotVisible(!chatbotVisible)}
            className={`w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${!chatbotVisible ? 'animate-bounce' : ''}`}
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Chatbot Interface */}
        {chatbotVisible && (
          <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Chatbot OCR</h3>
              <button
                onClick={() => setChatbotVisible(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-gray-800">Bonjour ! Je suis votre assistant OCR. Comment puis-je vous aider aujourd'hui ?</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Comment fonctionne l'OCR ?</p>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-gray-800">L'OCR (Reconnaissance Optique de Caractères) permet de convertir des images de texte en texte numérique. Notre système analyse vos documents et extrait le texte automatiquement.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Tapez votre message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </Layout>

      {/* Logout Confirmation Modal */}
      {confirmationDeconnexion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirmation de déconnexion</h3>
            <p className="text-gray-600 mb-6">Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="flex space-x-3">
              <button
                onClick={annulerDeconnexion}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmerDeconnexion}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}