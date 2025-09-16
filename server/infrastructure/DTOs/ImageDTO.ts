import { Image } from '@domain/entities/Image';
export class ImageDTO {
  constructor(
    public readonly url: string,
    public readonly date: Date,
  ) {}

  public static toDTO(images: Image[]) {
    return images.map((image) => ({
      url: image.getUrl(),
      date: image.getDate(),
    }));
  }
}
