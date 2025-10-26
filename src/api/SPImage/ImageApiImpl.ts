import { type AxiosInstance } from 'axios';
import type { ImageApi } from '@/interfaces/ImageInterface';
import type { Image } from '@/types/ImagesType';
import { axiosInstance } from '@/api/http/AxiosInstance';

export class ImageApiImpl implements ImageApi {
  private readonly axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axiosInstance;
  }

  async getAll(folderPath: string): Promise<Image[]> {
    const response = await this.axiosInstance.get<Image[]>('/images/retrieveAllImages', {
      params: { folderPath },
    });
    return response.data;
  }
}
