import { describe, expect, it } from 'vitest';
import { isBlocked } from './blocklist';

describe('isBlocked', () => {
  const blocklist = ['Mr Nobody', 'XX'];

  it('returns true for an exact match', () => {
    expect(isBlocked('XX', blocklist)).toBe(true);
  });

  it('returns false for a name that is not listed', () => {
    expect(isBlocked('Pat Visitor', blocklist)).toBe(false);
  });

  it('returns false for an empty blocklist', () => {
    expect(isBlocked('XX', [])).toBe(false);
  });
});
