import { describe, expect, it } from 'vitest';
import { localInputToUtcIso, utcToLocalInput } from './datetime';

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

describe('utcToLocalInput', () => {
  it('round-trips with localInputToUtcIso to the minute', () => {
    const date = new Date('2026-06-02T10:34:56.789Z');
    const local = utcToLocalInput(date);
    expect(local).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
    expect(localInputToUtcIso(local)).toBe(new Date(Math.floor(date.getTime() / 60000) * 60000).toISOString());
  });
});
