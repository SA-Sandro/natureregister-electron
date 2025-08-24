import { ImageApiImpl } from '@/api/http/imagesManagement/ImageApiImpl';

export class ImagesApiHandler {
  constructor(private readonly imageApi: ImageApiImpl) {}

  public async fetchImages(folderPath: string): Promise<string[]> {
    return this.imageApi.retrieveAllImages(folderPath);
  }
}
