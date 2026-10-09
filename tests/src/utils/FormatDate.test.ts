import { describe, expect, it } from 'vitest';
import { formatDate, formatDateForObservedAtInput, formatDateForStorage } from '@/utils/FormatDate';

describe('Test formatDate function', () => {
  const isoDate = '2025-08-03T20:32:45.279Z';

  it('should format ISO 8601 to friendly date', () => {
    expect(formatDate(isoDate)).toBe('03/08/2025');
  });

  it('formats a date input value as DD/MM/YYYY for storage', () => {
    expect(formatDateForStorage('2022-10-14')).toBe('14/10/2022');
  });

  it('formats a date for a date input using the local calendar date', () => {
    const localDate = '2025-08-03T12:00:00.000Z';

    expect(formatDateForObservedAtInput(localDate)).toBe('2025-08-03');
  });

  it('formats an ISO date string for a date input', () => {
    expect(formatDateForObservedAtInput('2025-08-03T12:00:00.000Z')).toBe('2025-08-03');
  });

  it('returns an empty string for an invalid date', () => {
    expect(formatDateForObservedAtInput('invalid-date')).toBe('');
  });
});
