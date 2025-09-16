import { type AxiosInstance } from 'axios';
import { axiosInstance } from '@/api/http/AxiosInstance';
import type { ImageApi } from '@/interfaces/ImageApi';
import type { Image } from '@/types/ImagesType';

export class ImageApiImpl implements ImageApi {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axiosInstance;
  }

  async retrieveAllImages(folderPath: string): Promise<Image[]> {
    try {
      const response = await this.axiosInstance.get<Image[]>('retrieveAllImages', {
        params: { folderPath },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
