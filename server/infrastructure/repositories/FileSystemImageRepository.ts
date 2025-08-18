import { promises as fs, Stats } from 'fs';
import path from 'path';
import { Image } from '@domain/entities/Image';
import { ImageRepository } from '@domain/repositories/ImageRepository';
import { ImageExtension } from '@domain/valueObjects/ImageExtension';
import { InvalidImageExtension } from '@domain/exceptions/InvalidImageExtension';

export class FileSystemImageRepository implements ImageRepository {
  private async getFileStats(folderPath: string): Promise<Stats | null> {
    try {
      return await fs.stat(folderPath);
    } catch (error) {
      console.error('Error accessing path:', error);
      return null;
    }
  }

  public async getImagesFromFolder(folderPath: string): Promise<Image[]> {
    const allImages: Image[] = [];
    let files: string[];

    try {
      files = await fs.readdir(folderPath);
    } catch (err) {
      console.error('Error reading folder:', err);
      return allImages;
    }

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileStat = await this.getFileStats(filePath);
      if (!fileStat) continue;

      if (fileStat.isDirectory()) {
        const nestedImages = await this.getImagesFromFolder(filePath);
        allImages.push(...nestedImages);
      } else {
        try {
          const image = new Image(
            filePath,
            fileStat.size,
            new ImageExtension(path.extname(file).toLowerCase()),
            fileStat.birthtime,
          );
          allImages.push(image);
        } catch (err: unknown) {
          if (err instanceof InvalidImageExtension) {
            console.warn(`Ignored file: ${filePath}`, err.message);
          }
        }
      }
    }

    return allImages;
  }
}
