import { ImageApiImpl } from '@/api/http/imagesManagement/ImageApiImpl';
import { LocalStorageService } from '@/services/LocalStorageService';

export class ImagesApiHandler {
  constructor(
    private readonly imageApi: ImageApiImpl,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public async fetchImages(folderPath: string): Promise<string[]> {
    this.localStorageService.setItem('selectedFolderPath', folderPath);
    return this.imageApi.retrieveAllImages(folderPath);
  }
}
