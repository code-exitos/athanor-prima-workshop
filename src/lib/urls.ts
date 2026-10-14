// Builds the verify URL from the current origin and path. Never uses a fixed host.
// The token goes in the query string, not the #fragment: sign-in redirects (for example
// Codespaces port forwarding) keep the query but drop the fragment.

export function buildVerifyUrl(origin: string, pathname: string, token: string): string {
  return `${origin}${pathname}?p=${encodeURIComponent(token)}`;
}
