// Pass creation. Pure rules: no clock, no storage.

/** DEMO DATA ONLY: the four buildings of the fictional Contoso HQ campus. */
export const BUILDINGS = ['Main Tower', 'East Wing', 'West Wing', 'Annex'] as const;
export type Building = (typeof BUILDINGS)[number];

export interface Pass {
  readonly v: 1;
  readonly id: string;
  readonly building: Building;
  readonly validFrom: string;
  readonly validUntil: string;
  readonly visitorName: string;
}

export interface PassInput {
  readonly building: string;
  readonly validFrom: string;
  readonly validUntil: string;
  readonly visitorName: string;
}

export type CreatePassResult =
  | { readonly ok: true; readonly pass: Pass }
  | { readonly ok: false; readonly errors: readonly string[] };

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 40;

function isBuilding(value: string): value is Building {
  return (BUILDINGS as readonly string[]).includes(value);
}

function parseTime(iso: string): number {
  return Date.parse(iso);
}

function validateInput(input: PassInput, now: Date): string[] {
  const errors: string[] = [];
  const name = input.visitorName.trim();

  if (!isBuilding(input.building)) {
    errors.push('Choose a building.');
  }
  if (name.length < NAME_MIN_LENGTH || name.length > NAME_MAX_LENGTH) {
    errors.push(`Name must be ${NAME_MIN_LENGTH} to ${NAME_MAX_LENGTH} characters.`);
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
  if (errors.length > 0 || !isBuilding(input.building)) {
    return { ok: false, errors };
  }
  return {
    ok: true,
    pass: {
      v: 1,
      id: crypto.randomUUID(),
      building: input.building,
      validFrom: new Date(input.validFrom).toISOString(),
      validUntil: new Date(input.validUntil).toISOString(),
      visitorName: input.visitorName.trim(),
    },
  };
}
