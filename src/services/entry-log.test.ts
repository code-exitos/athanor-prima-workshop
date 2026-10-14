import { describe, expect, it } from 'vitest';
import { appendEntry, listEntries, toCsv, type EntryRecord } from './entry-log';
import { createMemoryStore } from './storage';

const granted: EntryRecord = {
  at: '2026-06-02T10:00:00.000Z',
  result: 'granted',
  reason: 'Valid pass',
  passId: 'p1',
  unit: 'Unit 01',
  visitorAlias: 'JR',
};
const denied: EntryRecord = { at: '2026-06-02T11:00:00.000Z', result: 'denied', reason: 'Invalid signature' };

describe('entry log', () => {
  it('is empty for a new store', () => {
    expect(listEntries(createMemoryStore())).toEqual([]);
  });

  it('appends entries in order', () => {
    const store = createMemoryStore();
    appendEntry(store, granted);
    appendEntry(store, denied);
    expect(listEntries(store)).toEqual([granted, denied]);
  });
});

describe('toCsv', () => {
  it('writes a header only for no entries', () => {
    expect(toCsv([])).toBe('at,result,reason,passId,unit,visitorAlias\n');
  });

  it('writes one row per entry and leaves missing fields empty', () => {
    expect(toCsv([granted, denied])).toBe(
      [
        'at,result,reason,passId,unit,visitorAlias',
        '2026-06-02T10:00:00.000Z,granted,Valid pass,p1,Unit 01,JR',
        '2026-06-02T11:00:00.000Z,denied,Invalid signature,,,',
        '',
      ].join('\n'),
    );
  });

  it('quotes cells with commas, quotes and newlines', () => {
    const csv = toCsv([{ ...denied, reason: 'a,"b"\nc' }]);
    expect(csv).toContain('"a,""b""\nc"');
  });

  it('neutralises spreadsheet formulas', () => {
    const csv = toCsv([{ ...denied, visitorAlias: '=HYPERLINK("x")' }]);
    expect(csv).toContain(`"'=HYPERLINK(""x"")"`);
  });
});
