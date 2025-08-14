import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type AdminActivityType =
  | 'user_create'
  | 'user_update'
  | 'user_delete'
  | 'user_invite_send'
  | 'api_key_regenerate'
  | 'api_delete'
  | 'api_permissions_update'
  | 'documents_assign'
  | 'documents_modify'
  | 'documents_delete'
  | 'alert_send'
  | 'navigation'
  | 'other';

export interface AdminActivityItem {
  id: string;
  type: AdminActivityType;
  title: string;
  description?: string;
  timestamp: string; // ISO string
  metadata?: Record<string, unknown>;
}

interface AdminActivityContextValue {
  activities: AdminActivityItem[];
  addActivity: (item: Omit<AdminActivityItem, 'id' | 'timestamp'> & { timestamp?: string }) => void;
  clearActivities: () => void;
}

const AdminActivityContext = createContext<AdminActivityContextValue | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'admin_activities_v1';

export function AdminActivityProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<AdminActivityItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AdminActivityItem[];
        setActivities(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(activities));
    } catch {}
  }, [activities]);

  const addActivity = useCallback((item: Omit<AdminActivityItem, 'id' | 'timestamp'> & { timestamp?: string }) => {
    const newItem: AdminActivityItem = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      timestamp: item.timestamp || new Date().toISOString(),
      type: item.type,
      title: item.title,
      description: item.description,
      metadata: item.metadata,
    };
    setActivities(prev => [newItem, ...prev].slice(0, 500));
  }, []);

  const clearActivities = useCallback(() => setActivities([]), []);

  const value = useMemo(() => ({ activities, addActivity, clearActivities }), [activities, addActivity, clearActivities]);

  return (
    <AdminActivityContext.Provider value={value}>
      {children}
    </AdminActivityContext.Provider>
  );
}

export function useAdminActivity() {
  const ctx = useContext(AdminActivityContext);
  if (!ctx) {
    throw new Error('useAdminActivity must be used within an AdminActivityProvider');
  }
  return ctx;
}