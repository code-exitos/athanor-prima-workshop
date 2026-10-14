import { describe, expect, it } from 'vitest';
import { localInputToUtcIso } from './datetime';

describe('localInputToUtcIso', () => {
  it('returns a UTC ISO string for a valid value', () => {
    const iso = localInputToUtcIso('2026-06-02T10:00');
    expect(iso).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.000Z$/);
    expect(iso).toBe(new Date('2026-06-02T10:00').toISOString());
  });

  it('returns null for empty or invalid values', () => {
    expect(localInputToUtcIso('')).toBeNull();
    expect(localInputToUtcIso('nope')).toBeNull();
  });
});
