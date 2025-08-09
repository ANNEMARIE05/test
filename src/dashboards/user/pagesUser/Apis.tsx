import { useState, useEffect, useMemo } from 'react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  quota: {
    limit: number;
    used: number;
    resetDate: string;
  };
  status: 'active' | 'inactive';
  createdAt: string;
}

interface UsageLog {
  id: string;
  endpoint: string;
  timestamp: string;
  status: 'success' | 'error';
  responseTime: number;
  quotaUsed: number;
}

export default function Apis() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [usageLogs, setUsageLogs] = useState<UsageLog[]>([]);
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize data on component mount
  useEffect(() => {
    // Simulate API call to load data
    const loadData = () => {
      setLoading(true);
      
      // Mock API keys data
      const mockApiKeys: ApiKey[] = [
        {
          id: '1',
          name: 'API Production',
          key: 'sk-...abc123',
          permissions: ['read', 'write', 'delete'],
          quota: {
            limit: 10000,
            used: 7500,
            resetDate: '2024-01-15'
          },
          status: 'active',
          createdAt: '2024-01-01'
        },
        {
          id: '2',
          name: 'API Test',
          key: 'sk-...def456',
          permissions: ['read'],
          quota: {
            limit: 1000,
            used: 950,
            resetDate: '2024-01-15'
          },
          status: 'active',
          createdAt: '2024-01-05'
        },
        {
          id: '3',
          name: 'API Development',
          key: 'sk-...ghi789',
          permissions: ['read', 'write'],
          quota: {
            limit: 5000,
            used: 1200,
            resetDate: '2024-01-15'
          },
          status: 'active',
          createdAt: '2024-01-08'
        }
      ];

      // Mock usage logs data
      const mockUsageLogs: UsageLog[] = [
        {
          id: '1',
          endpoint: '/api/users',
          timestamp: '2024-01-10T10:30:00Z',
          status: 'success',
          responseTime: 150,
          quotaUsed: 1
        },
        {
          id: '2',
          endpoint: '/api/data',
          timestamp: '2024-01-10T10:25:00Z',
          status: 'error',
          responseTime: 500,
          quotaUsed: 1
        },
        {
          id: '3',
          endpoint: '/api/products',
          timestamp: '2024-01-10T10:20:00Z',
          status: 'success',
          responseTime: 200,
          quotaUsed: 1
        },
        {
          id: '4',
          endpoint: '/api/orders',
          timestamp: '2024-01-10T10:15:00Z',
          status: 'success',
          responseTime: 180,
          quotaUsed: 1
        }
      ];

      setApiKeys(mockApiKeys);
      setUsageLogs(mockUsageLogs);
      setLoading(false);
    };

    loadData();
  }, []);

  const regenerateApiKey = (keyId: string) => {
    const newKey = `sk-...${Math.random().toString(36).substr(2, 9)}`;
    setApiKeys(keys => 
      keys.map(key => 
        key.id === keyId 
          ? { ...key, key: newKey, createdAt: new Date().toISOString().split('T')[0] }
          : key
      )
    );
  };

  const quotaAlerts = useMemo(() => {
    return apiKeys.filter(key => (key.quota.used / key.quota.limit) > 0.8);
  }, [apiKeys]);

  const getQuotaPercentage = (used: number, limit: number) => (used / limit) * 100;
  const getQuotaColor = (percentage: number) => {
    if (percentage > 90) return 'text-red-600';
    if (percentage > 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestion d'APIs</h2>
        <p className="text-gray-600">Configurez vos préférences et surveillez l'utilisation</p>
      </div>

      {/* Alertes de quota */}
      {quotaAlerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Alerte de quota</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Les clés API suivantes approchent de leur limite de quota :</p>
                <ul className="list-disc list-inside mt-1">
                  {quotaAlerts.map(key => (
                    <li key={key.id}>{key.name} ({Math.round(getQuotaPercentage(key.quota.used, key.quota.limit))}% utilisé)</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Liste des clés API */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Clés API</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Nouvelle clé API
          </button>
        </div>
        
        {apiKeys.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucune clé API trouvée</p>
          </div>
        ) : (
          <div className="space-y-4">
            {apiKeys.map(apiKey => (
              <div key={apiKey.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-lg font-medium text-gray-900">{apiKey.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        apiKey.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {apiKey.status}
                      </span>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Clé: <code className="bg-gray-100 px-2 py-1 rounded">{apiKey.key}</code></p>
                      <p className="text-sm text-gray-600">Créée le: {apiKey.createdAt}</p>
                    </div>

                    {/* Permissions */}
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Permissions:</h5>
                      <div className="flex flex-wrap gap-2">
                        {apiKey.permissions.map(permission => (
                          <span key={permission} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quota */}
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-900">Quota</span>
                        <span className={`text-sm font-medium ${getQuotaColor(getQuotaPercentage(apiKey.quota.used, apiKey.quota.limit))}`}>
                          {apiKey.quota.used} / {apiKey.quota.limit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            getQuotaPercentage(apiKey.quota.used, apiKey.quota.limit) > 90 ? 'bg-red-500' :
                            getQuotaPercentage(apiKey.quota.used, apiKey.quota.limit) > 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(getQuotaPercentage(apiKey.quota.used, apiKey.quota.limit), 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Réinitialisation le {apiKey.quota.resetDate}</p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => regenerateApiKey(apiKey.id)}
                      className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors"
                    >
                      Régénérer
                    </button>
                    <button
                      onClick={() => setSelectedKey(apiKey)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                    >
                      Voir les logs
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Logs d'utilisation */}
      {selectedKey && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Logs d'utilisation - {selectedKey.name}</h3>
            <button
              onClick={() => setSelectedKey(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {usageLogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucun log d'utilisation trouvé</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temps (ms)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quota</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usageLogs.map(log => (
                    <tr key={log.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.endpoint}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.responseTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.quotaUsed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
