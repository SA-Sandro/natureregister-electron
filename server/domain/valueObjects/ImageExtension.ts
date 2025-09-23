import { DomainException } from '@domain/exceptions/DomainException';

export class ImageExtension {
  private static readonly VALID_EXT: string[] = ['.jpg', '.jpeg', '.png', '.webp'];

  constructor(private readonly extension: string) {
    if (!ImageExtension.VALID_EXT.includes(extension.toLowerCase())) {
      throw new DomainException('Image', `Invalid image extension: ${extension}`);
    }
  }

  public getValue(): string {
    return this.extension.toLowerCase();
  }
}
