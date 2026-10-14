import { describe, expect, it } from 'vitest';
import { base64urlToBytes, base64urlToText, bytesToBase64url, textToBase64url } from './base64url';

describe('base64url', () => {
  it('encodes bytes without padding or unsafe characters', () => {
    expect(bytesToBase64url(new Uint8Array([251, 255, 254]))).toBe('-__-');
    expect(bytesToBase64url(new Uint8Array([1]))).toBe('AQ');
  });

  it('round-trips every byte value', () => {
    const bytes = Uint8Array.from({ length: 256 }, (_, i) => i);
    expect(base64urlToBytes(bytesToBase64url(bytes))).toEqual(bytes);
  });

  it('round-trips unicode text', () => {
    expect(base64urlToText(textToBase64url('Zoë ✓'))).toBe('Zoë ✓');
  });

  it('handles empty input', () => {
    expect(bytesToBase64url(new Uint8Array())).toBe('');
    expect(base64urlToBytes('')).toEqual(new Uint8Array());
  });

  it('rejects invalid characters and impossible lengths', () => {
    expect(() => base64urlToBytes('ab+/')).toThrow();
    expect(() => base64urlToBytes('a')).toThrow();
  });
});
