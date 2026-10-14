// Blocklist rule: a blocked alias may not enter, even with a valid pass.

export function isBlocked(alias: string, blocklist: readonly string[]): boolean {
  return blocklist.includes(alias);
}
