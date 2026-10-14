// Small inline SVG icons (24x24 outline style). Built with createElementNS, no innerHTML.

type Shape = readonly [tag: string, attributes: Readonly<Record<string, string>>];

const SHAPES = {
  building: [
    ['path', { d: 'M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z' }],
    ['path', { d: 'M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2' }],
    ['path', { d: 'M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2' }],
    ['path', { d: 'M10 6h4M10 10h4M10 14h4M10 18h4' }],
  ],
  qrCode: [
    ['rect', { x: '3', y: '3', width: '5', height: '5', rx: '1' }],
    ['rect', { x: '16', y: '3', width: '5', height: '5', rx: '1' }],
    ['rect', { x: '3', y: '16', width: '5', height: '5', rx: '1' }],
    ['path', { d: 'M21 16h-3a2 2 0 0 0-2 2v3M21 21v.01M12 7v3a2 2 0 0 1-2 2H7M3 12h.01M12 3h.01M12 16v.01M16 12h1M21 12v.01M12 21v-1' }],
  ],
  clipboardList: [
    ['rect', { x: '8', y: '2', width: '8', height: '4', rx: '1' }],
    ['path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' }],
    ['path', { d: 'M12 11h4M12 16h4M8 11h.01M8 16h.01' }],
  ],
  inbox: [
    ['polyline', { points: '22 12 16 12 14 15 10 15 8 12 2 12' }],
    ['path', { d: 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z' }],
  ],
  check: [['path', { d: 'M20 6 9 17l-5-5' }]],
  cross: [['path', { d: 'M18 6 6 18M6 6l12 12' }]],
  alert: [
    ['circle', { cx: '12', cy: '12', r: '10' }],
    ['path', { d: 'M12 8v4M12 16h.01' }],
  ],
  spinner: [['path', { d: 'M21 12a9 9 0 1 1-6.219-8.56' }]],
} as const satisfies Record<string, readonly Shape[]>;

export type IconName = keyof typeof SHAPES;

const SVG_NS = 'http://www.w3.org/2000/svg';

/** Returns a decorative icon. The page text always says the same thing, so screen readers skip it. */
export function icon(name: IconName, className = 'icon'): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('class', className);
  for (const [tag, attributes] of SHAPES[name]) {
    const shape = document.createElementNS(SVG_NS, tag);
    for (const [key, value] of Object.entries(attributes)) {
      shape.setAttribute(key, value);
    }
    svg.append(shape);
  }
  return svg;
}
