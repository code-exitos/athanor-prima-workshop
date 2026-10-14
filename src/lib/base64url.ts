// Base64url helpers (RFC 4648, section 5), without padding.

const BASE64URL_PATTERN = /^[A-Za-z0-9_-]*$/;

export function bytesToBase64url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function base64urlToBytes(text: string): Uint8Array<ArrayBuffer> {
  if (!BASE64URL_PATTERN.test(text) || text.length % 4 === 1) {
    throw new Error('Invalid base64url string');
  }
  const base64 = text.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

export function textToBase64url(text: string): string {
  return bytesToBase64url(new TextEncoder().encode(text));
}

export function base64urlToText(text: string): string {
  return new TextDecoder().decode(base64urlToBytes(text));
}
