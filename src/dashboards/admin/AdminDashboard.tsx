import { useState } from 'react';
import Layout from '../../components/Layout';
import Utilisateurs from './pagesAdmin/Utilisateurs';
import Documents from './pagesAdmin/Documents';
import Api from './pagesAdmin/Api';
import Email from './pagesAdmin/Email';
import Profile from './pagesAdmin/Profile';
import TableauBord from './pagesAdmin/Dashboard';
import Support from './pagesAdmin/Support';
import Parametres from './pagesAdmin/Parametres';
import Historique from './pagesAdmin/Historique';


interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [sectionActive, setSectionActive] = useState('tableau-bord');

  const afficherContenu = () => {
    switch (sectionActive) {
      case 'tableau-bord':
        return (
          <TableauBord />
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
      'tableau-bord': 'Tableau de bord',
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