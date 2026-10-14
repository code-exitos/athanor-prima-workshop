// DEMO DATA ONLY: fake housing units.

export const UNITS: readonly string[] = Array.from(
  { length: 12 },
  (_, index) => `Unit ${String(index + 1).padStart(2, '0')}`,
);
