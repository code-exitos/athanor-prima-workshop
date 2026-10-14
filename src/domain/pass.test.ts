import { describe, expect, it } from 'vitest';
import { BUILDINGS, createPass, type PassInput } from './pass';

const NOW = new Date('2026-06-01T12:00:00.000Z');

const validInput: PassInput = {
  building: 'Main Tower',
  validFrom: '2026-06-02T10:00:00.000Z',
  validUntil: '2026-06-03T10:00:00.000Z',
  visitorName: '  Pat Visitor ',
};

describe('createPass', () => {
  it('creates a pass from valid input', () => {
    const result = createPass(validInput, NOW);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.pass).toMatchObject({
        v: 1,
        building: 'Main Tower',
        validFrom: '2026-06-02T10:00:00.000Z',
        validUntil: '2026-06-03T10:00:00.000Z',
        visitorName: 'Pat Visitor',
      });
      expect(result.pass.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    }
  });

  it('offers four buildings', () => {
    expect(BUILDINGS).toEqual(['Main Tower', 'East Wing', 'West Wing', 'Annex']);
  });

  it('rejects an unknown or empty building', () => {
    expect(createPass({ ...validInput, building: '' }, NOW)).toEqual({ ok: false, errors: ['Choose a building.'] });
    expect(createPass({ ...validInput, building: 'Moon Base' }, NOW)).toEqual({ ok: false, errors: ['Choose a building.'] });
  });

  it('rejects a name that is too short or too long after trimming', () => {
    const message = ['Name must be 2 to 40 characters.'];
    expect(createPass({ ...validInput, visitorName: ' A ' }, NOW)).toEqual({ ok: false, errors: message });
    expect(createPass({ ...validInput, visitorName: 'x'.repeat(41) }, NOW)).toEqual({ ok: false, errors: message });
    expect(createPass({ ...validInput, visitorName: 'x'.repeat(40) }, NOW).ok).toBe(true);
  });

  it('rejects an end before the start', () => {
    const result = createPass({ ...validInput, validUntil: '2026-06-01T10:00:00.000Z' }, NOW);
    expect(result).toEqual({ ok: false, errors: ['End must not be before start.'] });
  });

  it('rejects an end in the past', () => {
    const result = createPass({ ...validInput, validFrom: '2026-05-01T10:00:00.000Z', validUntil: '2026-05-02T10:00:00.000Z' }, NOW);
    expect(result).toEqual({ ok: false, errors: ['End must not be in the past.'] });
  });

  it('accepts an end equal to the start', () => {
    const same = '2026-06-02T10:00:00.000Z';
    expect(createPass({ ...validInput, validFrom: same, validUntil: same }, NOW).ok).toBe(true);
  });
});
