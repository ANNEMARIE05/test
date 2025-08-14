import { 
  Users, 
  FileText, 
  Activity,
  Database,
  BarChart3,
  LayoutDashboard,
  History,
  Settings,
  Mail,
  Code,
} from "lucide-react";
import { useEffect, useState } from "react";
import { lireActionsRecentes, abonner, type EntreeAudit, journaliserAction } from "../../../services/audit";

export default function Dashboard() {
    // Variables pour les statistiques
    const utilisateursActifs = "1,847";
    const documentsTraites = "45,231";
    const precisionMoyenne = "99.2%";
    const serveursActifs = "12";

    const [activitesRecentes, setActivitesRecentes] = useState<EntreeAudit[]>(lireActionsRecentes(6));

    useEffect(() => {
      const desabonner = abonner(() => {
        setActivitesRecentes(lireActionsRecentes(6));
      });
      setActivitesRecentes(lireActionsRecentes(6));
      return desabonner;
    }, []);

    return (
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Tableau de bord</h2>
            <p className="text-xs sm:text-sm text-gray-600">Vue d'ensemble de la plateforme OCR</p>
          </div>

          {/* Raccourcis rapides */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            <button onClick={() => { window.dispatchEvent(new CustomEvent('admin:navigate', { detail: { section: 'tableau' }})); journaliserAction({ action: 'raccourci', entityType: 'navigation', entityId: 'tableau', metadata: { label: 'Tableau' } }); }} className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 hover:shadow-md transition-shadow flex items-center space-x-2 cursor-pointer text-left">
              <div className="p-1 rounded-md bg-blue-100">
                <LayoutDashboard className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-gray-800">Tableau</span>
            </button>
            <button onClick={() => { window.dispatchEvent(new CustomEvent('admin:navigate', { detail: { section: 'utilisateurs' }})); journaliserAction({ action: 'raccourci', entityType: 'navigation', entityId: 'utilisateurs', metadata: { label: 'Utilisateurs' } }); }} className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 hover:shadow-md transition-shadow flex items-center space-x-2 cursor-pointer text-left">
              <div className="p-1 rounded-md bg-emerald-100">
                <Users className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-xs font-medium text-gray-800">Utilisateurs</span>
            </button>
            <button onClick={() => { window.dispatchEvent(new CustomEvent('admin:navigate', { detail: { section: 'documents' }})); journaliserAction({ action: 'raccourci', entityType: 'navigation', entityId: 'documents', metadata: { label: 'Documents' } }); }} className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 hover:shadow-md transition-shadow flex items-center space-x-2 cursor-pointer text-left">
              <div className="p-1 rounded-md bg-purple-100">
                <FileText className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-gray-800">Documents</span>
            </button>
            <button onClick={() => { window.dispatchEvent(new CustomEvent('admin:navigate', { detail: { section: 'api' }})); journaliserAction({ action: 'raccourci', entityType: 'navigation', entityId: 'api', metadata: { label: 'API' } }); }} className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 hover:shadow-md transition-shadow flex items-center space-x-2 cursor-pointer text-left">
              <div className="p-1 rounded-md bg-sky-100">
                <Code className="w-4 h-4 text-sky-600" />
              </div>
              <span className="text-xs font-medium text-gray-800">API</span>
            </button>
            <button onClick={() => { window.dispatchEvent(new CustomEvent('admin:navigate', { detail: { section: 'email' }})); journaliserAction({ action: 'raccourci', entityType: 'navigation', entityId: 'email', metadata: { label: 'Emails' } }); }} className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 hover:shadow-md transition-shadow flex items-center space-x-2 cursor-pointer text-left">
              <div className="p-1 rounded-md bg-orange-100">
                <Mail className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-xs font-medium text-gray-800">Emails</span>
            </button>
            <button onClick={() => { window.dispatchEvent(new CustomEvent('admin:navigate', { detail: { section: 'parametres' }})); journaliserAction({ action: 'raccourci', entityType: 'navigation', entityId: 'parametres', metadata: { label: 'Paramètres' } }); }} className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 hover:shadow-md transition-shadow flex items-center space-x-2 cursor-pointer text-left">
              <div className="p-1 rounded-md bg-gray-100">
                <Settings className="w-4 h-4 text-gray-700" />
              </div>
              <span className="text-xs font-medium text-gray-800">Paramètres</span>
            </button>
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

          {/* System Status & Activité */}
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
                <div className="flex items_center justify-between">
                  <span className="text-xs text-gray-600">Base de données</span>
                  <span className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-green-600">Opérationnel</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">API OCR</span>
                  <span className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded_full"></div>
                    <span className="text-xs font-medium text-green-600">Opérationnel</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900">Activité récente</h3>
                <div className="inline-flex items-center space-x-1 text-[10px] text-gray-500">
                  <History className="w-3 h-3" />
                 <span>{activitesRecentes.length} entrées</span>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {activitesRecentes.length === 0 ? (
                  <div className="text-xs text-gray-500">Aucune activité récente</div>
                ) : (
                  activitesRecentes.map((e) => (
                    <div key={e.id} className="flex items-start space-x-2 sm:space-x-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center bg-blue-100">
                        <Activity className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900">
                          {e.actor} • {e.action}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {e.entityType}{e.entityId ? ` #${e.entityId}` : ''} • {new Date(e.timestamp).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      );
}