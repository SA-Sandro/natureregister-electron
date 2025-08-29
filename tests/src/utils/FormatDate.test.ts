import { describe, expect, it } from 'vitest';
import { formatDate } from '@/utils/FormatDate';

describe('Test formatDate function', () => {

  const isoDate = new Date('2025-08-03T20:32:45.279Z');

  it('should format ISO 8601 to friendly date', () => {
    expect(formatDate(isoDate)).toBe('03/08/2025');
  });
});
