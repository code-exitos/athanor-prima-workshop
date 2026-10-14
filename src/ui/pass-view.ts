// Administrator screen: choose a building, the dates and a visitor name, then show the pass as a QR code.

import QRCode from 'qrcode';
import { DEMO_KEYS } from '../data/demo-keys';
import { BUILDINGS, createPass, type FieldErrors, type FieldName, type Pass } from '../domain/pass';
import { formatDateTime, localInputToUtcIso, utcToLocalInput } from '../lib/datetime';
import { buildVerifyUrl } from '../lib/urls';
import { importPrivateKey, signPass } from '../services/signing';
import { el, labeledField, type Field } from './dom';
import { icon } from './icons';
import { pageTitle } from './page-title';

const DAY_MS = 24 * 60 * 60 * 1000;
const FIELD_ORDER: readonly FieldName[] = ['building', 'visitorName', 'validFrom', 'validUntil'];
const IDS: Record<FieldName, string> = {
  building: 'building',
  visitorName: 'visitor-name',
  validFrom: 'valid-from',
  validUntil: 'valid-until',
};

async function qrCard(pass: Pass): Promise<HTMLElement> {
  const token = await signPass(pass, await importPrivateKey(DEMO_KEYS.privateKey));
  const url = buildVerifyUrl(window.location.origin, window.location.pathname, token);
  const description =
    `QR code for a visitor pass. Visitor: ${pass.visitorName}. Building: ${pass.building}. ` +
    `Valid from ${formatDateTime(pass.validFrom)} until ${formatDateTime(pass.validUntil)}. ` +
    'Scan it with a phone camera to check the pass.';

  return el(
    'section',
    { class: 'card qr-card', 'aria-labelledby': 'qr-heading' },
    el('h2', { id: 'qr-heading', class: 'sr-only' }, 'Visitor pass QR code'),
    el('img', { class: 'qr', alt: description, src: await QRCode.toDataURL(url, { margin: 1, width: 320 }) }),
    el('p', { class: 'note' }, 'In a full version, this QR code could be sent to the visitor by email.'),
  );
}

function alertBox(message: string): HTMLElement {
  return el('div', { class: 'alert', role: 'alert' }, icon('alert'), el('p', {}, message));
}

export function renderPassView(root: HTMLElement): void {
  const now = new Date();
  const controls: Record<FieldName, HTMLInputElement | HTMLSelectElement> = {
    building: el(
      'select',
      { id: IDS.building },
      el('option', { value: '' }, 'Choose a building'),
      ...BUILDINGS.map((building) => el('option', { value: building }, building)),
    ),
    visitorName: el('input', { id: IDS.visitorName, type: 'text', autocomplete: 'off' }),
    validFrom: el('input', { id: IDS.validFrom, type: 'datetime-local', value: utcToLocalInput(now) }),
    validUntil: el('input', { id: IDS.validUntil, type: 'datetime-local', value: utcToLocalInput(new Date(now.getTime() + DAY_MS)) }),
  };
  const fields: Record<FieldName, Field> = {
    building: labeledField(IDS.building, 'Building', controls.building),
    visitorName: labeledField(IDS.visitorName, 'Visitor name', controls.visitorName, 'Use a fake name for this demo'),
    validFrom: labeledField(IDS.validFrom, 'Valid from', controls.validFrom, 'Date and time'),
    validUntil: labeledField(IDS.validUntil, 'Valid until', controls.validUntil, 'Date and time'),
  };

  const banner = el('div', { class: 'banner' });
  const status = el('p', { role: 'status', class: 'sr-only' });
  const submit = el('button', { type: 'submit', class: 'wide' }, 'Generate QR code');
  const form = el(
    'form',
    { class: 'card form-grid', novalidate: '' },
    fields.building.element,
    fields.visitorName.element,
    fields.validFrom.element,
    fields.validUntil.element,
    submit,
  );
  const body = el('div', { class: 'content' }, banner, form);

  function showErrors(errors: FieldErrors): void {
    const invalid = FIELD_ORDER.filter((name) => errors[name] !== undefined);
    FIELD_ORDER.forEach((name) => fields[name].setError(errors[name]));
    const first = invalid[0];
    if (first === undefined) {
      banner.replaceChildren();
      return;
    }
    banner.replaceChildren(alertBox(`The pass was not created. Fix ${invalid.length === 1 ? 'the field' : `the ${invalid.length} fields`} marked below.`));
    controls[first].focus();
  }

  async function generate(pass: Pass): Promise<void> {
    submit.disabled = true;
    submit.replaceChildren(icon('spinner', 'icon spin'), 'Generating QR code…');
    try {
      body.replaceChildren(await qrCard(pass));
      status.textContent = 'QR code created.';
    } catch {
      submit.disabled = false;
      submit.textContent = 'Generate QR code';
      banner.replaceChildren(alertBox('Something went wrong. The QR code was not created. Try again.'));
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const created = createPass(
      {
        building: controls.building.value,
        visitorName: controls.visitorName.value,
        validFrom: localInputToUtcIso(controls.validFrom.value) ?? '',
        validUntil: localInputToUtcIso(controls.validUntil.value) ?? '',
      },
      new Date(),
    );
    showErrors(created.ok ? {} : created.errors);
    if (created.ok) {
      void generate(created.pass);
    }
  });

  root.replaceChildren(
    pageTitle('qrCode', 'New visitor pass', 'Fill in the details. The visitor shows the QR code at the lobby.'),
    status,
    body,
  );
}
