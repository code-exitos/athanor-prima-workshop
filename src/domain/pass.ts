// Pass types and pass creation. Pure rules: no clock, no storage.

export type PassType = 'one-time' | 'date-range';

export interface Pass {
  readonly v: 1;
  readonly id: string;
  readonly unit: string;
  readonly type: PassType;
  readonly validFrom: string;
  readonly validUntil: string;
  readonly visitorAlias: string;
}

export interface PassInput {
  readonly unit: string;
  readonly type: PassType;
  readonly validFrom: string;
  readonly validUntil: string;
  readonly visitorAlias: string;
}

export type CreatePassResult =
  | { readonly ok: true; readonly pass: Pass }
  | { readonly ok: false; readonly errors: readonly string[] };

export const ALIAS_MIN_LENGTH = 2;
export const ALIAS_MAX_LENGTH = 24;

const PASS_TYPES: readonly PassType[] = ['one-time', 'date-range'];

function parseTime(iso: string): number {
  return Date.parse(iso);
}

function validateInput(input: PassInput, now: Date): string[] {
  const errors: string[] = [];
  const alias = input.visitorAlias.trim();

  if (input.unit.trim() === '') {
    errors.push('Choose a unit.');
  }
  if (!PASS_TYPES.includes(input.type)) {
    errors.push('Choose a pass type.');
  }
  if (alias.length < ALIAS_MIN_LENGTH || alias.length > ALIAS_MAX_LENGTH) {
    errors.push(`Alias must be ${ALIAS_MIN_LENGTH} to ${ALIAS_MAX_LENGTH} characters.`);
  }

  const from = parseTime(input.validFrom);
  const until = parseTime(input.validUntil);
  if (Number.isNaN(from) || Number.isNaN(until)) {
    errors.push('Enter a valid start and end date.');
  } else if (until < from) {
    errors.push('End must not be before start.');
  } else if (until < now.getTime()) {
    errors.push('End must not be in the past.');
  }
  return errors;
}

/** Validates the input and builds a pass. `now` is passed in so the rule stays testable. */
export function createPass(input: PassInput, now: Date): CreatePassResult {
  const errors = validateInput(input, now);
  if (errors.length > 0) {
    return { ok: false, errors };
  }
  return {
    ok: true,
    pass: {
      v: 1,
      id: crypto.randomUUID(),
      unit: input.unit.trim(),
      type: input.type,
      validFrom: new Date(input.validFrom).toISOString(),
      validUntil: new Date(input.validUntil).toISOString(),
      visitorAlias: input.visitorAlias.trim(),
    },
  };
}
