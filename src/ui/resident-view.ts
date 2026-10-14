// Resident screen: create a pass, sign it, show the QR code and the verify link.

import QRCode from 'qrcode';
import { UNITS } from '../data/units';
import { DEMO_KEYS } from '../data/demo-keys';
import { createPass, type PassType } from '../domain/pass';
import { localInputToUtcIso } from '../lib/datetime';
import { buildVerifyUrl } from '../lib/urls';
import { importPrivateKey, signPass } from '../services/signing';
import { el, labeledField } from './dom';

function unitSelect(): HTMLSelectElement {
  return el('select', { id: 'unit', name: 'unit', required: '' }, ...UNITS.map((unit) => el('option', { value: unit }, unit)));
}

function typeSelect(): HTMLSelectElement {
  return el(
    'select',
    { id: 'type', name: 'type' },
    el('option', { value: 'one-time' }, 'One-time'),
    el('option', { value: 'date-range' }, 'Date range'),
  );
}

async function renderResult(container: HTMLElement, token: string): Promise<void> {
  const url = buildVerifyUrl(window.location.origin, window.location.pathname, token);
  const qr = el('img', {
    class: 'qr',
    alt: 'QR code with the verify link for this pass',
    src: await QRCode.toDataURL(url, { margin: 2, width: 280 }),
  });
  const status = el('p', { role: 'status', class: 'status' });
  const copy = el('button', { type: 'button' }, 'Copy verify link');
  copy.addEventListener('click', () => {
    navigator.clipboard.writeText(url).then(
      () => (status.textContent = 'Link copied.'),
      () => (status.textContent = 'Could not copy. Select the link and copy it by hand.'),
    );
  });
  const linkText = el('p', { class: 'link-text' }, url);
  container.replaceChildren(el('h2', {}, 'Pass created'), qr, linkText, copy, status);
}

export function renderResidentView(root: HTMLElement): void {
  const alias = el('input', {
    id: 'alias',
    name: 'alias',
    type: 'text',
    autocomplete: 'off',
    required: '',
  });
  const validFrom = el('input', { id: 'from', name: 'from', type: 'datetime-local', required: '' });
  const validUntil = el('input', { id: 'until', name: 'until', type: 'datetime-local', required: '' });
  const unit = unitSelect();
  const type = typeSelect();
  const formError = el('p', { class: 'field-error', role: 'alert' });
  const result = el('section', { 'aria-live': 'polite' });

  const form = el(
    'form',
    { novalidate: '' },
    labeledField('unit', 'Unit', unit, 'unit-error'),
    labeledField('alias', 'Visitor alias (nickname or initials, no legal names)', alias, 'alias-error'),
    labeledField('type', 'Pass type', type, 'type-error'),
    labeledField('from', 'Valid from', validFrom, 'from-error'),
    labeledField('until', 'Valid until', validUntil, 'until-error'),
    formError,
    el('button', { type: 'submit' }, 'Create pass'),
  );

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const created = createPass(
      {
        unit: unit.value,
        type: type.value as PassType,
        validFrom: localInputToUtcIso(validFrom.value) ?? '',
        validUntil: localInputToUtcIso(validUntil.value) ?? '',
        visitorAlias: alias.value,
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
      .then((token) => renderResult(result, token))
      .catch(() => {
        formError.textContent = 'Could not create the pass. Try again.';
      });
  });

  root.replaceChildren(el('h1', {}, 'New visitor pass'), form, result);
}
