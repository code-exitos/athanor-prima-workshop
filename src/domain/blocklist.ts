// Blocklist rule: a blocked visitor name may not enter, even with a valid pass.
// The match is exact and case-sensitive.

export function isBlocked(name: string, blocklist: readonly string[]): boolean {
  return blocklist.includes(name);
}
