import { describe, expect, it } from 'vitest';
import { createLocalStorageStore, createMemoryStore } from './storage';

describe('createMemoryStore', () => {
  it('returns null for a missing key and the value after setItem', () => {
    const store = createMemoryStore();
    expect(store.getItem('a')).toBeNull();
    store.setItem('a', '1');
    expect(store.getItem('a')).toBe('1');
  });

  it('starts with initial values', () => {
    expect(createMemoryStore({ a: '1' }).getItem('a')).toBe('1');
  });
});

describe('createLocalStorageStore', () => {
  it('delegates to the given Storage', () => {
    const data = new Map<string, string>();
    const fake = {
      getItem: (key: string) => data.get(key) ?? null,
      setItem: (key: string, value: string) => void data.set(key, value),
    } as Storage;
    const store = createLocalStorageStore(fake);
    store.setItem('k', 'v');
    expect(store.getItem('k')).toBe('v');
    expect(data.get('k')).toBe('v');
  });
});
