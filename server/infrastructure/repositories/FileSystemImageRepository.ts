import fs from 'fs/promises'
import path from 'path'
import { Image } from '../../domain/entities/Image'
import { ImageRepository } from '../../domain/repositories/ImageRepository'

export class FileSystemImageRepository implements ImageRepository {
  private readonly VALID_EXT: string[]

  constructor(validExt: string[] = ['.jpg', '.jpeg', '.png', '.webp']) {
    this.VALID_EXT = validExt
  }

  public async getImagesFromFolder(folderPath: string): Promise<Image[]> {
    const allImages: Image[] = []
    let files: string[]

    try {
      files = await fs.readdir(folderPath)
    } catch (err) {
      console.error('Error al leer la carpeta:', err)
      return allImages
    }

    for (const file of files) {
      const filePath = path.join(folderPath, file)
      let fileStat
      try {
        fileStat = await fs.stat(filePath)
      } catch (error) {
        console.error('Error al obtener la ruta: ', error)
        continue
      }

      if (fileStat.isDirectory()) {
        const nestedImages = await this.getImagesFromFolder(filePath) // Await the recursion
        allImages.push(...nestedImages)
      } else if (this.VALID_EXT.includes(path.extname(file).toLowerCase())) {
        allImages.push(
          new Image(filePath, fileStat.size, path.extname(file).toLowerCase(), fileStat.birthtime),
        )
      }
    }
    return allImages
  }
}
