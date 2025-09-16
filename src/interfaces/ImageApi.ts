import type { Image } from '@/types/ImagesType';

export interface ImageApi {
  retrieveAllImages(folderPath: string): Promise<Image[]>;
}
