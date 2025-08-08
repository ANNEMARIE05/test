import { useState } from 'react';
import Layout from '../../components/Layout';
import Utilisateurs from './pagesAdmin/Utilisateurs';
import Documents from './pagesAdmin/Documents';
import Api from './pagesAdmin/Api';
import Email from './pagesAdmin/Email';
import Profile from './pagesAdmin/Profile';
import Dashboard from './pagesAdmin/Dashboard';

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