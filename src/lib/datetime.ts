// Converts between a `datetime-local` input value (local time) and a UTC ISO 8601 string.

/** Returns null when the value is empty or not a valid date. */
export function localInputToUtcIso(value: string): string | null {
  if (value === '') {
    return null;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/** Formats a Date as a `datetime-local` input value in local time (minutes, no seconds). */
export function utcToLocalInput(date: Date): string {
  const pad = (value: number): string => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const DISPLAY_FORMAT = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

/** Formats an ISO time for people to read, in local time, for example "2 Jun 2026, 10:05". */
export function formatDateTime(iso: string): string {
  return DISPLAY_FORMAT.format(new Date(iso));
}
