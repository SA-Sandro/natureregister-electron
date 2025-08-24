import { ImageExtension } from '@domain/valueObjects/ImageExtension';

export class Image {
  constructor(
    private readonly url: string,
    private readonly size: number,
    private readonly extension: ImageExtension,
    private readonly date: Date,
  ) {}

  public getUrl(): string {
    return this.url;
  }

  public getSize(): number {
    return this.size;
  }

  public getExtension(): string {
    return this.extension.getValue();
  }

  public getDate(): Date {
    return this.date;
  }
}
