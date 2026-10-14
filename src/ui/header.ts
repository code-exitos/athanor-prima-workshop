// Top bar for the administrator screens: brand on the left, the two screens as a pill menu.

import type { Route } from './router';
import { el } from './dom';
import { icon } from './icons';

function menuLink(href: string, label: string, current: boolean): HTMLElement {
  return el('li', {}, el('a', current ? { href, 'aria-current': 'page' } : { href }, label));
}

/** `onNewPass` runs when the New pass screen is already open and its link is clicked, so the form starts fresh. */
export function renderHeader(route: Route, onNewPass: () => void): HTMLElement {
  const startFresh = (): void => {
    if (route.name === 'pass') {
      onNewPass();
    }
  };
  const brand = el(
    'a',
    { href: '#/', class: 'brand' },
    el('span', { class: 'brand-mark' }, icon('building')),
    el('span', {}, el('strong', {}, 'Contoso HQ'), el('span', { class: 'dot' }, ' · '), 'Visitor access'),
  );
  brand.addEventListener('click', startFresh);

  const menu = el(
    'ul',
    { class: 'menu' },
    menuLink('#/', 'New pass', route.name === 'pass'),
    menuLink('#/log', 'Entry log', route.name === 'log'),
  );
  menu.firstElementChild?.firstElementChild?.addEventListener('click', startFresh);

  return el('header', { class: 'topbar' }, el('div', { class: 'topbar-inner' }, brand, el('nav', { 'aria-label': 'Main' }, menu)));
}
