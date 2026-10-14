// Small DOM helpers. Text is always set with textContent, never innerHTML.

import { icon } from './icons';

type Attributes = Readonly<Record<string, string>>;

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attributes: Attributes = {},
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }
  for (const child of children) {
    element.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return element;
}

export interface Field {
  readonly element: HTMLElement;
  /** Shows the message next to the field, or clears it when the message is undefined. */
  setError(message: string | undefined): void;
}

/** A visible label, the control, and a text error next to it. The control's id must be `id`. */
export function labeledField(id: string, label: string, control: HTMLElement, hint?: string): Field {
  const errorId = `${id}-error`;
  const error = el('p', { id: errorId, class: 'field-error', hidden: '' });
  const children: (Node | string)[] = [el('label', { for: id }, label)];
  if (hint) {
    children.push(el('p', { class: 'field-hint' }, hint));
  }
  children.push(control, error);

  return {
    element: el('div', { class: 'field' }, ...children),
    setError(message) {
      error.hidden = message === undefined;
      if (message === undefined) {
        error.replaceChildren();
        control.removeAttribute('aria-invalid');
        control.removeAttribute('aria-describedby');
      } else {
        error.replaceChildren(icon('alert', 'icon icon-sm'), el('span', {}, el('span', { class: 'sr-only' }, 'Error: '), message));
        control.setAttribute('aria-invalid', 'true');
        control.setAttribute('aria-describedby', errorId);
      }
    },
  };
}
