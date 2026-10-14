// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { renderPassView } from './pass-view';

function open(): HTMLElement {
  const root = document.createElement('div');
  document.body.replaceChildren(root);
  renderPassView(root);
  return root;
}

function submit(root: HTMLElement): void {
  root.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true }));
}

function type(root: HTMLElement, selector: string, value: string): void {
  (root.querySelector(selector) as HTMLInputElement | HTMLSelectElement).value = value;
}

describe('renderPassView', () => {
  beforeEach(() => document.body.replaceChildren());

  it('shows the four fields and a Generate QR code button', () => {
    const root = open();
    expect(root.querySelector('h1')?.textContent).toBe('New visitor pass');
    expect([...root.querySelectorAll('label')].map((label) => label.textContent)).toEqual([
      'Building',
      'Visitor name',
      'Valid from',
      'Valid until',
    ]);
    expect(root.querySelector('button[type=submit]')?.textContent).toBe('Generate QR code');
  });

  it('shows an error next to each invalid field and focuses the first one', () => {
    const root = open();
    submit(root);

    expect(root.querySelector('#building-error')?.textContent).toContain('Choose a building.');
    expect(root.querySelector('#visitor-name-error')?.textContent).toContain('Name must be 2 to 40 characters.');
    expect(root.querySelector('#valid-from-error')?.hasAttribute('hidden')).toBe(true);
    expect(root.querySelector('#building')?.getAttribute('aria-invalid')).toBe('true');
    expect(root.querySelector('[role=alert]')?.textContent).toContain('Fix the 2 fields marked below.');
    expect(document.activeElement?.id).toBe('building');
  });

  it('shows the end-date error next to the Valid until field', () => {
    const root = open();
    type(root, '#building', 'Annex');
    type(root, '#visitor-name', 'Pat Visitor');
    type(root, '#valid-from', '2030-06-02T10:00');
    type(root, '#valid-until', '2030-06-01T10:00');
    submit(root);

    expect(root.querySelector('#valid-until-error')?.textContent).toContain('End must not be before start.');
    expect(root.querySelector('[role=alert]')?.textContent).toContain('Fix the field marked below.');
  });
});
