import { describe, expect, it } from 'vitest';
import { buildVerifyUrl } from './urls';

describe('buildVerifyUrl', () => {
  it('builds the URL from origin, path and token', () => {
    expect(buildVerifyUrl('https://example.test', '/', 'abc.def')).toBe('https://example.test/?p=abc.def');
  });

  it('keeps a sub-path', () => {
    expect(buildVerifyUrl('https://example.test', '/campus/', 't')).toBe('https://example.test/campus/?p=t');
  });

  it('escapes the token', () => {
    expect(buildVerifyUrl('https://example.test', '/', 'a b')).toBe('https://example.test/?p=a%20b');
  });
});
