// Verify screen. Verification (F-03) is not built yet, so this shows a placeholder panel.

import { el } from './dom';

export function renderVerifyView(root: HTMLElement): void {
  root.replaceChildren(
    el(
      'section',
      { class: 'panel' },
      el('h1', {}, 'Verification is not implemented yet'),
      el('p', {}, 'This page will show ACCESS GRANTED or ACCESS DENIED once verification is built.'),
    ),
  );
}
