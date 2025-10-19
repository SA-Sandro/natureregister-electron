import { promises as fs, Stats } from 'fs';
import path from 'path';
import { Image } from '@domain/entities/Image';
import { ImageRepository } from '@domain/repositories/ImageRepository';
import { ImageExtension } from '@domain/valueObjects/ImageExtension';
import { DomainException } from '@domain/exceptions/DomainException';

export class FileSystemImageRepository implements ImageRepository {
  public async getImagesFromFolder(folderPath: string): Promise<Image[]> {
    let files: string[];

    try {
      files = await fs.readdir(folderPath);
    } catch (err) {
      console.error('Error reading folder:', err);
      return [];
    }

    const images = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(folderPath, file);
        const fileStat = await this.getFileStats(filePath);
        if (!fileStat) return [];

        if (fileStat.isDirectory()) {
          return this.getImagesFromFolder(filePath);
        }

        try {
          return new Image(
            filePath,
            fileStat.size,
            new ImageExtension(path.extname(file)),
            fileStat.birthtime,
          );
        } catch (err: unknown) {
          if (err instanceof DomainException) {
            console.warn(`Ignored file: ${filePath}`, `[Image] ${err.message}`);
            return [];
          }
          throw err;
        }
      }),
    );
    return images.flat();
  }

  private async getFileStats(folderPath: string): Promise<Stats | null> {
    try {
      return await fs.stat(folderPath);
    } catch (error) {
      console.error('Error accessing path:', error);
      return null;
    }
  }
}
