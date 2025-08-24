export class ImageDTO {
  constructor(
    public readonly url: string,
    public readonly size: number,
    public readonly extension: string,
    public readonly date: Date,
  ) {}
}
