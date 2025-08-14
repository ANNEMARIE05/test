import { useState, useEffect, useMemo } from 'react';

interface CleApi {
  id: string;
  nom: string;
  cle: string;
  permissions: string[];
  quota: {
    limite: number;
    utilise: number;
    dateReset: string;
  };
  statut: 'actif' | 'inactif';
  dateCreation: string;
}

interface LogUtilisation {
  id: string;
  endpoint: string;
  horodatage: string;
  statut: 'succes' | 'erreur';
  tempsReponse: number;
  quotaUtilise: number;
}

export default function Apis() {
  const [clesApi, setClesApi] = useState<CleApi[]>([]);
  const [logsUtilisation, setLogsUtilisation] = useState<LogUtilisation[]>([]);
  const [clesEtendues, setClesEtendues] = useState<Set<string>>(new Set());
  const [chargement, setChargement] = useState(true);
  const [cleCopiee, setCleCopiee] = useState<string | null>(null);
  

  // Initialize data on component mount
  useEffect(() => {
    // Simulate API call to load data
    const chargerDonnees = () => {
      setChargement(true);
      
      // Mock API keys data
      const donneesClesApi: CleApi[] = [
        {
          id: '1',
          nom: 'API Production',
          cle: 'sk-...abc123',
          permissions: ['read', 'write', 'delete'],
          quota: {
            limite: 10000,
            utilise: 7500,
            dateReset: '2024-01-15'
          },
          statut: 'actif',
          dateCreation: '2024-01-01'
        },
        {
          id: '2',
          nom: 'API Test',
          cle: 'sk-...def456',
          permissions: ['read'],
          quota: {
            limite: 1000,
            utilise: 950,
            dateReset: '2024-01-15'
          },
          statut: 'actif',
          dateCreation: '2024-01-05'
        },
        {
          id: '3',
          nom: 'API Development',
          cle: 'sk-...ghi789',
          permissions: ['read', 'write'],
          quota: {
            limite: 5000,
            utilise: 1200,
            dateReset: '2024-01-15'
          },
          statut: 'actif',
          dateCreation: '2024-01-08'
        }
      ];

      // Mock usage logs data
      const donneesLogsUtilisation: LogUtilisation[] = [
        {
          id: '1',
          endpoint: '/api/users',
          horodatage: '2024-01-10T10:30:00Z',
          statut: 'succes',
          tempsReponse: 150,
          quotaUtilise: 1
        },
        {
          id: '2',
          endpoint: '/api/data',
          horodatage: '2024-01-10T10:25:00Z',
          statut: 'erreur',
          tempsReponse: 500,
          quotaUtilise: 1
        },
        {
          id: '3',
          endpoint: '/api/products',
          horodatage: '2024-01-10T10:20:00Z',
          statut: 'succes',
          tempsReponse: 200,
          quotaUtilise: 1
        },
        {
          id: '4',
          endpoint: '/api/orders',
          horodatage: '2024-01-10T10:15:00Z',
          statut: 'succes',
          tempsReponse: 180,
          quotaUtilise: 1
        }
      ];

      setClesApi(donneesClesApi);
      setLogsUtilisation(donneesLogsUtilisation);
      setChargement(false);
    };

    chargerDonnees();
  }, []);

  const regenererCleApi = (idCle: string) => {
    const nouvelleCle = `sk-...${Math.random().toString(36).substr(2, 9)}`;
    setClesApi(cles => 
      cles.map(cle => 
        cle.id === idCle 
          ? { ...cle, cle: nouvelleCle, dateCreation: new Date().toISOString().split('T')[0] }
          : cle
      )
    );
  };

  const basculerLogs = (idCle: string) => {
    const nouvellesClesEtendues = new Set(clesEtendues);
    if (nouvellesClesEtendues.has(idCle)) {
      nouvellesClesEtendues.delete(idCle);
    } else {
      nouvellesClesEtendues.add(idCle);
    }
    setClesEtendues(nouvellesClesEtendues);
  };

  const copierDansPressePapiers = async (texte: string, idCle: string) => {
    try {
      await navigator.clipboard.writeText(texte);
      setCleCopiee(idCle);
      setTimeout(() => setCleCopiee(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const alertesQuota = useMemo(() => {
    return clesApi.filter(cle => (cle.quota.utilise / cle.quota.limite) > 0.8);
  }, [clesApi]);

  const obtenirPourcentageQuota = (utilise: number, limite: number) => (utilise / limite) * 100;
  const obtenirCouleurQuota = (pourcentage: number) => {
    if (pourcentage > 90) return 'text-red-600';
    if (pourcentage > 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (chargement) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      <div>
        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Gestion d'APIs</h2>
        <p className="text-xs text-gray-600">Configurez vos préférences et surveillez l'utilisation</p>
      </div>

      {/* Alertes de quota */}
      {alertesQuota.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-2">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-3 w-3 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-2">
              <h3 className="text-xs font-medium text-red-800">Alerte de quota</h3>
              <div className="mt-1 text-xs text-red-700">
                <p>Les clés API suivantes approchent de leur limite de quota :</p>
                <ul className="list-disc list-inside mt-1">
                {alertesQuota.map(cle => (
                    <li key={cle.id}>{cle.nom} ({Math.round(obtenirPourcentageQuota(cle.quota.utilise, cle.quota.limite))}% utilisé)</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Liste des clés API */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 space-y-1 sm:space-y-0">
          <h3 className="text-sm font-semibold text-gray-900">Clés API</h3>
          <button className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs">
            Nouvelle clé API
          </button>
        </div>
        
        {clesApi.length === 0 ? (
          <div className="text-center py-3 sm:py-4">
            <p className="text-gray-500 text-xs">Aucune clé API trouvée</p>
          </div>
        ) : (
          <div className="space-y-2">
            {clesApi.map(cleApi => (
              <div key={cleApi.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-2 sm:p-3">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-2 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                        <h4 className="text-sm font-medium text-gray-900">{cleApi.nom}</h4>
                        <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full w-fit ${
                          cleApi.statut === 'actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {cleApi.statut}
                        </span>
                      </div>
                      
                      <div className="mt-1.5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                          <div className="flex items-center space-x-1 sm:space-x-0 sm:flex-col sm:items-start">
                            <p className="text-xs text-gray-600">Clé: <code className="bg-gray-100 px-1 py-0.5 rounded break-all text-xs">{cleApi.cle}</code></p>
                            <button
                              onClick={() => copierDansPressePapiers(cleApi.cle, cleApi.id)}
                              className="text-blue-600 hover:text-blue-800 transition-colors w-fit"
                              title="Copier la clé"
                            >
                              {cleCopiee === cleApi.id ? (
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600">Créée le: {cleApi.dateCreation}</p>
                      </div>

                      {/* Permissions */}
                      <div className="mt-1.5">
                        <h5 className="text-xs font-medium text-gray-900 mb-1">Permissions:</h5>
                        <div className="flex flex-wrap gap-1">
                          {cleApi.permissions.map(permission => (
                            <span key={permission} className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {permission}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Quota */}
                      <div className="mt-1.5">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-gray-900">Quota</span>
                          <span className={`text-xs font-medium ${obtenirCouleurQuota(obtenirPourcentageQuota(cleApi.quota.utilise, cleApi.quota.limite))}`}>
                            {cleApi.quota.utilise} / {cleApi.quota.limite}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className={`h-1 rounded-full ${
                              obtenirPourcentageQuota(cleApi.quota.utilise, cleApi.quota.limite) > 90 ? 'bg-red-500' :
                              obtenirPourcentageQuota(cleApi.quota.utilise, cleApi.quota.limite) > 75 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(obtenirPourcentageQuota(cleApi.quota.utilise, cleApi.quota.limite), 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">Réinitialisation le {cleApi.quota.dateReset}</p>
                      </div>
                    </div>

                    <div className="flex flex-row lg:flex-col space-x-1 lg:space-x-0 lg:space-y-1">
                      <button
                        onClick={() => regenererCleApi(cleApi.id)}
                        className="px-1.5 py-0.5 text-xs bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors"
                      >
                        Régénérer
                      </button>
                      <button
                        onClick={() => basculerLogs(cleApi.id)}
                        className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                      >
                        {clesEtendues.has(cleApi.id) ? 'Masquer les logs' : 'Voir les logs'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Logs d'utilisation intégrés */}
                {clesEtendues.has(cleApi.id) && (
                  <div className="border-t border-gray-200 bg-gray-50 p-2">
                    <h5 className="text-xs font-medium text-gray-900 mb-1.5">Logs d'utilisation - {cleApi.nom}</h5>
                    
                    {logsUtilisation.length === 0 ? (
                      <div className="text-center py-2">
                        <p className="text-gray-500 text-xs">Aucun log d'utilisation trouvé</p>
                      </div>
                    ) : (
                      <div>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                                <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temps (ms)</th>
                                <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quota</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {logsUtilisation.map(log => (
                                <tr key={log.id}>
                                  <td className="px-2 py-1 text-xs font-medium text-gray-900 break-all">{log.endpoint}</td>
                                  <td className="px-2 py-1 text-xs text-gray-500">
                                    {new Date(log.horodatage).toLocaleString()}
                                  </td>
                                  <td className="px-2 py-1">
                                    <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${
                                      log.statut === 'succes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                      {log.statut}
                                    </span>
                                  </td>
                                  <td className="px-2 py-1 text-xs text-gray-500">{log.tempsReponse}</td>
                                  <td className="px-2 py-1 text-xs text-gray-500">{log.quotaUtilise}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-1">
                          {logsUtilisation.map(log => (
                            <div key={log.id} className="bg-white rounded-lg border border-gray-200 p-2 space-y-1">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h6 className="text-xs font-medium text-gray-900 break-all">{log.endpoint}</h6>
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    {new Date(log.horodatage).toLocaleString()}
                                  </p>
                                </div>
                                <span className={`px-1 py-0.5 text-xs font-medium rounded-full ml-1.5 ${
                                  log.statut === 'succes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {log.statut}
                                </span>
                              </div>
                              <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                                <div className="text-xs text-gray-600">
                                  <span className="font-medium">Temps:</span> {log.tempsReponse}ms
                                </div>
                                <div className="text-xs text-gray-600">
                                  <span className="font-medium">Quota:</span> {log.quotaUtilise}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
