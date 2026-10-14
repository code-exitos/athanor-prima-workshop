import { describe, expect, it } from 'vitest';
import { buildVerifyUrl } from './urls';

describe('buildVerifyUrl', () => {
  it('builds the URL from origin, path and token', () => {
    expect(buildVerifyUrl('https://example.test', '/', 'abc.def')).toBe('https://example.test/#/verify?p=abc.def');
  });

  it('keeps a sub-path', () => {
    expect(buildVerifyUrl('https://example.test', '/tartan/', 't')).toBe('https://example.test/tartan/#/verify?p=t');
  });
});
