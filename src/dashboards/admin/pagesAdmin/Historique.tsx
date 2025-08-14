import { useEffect, useMemo, useState } from 'react';
import { lireToutesActions, viderJournalAudit, abonner, type EntreeAudit } from '../../../services/audit';
import { Search, Trash2, Filter } from 'lucide-react';

export default function Historique() {
  const [entrees, setEntrees] = useState<EntreeAudit[]>(lireToutesActions());
  const [recherche, setRecherche] = useState('');
  const [filtreType, setFiltreType] = useState<string>('tous');

  useEffect(() => {
    const desabonner = abonner(() => setEntrees(lireToutesActions()));
    setEntrees(lireToutesActions());
    return desabonner;
  }, []);

  const typesEntite = useMemo(() => {
    const ensemble = new Set(entrees.map(e => e.entityType));
    return ['tous', ...Array.from(ensemble)];
  }, [entrees]);

  const filtrees = useMemo(() => {
    return entrees.filter(e => {
      const correspond = `${e.actor} ${e.action} ${e.entityType} ${e.entityId || ''}`
        .toLowerCase().includes(recherche.toLowerCase());
      const correspondType = filtreType === 'tous' || e.entityType === filtreType;
      return correspond && correspondType;
    });
  }, [entrees, recherche, filtreType]);

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify_between gap-2 sm:gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Historique des actions</h2>
          <p className="text-xs sm:text-sm text-gray-600">Journal complet des actions administrateur</p>
        </div>
        <button
          onClick={() => viderJournalAudit()}
          className="flex items-center space-x-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm"
        >
          <Trash2 className="w-3 h-3" />
          <span>Vider l'historique</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Rechercher (acteur, action, entité, id...)"
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-gray-600 text-sm">
              <Filter className="w-4 h-4" />
              <span>Type</span>
            </div>
            <select
              value={filtreType}
              onChange={(e) => setFiltreType(e.target.value)}
              className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm"
            >
              {typesEntite.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 sm:mt-4">
          {filtrees.length === 0 ? (
            <div className="text-xs text-gray-500">Aucune action trouvée</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filtrees.map(e => (
                <li key={e.id} className="py-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-gray-900">{e.actor} • {e.action}</div>
                      <div className="text-[11px] text-gray-500">
                        {e.entityType}{e.entityId ? ` #${e.entityId}` : ''}
                        {e.metadata ? ` • ${Object.entries(e.metadata).map(([k,v]) => `${k}:${String(v)}`).join(', ')}` : ''}
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-400 ml-2 whitespace-nowrap">
                      {new Date(e.timestamp).toLocaleString('fr-FR')}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}