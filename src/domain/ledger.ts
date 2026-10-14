// Ledger of used passes: pass id -> ISO time the pass was used.

export type Ledger = Readonly<Record<string, string>>;

export function isPassUsed(ledger: Ledger, passId: string): boolean {
  return Object.hasOwn(ledger, passId);
}
