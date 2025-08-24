import { promises as fs, Stats } from 'fs';
import path from 'path';
import { Image } from '@domain/entities/Image';
import { ImageRepository } from '@domain/repositories/ImageRepository';

export class FileSystemImageRepository implements ImageRepository {
  private readonly VALID_EXT: string[] = ['.jpg', '.jpeg', '.png', '.webp'];

  private async getFileStats(folderPath: string): Promise<Stats | null> {
    try {
      return await fs.stat(folderPath);
    } catch (error) {
      console.error('An error ocurred while accesing the path:', error);
      return null;
    }
  }
  public async getImagesFromFolder(folderPath: string): Promise<Image[]> {
    const allImages: Image[] = [];
    let files: string[];

    try {
      files = await fs.readdir(folderPath);
    } catch (err) {
      console.error('An error ocurred while reading the folder:', err);
      return allImages;
    }

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileStat = await this.getFileStats(filePath);
      if (!fileStat) continue;

      if (fileStat.isDirectory()) {
        const nestedImages = await this.getImagesFromFolder(filePath); // Await the recursion
        allImages.push(...nestedImages);
      } else if (this.VALID_EXT.includes(path.extname(file).toLowerCase())) {
        allImages.push(
          new Image(filePath, fileStat.size, path.extname(file).toLowerCase(), fileStat.birthtime),
        );
      }
    }
    return allImages;
  }
}
