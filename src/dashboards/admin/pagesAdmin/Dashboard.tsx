import { 
  Users, 
  FileText, 
  Activity,
  Database,
  BarChart3,
  Code,
  Mail,
  Settings,
  History as HistoryIcon,
  Key,
  Edit,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { useAdminActivity } from '../AdminActivityContext';

interface AdminDashboardHomeProps {
  onNavigate: (sectionId: string) => void;
}

export default function Dashboard({ onNavigate }: AdminDashboardHomeProps) {
    const { activities, addActivity } = useAdminActivity();

    // Variables pour les statistiques
    const utilisateursActifs = "1,847";
    const documentsTraites = "45,231";
    const precisionMoyenne = "99.2%";
    const serveursActifs = "12";

    const handleShortcut = (sectionId: string, label: string) => {
      onNavigate(sectionId);
      addActivity({
        type: 'navigation',
        title: `Ouverture: ${label}`,
        description: 'Accès via un raccourci du tableau de bord',
        metadata: { sectionId }
      });
    };

    const recentActivities = activities.slice(0, 6);

    const formatAgo = (iso: string) => {
      const diffMs = Date.now() - new Date(iso).getTime();
      const minutes = Math.floor(diffMs / 60000);
      if (minutes < 1) return "À l'instant";
      if (minutes < 60) return `Il y a ${minutes} min`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `Il y a ${hours} h`;
      const days = Math.floor(hours / 24);
      return `Il y a ${days} j`;
    };

    const iconFor = (type: string) => {
      const common = 'w-2.5 h-2.5 sm:w-3 sm:h-3';
      switch (type) {
        case 'user_create':
        case 'user_update':
          return <Edit className={`${common} text-blue-600`} />;
        case 'user_delete':
          return <Trash2 className={`${common} text-red-600`} />;
        case 'user_invite_send':
          return <Mail className={`${common} text-purple-600`} />;
        case 'api_key_regenerate':
          return <Key className={`${common} text-yellow-600`} />;
        case 'api_delete':
          return <Trash2 className={`${common} text-red-600`} />;
        case 'api_permissions_update':
          return <Settings className={`${common} text-gray-700`} />;
        case 'documents_assign':
        case 'documents_modify':
          return <FileText className={`${common} text-green-600`} />;
        case 'documents_delete':
          return <Trash2 className={`${common} text-red-600`} />;
        case 'alert_send':
          return <AlertTriangle className={`${common} text-orange-600`} />;
        default:
          return <Activity className={`${common} text-blue-600`} />;
      }
    };

    return (
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Tableau de bord</h2>
            <p className="text-xs sm:text-sm text-gray-600">Vue d'ensemble de la plateforme OCR</p>
          </div>

          {/* Raccourcis */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 sm:p-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Raccourcis</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              <button onClick={() => handleShortcut('utilisateurs', 'Gestion utilisateurs')} className="flex items-center space-x-2 px-2 py-2 rounded-lg border hover:shadow-sm hover:bg-blue-50 transition">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium">Utilisateurs</span>
              </button>
              <button onClick={() => handleShortcut('documents', 'Gestion documents')} className="flex items-center space-x-2 px-2 py-2 rounded-lg border hover:shadow-sm hover:bg-green-50 transition">
                <FileText className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium">Documents</span>
              </button>
              <button onClick={() => handleShortcut('api', 'Gestion d\'API')} className="flex items-center space-x-2 px-2 py-2 rounded-lg border hover:shadow-sm hover:bg-purple-50 transition">
                <Code className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-medium">API</span>
              </button>
              <button onClick={() => handleShortcut('email', 'Gestion d\'email')} className="flex items-center space-x-2 px-2 py-2 rounded-lg border hover:shadow-sm hover:bg-indigo-50 transition">
                <Mail className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-medium">Email</span>
              </button>
              <button onClick={() => handleShortcut('historique', 'Historique')} className="flex items-center space-x-2 px-2 py-2 rounded-lg border hover:shadow-sm hover:bg-gray-50 transition">
                <HistoryIcon className="w-4 h-4 text-gray-700" />
                <span className="text-xs font-medium">Historique</span>
              </button>
              <button onClick={() => handleShortcut('parametres', 'Paramètres')} className="flex items-center space-x-2 px-2 py-2 rounded-lg border hover:shadow-sm hover:bg-yellow-50 transition">
                <Settings className="w-4 h-4 text-yellow-600" />
                <span className="text-xs font-medium">Paramètres</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 sm:p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Utilisateurs actifs</p>
                  <p className="text-base sm:text-xl font-bold text-gray-900">{utilisateursActifs}</p>
                </div>
                <div className="w-6 h-6 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-3 h-3 sm:w-5 sm:h-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 sm:p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Documents traités</p>
                  <p className="text-base sm:text-xl font-bold text-gray-900">{documentsTraites}</p>
                </div>
                <div className="w-6 h-6 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-3 h-3 sm:w-5 sm:h-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 sm:p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Précision moyenne</p>
                  <p className="text-base sm:text-xl font-bold text-gray-900">{precisionMoyenne}</p>
                </div>
                <div className="w-6 h-6 sm:w-10 sm:h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 sm:p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Serveurs actifs</p>
                  <p className="text-base sm:text-xl font-bold text-gray-900">{serveursActifs}</p>
                </div>
                <div className="w-6 h-6 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Database className="w-3 h-3 sm:w-5 sm:h-5 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* System Status + Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Statut du système</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Serveur principal</span>
                  <span className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-green-600">Opérationnel</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Base de données</span>
                  <span className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-green-600">Opérationnel</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">API OCR</span>
                  <span className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-green-600">Opérationnel</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Activité récente</h3>
              <div className="space-y-2 sm:space-y-3">
                {recentActivities.length === 0 && (
                  <p className="text-xs text-gray-500">Aucune activité récente</p>
                )}
                {recentActivities.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-100 rounded-lg flex items-center justify-center">
                      {iconFor(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate">{item.title}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 truncate">{item.description || ''}</p>
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">{formatAgo(item.timestamp)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
}