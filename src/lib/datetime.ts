// Converts a `datetime-local` input value (local time) to a UTC ISO 8601 string.

/** Returns null when the value is empty or not a valid date. */
export function localInputToUtcIso(value: string): string | null {
  if (value === '') {
    return null;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}
