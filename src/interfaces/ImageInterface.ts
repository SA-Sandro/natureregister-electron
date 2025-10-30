import type { Image } from '@/types/ImagesType';

export interface ImageApi {
  getAll(folderPath: string): Promise<Image[]>;
}
