import fs from 'fs'
import path from 'path'
import { Image } from '@entities/Image'
import { ImageRepository } from '@repositories/ImageRepository'

export class FileSystemImageRepository implements ImageRepository {
  constructor(private readonly VALID_EXT: string[] = ['.jpg', '.jpeg', '.png', '.webp']) {}

  public async getImagesFromFolder(folderPath: string): Promise<Image[]> {
    const files = fs.readdirSync(folderPath)
    const imageFiles = files.filter((file) =>
      this.VALID_EXT.includes(path.extname(file).toLowerCase()),
    )
    return imageFiles.map((file) => {
      const filePath = path.join(folderPath, file)
      const stat = fs.statSync(filePath)
      return new Image(filePath, stat.size, path.extname(file).toLowerCase(), stat.birthtime)
    })
  }
}
