import { useMemo, useState } from 'react';
import { Activity, Filter, Trash2, Search, Users, FileText, Key, Settings, Mail, AlertTriangle } from 'lucide-react';
import { useAdminActivity } from '../AdminActivityContext';

export default function Historique() {
      const { activities, clearActivities } = useAdminActivity();
      const [typeFilter, setTypeFilter] = useState<string>('all');
      const [query, setQuery] = useState('');

      const filtered = useMemo(() => {
        return activities.filter(a => {
          if (typeFilter !== 'all' && a.type !== typeFilter) return false;
          if (query && !(a.title.toLowerCase().includes(query.toLowerCase()) || (a.description || '').toLowerCase().includes(query.toLowerCase()))) return false;
          return true;
        });
      }, [activities, typeFilter, query]);

      const formatDateTime = (iso: string) => new Date(iso).toLocaleString('fr-FR');

      const iconFor = (type: string) => {
        const common = 'w-4 h-4';
        switch (type) {
          case 'user_create':
          case 'user_update':
            return <Users className={`${common} text-blue-600`} />;
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Historique</h2>
                <p className="text-xs sm:text-sm text-gray-600">Historique de toutes les actions réalisées par l'administrateur</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={clearActivities} className="flex items-center space-x-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs">
                  <Trash2 className="w-3 h-3" />
                  <span>Vider</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between mb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg text-sm py-1.5 px-2"
                  >
                    <option value="all">Tous les types</option>
                    <option value="user_create">Création utilisateur</option>
                    <option value="user_update">Modification utilisateur</option>
                    <option value="user_delete">Suppression utilisateur</option>
                    <option value="user_invite_send">Invitation envoyée</option>
                    <option value="api_key_regenerate">Régénération clé API</option>
                    <option value="api_delete">Suppression API</option>
                    <option value="api_permissions_update">Permissions API modifiées</option>
                    <option value="documents_assign">Assignation documents</option>
                    <option value="documents_modify">Modification documents</option>
                    <option value="documents_delete">Suppression documents</option>
                    <option value="alert_send">Alerte envoyée</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                {filtered.length === 0 && (
                  <p className="text-xs text-gray-500">Aucune entrée</p>
                )}
                {filtered.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center">
                          {iconFor(item.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.title}</p>
                          {item.description && (
                            <p className="text-xs text-gray-600">{item.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{formatDateTime(item.timestamp)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
  }