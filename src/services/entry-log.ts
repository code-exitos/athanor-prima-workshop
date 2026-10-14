// Entry log kept in a KeyValueStore, with CSV export. Single device only.

import type { KeyValueStore } from './storage';

export const ENTRIES_KEY = 'na.entries.v1';

export interface EntryRecord {
  readonly at: string;
  readonly result: 'granted' | 'denied';
  readonly reason: string;
  readonly passId?: string;
  readonly unit?: string;
  readonly visitorAlias?: string;
}

const CSV_COLUMNS = ['at', 'result', 'reason', 'passId', 'unit', 'visitorAlias'] as const;

export function listEntries(store: KeyValueStore): EntryRecord[] {
  const raw = store.getItem(ENTRIES_KEY);
  return raw === null ? [] : (JSON.parse(raw) as EntryRecord[]);
}

export function appendEntry(store: KeyValueStore, entry: EntryRecord): void {
  store.setItem(ENTRIES_KEY, JSON.stringify([...listEntries(store), entry]));
}

/** Quotes a CSV cell. Cells that start with a formula character get a leading quote mark. */
function toCsvCell(value: string): string {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

export function toCsv(entries: readonly EntryRecord[]): string {
  const rows = entries.map((entry) => CSV_COLUMNS.map((column) => toCsvCell(entry[column] ?? '')).join(','));
  return [CSV_COLUMNS.join(','), ...rows].join('\n') + '\n';
}
