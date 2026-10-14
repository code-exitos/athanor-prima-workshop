// Used-pass ledger kept in a KeyValueStore. Single device only.

import type { Ledger } from '../domain/ledger';
import type { KeyValueStore } from './storage';

export const LEDGER_KEY = 'na.ledger.v1';

export function readLedger(store: KeyValueStore): Ledger {
  const raw = store.getItem(LEDGER_KEY);
  return raw === null ? {} : (JSON.parse(raw) as Ledger);
}

export function markPassUsed(store: KeyValueStore, passId: string, usedAt: string): void {
  const next: Ledger = { ...readLedger(store), [passId]: usedAt };
  store.setItem(LEDGER_KEY, JSON.stringify(next));
}
