// Builds the verify URL from the current origin and path. Never uses a fixed host.

export function buildVerifyUrl(origin: string, pathname: string, token: string): string {
  return `${origin}${pathname}#/verify?p=${encodeURIComponent(token)}`;
}
