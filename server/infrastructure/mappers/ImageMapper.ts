import { Image } from '../../domain/entities/Image'
import { ImageDTO } from '../DTOs/ImageDTO'

export class ImageMapper {
  static toDTO(image: Image): ImageDTO {
    const { url, size, extension, date } = image.toPrimitive()
    return new ImageDTO(url, size, extension, date)
  }
}
