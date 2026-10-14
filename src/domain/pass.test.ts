import { describe, expect, it } from 'vitest';
import { createPass, type PassInput } from './pass';

const NOW = new Date('2026-06-01T12:00:00.000Z');

const validInput: PassInput = {
  unit: 'Casa 01',
  type: 'date-range',
  validFrom: '2026-06-02T10:00:00.000Z',
  validUntil: '2026-06-03T10:00:00.000Z',
  visitorAlias: '  Tío Beto ',
};

describe('createPass', () => {
  it('creates a pass from valid input', () => {
    const result = createPass(validInput, NOW);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.pass).toMatchObject({
        v: 1,
        unit: 'Casa 01',
        type: 'date-range',
        validFrom: '2026-06-02T10:00:00.000Z',
        validUntil: '2026-06-03T10:00:00.000Z',
        visitorAlias: 'Tío Beto',
      });
      expect(result.pass.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    }
  });

  it('rejects an end before the start', () => {
    const result = createPass({ ...validInput, validUntil: '2026-06-01T10:00:00.000Z' }, NOW);
    expect(result).toEqual({ ok: false, errors: ['End must not be before start.'] });
  });
});
