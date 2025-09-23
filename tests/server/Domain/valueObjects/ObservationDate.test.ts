import { DomainException } from '@domain/exceptions/DomainException';
import { ObservationDate } from '@domain/valueObjects/ObservationDate';
import { describe, it, expect } from 'vitest';

describe('Test Value Object ObservationDate', () => {
  it('should throws a DomainException when date is future', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    expect(() => new ObservationDate(futureDate)).toThrow(DomainException);
  });
});
