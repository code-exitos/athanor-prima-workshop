// The centred page heading used by the pass and log screens: icon badge, title, accent line, subtitle.

import { el } from './dom';
import { icon, type IconName } from './icons';

export function pageTitle(iconName: IconName, title: string, subtitle: string): HTMLElement {
  return el(
    'div',
    { class: 'page-title' },
    el('span', { class: 'badge' }, icon(iconName, 'icon icon-lg')),
    el('h1', {}, title),
    el('span', { class: 'accent-line', 'aria-hidden': 'true' }),
    el('p', { class: 'subtitle' }, subtitle),
  );
}
