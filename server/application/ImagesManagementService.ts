import { Image } from '../domain/entities/Image'
import { ImageRepository } from '../domain/repositories/ImageRepository'

export class ImagesManagementService {
  constructor(private readonly imageRepository: ImageRepository) {}

  public async getAllImagesFromSelectedFolder(folderPath: string): Promise<Image[]> {
    console.log('ImagesManagementService: solicitando imágenes para:', folderPath)
    return this.imageRepository.getImagesFromFolder(folderPath)
  }
}
