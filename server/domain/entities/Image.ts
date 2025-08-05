export class Image {
  constructor(
    private readonly url: string,
    private readonly size: number,
    private readonly extension: string,
    private readonly date: Date,
  ) {}

  private getUrl(): string {
    return this.url;
  }

  private getSize(): number {
    return this.size;
  }

  private getExtension(): string {
    return this.extension;
  }

  private getDate(): Date {
    return this.date;
  }
}
