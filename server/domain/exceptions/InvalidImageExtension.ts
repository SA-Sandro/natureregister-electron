export class InvalidImageExtension extends Error {
  constructor(extension: string) {
    super(`Invalid image extension: ${extension}`);
    this.name = 'InvalidImageExtension';
  }
}
