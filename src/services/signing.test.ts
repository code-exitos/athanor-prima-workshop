import { describe, expect, it } from 'vitest';
import type { Pass } from '../domain/pass';
import { DEMO_KEYS } from '../data/demo-keys';
import { base64urlToBytes, base64urlToText } from '../lib/base64url';
import { importPrivateKey, importPublicKey, signPass } from './signing';

const pass: Pass = {
  v: 1,
  id: '3f0c1d52-7a39-4a55-9d0b-0a1b2c3d4e5f',
  unit: 'Casa 03',
  type: 'one-time',
  validFrom: '2026-06-02T10:00:00.000Z',
  validUntil: '2026-06-02T22:00:00.000Z',
  visitorAlias: 'JR',
};

describe('signPass', () => {
  it('returns a token with a payload part and a signature part', async () => {
    const token = await signPass(pass, await importPrivateKey(DEMO_KEYS.privateKey));
    const parts = token.split('.');
    expect(parts).toHaveLength(2);
    expect(parts.every((part) => /^[A-Za-z0-9_-]+$/.test(part))).toBe(true);
    expect(base64urlToBytes(parts[1] ?? '')).toHaveLength(64);
  });

  it('puts the pass in the payload', async () => {
    const token = await signPass(pass, await importPrivateKey(DEMO_KEYS.privateKey));
    const payload = JSON.parse(base64urlToText(token.split('.')[0] ?? ''));
    expect(payload).toEqual(pass);
  });

  it('produces a signature the demo public key accepts', async () => {
    const token = await signPass(pass, await importPrivateKey(DEMO_KEYS.privateKey));
    const [payload = '', signature = ''] = token.split('.');
    const valid = await crypto.subtle.verify(
      { name: 'ECDSA', hash: 'SHA-256' },
      await importPublicKey(DEMO_KEYS.publicKey),
      base64urlToBytes(signature),
      new TextEncoder().encode(payload),
    );
    expect(valid).toBe(true);
  });
});
