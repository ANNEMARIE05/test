import { useState } from 'react';
import Layout from '../../components/Layout';
import Utilisateurs from './pages/utilisateurs';
import Documents from './pages/Documents';
import Api from './pages/Api';
import Email from './pages/Email';
import Profile from './pages/Profile';
import Dashboard from './pages/dashboard';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <Dashboard />
        );

      case 'users':
        return (
          <Utilisateurs />
        );

      case 'documents':
        return (
          <Documents />
        );

      case 'api':
        return (
          <Api />
        );

      case 'email':
        return (
          <Email />
        );

      // case 'documents':
      //   return (
      //     <div className="space-y-6">
      //       <div>
      //         <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestion documents</h2>
      //         <p className="text-gray-600">Gérez les documents traités par l'OCR</p>
      //       </div>
      //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      //         <p className="text-gray-600">Interface de gestion des documents à implémenter</p>
      //       </div>
      //     </div>
      //   );
      // case 'api':
      //   return (
      //     <div className="space-y-6">
      //       <div>
      //         <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestion d'API</h2>
      //         <p className="text-gray-600">Configurez et surveillez les APIs</p>
      //       </div>
      //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      //         <p className="text-gray-600">Interface de gestion des APIs à implémenter</p>
      //       </div>
      //     </div>
      //   );
      // case 'email':
      //   return (
      //     <div className="space-y-6">
      //       <div>
      //         <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestion d'email</h2>
      //         <p className="text-gray-600">Configurez les paramètres email</p>
      //       </div>
      //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      //         <p className="text-gray-600">Interface de gestion des emails à implémenter</p>
      //       </div>
      //     </div>
      //   );

      case 'profile':
        return (
          <Profile />
        );

      default:
        return null;
    }
  };

  const getHeaderTitle = () => {
    const titles: { [key: string]: string } = {
      dashboard: 'Tableau de bord',
      users: 'Gestion utilisateurs',
      documents: 'Gestion documents',
      api: 'Gestion d\'API',
      email: 'Gestion d\'email',
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
      user={{ name: "Administrateur" }}
    >
      {renderContent()}
    </Layout>
  );
}