// Administrator screen: choose a building, the dates and a visitor name, then show the pass as a QR code.

import QRCode from 'qrcode';
import { DEMO_KEYS } from '../data/demo-keys';
import { BUILDINGS, createPass } from '../domain/pass';
import { localInputToUtcIso, utcToLocalInput } from '../lib/datetime';
import { buildVerifyUrl } from '../lib/urls';
import { importPrivateKey, signPass } from '../services/signing';
import { el, labeledField } from './dom';

const DAY_MS = 24 * 60 * 60 * 1000;

function buildingSelect(): HTMLSelectElement {
  return el(
    'select',
    { id: 'building', name: 'building', required: '' },
    ...BUILDINGS.map((building) => el('option', { value: building }, building)),
  );
}

async function renderResult(container: HTMLElement, token: string, building: string, visitorName: string): Promise<void> {
  const url = buildVerifyUrl(window.location.origin, window.location.pathname, token);
  const qr = el('img', {
    class: 'qr',
    alt: 'QR code for this pass. A guard scans it to open the verify page.',
    src: await QRCode.toDataURL(url, { margin: 2, width: 320 }),
  });
  container.replaceChildren(
    el('h2', {}, 'QR code ready'),
    el('p', { class: 'summary' }, `${visitorName} · ${building}`),
    qr,
    el('p', { class: 'hint' }, 'To try the guard side, scan this QR code with your phone.'),
    el('p', { class: 'note' }, 'In a full version, this QR code could be sent to the visitor by email.'),
  );
}

export function renderPassView(root: HTMLElement): void {
  const now = new Date();
  const visitorName = el('input', { id: 'visitor', name: 'visitor', type: 'text', autocomplete: 'off', required: '' });
  const validFrom = el('input', { id: 'from', name: 'from', type: 'datetime-local', required: '', value: utcToLocalInput(now) });
  const validUntil = el('input', {
    id: 'until',
    name: 'until',
    type: 'datetime-local',
    required: '',
    value: utcToLocalInput(new Date(now.getTime() + DAY_MS)),
  });
  const building = buildingSelect();
  const formError = el('p', { class: 'field-error', role: 'alert' });
  const result = el('section', { 'aria-live': 'polite', class: 'pass-result' });

  const form = el(
    'form',
    { novalidate: '', class: 'card' },
    labeledField('building', 'Building', building, 'building-error'),
    labeledField('visitor', 'Visitor name (use a fake name for this demo)', visitorName, 'visitor-error'),
    labeledField('from', 'Valid from', validFrom, 'from-error'),
    labeledField('until', 'Valid until', validUntil, 'until-error'),
    formError,
    el('button', { type: 'submit', class: 'wide' }, 'Generate QR code'),
  );

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const created = createPass(
      {
        building: building.value,
        validFrom: localInputToUtcIso(validFrom.value) ?? '',
        validUntil: localInputToUtcIso(validUntil.value) ?? '',
        visitorName: visitorName.value,
      },
      new Date(),
    );
    if (!created.ok) {
      formError.textContent = created.errors.join(' ');
      result.replaceChildren();
      return;
    }
    formError.textContent = '';
    importPrivateKey(DEMO_KEYS.privateKey)
      .then((key) => signPass(created.pass, key))
      .then((token) => renderResult(result, token, created.pass.building, created.pass.visitorName))
      .catch(() => {
        formError.textContent = 'Could not create the pass. Try again.';
      });
  });

  root.replaceChildren(
    el('h1', {}, 'New visitor pass'),
    el('p', { class: 'lead' }, 'Choose the building, the dates and the visitor. The app shows a QR code for the guard to scan.'),
    form,
    result,
  );
}
