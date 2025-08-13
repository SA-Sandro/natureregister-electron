import { ImageApiImpl } from '@/api/http/imagesManagement/ImageApiImpl';

export class ImagesApiHandler {
  private readonly imageApi: ImageApiImpl;
  constructor() {
    this.imageApi = new ImageApiImpl();
  }

  public async fetchImages(folderPath: string): Promise<string[]> {
    localStorage.setItem('selectedFolderPath', folderPath);
    return await this.imageApi.retrieveAllImages(folderPath);
  }
}
