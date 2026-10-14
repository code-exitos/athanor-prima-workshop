import { describe, expect, it } from 'vitest';
import { parseRoute } from './router';

describe('parseRoute', () => {
  it('maps the resident route', () => {
    expect(parseRoute('')).toEqual({ name: 'resident' });
    expect(parseRoute('#/')).toEqual({ name: 'resident' });
  });

  it('maps the log route', () => {
    expect(parseRoute('#/log')).toEqual({ name: 'log' });
  });

  it('reads the token on the verify route', () => {
    expect(parseRoute('#/verify?p=abc.def')).toEqual({ name: 'verify', token: 'abc.def' });
    expect(parseRoute('#/verify')).toEqual({ name: 'verify', token: null });
  });

  it('returns not-found for unknown routes', () => {
    expect(parseRoute('#/nope')).toEqual({ name: 'not-found' });
  });
});
