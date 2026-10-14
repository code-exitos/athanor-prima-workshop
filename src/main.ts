// App entry: renders the screen for the current hash route.

import './ui/styles.css';
import { el } from './ui/dom';
import { renderLogView } from './ui/log-view';
import { renderResidentView } from './ui/resident-view';
import { parseRoute } from './ui/router';
import { renderVerifyView } from './ui/verify-view';

const app = document.getElementById('app');
if (!app) {
  throw new Error('Missing #app element');
}
const root = app;

function render(): void {
  const route = parseRoute(window.location.hash);
  const content = el('main', { id: 'main' });
  const nav = el(
    'nav',
    { 'aria-label': 'Main' },
    el('a', { href: '#/' }, 'New pass'),
    el('a', { href: '#/log' }, 'Entry log'),
  );
  switch (route.name) {
    case 'resident':
      renderResidentView(content);
      break;
    case 'log':
      renderLogView(content);
      break;
    case 'verify':
      renderVerifyView(content);
      break;
    default:
      content.replaceChildren(el('h1', {}, 'Page not found'), el('a', { href: '#/' }, 'Go to New pass'));
  }
  root.replaceChildren(...(route.name === 'verify' ? [content] : [nav, content]));
}

window.addEventListener('hashchange', render);
render();
