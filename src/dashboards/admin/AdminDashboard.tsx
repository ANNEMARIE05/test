import { useState } from 'react';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import Utilisateurs from './pagesAdmin/Utilisateurs';
import Documents from './pagesAdmin/Documents';
import Api from './pagesAdmin/Api';
import Email from './pagesAdmin/Email';
import Profile from './pagesAdmin/Profile';
import Support from './pagesAdmin/Support';
import Parametres from './pagesAdmin/Parametres';
import Historique from './pagesAdmin/Historique';
import Dashboard from './pagesAdmin/Dashboard';
import { logAction } from '../../services/audit';


interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [sectionActive, setSectionActive] = useState('tableau');

  useEffect(() => {
    const handler = (e: any) => {
      const section = e?.detail?.section;
      if (typeof section === 'string') {
        setSectionActive(section);
      }
    };
    window.addEventListener('admin:navigate', handler);
    return () => window.removeEventListener('admin:navigate', handler);
  }, []);

  useEffect(() => {
    logAction({ action: 'navigation', entityType: 'section', entityId: sectionActive });
  }, [sectionActive]);

  const afficherContenu = () => {
    switch (sectionActive) {
      case 'tableau':
        return (
          <Dashboard />
        );

      case 'utilisateurs':
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

      case 'historique':
        return (
          <Historique />
        );

      case 'parametres':
        return (
          <Parametres />
        );   

        case 'profil':
          return (
            <Profile />
          );

        case 'support':
        return (
          <Support />
        );

      default:
        return null;
    }
  };

  const obtenirTitreEnTete = () => {
    const titres: { [key: string]: string } = {
      'tableau': 'Tableau de bord',
      'utilisateurs': 'Gestion utilisateurs',
      'documents': 'Gestion documents',
      'api': 'Gestion d\'API',
      'email': 'Gestion d\'email',
      'profil': 'Profile',
      'support': 'Support',
      'parametres': 'Paramètres'
    };
    return titres[sectionActive] || 'Dashboard';
  };

  return (
    <Layout
      activeSection={sectionActive}
      onSectionChange={setSectionActive}
      onLogout={onLogout}
      title="OCR"
      headerTitle={obtenirTitreEnTete()}
      user={{ name: "Administrateur" }}
    >
      {afficherContenu()}
    </Layout>
  );
}