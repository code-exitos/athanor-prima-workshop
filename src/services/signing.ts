// Signs passes with ECDSA P-256 / SHA-256 using the browser Web Crypto API.
// Token format: base64url(JSON payload) + "." + base64url(signature).

import type { Pass } from '../domain/pass';
import { bytesToBase64url, textToBase64url } from '../lib/base64url';

const ALGORITHM = { name: 'ECDSA', namedCurve: 'P-256' } as const;
const SIGN_PARAMS = { name: 'ECDSA', hash: 'SHA-256' } as const;

export function importPrivateKey(jwk: JsonWebKey): Promise<CryptoKey> {
  return crypto.subtle.importKey('jwk', jwk, ALGORITHM, false, ['sign']);
}

export function importPublicKey(jwk: JsonWebKey): Promise<CryptoKey> {
  return crypto.subtle.importKey('jwk', jwk, ALGORITHM, false, ['verify']);
}

/** Serializes the pass with a fixed field order so the payload is predictable. */
function toPayloadJson(pass: Pass): string {
  return JSON.stringify({
    v: pass.v,
    id: pass.id,
    unit: pass.unit,
    type: pass.type,
    validFrom: pass.validFrom,
    validUntil: pass.validUntil,
    visitorAlias: pass.visitorAlias,
  });
}

export async function signPass(pass: Pass, privateKey: CryptoKey): Promise<string> {
  const payload = textToBase64url(toPayloadJson(pass));
  const signature = await crypto.subtle.sign(SIGN_PARAMS, privateKey, new TextEncoder().encode(payload));
  return `${payload}.${bytesToBase64url(new Uint8Array(signature))}`;
}
