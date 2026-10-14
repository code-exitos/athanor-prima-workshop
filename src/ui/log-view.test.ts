// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { ENTRIES_KEY } from '../services/entry-log';
import { renderLogView } from './log-view';

function open(): HTMLElement {
  const root = document.createElement('div');
  document.body.replaceChildren(root);
  renderLogView(root);
  return root;
}

describe('renderLogView', () => {
  beforeEach(() => localStorage.clear());

  it('says "No entries yet" and disables Export CSV when the log is empty', () => {
    const root = open();
    expect(root.textContent).toContain('No entries yet');
    expect(root.querySelector('table')).toBeNull();
    expect(root.querySelector<HTMLButtonElement>('button.secondary')?.disabled).toBe(true);
  });

  it('lists entries newest first with a text result', () => {
    localStorage.setItem(
      ENTRIES_KEY,
      JSON.stringify([
        { at: '2026-06-02T10:00:00.000Z', result: 'granted', reason: 'Pass is valid', passId: '7f3a2c91-0000-4000-8000-000000000001', building: 'Annex', visitorName: 'Pat Visitor' },
        { at: '2026-06-02T11:00:00.000Z', result: 'denied', reason: 'Pass has expired' },
      ]),
    );
    const root = open();

    const rows = [...root.querySelectorAll('tbody tr')];
    expect(rows).toHaveLength(2);
    expect(rows[0]?.textContent).toContain('Denied');
    expect(rows[0]?.textContent).toContain('Pass has expired');
    expect(rows[1]?.textContent).toContain('Granted');
    expect(rows[1]?.textContent).toContain('Pat Visitor');
    expect(rows[1]?.textContent).toContain('7f3a2c91');
    expect(rows[1]?.textContent).not.toContain('7f3a2c91-0000');
    expect(root.querySelector<HTMLButtonElement>('button.secondary')?.disabled).toBe(false);
  });

  it('shows user text as text, not as HTML', () => {
    localStorage.setItem(
      ENTRIES_KEY,
      JSON.stringify([{ at: '2026-06-02T10:00:00.000Z', result: 'granted', reason: 'Pass is valid', visitorName: '<img src=x onerror=alert(1)>' }]),
    );
    const root = open();
    expect(root.querySelector('tbody img')).toBeNull();
    expect(root.querySelector('tbody')?.textContent).toContain('<img src=x onerror=alert(1)>');
  });
});
