// Entry log screen: list stored entries, newest first, and export them as CSV.

import { formatDateTime } from '../lib/datetime';
import { listEntries, toCsv, type EntryRecord } from '../services/entry-log';
import { createLocalStorageStore } from '../services/storage';
import { el } from './dom';
import { icon } from './icons';
import { pageTitle } from './page-title';

const COLUMNS = ['Time', 'Result', 'Reason', 'Pass ID', 'Building', 'Visitor name'];
const SHORT_ID_LENGTH = 8;

function downloadCsv(csv: string): void {
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  el('a', { href: url, download: 'entry-log.csv' }).click();
  URL.revokeObjectURL(url);
}

/** A value that may be missing (for example for a link with no readable pass). */
function optionalCell(value: string | undefined, className = ''): HTMLElement {
  return value
    ? el('td', { class: className }, value)
    : el('td', { class: className }, el('span', { 'aria-hidden': 'true', class: 'muted' }, '—'), el('span', { class: 'sr-only' }, 'Not known'));
}

function resultCell(result: EntryRecord['result']): HTMLElement {
  const granted = result === 'granted';
  return el('td', {}, el('span', { class: `result ${result}` }, icon(granted ? 'check' : 'cross', 'icon icon-sm'), granted ? 'Granted' : 'Denied'));
}

function entryRow(entry: EntryRecord): HTMLElement {
  return el(
    'tr',
    {},
    el('td', { class: 'nowrap' }, el('time', { datetime: entry.at }, formatDateTime(entry.at))),
    resultCell(entry.result),
    el('td', { class: 'nowrap' }, entry.reason),
    optionalCell(entry.passId?.slice(0, SHORT_ID_LENGTH), 'mono'),
    optionalCell(entry.building, 'nowrap'),
    optionalCell(entry.visitorName, 'nowrap'),
  );
}

function emptyState(): HTMLElement {
  return el(
    'div',
    { class: 'empty' },
    icon('inbox', 'icon icon-lg'),
    el('p', { class: 'empty-title' }, 'No entries yet'),
    el('p', { class: 'muted' }, 'Entries appear here when a guard scans a pass.'),
  );
}

export function renderLogView(root: HTMLElement): void {
  const entries = listEntries(createLocalStorageStore());
  const newestFirst = [...entries].reverse();

  const exportButton = el('button', { type: 'button', class: 'secondary' }, 'Export CSV');
  exportButton.disabled = entries.length === 0;
  exportButton.addEventListener('click', () => downloadCsv(toCsv(entries)));

  const table = el(
    'table',
    {},
    el('caption', { class: 'sr-only' }, 'Entry log'),
    el('thead', {}, el('tr', {}, ...COLUMNS.map((name) => el('th', { scope: 'col' }, name)))),
    el('tbody', {}, ...newestFirst.map(entryRow)),
  );

  const subtitle =
    entries.length === 0
      ? 'Each pass check at the lobby is listed here.'
      : `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}, newest first.`;

  root.replaceChildren(
    pageTitle('clipboardList', 'Entry log', subtitle),
    el('div', { class: 'toolbar' }, exportButton),
    el('div', { class: 'card table-card' }, entries.length === 0 ? emptyState() : table),
  );
}
