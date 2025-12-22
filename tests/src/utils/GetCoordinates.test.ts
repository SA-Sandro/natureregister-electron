import { describe, expect, it } from 'vitest';
import { getCoordinates } from '@/utils/GetCoordinates';

describe('Test GetCoordinates function', () => {
  it('should convert coordinates string to array of numbers', () => {
    const coordinatesString = '34.0522, -118.2437';
    expect(getCoordinates(coordinatesString)).toEqual([34.0522, -118.2437]);
  });

  it('should return exception in case coordinates are not valid numbers', () => {
    const coordinatesString = 'invalid, data';
    expect(getCoordinates(coordinatesString)).toBeNull();
  });
});
