import { describe, it, expect } from 'vitest';
import { ImageExtension } from '@domain/valueObjects/ImageExtension';
import { DomainException } from '@domain/exceptions/DomainException';

// TODO: this imports should be relative to the project root, but for now, this is the workaround
describe('Test Value Object ImageExtension', () => {
  const invalidExtension = 'pdf';
  const validExtension = '.JPG';

  it('should throws DomainException when extension is not supported', () => {
    expect(() => new ImageExtension(invalidExtension)).toThrow(DomainException);
  });

  it('should return extension in lowercase', () => {
    expect(new ImageExtension(validExtension).getValue()).toBe('.jpg');
  });
});
