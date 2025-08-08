import { useState } from 'react';
import { 
  FileText, 
  BarChart3, 
  Search, 
  Upload,
  History,
  Settings,
  User
} from "lucide-react";
import Layout from '../../components/Layout';
import type { SidebarItem } from '../../components/Sidebar';

interface UserDashboardProps {
  onLogout: () => void;
}

export default function UserDashboard({ onLogout }: UserDashboardProps) {
  const [activeSection, setActiveSection] = useState('dashboard');

  const userSidebarItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Tableau de bord', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'documents', label: 'Mes documents', icon: <FileText className="w-5 h-5" /> },
    { id: 'upload', label: 'Upload document', icon: <Upload className="w-5 h-5" /> },
    { id: 'history', label: 'Historique', icon: <History className="w-5 h-5" /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tableau de bord</h2>
              <p className="text-gray-600">Vue d'ensemble de vos activités OCR</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Documents traités</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Précision moyenne</p>
                    <p className="text-2xl font-bold text-gray-900">98.5%</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Temps moyen</p>
                    <p className="text-2xl font-bold text-gray-900">2.3s</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Search className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Documents en attente</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Document traité avec succès</p>
                    <p className="text-xs text-gray-500">Il y a 5 minutes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Nouveau document uploadé</p>
                    <p className="text-xs text-gray-500">Il y a 15 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mes documents</h2>
              <p className="text-gray-600">Gérez vos documents traités par l'OCR</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Interface de gestion des documents à implémenter</p>
            </div>
          </div>
        );

      case 'upload':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload document</h2>
              <p className="text-gray-600">Téléchargez un nouveau document pour traitement OCR</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Interface d'upload de documents à implémenter</p>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Historique</h2>
              <p className="text-gray-600">Consultez l'historique de vos traitements OCR</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Interface d'historique à implémenter</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Paramètres</h2>
              <p className="text-gray-600">Configurez vos préférences</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Interface de paramètres à implémenter</p>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile</h2>
              <p className="text-gray-600">Gérez votre profil utilisateur</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Interface de gestion du profil à implémenter</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getHeaderTitle = () => {
    const titles: { [key: string]: string } = {
      dashboard: 'Tableau de bord',
      documents: 'Mes documents',
      upload: 'Upload document',
      history: 'Historique',
      settings: 'Paramètres',
      profile: 'Profile'
    };
    return titles[activeSection] || 'Dashboard';
  };

  return (
    <Layout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onLogout={onLogout}
      title="OCR"
      headerTitle={getHeaderTitle()}
      user={{ name: "Utilisateur" }}
      sidebarItems={userSidebarItems}
    >
      {renderContent()}
    </Layout>
  );
}