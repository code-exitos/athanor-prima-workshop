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

export type FieldName = 'building' | 'visitorName' | 'validFrom' | 'validUntil';
/** One message per field, so the screen can show each one next to its field. */
export type FieldErrors = Partial<Record<FieldName, string>>;

export type CreatePassResult =
  | { readonly ok: true; readonly pass: Pass }
  | { readonly ok: false; readonly errors: FieldErrors };

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 40;

function isBuilding(value: string): value is Building {
  return (BUILDINGS as readonly string[]).includes(value);
}

function validateInput(input: PassInput, now: Date): FieldErrors {
  const errors: FieldErrors = {};
  const nameLength = input.visitorName.trim().length;
  const from = Date.parse(input.validFrom);
  const until = Date.parse(input.validUntil);

  if (!isBuilding(input.building)) {
    errors.building = 'Choose a building.';
  }
  if (nameLength < NAME_MIN_LENGTH || nameLength > NAME_MAX_LENGTH) {
    errors.visitorName = `Name must be ${NAME_MIN_LENGTH} to ${NAME_MAX_LENGTH} characters.`;
  }
  if (Number.isNaN(from)) {
    errors.validFrom = 'Enter a valid start date.';
  }
  if (Number.isNaN(until)) {
    errors.validUntil = 'Enter a valid end date.';
  } else if (!Number.isNaN(from) && until < from) {
    errors.validUntil = 'End must not be before start.';
  } else if (until < now.getTime()) {
    errors.validUntil = 'End must not be in the past.';
  }
  return errors;
}

/** Validates the input and builds a pass. `now` is passed in so the rule stays testable. */
export function createPass(input: PassInput, now: Date): CreatePassResult {
  const errors = validateInput(input, now);
  if (Object.keys(errors).length > 0 || !isBuilding(input.building)) {
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
