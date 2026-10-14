// Entry log screen: list stored entries and export them as CSV.

import { listEntries, toCsv } from '../services/entry-log';
import { createLocalStorageStore } from '../services/storage';
import { el } from './dom';

const COLUMNS = ['Time', 'Result', 'Reason', 'Unit', 'Alias'];

function downloadCsv(csv: string): void {
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = el('a', { href: url, download: 'entry-log.csv' });
  link.click();
  URL.revokeObjectURL(url);
}

export function renderLogView(root: HTMLElement): void {
  const entries = listEntries(createLocalStorageStore());

  const exportButton = el('button', { type: 'button' }, 'Export CSV');
  exportButton.disabled = entries.length === 0;
  exportButton.addEventListener('click', () => downloadCsv(toCsv(entries)));

  const body =
    entries.length === 0
      ? el('p', {}, 'No entries yet')
      : el(
          'table',
          {},
          el('thead', {}, el('tr', {}, ...COLUMNS.map((name) => el('th', { scope: 'col' }, name)))),
          el(
            'tbody',
            {},
            ...entries.map((entry) =>
              el(
                'tr',
                {},
                el('td', {}, entry.at),
                el('td', {}, entry.result),
                el('td', {}, entry.reason),
                el('td', {}, entry.unit ?? ''),
                el('td', {}, entry.visitorAlias ?? ''),
              ),
            ),
          ),
        );

  root.replaceChildren(el('h1', {}, 'Entry log'), exportButton, body);
}
