export type AuditSeverity = 'info' | 'warning' | 'error';

export interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, any>;
  timestamp: string; // ISO
  severity?: AuditSeverity;
}

const STORAGE_KEY = 'admin_audit_log';

function readAll(): AuditEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as AuditEntry[];
  } catch {
    return [];
  }
}

function writeAll(entries: AuditEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // ignore write errors (e.g., storage quota)
  }
}

function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

const listeners = new Set<(entries: AuditEntry[]) => void>();

function notify(): void {
  const entries = getAllActions();
  listeners.forEach(l => {
    try { l(entries); } catch {}
  });
}

export function logAction(params: {
  actor?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, any>;
  severity?: AuditSeverity;
}): AuditEntry {
  const entry: AuditEntry = {
    id: generateId(),
    actor: params.actor || 'Administrateur',
    action: params.action,
    entityType: params.entityType,
    entityId: params.entityId,
    metadata: params.metadata,
    timestamp: new Date().toISOString(),
    severity: params.severity || 'info',
  };

  const all = readAll();
  // prepend newest
  all.unshift(entry);
  writeAll(all);
  notify();
  return entry;
}

export function getRecentActions(limit = 5): AuditEntry[] {
  const all = readAll();
  return all.slice(0, Math.max(0, limit));
}

export function getAllActions(): AuditEntry[] {
  return readAll();
}

export function clearAuditLog(): void {
  writeAll([]);
  notify();
}

export function subscribe(listener: (entries: AuditEntry[]) => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}