import { describe, it, expect } from 'vitest';
import { ImageExtension } from '../../../../server/Domain/valueObjects/ImageExtension';
import { InvalidImageExtension } from '../../../../server/Domain/exceptions/InvalidImageExtension';

// TODO: this imports should be relative to the project root, but for now, this is the workaround
describe('Test Value Object ImageExtension', () => {
  const invalidExtension = 'pdf';
  const validExtension = '.JPG';

  it('should throws InvalidImageExtension when extension is not supported', () => {
    expect(() => new ImageExtension(invalidExtension)).toThrow(InvalidImageExtension);
  });

  it('should return extension in lowercase', () => {
    expect(new ImageExtension(validExtension).getValue()).toBe('.jpg');
  });
});
