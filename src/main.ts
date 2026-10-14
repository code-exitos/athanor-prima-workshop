// App entry: renders the screen for the current route (hash route, or the ?p= verify link).

import './ui/styles.css';
import { el } from './ui/dom';
import { renderHeader } from './ui/header';
import { renderLogView } from './ui/log-view';
import { renderPassView } from './ui/pass-view';
import { parseRoute, type Route } from './ui/router';
import { renderVerifyView } from './ui/verify-view';

const app = document.getElementById('app');
if (!app) {
  throw new Error('Missing #app element');
}
const root = app;

function renderScreen(route: Route, content: HTMLElement): void {
  switch (route.name) {
    case 'pass':
      return renderPassView(content);
    case 'log':
      return renderLogView(content);
    case 'verify':
      return renderVerifyView(content);
    case 'not-found':
      return content.replaceChildren(el('h1', {}, 'Page not found'), el('a', { href: '#/' }, 'Go to New pass'));
  }
}

function render(): void {
  const route = parseRoute(window.location.hash, window.location.search);
  const content = el('main', { id: 'main', class: 'page' });
  renderScreen(route, content);

  // The guard's verify screen has no header, so the guard sees only the result.
  root.replaceChildren(
    route.name === 'verify'
      ? el('div', { class: 'plain' }, content)
      : el('div', { class: 'backdrop' }, renderHeader(route, render), content),
  );
}

window.addEventListener('hashchange', render);
render();
