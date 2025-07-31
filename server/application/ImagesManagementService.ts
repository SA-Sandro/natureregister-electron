import { Image } from "@domain/entities/Image" 
import { ImageRepository } from '@domain/repositories/ImageRepository'

export class ImagesManagementService {
  constructor(private readonly imageRepository: ImageRepository) {}

  public async getAllImagesFromSelectedFolder(folderPath: string): Promise<Image[]> {
    return this.imageRepository.getImagesFromFolder(folderPath)
  }
}
