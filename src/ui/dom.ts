// Small DOM helpers. Text is always set with textContent, never innerHTML.

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

export function labeledField(id: string, label: string, control: HTMLElement, errorId: string): HTMLElement {
  const error = el('p', { id: errorId, class: 'field-error', role: 'alert' });
  control.setAttribute('aria-describedby', errorId);
  return el('div', { class: 'field' }, el('label', { for: id }, label), control, error);
}
