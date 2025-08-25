import { ImageApiImpl } from '@/api/http/imagesManagement/ImageApiImpl';
import type { Image } from '@/types/ImagesType';

export class ImagesApiHandler {
  constructor(private readonly imageApi: ImageApiImpl) {}

  public async fetchImages(folderPath: string): Promise<Image[]> {
    return this.imageApi.retrieveAllImages(folderPath);
  }
}
