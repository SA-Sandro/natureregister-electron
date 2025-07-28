import fs from 'fs'
import path from 'path'
import { Image } from '../domain/entities/Image'

export class ImagesManagementService {
  private images: Image[] = []

  constructor(private readonly VALID_EXT: string[] = ['.jpg', '.jpeg', '.png', '.webp']) {}

  public async getAllImagesFromSelectedFolder(folderPath: string): Promise<Image[]> {
    const files = fs.readdirSync(folderPath)
    const imageFiles = files.filter((file) =>
      this.VALID_EXT.includes(path.extname(file).toLowerCase()),
    )

    this.images = this.toImage(imageFiles, folderPath)
    return this.images
  }

  private toImage(files: string[], folderPath: string): Image[] {
    return files.map((file) => {
      const filePath = path.join(folderPath, file)
      const stat = fs.statSync(filePath)

      return new Image(filePath, stat.size, path.extname(file).toLowerCase(), stat.birthtime)
    })
  }
}
