import type { AxiosInstance } from 'axios';
import { axiosInstance } from '@/api/http/AxiosInstance';
import type { ImageApi } from '@/interfaces/ImageApi';

export class ImageApiImpl implements ImageApi {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axiosInstance;
  }

  async retrieveAllImages(folderPath: string): Promise<string[]> {
    const response = await this.axiosInstance.get<string[]>('retrieveAllImages', {
      params: { folderPath },
    });
    console.log(response.data);

    return response.data;
  }
}
