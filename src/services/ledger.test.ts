import { describe, expect, it } from 'vitest';
import { isPassUsed } from '../domain/ledger';
import { markPassUsed, readLedger } from './ledger';
import { createMemoryStore } from './storage';

describe('ledger', () => {
  it('is empty for a new store', () => {
    expect(readLedger(createMemoryStore())).toEqual({});
  });

  it('records a used pass and keeps earlier ones', () => {
    const store = createMemoryStore();
    markPassUsed(store, 'a', '2026-06-02T10:00:00.000Z');
    markPassUsed(store, 'b', '2026-06-02T11:00:00.000Z');
    const ledger = readLedger(store);
    expect(isPassUsed(ledger, 'a')).toBe(true);
    expect(isPassUsed(ledger, 'b')).toBe(true);
    expect(isPassUsed(ledger, 'c')).toBe(false);
    expect(ledger['a']).toBe('2026-06-02T10:00:00.000Z');
  });
});
