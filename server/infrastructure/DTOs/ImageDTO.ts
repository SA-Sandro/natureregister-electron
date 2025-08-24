import { Image } from '../../domain/entities/Image';
export class ImageDTO {
  public readonly url: string;
  public readonly size: number;
  public readonly extension: string;
  public readonly date: Date;

  public static toDTO(images: Image[]) {
    return images.map((image) => ({
      url: image.getUrl(),
      size: image.getSize(),
      extension: image.getExtension(),
      date: image.getDate(),
    }));
  }
}
